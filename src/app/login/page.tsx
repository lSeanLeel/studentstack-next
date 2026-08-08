import React, { Suspense } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { jakartaSans } from "@/app/fonts";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className={`min-h-screen bg-[#f8fafc] px-4 py-10 ${jakartaSans.className}`}>
          <p className="text-sm font-medium text-slate-500">Loading…</p>
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
