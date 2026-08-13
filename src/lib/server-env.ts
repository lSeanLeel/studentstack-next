import { config } from "dotenv";
import { existsSync } from "fs";
import { resolve } from "path";

let loaded = false;

/** Ensure `.env.local` / `.env` from the project root are loaded in API routes. */
export function loadServerEnv() {
  if (loaded) return;
  loaded = true;

  const root = process.cwd();
  const localPath = resolve(root, ".env.local");
  const envPath = resolve(root, ".env");

  if (existsSync(localPath)) {
    config({ path: localPath, override: false });
  }
  if (existsSync(envPath)) {
    config({ path: envPath, override: false });
  }
}

loadServerEnv();

export function getAnthropicApiKey(): string | undefined {
  const key = process.env.ANTHROPIC_API_KEY?.trim();
  return key || undefined;
}

export function getBeehiivApiKey(): string | undefined {
  const key = process.env.BEEHIIV_API_KEY?.trim();
  return key || undefined;
}

export function getBeehiivPublicationId(): string | undefined {
  const id = process.env.BEEHIIV_PUBLICATION_ID?.trim();
  return id || undefined;
}

/** Operator portal username (default: test). */
export function getOperatorUsername(): string {
  return process.env.OPERATOR_USERNAME?.trim() || process.env.ADMIN_USERNAME?.trim() || "test";
}

/** Operator portal password (default: Sean1234!). */
export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD?.trim() || process.env.OPERATOR_PASSWORD?.trim() || "Sean1234!";
}

export function getEnvStatus() {
  loadServerEnv();
  const root = process.cwd();
  return {
    cwd: root,
    envLocalExists: existsSync(resolve(root, ".env.local")),
    anthropicApiKey: Boolean(getAnthropicApiKey()),
    beehiivApiKey: Boolean(getBeehiivApiKey()),
    beehiivPublicationId: Boolean(getBeehiivPublicationId()),
    adminPassword: Boolean(process.env.ADMIN_PASSWORD?.trim() || process.env.OPERATOR_PASSWORD?.trim()),
    operatorUsername: Boolean(process.env.OPERATOR_USERNAME?.trim() || process.env.ADMIN_USERNAME?.trim()),
  };
}
