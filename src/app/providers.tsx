// src/app/providers.tsx
"use client";

import React from "react";
import { PannaProvider } from "panna-sdk/react";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

function ProviderMisconfigured() {
  return (
    <div style={{ padding: 16, color: "white" }}>
      <div style={{ fontWeight: 700, marginBottom: 8 }}>RemittEase config missing</div>
      <div style={{ opacity: 0.8, lineHeight: 1.4 }}>
        NEXT_PUBLIC_CLIENT_ID / NEXT_PUBLIC_PARTNER_ID are not set for this build.
        <br />
        Set them in Vercel (Production) and redeploy.
      </div>
    </div>
  );
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  const partnerId = process.env.NEXT_PUBLIC_PARTNER_ID;
  const chainId = String(process.env.NEXT_PUBLIC_CHAIN_ID ?? "1135"); // Lisk mainnet default:contentReference[oaicite:3]{index=3}

  if (!clientId || !partnerId) return <ProviderMisconfigured />;

  return (
    <PannaProvider
      clientId={clientId} // Thirdweb client ID:contentReference[oaicite:4]{index=4}
      partnerId={partnerId} // Lisk partner id:contentReference[oaicite:5]{index=5}
      chainId={chainId} // '1135' mainnet, '4202' testnet:contentReference[oaicite:6]{index=6}
      queryClient={queryClient} // optional but supported:contentReference[oaicite:7]{index=7}
      onError={(error) => {
        console.error("[PannaProvider]", error);
      }}
      errorFallback={(error) => (
        <div style={{ padding: 16, color: "white" }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Sign-in unavailable</div>
          <div style={{ opacity: 0.8, lineHeight: 1.4 }}>
            {String(error?.message ?? error)}
            <br />
            This is usually an allowed-domain / environment mismatch.
          </div>
        </div>
      )}
    >
      {children}
    </PannaProvider>
  );
}
