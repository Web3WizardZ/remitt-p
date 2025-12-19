"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ConnectButton, usePanna } from "panna-sdk/react";

// If your build uses `panna-sdk/react`, switch import accordingly.

type Sheet = "deposit" | "send" | "receive" | "assets" | "transactions" | "manage" | null;

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
      {children}
    </div>
  );
}

function ActionBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex-1 rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm font-medium active:scale-[0.99]"
    >
      {label}
    </button>
  );
}

export default function AccountPage() {
  const panna = usePanna() as any;
  const authed = Boolean(panna?.account);
  const [sheet, setSheet] = useState<Sheet>(null);

  const displayName = useMemo(() => {
    // adapt if panna provides profile details
    return "Account";
  }, []);

  return (
    <main className="min-h-screen px-4 pb-24 pt-6 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 grid place-items-center">
            <Image src="/RE icon.png" alt="RemittEase" width={34} height={34} priority />
          </div>
          <div>
            <div className="text-sm text-white/60">RemittEase</div>
            <div className="text-base font-semibold">{displayName}</div>
          </div>
        </div>

        {/* Keep Panna UI minimal – only use it for auth/account */}
        <div className="shrink-0">
          <ConnectButton connectButton={{ title: "Sign in / Create account" }} />

        </div>
      </div>

      {/* Main card */}
      <div className="mt-5">
        <Card>
          <div className="p-5">
            <div className="text-white/60 text-sm">Available balance</div>
            <div className="mt-1 text-4xl font-semibold tracking-tight">$0.00</div>
            <div className="mt-1 text-white/50 text-sm">~ 0.00 USD</div>

            <div className="mt-5 flex gap-3">
              <ActionBtn label="Deposit" onClick={() => setSheet("deposit")} />
              <ActionBtn label="Send" onClick={() => setSheet("send")} />
              <ActionBtn label="Receive" onClick={() => setSheet("receive")} />
            </div>
          </div>
        </Card>
      </div>

      {/* Shortcuts */}
      <div className="mt-5 space-y-3">
        <Card>
          <button onClick={() => setSheet("transactions")} className="w-full px-5 py-4 text-left">
            <div className="text-sm font-medium">Transactions</div>
            <div className="text-xs text-white/60 mt-1">View recent activity</div>
          </button>
        </Card>

        <Card>
          <button onClick={() => setSheet("assets")} className="w-full px-5 py-4 text-left">
            <div className="text-sm font-medium">View assets</div>
            <div className="text-xs text-white/60 mt-1">Balances across currencies</div>
          </button>
        </Card>

        <Card>
          <button onClick={() => setSheet("manage")} className="w-full px-5 py-4 text-left">
            <div className="text-sm font-medium">Manage account</div>
            <div className="text-xs text-white/60 mt-1">Security, sessions, preferences</div>
          </button>
        </Card>

        {authed && (
          <Card>
            <button
              onClick={async () => {
                // depends on panna API; adjust to your existing working disconnect
                await panna?.disconnect?.();
              }}
              className="w-full px-5 py-4 text-left"
            >
              <div className="text-sm font-medium text-red-200">Disconnect</div>
              <div className="text-xs text-white/60 mt-1">Sign out of RemittEase</div>
            </button>
          </Card>
        )}
      </div>

      {/* Minimal “sheets” – replace with your styled bottom sheets */}
      {sheet && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={() => setSheet(null)}>
          <div
            className="absolute bottom-0 left-0 right-0 rounded-t-3xl border-t border-white/10 bg-[#0b0b12] p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-sm text-white/60">
              {sheet === "deposit" && "Deposit"}
              {sheet === "send" && "Send"}
              {sheet === "receive" && "Receive"}
              {sheet === "assets" && "Assets"}
              {sheet === "transactions" && "Transactions"}
              {sheet === "manage" && "Manage account"}
            </div>

            <div className="mt-3 text-white/80 text-sm">
              Next step: wire this sheet to *headless* Panna actions (below).
            </div>

            <button
              className="mt-5 w-full rounded-2xl py-3 font-medium bg-gradient-to-r from-indigo-500 to-pink-500"
              onClick={() => setSheet(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
