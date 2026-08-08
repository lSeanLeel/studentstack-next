import Link from "next/link";
import { notFound } from "next/navigation";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { getCourseStub } from "@/lib/portal/content";

export default async function PortalCourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourseStub(slug);
  if (!course) notFound();

  return (
    <div className="max-w-3xl">
      <Link href="/portal/courses" className="text-sm font-bold text-sky-700 hover:text-sky-900">
        ← All courses
      </Link>
      <h1 className={`mt-4 text-3xl font-semibold tracking-[-0.03em] text-slate-900 ${fredokaHeadline.className}`}>
        {course.title}
      </h1>
      <p className={`mt-3 text-base font-medium leading-relaxed text-slate-600 ${jakartaSans.className}`}>
        {course.summary}
      </p>
      <div className="mt-8 rounded-[1.75rem] border border-dashed border-sky-200 bg-sky-50/60 p-6">
        <p className={`text-sm font-medium text-slate-600 ${jakartaSans.className}`}>
          Lesson player, progress tracking, and completion hooks will mount here. Enrollment rows already have a schema
          path in Supabase (`enrollments`, `lesson_progress`).
        </p>
        {course.estimated_hours ? (
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
            ~{course.estimated_hours} hours
          </p>
        ) : null}
      </div>
    </div>
  );
}
