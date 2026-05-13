import Link from "next/link";
import { redirect } from "next/navigation";
import { Lock, ShieldX, Download, ExternalLink } from "lucide-react";
import { AdminPlaybookDraft } from "@/components/admin-playbook-draft";
import { AdminWeeklyEmailComposer } from "@/components/admin-weekly-email-composer";
import { clearAdminCookie, constantTimeEqual, isAdminAuthorized, setAdminCookie } from "@/lib/admin-auth";
import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase-server";

type WaitlistRow = {
  id: string;
  email: string;
  grade_level: string;
  zip_code: string;
  created_at: string;
};

type SubscriberRow = {
  id: string;
  parent_email: string;
  student_email: string | null;
  student_grade: string;
  friction_point: string;
  created_at: string;
};

async function loginAdmin(formData: FormData) {
  "use server";
  const submitted = String(formData.get("password") ?? "");
  const expected = process.env.ADMIN_PASSWORD ?? "";

  if (!expected || !constantTimeEqual(submitted, expected)) {
    redirect("/admin?error=1");
  }

  await setAdminCookie(submitted);
  redirect("/admin");
}

async function logoutAdmin() {
  "use server";
  await clearAdminCookie();
  redirect("/admin");
}

async function getWaitlistRows(): Promise<WaitlistRow[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const timeout = AbortSignal.timeout(3500);
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("waitlist_users")
      .select("id,email,grade_level,zip_code,created_at")
      .abortSignal(timeout)
      .order("created_at", { ascending: false });

    if (error) return [];
    return (data ?? []) as WaitlistRow[];
  } catch {
    return [];
  }
}

