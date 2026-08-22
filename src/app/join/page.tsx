"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import { jakartaSans } from "@/app/fonts";
import { BrandWordmark } from "@/components/BrandWordmark";
import { JoinFlow } from "@/components/JoinFlow";

function JoinInner() {
  const search = useSearchParams();
  const stepParam = search.get("step");
  const initialStep =
    stepParam === "payment" ? "payment" : stepParam === "mentor" ? "mentor" : "application";

  return (
    <main className={`min-h-screen bg-[#f8fafc] px-4 py-10 sm:px-8 sm:py-14 ${jakartaSans.className}`}>
      <div className="mx-auto w-full max-w-lg">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-500 transition-colors hover:text-sky-700"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back
        </Link>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_48px_-32px_rgba(15,23,42,0.2)] sm:p-9">
          <BrandWordmark />
          <div className="mt-8">
            <JoinFlow initialStep={initialStep} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default function JoinPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#f8fafc]" />}>
      <JoinInner />
    </Suspense>
  );
}
