"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { BrandBackground }  from "@/components/BrandBackground";
import { BottomSheet } from "@/components/sheets/BottomSheet";
import { SendSheet } from "@/components/sheets/SendSheet";
import { ReceiveSheet } from "@/components/sheets/ReceiveSheet";
import { DepositSheet } from "@/components/sheets/DepositSheet";
import { FALLBACK_TOKENS } from "@/lib/tokens";
import { useBalances } from "@/lib/useBalances";

// IMPORTANT: these come from panna-sdk/react (not panna-sdk)
import { ConnectButton, usePanna } from "panna-sdk/react";

function shortAddr(a?: string) {
  if (!a) return "";
  return `${a.slice(0, 6)}…${a.slice(-4)}`;
}

export default function AccountPage() {
  const panna = usePanna() as any;
  const account = panna?.account;
  const address: string | undefined = account?.address;
  const authed = Boolean(address);

  // Prefer tokens from Panna if it exposes them at runtime; otherwise fallback.
  const tokens = useMemo(() => {
    const pannaTokens = panna?.consts?.tokens;
    if (Array.isArray(pannaTokens) && pannaTokens.length) {
      // Normalize shape: { symbol, name, address }
      return pannaTokens
        .map((t: any) => ({
          symbol: t?.symbol ?? t?.ticker ?? "TOKEN",
          name: t?.name ?? t?.symbol ?? "Token",
          address: t?.address,
        }))
        .filter((t: any) => t.symbol);
    }
    return FALLBACK_TOKENS;
  }, [panna]);

  const { loading, rows } = useBalances(address, tokens);

  const [sheet, setSheet] = useState<null | "send" | "receive" | "deposit" | "assets" | "manage">(null);

  async function signOut() {
    // Best-effort across versions
    const fn =
      panna?.disconnect ??
      panna?.logout ??
      panna?.signOut ??
      panna?.wallet?.disconnect ??
      null;

    if (typeof fn === "function") await fn();
  }

  function openFiatDeposit() {
    // If Panna exposes a headless onramp trigger, call it here.
    // For now we try common shapes; fallback is a no-op.
    const open =
      panna?.onramp?.open ??
      panna?.onRamp?.open ??
      panna?.fiat?.deposit ??
      null;

    if (typeof open === "function") open();
    else alert("Fiat deposit trigger not wired yet — share the Panna onramp method name and I’ll connect it cleanly.");
  }

  return (
    <BrandBackground>
      <div className="mx-auto w-full max-w-md px-4 pb-10 pt-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/re-icon.png" alt="RemittEase" width={36} height={36} className="rounded-xl" />
            <div>
              <div className="text-sm font-semibold">RemittEase</div>
              <div className="text-[11px] text-white/65">Send money globally with ease</div>
            </div>
          </div>

          {authed ? (
            <button
              onClick={signOut}
              className="rounded-2xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white/85"
            >
              Sign out
            </button>
          ) : (
            <div className="rounded-2xl border border-white/15 bg-white/5 px-2 py-1">
              <ConnectButton connectButton={{ title: "Sign in / Create account" }} />
            </div>
          )}
        </div>

        {/* Status */}
        <div className="mt-5 rounded-3xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs text-white/60">{authed ? "Signed in" : "Not signed in"}</div>
              <div className="mt-1 text-sm font-semibold">
                {authed ? shortAddr(address) : "Create your RemittEase account to continue"}
              </div>
            </div>
            {authed && (
              <div className="text-right">
                <div className="text-xs text-white/60">Available</div>
                <div className="mt-1 text-lg font-semibold">
                  {loading ? "…" : rows?.[0]?.displayValue ?? "0"}
                  <span className="ml-1 text-xs text-white/70">{rows?.[0]?.symbol ?? ""}</span>
                </div>
              </div>
            )}
          </div>

          {!authed && (
            <div className="mt-3 rounded-2xl border border-white/10 bg-black/20 p-3">
              <div className="text-xs text-white/70">
                Use Google / phone / email sign-up inside the RemittEase flow.
              </div>
              <div className="mt-2 rounded-2xl border border-white/15 bg-white/5 px-2 py-1">
                <ConnectButton connectButton={{ title: "Sign in / Create account" }} />
              </div>
            </div>
          )}
        </div>

        {/* Primary actions */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          <button
            onClick={() => setSheet("send")}
            disabled={!authed}
            className="rounded-3xl border border-white/10 bg-white/5 p-3 text-left disabled:opacity-50"
          >
            <div className="text-xs text-white/60">Send</div>
            <div className="mt-1 text-sm font-semibold">Money</div>
          </button>

          <button
            onClick={() => setSheet("receive")}
            disabled={!authed}
            className="rounded-3xl border border-white/10 bg-white/5 p-3 text-left disabled:opacity-50"
          >
            <div className="text-xs text-white/60">Receive</div>
            <div className="mt-1 text-sm font-semibold">Funds</div>
          </button>

          <button
            onClick={() => setSheet("deposit")}
            disabled={!authed}
            className="rounded-3xl border border-white/10 bg-white/5 p-3 text-left disabled:opacity-50"
          >
            <div className="text-xs text-white/60">Deposit</div>
            <div className="mt-1 text-sm font-semibold">Top up</div>
          </button>
        </div>

        {/* Secondary */}
        <div className="mt-4 space-y-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-white/60">Assets</div>
                <div className="mt-1 text-sm font-semibold">View balances</div>
              </div>
              <button
                onClick={() => setSheet("assets")}
                disabled={!authed}
                className="rounded-2xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold disabled:opacity-50"
              >
                Open
              </button>
            </div>

            {authed && (
              <div className="mt-3 space-y-2">
                {(rows ?? []).slice(0, 3).map((r) => (
                  <div key={`${r.symbol}-${r.address ?? "native"}`} className="flex items-center justify-between text-sm">
                    <div className="text-white/85">{r.symbol}</div>
                    <div className="text-white/70">{r.displayValue}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-white/60">Account</div>
                <div className="mt-1 text-sm font-semibold">Manage & security</div>
              </div>
              <button
                onClick={() => setSheet("manage")}
                disabled={!authed}
                className="rounded-2xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold disabled:opacity-50"
              >
                Open
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sheets */}
      <BottomSheet open={sheet === "send"} title="Send money" onClose={() => setSheet(null)}>
        <SendSheet account={account} tokens={tokens} />
      </BottomSheet>

      <BottomSheet open={sheet === "receive"} title="Receive funds" onClose={() => setSheet(null)}>
        <ReceiveSheet address={address} />
      </BottomSheet>

      <BottomSheet open={sheet === "deposit"} title="Deposit" onClose={() => setSheet(null)}>
        <DepositSheet address={address} onFiat={openFiatDeposit} />
      </BottomSheet>

      <BottomSheet open={sheet === "assets"} title="Your assets" onClose={() => setSheet(null)}>
        <div className="space-y-2">
          {(rows ?? []).map((r) => (
            <div
              key={`${r.symbol}-${r.address ?? "native"}`}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2"
            >
              <div>
                <div className="text-sm font-semibold">{r.symbol}</div>
                <div className="text-[11px] text-white/60">{r.name}</div>
              </div>
              <div className="text-sm text-white/80">{r.displayValue}</div>
            </div>
          ))}
        </div>
      </BottomSheet>

      <BottomSheet open={sheet === "manage"} title="Manage account" onClose={() => setSheet(null)}>
        <div className="space-y-2">
          <button
            onClick={signOut}
            className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold"
          >
            Sign out
          </button>
          <div className="text-[11px] text-white/55">
            We keep RemittEase branding first. If we need any Panna UI for deep settings, we’ll theme it next.
          </div>
        </div>
      </BottomSheet>
    </BrandBackground>
  );
}
