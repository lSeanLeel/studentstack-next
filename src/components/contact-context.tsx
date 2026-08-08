"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { ContactModal } from "@/components/ContactModal";

type ContactCtx = {
  openContact: () => void;
  closeContact: () => void;
  contactOpen: boolean;
};

const Ctx = createContext<ContactCtx | null>(null);

export function ContactProvider({ children }: { children: React.ReactNode }) {
  const [contactOpen, setContactOpen] = useState(false);
  const openContact = useCallback(() => setContactOpen(true), []);
  const closeContact = useCallback(() => setContactOpen(false), []);

  const value = useMemo(
    () => ({ openContact, closeContact, contactOpen }),
    [openContact, closeContact, contactOpen]
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      <ContactModal open={contactOpen} onClose={closeContact} />
    </Ctx.Provider>
  );
}

export function useContact() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useContact must be used within ContactProvider");
  return ctx;
}
