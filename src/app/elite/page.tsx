import Link from "next/link";
import { Crown, Mail, Sparkles, Star } from "lucide-react";

const features = [
  {
    title: "Weekly AI Playbook",
    description:
      "A step-by-step tactical plan every week with prompts, implementation drills, and accountability checkpoints.",
    icon: Sparkles,
  },
  {
    title: "The Matchmaker",
    description:
      "Private email advising from our UCLA/Ivy mentor network for application strategy and execution feedback.",
    icon: Mail,
  },
];

export default function ElitePage() {
  return (
    <main className="min-h-screen px-4 py-12 sm:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <section className="card-pop p-8 sm:p-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-fuchsia-100 px-4 py-2 text-xs font-black uppercase tracking-widest text-fuchsia-700">
            <Crown className="h-4 w-4" />
            StudentStack Elite
          </div>
          <h1 className="text-4xl font-black text-slate-900 sm:text-5xl">$25/month</h1>
          <p className="mt-3 max-w-2xl text-lg font-semibold text-slate-600">
            Join the premium cohort for focused weekly execution and elite advising support.
          </p>
        </section>

        <section className="grid gap-5 sm:grid-cols-2">
          {features.map((feature) => (
            <article key={feature.title} className="card-pop p-6">
              <feature.icon className="mb-3 h-8 w-8 text-cyan-600" />
              <h2 className="text-2xl font-black text-slate-900">{feature.title}</h2>
              <p className="mt-2 text-sm font-semibold text-slate-600">{feature.description}</p>
            </article>
          ))}
        </section>

        <section className="card-pop flex flex-col gap-4 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-xl font-black text-slate-900">Ready to lock in your spot?</h3>
            <p className="mt-1 text-sm font-semibold text-slate-600">
              Stripe checkout wiring goes here when your payment account is ready.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="button-bubble inline-flex items-center gap-2 bg-emerald-500 px-6 py-3 text-sm uppercase tracking-widest text-white shadow-[0_8px_0_0_#059669]"
            >
              <Star className="h-4 w-4" />
              Pay with Stripe (Coming Soon)
            </button>
            <a
              href="mailto:advising@studentstack.info"
              className="button-bubble inline-flex items-center gap-2 bg-slate-900 px-6 py-3 text-sm uppercase tracking-widest text-white shadow-[0_8px_0_0_#0f172a]"
            >
              <Mail className="h-4 w-4" />
              Contact a Mentor
            </a>
          </div>
        </section>

        <Link href="/" className="text-center text-sm font-black uppercase tracking-widest text-slate-500">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
