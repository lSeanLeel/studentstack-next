/**
 * Transactional welcome email after successful membership payment.
 * Uses Resend when RESEND_API_KEY is set; otherwise records a deliverable ops row.
 */

export type WelcomeEmailPayload = {
  parentEmail: string;
  parentName?: string | null;
  studentName: string;
  studentEmail: string;
  password: string;
  loginUrl: string;
};

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildWelcomeEmailHtml(p: WelcomeEmailPayload) {
  const student = escapeHtml(p.studentName);
  const email = escapeHtml(p.studentEmail);
  const password = escapeHtml(p.password);
  const login = escapeHtml(p.loginUrl);
  return `<!DOCTYPE html>
<html><body style="font-family:system-ui,-apple-system,sans-serif;line-height:1.55;color:#0f172a;background:#f8fafc;padding:24px;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:28px;">
    <p style="margin:0 0 8px;font-size:11px;font-weight:800;letter-spacing:0.16em;text-transform:uppercase;color:#0284c7;">StudentStack</p>
    <h1 style="margin:0 0 12px;font-size:22px;letter-spacing:-0.02em;">Welcome. Membership is active.</h1>
    <p style="margin:0 0 16px;color:#475569;">${student}'s portal access is ready. A mentor will reach out next to tailor next steps to their background.</p>
    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px;margin:0 0 16px;">
      <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.12em;">Student login</p>
      <p style="margin:0 0 6px;"><strong>Username</strong> (email): ${email}</p>
      <p style="margin:0;"><strong>Password</strong>: ${password}</p>
    </div>
    <p style="margin:0 0 16px;"><a href="${login}" style="display:inline-block;background:#0f172a;color:#fff;text-decoration:none;padding:12px 18px;border-radius:12px;font-size:12px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;">Open student login</a></p>
    <p style="margin:0;font-size:13px;color:#64748b;">Ask your student to sign in and change this password after the first visit.</p>
  </div>
</body></html>`;
}

export function buildWelcomeEmailText(p: WelcomeEmailPayload) {
  return [
    "StudentStack — Welcome. Membership is active.",
    "",
    `${p.studentName}'s portal access is ready. A mentor will reach out next to tailor next steps to their background.`,
    "",
    "Student login",
    `Username (email): ${p.studentEmail}`,
    `Password: ${p.password}`,
    `Sign in: ${p.loginUrl}`,
    "",
    "Ask your student to change this password after the first visit.",
  ].join("\n");
}

export async function sendWelcomeCredentialsEmail(
  payload: WelcomeEmailPayload
): Promise<{ sent: boolean; provider: "resend" | "logged" }> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from =
    process.env.RESEND_FROM_EMAIL?.trim() ||
    process.env.WELCOME_FROM_EMAIL?.trim() ||
    "StudentStack <advising@studentstack.info>";
  const subject = `Welcome to StudentStack — ${payload.studentName}'s login`;
  const html = buildWelcomeEmailHtml(payload);
  const text = buildWelcomeEmailText(payload);

  if (apiKey) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [payload.parentEmail],
        subject,
        html,
        text,
      }),
    });
    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error("[welcome-email] Resend failed", res.status, errText);
      return { sent: false, provider: "resend" };
    }
    return { sent: true, provider: "resend" };
  }

  console.info("[welcome-email] RESEND_API_KEY not set; email logged for ops delivery", {
    to: payload.parentEmail,
    studentEmail: payload.studentEmail,
  });
  return { sent: false, provider: "logged" };
}
