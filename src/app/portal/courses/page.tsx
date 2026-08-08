import Link from "next/link";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { PORTAL_COURSE_STUBS } from "@/lib/portal/content";

export default function PortalCoursesPage() {
  return (
    <div>
      <h1 className={`text-3xl font-semibold tracking-[-0.03em] text-slate-900 ${fredokaHeadline.className}`}>
        Courses
      </h1>
      <p className={`mt-2 max-w-2xl text-sm font-medium text-slate-600 sm:text-base ${jakartaSans.className}`}>
        Curriculum stubs for the portal. Swap these for live Supabase course rows when content is ready.
      </p>

      <ul className="mt-8 space-y-4">
        {PORTAL_COURSE_STUBS.map((course) => (
          <li key={course.id} className="rounded-[1.75rem] border border-slate-100 bg-white p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-sky-600">
                  {course.status === "published" ? "Available" : "Coming soon"}
                </p>
                <h2 className={`mt-1 text-xl font-semibold text-slate-900 ${fredokaHeadline.className}`}>
                  {course.title}
                </h2>
                <p className={`mt-1.5 text-sm font-medium text-slate-600 ${jakartaSans.className}`}>{course.summary}</p>
              </div>
              {course.status === "published" ? (
                <Link
                  href={`/portal/courses/${course.slug}`}
                  className="rounded-2xl bg-slate-900 px-4 py-2 text-[11px] font-black uppercase tracking-[0.12em] text-white hover:bg-slate-800"
                >
                  Open
                </Link>
              ) : (
                <span className="rounded-2xl border border-slate-200 px-4 py-2 text-[11px] font-black uppercase tracking-[0.12em] text-slate-400">
                  Soon
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
