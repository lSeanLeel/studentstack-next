"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { JoinModal } from "@/components/JoinModal";

type JoinCtx = {
  openJoin: () => void;
  closeJoin: () => void;
  joinOpen: boolean;
};

const Ctx = createContext<JoinCtx | null>(null);

export function JoinProvider({ children }: { children: React.ReactNode }) {
  const [joinOpen, setJoinOpen] = useState(false);
  const openJoin = useCallback(() => setJoinOpen(true), []);
  const closeJoin = useCallback(() => setJoinOpen(false), []);

  const value = useMemo(
    () => ({ openJoin, closeJoin, joinOpen }),
    [openJoin, closeJoin, joinOpen]
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      <JoinModal open={joinOpen} onClose={closeJoin} />
    </Ctx.Provider>
  );
}

export function useJoin() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useJoin must be used within JoinProvider");
  return ctx;
}
