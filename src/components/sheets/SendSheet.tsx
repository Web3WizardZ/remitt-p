"use client";

import React, { useMemo, useState } from "react";
import { prepareTransaction, sendTransaction } from "thirdweb";
import { toWei } from "thirdweb/utils";
import { getContract } from "thirdweb";
import { transfer } from "thirdweb/extensions/erc20";
import { appChain, thirdwebClient } from "@/lib/thirdweb";
import type { AppToken } from "@/lib/tokens";

export function SendSheet({
  account,
  tokens,
}: {
  account: any; // Panna account object (thirdweb Account-compatible)
  tokens: AppToken[];
}) {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [asset, setAsset] = useState<string>("__NATIVE__");
  const [busy, setBusy] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selected = useMemo(() => {
    if (asset === "__NATIVE__") return null;
    return tokens.find((t) => t.address?.toLowerCase() === asset.toLowerCase()) ?? null;
  }, [asset, tokens]);

  async function onSend() {
    setError(null);
    setTxHash(null);

    if (!account?.address) return setError("Please sign in first.");
    if (!to || !to.startsWith("0x") || to.length < 10) return setError("Enter a valid recipient address.");
    if (!amount || Number(amount) <= 0) return setError("Enter a valid amount.");

    setBusy(true);
    try {
      // Native send (no wallet UI)
      if (!selected?.address) {
        const tx = prepareTransaction({
          client: thirdwebClient,
          chain: appChain,
          to,
          value: toWei(amount),
        });

        const res = await sendTransaction({ transaction: tx, account });
        setTxHash(res.transactionHash);
        return;
      }

      // ERC20 send (no wallet UI)
      const contract = getContract({
        client: thirdwebClient,
        chain: appChain,
        address: selected.address,
      });

      const tx = transfer({
        contract,
        to,
        amount, // string is supported in examples
      });

      const res = await sendTransaction({ transaction: tx, account });
      setTxHash(res.transactionHash);
    } catch (e: any) {
      setError(e?.message ?? "Send failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <label className="text-xs text-white/70">Asset</label>
        <select
          value={asset}
          onChange={(e) => setAsset(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none"
        >
          <option value="__NATIVE__">Native</option>
          {tokens
            .filter((t) => t.address)
            .map((t) => (
              <option key={t.address} value={t.address}>
                {t.symbol}
              </option>
            ))}
        </select>
      </div>

      <div className="space-y-1">
        <label className="text-xs text-white/70">Recipient</label>
        <input
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="0x..."
          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs text-white/70">Amount</label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none"
        />
      </div>

      <button
        disabled={busy}
        onClick={onSend}
        className="w-full rounded-2xl bg-[linear-gradient(90deg,rgba(255,0,199,0.9),rgba(120,0,255,0.9))] px-4 py-3 text-sm font-semibold disabled:opacity-60"
      >
        {busy ? "Sending…" : "Send"}
      </button>

      {error && <div className="text-xs text-red-300">{error}</div>}
      {txHash && (
        <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs">
          <div className="text-white/70">Transaction sent</div>
          <div className="mt-1 break-all text-white">{txHash}</div>
        </div>
      )}
    </div>
  );
}
