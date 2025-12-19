"use client";

import React, { createContext, useContext, useMemo } from "react";
import type { client as ClientTypes } from "panna-sdk";
import { getPannaClient } from "@/lib/panna";

const Ctx = createContext<ClientTypes.PannaClient | null>(null);

export function PannaProvider({ children }: { children: React.ReactNode }) {
  const pannaClient = useMemo(() => getPannaClient(), []);
  return <Ctx.Provider value={pannaClient}>{children}</Ctx.Provider>;
}

export function usePannaClient() {
  const v = useContext(Ctx);
  if (!v) throw new Error("usePannaClient must be used inside <PannaProvider />");
  return v;
}
