import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";

/**
 * Loads `.env` then `.env.local` from disk with override so real values replace
 * empty placeholders that Next / @next/env may have already merged into `process.env`.
 */
export function hydrateProjectEnv(): void {
  const roots = [...new Set([process.cwd(), process.env.INIT_CWD].filter(Boolean))] as string[];
  for (const root of roots) {
    const base = path.resolve(root);
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
  dotEnvLocal: string[];
  dotEnv: string[];
} {
  const roots = [...new Set([process.cwd(), process.env.INIT_CWD].filter(Boolean))] as string[];
  const dotEnvLocal: string[] = [];
  const dotEnv: string[] = [];
  for (const root of roots) {
    const base = path.resolve(root);
    const l = path.join(base, ".env.local");
    const e = path.join(base, ".env");
    if (fs.existsSync(l)) dotEnvLocal.push(l);
    if (fs.existsSync(e)) dotEnv.push(e);
  }
  return { cwd: process.cwd(), initCwd: process.env.INIT_CWD, dotEnvLocal, dotEnv };
}
