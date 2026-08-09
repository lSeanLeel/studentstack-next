import Link from "next/link";
import { fredokaHeadline, jakartaSans, institutionalSerif } from "@/app/fonts";
import { BrandWordmark } from "@/components/BrandWordmark";
import { ElitePurchaseForm } from "@/components/ElitePurchaseForm";

const categories = [
  { name: "Organization", detail: "Folders, inboxes, and deadline hygiene for a real school week." },
  { name: "Planning", detail: "Syllabus translation into blocks, buffers, and priorities." },
  { name: "Notetaking", detail: "Capture → compress → study sheet without inventing content." },
  { name: "Studying", detail: "Practice sets and explain-back routines before exams." },
  { name: "Writing", detail: "Outlines and clarity passes that keep the student’s voice." },
  { name: "Research", detail: "Source scouting and claim checks for papers and projects." },
] as const;

const journey = [
  {
    step: "01",
    title: "Parent starts free",
    body: "The daily newsletter teaches how AI helps a high schooler stay organized for school.",
  },
  {
    step: "02",
    title: "Parent subscribes to Elite",
    body: "Billing stays with the parent. Portal access is assigned to the student’s email.",
  },
  {
    step: "03",
    title: "Student enters the portal",
    body: "They log in to check living postings by school category, plus exclusive resource boards.",
  },
  {
    step: "04",
    title: "The Edge keeps updating",
    body: "New tool posts and resource refreshes continue through the term as school tools change.",
  },
] as const;

