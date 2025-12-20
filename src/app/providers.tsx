// src/app/providers.tsx
"use client";

import React from "react";
import { PannaProvider } from "panna-sdk/react"; // or "panna-sdk/react" depending on their exports in your beta

export default function Providers({ children }: { children: React.ReactNode }) {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID!;
  const partnerId = process.env.NEXT_PUBLIC_PARTNER_ID!;
  const chainId = String(process.env.NEXT_PUBLIC_CHAIN_ID || "1135");

  return (
    <PannaProvider clientId={clientId} partnerId={partnerId} chainId={chainId}>
      {children}
    </PannaProvider>
  );
}
