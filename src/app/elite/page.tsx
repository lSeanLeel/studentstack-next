import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { BrandWordmark } from "@/components/BrandWordmark";
import { EliteApplyForm } from "@/components/EliteApplyForm";
import Link from "next/link";

export default function ElitePage() {
  return (
    <main className={`min-h-screen bg-[#f8fafc] px-4 py-12 sm:px-8 ${jakartaSans.className}`}>
      <div className="mx-auto w-full max-w-xl">
        <Link href="/" aria-label="StudentStack home">
          <BrandWordmark />
        </Link>
        <h1 className={`mt-8 text-3xl font-semibold tracking-[-0.03em] text-slate-900 ${fredokaHeadline.className}`}>
          Apply for Elite
        </h1>
        <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600">
          Parents apply here. We follow up within 24 hours with portal next steps and how your student receives a unique
          login after subscription.
        </p>
        <div className="mt-8 rounded-[1.75rem] border border-slate-200 bg-white p-6 sm:p-8">
          <EliteApplyForm />
        </div>
      </div>
    </main>
  );
}
