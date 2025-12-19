"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePanna } from "panna-sdk/react";
import { transaction } from "panna-sdk/core";
import { pannaClient } from "@/lib/panna";

export default function SendPage() {
  const router = useRouter();
  const panna = usePanna() as any;

  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!panna?.account) router.replace("/auth");
  }, [panna?.account, router]);

  async function onSend() {
    setMsg(null);
    setLoading(true);
    try {
      // NOTE: tx shape depends on the SDK's transaction builder.
      // We’ll wire the exact tx object next (native token transfer / ERC-20).
      const tx = { to, value: amount } as any;

      const res = await transaction.sendTransaction({
        client: pannaClient as any,
        account: panna.account,
        transaction: tx,
      } as any);

      setMsg(`Sent! ${JSON.stringify(res)}`);
    } catch (e: any) {
      setMsg(e?.message ?? "Send failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-dvh px-4 py-8">
      <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <h1 className="text-xl font-extrabold">Send Money</h1>
        <p className="mt-1 text-sm text-[rgb(var(--re-muted))]">
          RemittEase interface, Panna settlement underneath.
        </p>

        <label className="block text-sm text-[rgb(var(--re-muted))] mt-5 mb-2">Recipient</label>
        <input
          className="w-full rounded-2xl bg-black/20 border border-white/10 px-4 py-3 outline-none focus:border-white/25"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="0x..."
        />

        <label className="block text-sm text-[rgb(var(--re-muted))] mt-4 mb-2">Amount</label>
        <input
          className="w-full rounded-2xl bg-black/20 border border-white/10 px-4 py-3 outline-none focus:border-white/25"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.10"
          inputMode="decimal"
        />

        {msg && <p className="mt-3 text-sm text-[rgb(var(--re-muted))] break-words">{msg}</p>}

        <button
          onClick={onSend}
          disabled={loading || !to || !amount}
          className="mt-5 w-full rounded-2xl px-4 py-3 text-sm font-semibold
                     bg-gradient-to-r from-[rgb(var(--re-primary))] to-[rgb(var(--re-accent))]
                     hover:opacity-95 disabled:opacity-60"
        >
          {loading ? "Sending…" : "Send"}
        </button>
      </div>
    </div>
  );
}
