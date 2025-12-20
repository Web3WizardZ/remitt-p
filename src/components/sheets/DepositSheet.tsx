"use client";

import React from "react";

export function DepositSheet({
  address,
  onFiat,
}: {
  address?: string;
  onFiat: () => void;
}) {
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
        <div className="text-xs text-white/60">Crypto deposit</div>
        <div className="mt-1 text-sm text-white/80">
          Send supported assets to your RemittEase deposit address.
        </div>
        <div className="mt-2 break-all text-xs">{address ?? "Sign in to view your address."}</div>
      </div>

      <button
        onClick={onFiat}
        className="w-full rounded-2xl bg-[linear-gradient(90deg,rgba(0,255,255,0.25),rgba(255,0,199,0.25))] px-4 py-3 text-sm font-semibold"
      >
        Deposit with card / bank (Fiat)
      </button>

      <div className="text-[11px] text-white/55">
        Fiat deposit uses Panna’s onramp flow, but we trigger it from RemittEase.
      </div>
    </div>
  );
}