async function getSubscriberRows(): Promise<SubscriberRow[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const timeout = AbortSignal.timeout(3500);
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("subscribers")
      .select("id,parent_email,student_email,student_grade,friction_point,created_at")
      .abortSignal(timeout)
      .order("created_at", { ascending: false });

    if (error) return [];
    return (data ?? []) as SubscriberRow[];
  } catch {
    return [];
  }
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const authorized = await isAdminAuthorized();

  if (!authorized) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4 py-10">
        <section className="card-pop w-full max-w-md p-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-2 text-xs font-black uppercase tracking-widest text-rose-700">
            <ShieldX className="h-4 w-4" />
            401 Access Denied
          </div>
          <h1 className="text-3xl font-black text-slate-900">Admin Access</h1>
          <p className="mt-3 text-sm font-semibold text-slate-600">
            Enter your `ADMIN_PASSWORD` to unlock the dashboard.
          </p>
          <form action={loginAdmin} className="mt-6 space-y-4">
            <input
              name="password"
              type="password"
              required
              className="w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 font-semibold outline-none focus:border-slate-300"
              placeholder="Admin password"
            />
            {params.error ? (
              <p className="rounded-xl bg-rose-100 px-3 py-2 text-xs font-bold text-rose-700">
                Invalid password or missing `ADMIN_PASSWORD`.
              </p>
            ) : null}
            <button
              type="submit"
              className="button-bubble inline-flex w-full items-center justify-center gap-2 bg-slate-900 px-6 py-3 text-sm uppercase tracking-widest text-white shadow-[0_8px_0_0_#0f172a]"
            >
              <Lock className="h-4 w-4" />
              Unlock Dashboard
            </button>
          </form>
          <Link
            href="/"
            className="mt-5 block text-center text-xs font-black uppercase tracking-widest text-slate-500"
          >
            Back to site
          </Link>
        </section>
      </main>
    );
  }

  const [rows, subscribers] = await Promise.all([getWaitlistRows(), getSubscriberRows()]);

  return (
    <main className="min-h-screen px-4 py-10 sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-7">
        {!isSupabaseConfigured() ? (
          <div className="rounded-3xl border-2 border-amber-200 bg-amber-50 px-5 py-4 text-sm font-semibold text-amber-950">
            <strong className="font-black">Database not connected.</strong> Add real{" "}
            <code className="rounded bg-white/80 px-1">SUPABASE_URL</code> and{" "}
            <code className="rounded bg-white/80 px-1">SUPABASE_SERVICE_ROLE_KEY</code> to{" "}
            <code className="rounded bg-white/80 px-1">studentthisisfinal-main/.env.local</code> (not the placeholders in
            .env.example), then restart <code className="rounded bg-white/80 px-1">npm run dev</code>. See OPS_MANUAL.md.
          </div>
        ) : null}
        <header className="card-pop flex flex-wrap items-center justify-between gap-3 p-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900">StudentStack Admin</h1>
            <p className="text-sm font-semibold text-slate-600">
              Weekly email studio (manual, branded) · waitlist & subscribers · optional AI helpers
            </p>
          </div>
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="button-bubble rounded-full bg-slate-900 px-5 py-2 text-xs font-black uppercase tracking-widest text-white shadow-[0_6px_0_0_#0f172a]"
            >
              Log out
            </button>
          </form>
        </header>

        <AdminWeeklyEmailComposer />

        <section className="card-pop p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-black text-slate-900">Waitlist CRM</h2>
            <a
              href="/api/admin/waitlist-csv"
              className="button-bubble inline-flex items-center gap-2 bg-cyan-500 px-5 py-2 text-xs font-black uppercase tracking-widest text-white shadow-[0_6px_0_0_#0891b2]"
            >
              <Download className="h-4 w-4" />
              Download CSV
            </a>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-100 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-widest text-slate-500">
                <tr>
                  <th className="px-4 py-3">Created</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Grade</th>
                  <th className="px-4 py-3">Zip</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-t border-slate-100 font-semibold text-slate-700">
                    <td className="whitespace-nowrap px-4 py-3 text-xs">
                      {new Date(row.created_at).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">{row.email}</td>
                    <td className="px-4 py-3">{row.grade_level}</td>
                    <td className="px-4 py-3">{row.zip_code}</td>
                  </tr>
                ))}
                {!rows.length ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-10 text-center font-semibold text-slate-400">
                      No waitlist users yet.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>

        <section className="card-pop p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-black text-slate-900">Newsletter subscribers</h2>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              From landing onboarding modal
            </p>
          </div>
          <div className="overflow-x-auto rounded-3xl border border-slate-100 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-widest text-slate-500">
                <tr>
                  <th className="px-4 py-3">Created</th>
                  <th className="px-4 py-3">Parent email</th>
                  <th className="px-4 py-3">Student email</th>
                  <th className="px-4 py-3">Grade</th>
                  <th className="px-4 py-3">Goal</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((row) => (
                  <tr key={row.id} className="border-t border-slate-100 font-semibold text-slate-700">
                    <td className="whitespace-nowrap px-4 py-3 text-xs">
                      {new Date(row.created_at).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">{row.parent_email}</td>
                    <td className="px-4 py-3 text-xs">{row.student_email ?? "—"}</td>
                    <td className="px-4 py-3">{row.student_grade}</td>
                    <td className="max-w-[220px] px-4 py-3 text-xs leading-snug">{row.friction_point}</td>
                  </tr>
                ))}
                {!subscribers.length ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-10 text-center font-semibold text-slate-400">
                      No subscribers yet. Run <code className="rounded bg-slate-100 px-1">supabase/schema.sql</code> and
                      submit the onboarding modal once.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>

        <AdminPlaybookDraft />

        <section className="card-pop p-6">
          <h2 className="text-xl font-black text-slate-900">Operations Hub</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <OpsLink href="https://mail.google.com" label="Gmail Desk" />
            <OpsLink href="https://app.beehiiv.com" label="Beehiiv" />
            <OpsLink href="https://dashboard.stripe.com" label="Stripe" />
          </div>
        </section>
      </div>
    </main>
  );
}

function OpsLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="button-bubble inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-black uppercase tracking-widest text-slate-700 shadow-[0_6px_0_0_#e2e8f0]"
    >
      {label}
      <ExternalLink className="h-4 w-4" />
    </a>
  );
}
