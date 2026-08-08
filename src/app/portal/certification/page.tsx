import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function PortalCertificationPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let certificates: { id: string; code: string; issued_at: string; course_id: string }[] = [];
  if (user) {
    const { data } = await supabase
      .from("certificates")
      .select("id, code, issued_at, course_id")
      .eq("user_id", user.id)
      .order("issued_at", { ascending: false });
    certificates = data ?? [];
  }

  return (
    <div>
      <h1 className={`text-3xl font-semibold tracking-[-0.03em] text-slate-900 ${fredokaHeadline.className}`}>
        Certification
      </h1>
      <p className={`mt-2 max-w-2xl text-sm font-medium text-slate-600 sm:text-base ${jakartaSans.className}`}>
        Completed courses can issue a certificate code stored on your profile. Empty for now until course completion
        logic is wired.
      </p>

      {certificates.length === 0 ? (
        <div className="mt-8 rounded-[1.75rem] border border-slate-100 bg-white p-6">
          <p className={`text-sm font-medium text-slate-600 ${jakartaSans.className}`}>
            No certificates yet. Finish a course in the portal to earn one.
          </p>
        </div>
      ) : (
        <ul className="mt-8 space-y-3">
          {certificates.map((cert) => (
            <li key={cert.id} className="rounded-[1.75rem] border border-slate-100 bg-white p-5">
              <p className={`font-semibold text-slate-900 ${fredokaHeadline.className}`}>{cert.code}</p>
              <p className="mt-1 text-xs font-medium text-slate-500">
                Issued {new Date(cert.issued_at).toLocaleDateString()} · course {cert.course_id}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
