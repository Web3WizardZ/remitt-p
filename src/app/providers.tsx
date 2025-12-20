"use client";

import type { ReactNode } from "react";
import { PannaProvider } from "panna-sdk/react";

export default function Providers({ children }: { children: ReactNode }) {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID!;
  const partnerId = process.env.NEXT_PUBLIC_PARTNER_ID!;
  const chainId = process.env.NEXT_PUBLIC_CHAIN_ID ?? "1135"; // ✅ string

  return (
    <PannaProvider clientId={clientId} partnerId={partnerId} chainId={chainId}>
      {children}
    </PannaProvider>
  );
}
