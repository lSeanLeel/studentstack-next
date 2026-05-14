import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

/** Same rules as stripEnvValue in supabase-server (keep this file import-free of that module). */
function normalizeEnvFileValue(raw: string | undefined): string {
  if (!raw) return "";
  return raw
    .replace(/^\uFEFF/, "")
    .replace(/\r/g, "")
    .trim()
    .replace(/^["']|["']$/g, "");
}

/**
 * Apply parsed dotenv entries without letting an empty value wipe a non-empty `process.env`
 * (multiple discovered roots + override:true was clearing SUPABASE_SERVICE_ROLE_KEY).
 */
function mergeParsedIntoProcessEnv(parsed: dotenv.DotenvParseOutput): void {
  for (const [key, value] of Object.entries(parsed)) {
    if (value === undefined) continue;
    const normalized = normalizeEnvFileValue(value);
    if (normalized.length > 0) {
      process.env[key] = normalized;
    }
  }
}

const NEXT_CONFIG_NAMES = ["next.config.mjs", "next.config.js", "next.config.cjs", "next.config.ts", "next.config.mts"] as const;

/**
 * Directory that contains this Next app (next.config* + package.json).
 * When the API route is bundled under `.next/server`, `import.meta.url` still walks up to this folder.
 */
export function resolveNextAppRoot(): string {
  const startDirs: string[] = [];
  try {
    startDirs.push(path.dirname(fileURLToPath(import.meta.url)));
  } catch {
    /* import.meta.url unavailable */
  }
  startDirs.push(process.cwd());
  if (process.env.INIT_CWD) startDirs.push(process.env.INIT_CWD);

  for (const start of startDirs) {
    let cur = path.resolve(start);
    for (let i = 0; i < 48; i++) {
      const hasPkg = fs.existsSync(path.join(cur, "package.json"));
      const hasNext = NEXT_CONFIG_NAMES.some((n) => fs.existsSync(path.join(cur, n)));
      if (hasPkg && hasNext) return cur;
      const parent = path.dirname(cur);
      if (parent === cur) break;
      cur = parent;
    }
  }
  return process.cwd();
}

/**
 * Re-apply selected keys from this app's `.env` then `.env.local` (local wins).
 * Next's `loadEnvConfig` skips keys already present on `process.env` even when they are empty strings
 * (e.g. inherited from the shell), which makes the service role look "missing" despite a valid `.env.local`.
 */
function applyCriticalKeysFromAppEnvLocal(): void {
  const root = resolveNextAppRoot();
  const criticalKeys = [
    "SUPABASE_SERVICE_ROLE_KEY",
    "SUPABASE_SECRET_KEY",
    "SUPABASE_SERVICE_KEY",
    "SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_URL",
    "BEEHIIV_API_KEY",
    "BEEHIHV_API_KEY",
    "BEEHIIV_PUBLICATION_ID",
  ] as const;

  for (const name of [".env", ".env.local"] as const) {
    const full = path.join(root, name);
    if (!fs.existsSync(full)) continue;
    try {
      const parsed = dotenv.parse(fs.readFileSync(full, "utf8"));
      for (const key of criticalKeys) {
        const raw = parsed[key];
        if (raw === undefined) continue;
        const normalized = normalizeEnvFileValue(raw);
        if (normalized.length > 0) process.env[key] = normalized;
      }
    } catch {
      /* unreadable */
    }
  }
}

/**
 * Find directories that contain package.json (project roots).
 * Cursor / monorepos sometimes run Node with a cwd that is not the repo root; walking from
 * this module's path fixes loading `.env.local` next to package.json.
 */
export function discoverProjectRoots(): string[] {
  const found = new Set<string>();

  const markFrom = (start: string | undefined) => {
    if (!start) return;
    let cur = path.resolve(start);
    for (let i = 0; i < 28; i++) {
      if (fs.existsSync(path.join(cur, "package.json"))) {
        found.add(cur);
        return;
      }
      const parent = path.dirname(cur);
      if (parent === cur) return;
      cur = parent;
    }
  };

  markFrom(process.cwd());
  markFrom(process.env.INIT_CWD);

  try {
    const moduleDir = path.dirname(fileURLToPath(import.meta.url));
    markFrom(moduleDir);
  } catch {
    /* import.meta.url unavailable */
  }

  return [...found];
}

/**
 * Loads `.env` then `.env.local` from every discovered project root with override so real
 * values replace empty placeholders already on `process.env`.
 */
export function hydrateProjectEnv(): void {
  const priorityRoot = resolveNextAppRoot();
  for (const name of [".env", ".env.local"] as const) {
    const full = path.join(priorityRoot, name);
    if (!fs.existsSync(full)) continue;
    try {
      const parsed = dotenv.parse(fs.readFileSync(full, "utf8"));
      mergeParsedIntoProcessEnv(parsed);
    } catch {
      /* unreadable or invalid — skip */
    }
  }

  const roots = discoverProjectRoots();
  for (const base of roots) {
    if (path.resolve(base) === path.resolve(priorityRoot)) continue;
    for (const name of [".env", ".env.local"] as const) {
      const full = path.join(base, name);
      if (!fs.existsSync(full)) continue;
      try {
        const parsed = dotenv.parse(fs.readFileSync(full, "utf8"));
        mergeParsedIntoProcessEnv(parsed);
      } catch {
        /* unreadable or invalid — skip */
      }
    }
  }

  applyCriticalKeysFromAppEnvLocal();
}

export function envFileHints(): {
  cwd: string;
  initCwd: string | undefined;
  discoveredRoots: string[];
  dotEnvLocal: string[];
  dotEnv: string[];
} {
  const roots = discoverProjectRoots();
  const dotEnvLocal: string[] = [];
  const dotEnv: string[] = [];
  for (const base of roots) {
    const l = path.join(base, ".env.local");
    const e = path.join(base, ".env");
    if (fs.existsSync(l)) dotEnvLocal.push(l);
    if (fs.existsSync(e)) dotEnv.push(e);
  }
  return {
    cwd: process.cwd(),
    initCwd: process.env.INIT_CWD,
    discoveredRoots: roots,
    dotEnvLocal,
    dotEnv,
  };
}
