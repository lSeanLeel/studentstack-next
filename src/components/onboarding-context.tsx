"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { OnboardingModal } from "@/components/OnboardingModal";

type OnboardingCtx = {
  openOnboarding: () => void;
  closeOnboarding: () => void;
  onboardingOpen: boolean;
};

const Ctx = createContext<OnboardingCtx | null>(null);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [onboardingOpen, setOnboardingOpen] = useState(false);

  const openOnboarding = useCallback(() => setOnboardingOpen(true), []);
  const closeOnboarding = useCallback(() => setOnboardingOpen(false), []);

  const value = useMemo(
    () => ({ openOnboarding, closeOnboarding, onboardingOpen }),
    [openOnboarding, closeOnboarding, onboardingOpen]
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      <OnboardingModal open={onboardingOpen} onClose={closeOnboarding} />
    </Ctx.Provider>
  );
}

export function useOnboarding() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useOnboarding must be used within OnboardingProvider");
  return v;
}
