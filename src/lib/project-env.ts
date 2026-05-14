import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

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
  const roots = discoverProjectRoots();
  for (const base of roots) {
    for (const name of [".env", ".env.local"] as const) {
      const full = path.join(base, name);
      if (!fs.existsSync(full)) continue;
      dotenv.config({ path: full, override: true });
    }
  }
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
