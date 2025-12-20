"use client";

import React, { useState } from "react";

export function ReceiveSheet({ address }: { address?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    if (!address) return;
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="space-y-3">
      <div className="text-sm text-white/80">
        Share this address to receive funds.
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
        <div className="text-xs text-white/60">Your address</div>
        <div className="mt-1 break-all text-sm">{address ?? "Sign in to view your address."}</div>
      </div>

      <button
        onClick={copy}
        disabled={!address}
        className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold disabled:opacity-60"
      >
        {copied ? "Copied" : "Copy address"}
      </button>
    </div>
  );
}
