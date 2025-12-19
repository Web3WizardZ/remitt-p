"use client";

import React from "react";
import { PannaProvider } from "panna-sdk/react";

export function Providers({ children }: { children: React.ReactNode }) {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID!;
  const partnerId = process.env.NEXT_PUBLIC_PARTNER_ID!;
  const chainId = process.env.NEXT_PUBLIC_CHAIN_ID ?? "4202";

  if (!clientId || !partnerId) {
    throw new Error("Missing NEXT_PUBLIC_CLIENT_ID or NEXT_PUBLIC_PARTNER_ID");
  }

  return (
    <PannaProvider clientId={clientId} partnerId={partnerId} chainId={chainId}>
      {children}
    </PannaProvider>
  );
}
