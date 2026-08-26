import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, FileText, MessageSquare } from "lucide-react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { PortalBadge, PortalEyebrow } from "@/components/portal/portal-ui";
import { getStudentStackModule } from "@/lib/portal/curriculum";

const trackAccent = {
  foundations: "violet" as const,
  "ss-ais": "sky" as const,
  "ss-acr": "amber" as const,
  toolkit: "emerald" as const,
};

export default async function PortalCourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mod = getStudentStackModule(slug);
  if (!mod) notFound();

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <Link href="/portal/courses" className={`text-sm font-bold text-sky-700 hover:text-sky-900 ${jakartaSans.className}`}>
          ← All courses
        </Link>
        <PortalEyebrow className="mt-4">Member module</PortalEyebrow>
        <h1 className={`mt-2 text-3xl font-semibold tracking-[-0.03em] text-slate-900 ${fredokaHeadline.className}`}>
          {mod.label}
        </h1>
        <p className={`mt-3 text-base font-medium leading-relaxed text-slate-600 ${jakartaSans.className}`}>
          {mod.summary}
        </p>
        <p className={`mt-2 text-sm font-bold text-slate-500 ${jakartaSans.className}`}>
          {mod.lessons.length} lessons · ~{mod.estimatedHours} hours
        </p>
        {mod.certHref ? (
          <Link
            href={mod.certHref}
            className={`mt-3 inline-flex rounded-xl border-2 border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-black uppercase tracking-[0.1em] text-sky-800 ${jakartaSans.className}`}
          >
            Credential path →
          </Link>
        ) : null}
      </div>

      <section>
        <h2 className={`flex items-center gap-2 text-xl font-semibold text-slate-900 ${fredokaHeadline.className}`}>
          <BookOpen className="h-5 w-5 text-sky-600" aria-hidden />
          Lessons
        </h2>
        <ol className="mt-4 space-y-3">
          {mod.lessons.map((lesson, i) => (
            <li
              key={lesson.id}
              className="rounded-[1.5rem] border-2 border-slate-200 bg-white p-4 shadow-[0_6px_0_0_rgba(15,23,42,0.04)]"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className={`text-[10px] font-black uppercase tracking-[0.12em] text-slate-400 ${jakartaSans.className}`}>
                    Lesson {i + 1} · {lesson.duration}
                  </p>
                  <p className={`mt-1 text-lg font-semibold text-slate-900 ${fredokaHeadline.className}`}>{lesson.title}</p>
                  <p className={`mt-1.5 text-sm font-medium text-slate-600 ${jakartaSans.className}`}>{lesson.summary}</p>
                </div>
                <PortalBadge accent={trackAccent[mod.track]}>Included</PortalBadge>
              </div>
            </li>
          ))}
        </ol>
        <p className={`mt-3 text-xs font-medium text-slate-500 ${jakartaSans.className}`}>
          Full lesson player and progress tracking coming soon. Worksheets and prompts below are ready now.
        </p>
      </section>

      <section>
        <h2 className={`flex items-center gap-2 text-xl font-semibold text-slate-900 ${fredokaHeadline.className}`}>
          <FileText className="h-5 w-5 text-emerald-600" aria-hidden />
          Worksheets
        </h2>
        <ul className="mt-4 space-y-3">
          {mod.worksheets.map((sheet) => (
            <li
              key={sheet.id}
              className="rounded-[1.5rem] border-2 border-emerald-100 bg-emerald-50/50 p-4"
            >
              <p className={`font-semibold text-slate-900 ${fredokaHeadline.className}`}>{sheet.title}</p>
              <p className={`mt-1 text-sm font-medium text-slate-600 ${jakartaSans.className}`}>{sheet.description}</p>
              <button
                type="button"
                className={`mt-3 rounded-xl bg-emerald-600 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] text-white ${jakartaSans.className}`}
              >
                Download worksheet
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className={`flex items-center gap-2 text-xl font-semibold text-slate-900 ${fredokaHeadline.className}`}>
          <MessageSquare className="h-5 w-5 text-amber-600" aria-hidden />
          Copy-paste prompts
        </h2>
        <p className={`mt-1 text-sm font-medium text-slate-600 ${jakartaSans.className}`}>
          Use these with your AI tool of choice. Message the team if you want feedback on your output.
        </p>
        <ul className="mt-4 space-y-3">
          {mod.teamPrompts.map((prompt, i) => (
            <li key={i} className="rounded-[1.5rem] border-2 border-amber-100 bg-amber-50/40 p-4">
              <p className={`text-sm font-medium italic leading-relaxed text-slate-700 ${jakartaSans.className}`}>
                &ldquo;{prompt}&rdquo;
              </p>
            </li>
          ))}
        </ul>
        <Link
          href="/portal/message"
          className={`mt-4 inline-flex text-sm font-bold text-sky-700 hover:text-sky-900 ${jakartaSans.className}`}
        >
          Message the team →
        </Link>
      </section>
    </div>
  );
}
