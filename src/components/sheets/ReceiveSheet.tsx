"use client";

import React from "react";
import { usePanna } from "panna-sdk/react";
import { BottomSheet } from "./BottomSheet";

export function ReceiveSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panna = usePanna() as any;
  const address = panna?.account?.address as string | undefined;

  return (
    <BottomSheet open={open} onClose={onClose} title="Receive">
      <div className="space-y-3">
        <div className="text-sm text-white/70">
          Share this address to receive funds.
        </div>

        <div className="rounded-2xl bg-white/5 p-3 text-sm text-white ring-1 ring-white/10">
          {address ?? "Sign in to view your address"}
        </div>

        <button
          onClick={() => address && navigator.clipboard.writeText(address)}
          disabled={!address}
          className="w-full rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
        >
          Copy address
        </button>
      </div>
    </BottomSheet>
  );
}
