import { promises as fs } from "fs";
import path from "path";

export type InquiryRecord = {
  source: "contact" | "membership-register" | "portal-message-team";
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

/**
 * Persists an inquiry when Supabase is unavailable (local/preview).
 * Production should use Supabase; this keeps forms functional in environments without secrets.
 */
export async function persistInquiryFallback(record: InquiryRecord): Promise<void> {
  const dir = path.join(process.cwd(), ".data");
  const file = path.join(dir, "inquiries.jsonl");
  await fs.mkdir(dir, { recursive: true });
  await fs.appendFile(file, `${JSON.stringify(record)}\n`, "utf8");
  console.info("[inquiry-fallback]", record.source, record.email);
}
