// src/app/providers.tsx
"use client";

import React from "react";
import { PannaProvider } from "panna-sdk/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PannaProvider
      clientId={process.env.NEXT_PUBLIC_CLIENT_ID ?? ""}
      partnerId={process.env.NEXT_PUBLIC_PARTNER_ID ?? ""}
      chainId={process.env.NEXT_PUBLIC_CHAIN_ID ?? "1135"} // default in docs:contentReference[oaicite:7]{index=7}
    >
      {children}
    </PannaProvider>
  );
}