export default function ElitePage() {
  return (
    <main className={`min-h-screen bg-[#f1f5f9] ${jakartaSans.className}`}>
      {/* Hero */}
      <section className="border-b border-slate-200 bg-white px-4 pb-14 pt-10 sm:px-8 sm:pb-16 sm:pt-12">
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-14">
          <div>
            <Link href="/" className="inline-flex" aria-label="StudentStack home">
              <BrandWordmark />
            </Link>
            <p className="mt-10 text-[10px] font-black uppercase tracking-[0.22em] text-[#ff6a00]">
              StudentStack Elite
            </p>
            <h1
              className={`mt-3 max-w-xl text-3xl font-semibold tracking-[-0.035em] text-slate-900 sm:text-5xl ${fredokaHeadline.className}`}
            >
              A private student portal for the organizing Edge
            </h1>
            <p
              className={`ss-institutional mt-5 max-w-xl text-[1.1rem] leading-[1.7] text-slate-700 ${institutionalSerif.className}`}
            >
              StudentStack begins as a free daily newsletter for parents: how high schoolers can use AI to stay organized
              for school. Elite is the paid subscription that gives your student a direct login to a living, progress-oriented
              portal of school-category tool postings.
            </p>
            <p
              className={`ss-institutional mt-3 max-w-xl text-[1.05rem] leading-[1.7] text-slate-600 ${institutionalSerif.className}`}
            >
              Built from the college-student side of the same pressure. Designed so students check in themselves. Quiet,
              educational, and already used by families who want more than tips in an inbox.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-[#f8fafc] p-6 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.4)] sm:p-8">
            <h2 className={`text-xl font-semibold tracking-[-0.02em] text-slate-900 ${fredokaHeadline.className}`}>
              Start the subscription
            </h2>
            <p className={`ss-institutional mt-2 text-[0.95rem] leading-relaxed text-slate-600 ${institutionalSerif.className}`}>
              Parent email for billing. Student email for portal access.
            </p>
            <div className="mt-6">
              <ElitePurchaseForm />
            </div>
            <p className="mt-5 text-center text-xs font-medium text-slate-500">
              Already have access?{" "}
              <Link href="/login" className="font-bold text-sky-700 hover:text-sky-900">
                Student portal login
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* What students see */}
      <section className="px-4 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-sky-600">Inside the portal</p>
          <h2 className={`mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-4xl ${fredokaHeadline.className}`}>
            What your student opens after login
          </h2>
          <p
            className={`ss-institutional mt-3 max-w-2xl text-[1.05rem] leading-[1.7] text-slate-600 ${institutionalSerif.className}`}
          >
            Elite is not a dump of links. It is a board of ongoing posts by school use case, plus exclusive resource lists.
            The experience is meant to feel intricate and game-like over time: check back, complete a move, stay current.
          </p>

          <div className="mt-10 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
            <div className="grid border-b border-slate-100 bg-slate-50 sm:grid-cols-[12rem_1fr]">
              <div className="border-b border-slate-100 px-5 py-4 sm:border-b-0 sm:border-r">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">Nav</p>
                <ul className="mt-3 space-y-2 text-sm font-semibold text-slate-700">
                  <li className="text-sky-700">AI Toolkit</li>
                  <li>Resources</li>
                  <li className="text-slate-400">Courses (later)</li>
                  <li className="text-slate-400">Certification (later)</li>
                </ul>
              </div>
              <div className="px-5 py-5 sm:px-8">
                <p className={`text-lg font-semibold text-slate-900 ${fredokaHeadline.className}`}>
                  Toolkit · school categories
                </p>
                <p className={`ss-institutional mt-1 text-sm text-slate-500 ${institutionalSerif.className}`}>
                  Sample of what a student browses in Elite today
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {categories.map((cat) => (
                    <div key={cat.name} className="rounded-2xl border border-slate-100 bg-[#f8fafc] px-4 py-3">
                      <p className={`font-semibold text-slate-900 ${fredokaHeadline.className}`}>{cat.name}</p>
                      <p className={`ss-institutional mt-1 text-sm leading-relaxed text-slate-600 ${institutionalSerif.className}`}>
                        {cat.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid gap-0 border-t border-slate-100 sm:grid-cols-2">
              <div className="border-b border-slate-100 px-5 py-5 sm:border-b-0 sm:border-r sm:px-8">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#ff6a00]">Resources</p>
                <p className={`mt-2 font-semibold text-slate-900 ${fredokaHeadline.className}`}>Exclusive boards</p>
                <ul className={`ss-institutional mt-3 space-y-2 text-sm leading-relaxed text-slate-600 ${institutionalSerif.className}`}>
                  <li>Summer program shortlists with fit notes</li>
                  <li>Opportunity lists refreshed through the year</li>
                  <li>Sourced openings meant for high school timelines</li>
                </ul>
              </div>
              <div className="px-5 py-5 sm:px-8">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-sky-600">Progress layer</p>
                <p className={`mt-2 font-semibold text-slate-900 ${fredokaHeadline.className}`}>
                  Gamified Edge (visualizing next)
                </p>
                <ul className={`ss-institutional mt-3 space-y-2 text-sm leading-relaxed text-slate-600 ${institutionalSerif.className}`}>
                  <li>Weekly check-ins against category posts</li>
                  <li>Streaks / completion marks as the portal deepens</li>
                  <li>Room later for courses and certification paths</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="border-y border-slate-200 bg-white px-4 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-500">How Elite works</p>
          <h2 className={`mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-4xl ${fredokaHeadline.className}`}>
            Parent buys. Student uses.
          </h2>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {journey.map((item) => (
              <li key={item.step} className="rounded-[1.5rem] border border-slate-100 bg-[#f8fafc] px-5 py-5">
                <p className="text-[11px] font-black tracking-[0.16em] text-sky-600">{item.step}</p>
                <p className={`mt-2 text-lg font-semibold text-slate-900 ${fredokaHeadline.className}`}>{item.title}</p>
                <p className={`ss-institutional mt-2 text-sm leading-relaxed text-slate-600 ${institutionalSerif.className}`}>
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Credibility + CTA */}
      <section className="px-4 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className={`text-3xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-4xl ${fredokaHeadline.className}`}>
            Educational first. Subscription when ready.
          </h2>
          <p
            className={`ss-institutional mx-auto mt-4 max-w-2xl text-[1.05rem] leading-[1.7] text-slate-600 ${institutionalSerif.className}`}
          >
            StudentStack stays credible by leading with free parent education. Elite is the optional subscription for
            families who want their student inside a mentor-informed portal, not another generic AI app.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#top"
              className="pointer-events-none hidden"
              aria-hidden
            />
            <Link
              href="/"
              className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-[11px] font-black uppercase tracking-[0.14em] text-slate-700 hover:border-sky-200 hover:text-sky-700"
            >
              Back to free newsletter
            </Link>
            <Link
              href="/login"
              className="rounded-2xl bg-slate-900 px-5 py-3 text-[11px] font-black uppercase tracking-[0.14em] text-white hover:bg-slate-800"
            >
              Student portal login
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
