"use client";

import { useMemo, useState } from "react";
import { prepareTransaction, sendTransaction, toWei } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";

import { thirdwebClient } from "@/lib/thirdweb/client";
import { lisk } from "@/lib/thirdweb/chains";

export default function SendSheet() {
  const account = useActiveAccount();
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  const canSend = useMemo(() => {
    if (!account) return false;
    if (!to || to.length < 10) return false;
    const n = Number(amount);
    return Number.isFinite(n) && n > 0;
  }, [account, to, amount]);

  async function onSend() {
    try {
      setError(null);
      setTxHash(null);

      if (!account) throw new Error("Please sign in first.");
      if (!canSend) throw new Error("Enter a valid recipient and amount.");

      setIsSending(true);

      const tx = prepareTransaction({
        client: thirdwebClient,
        chain: lisk,
        to,
        value: toWei(amount), // amount as string -> bigint
      });

      const result = await sendTransaction({
        account,
        transaction: tx,
      });

      setTxHash(result.transactionHash);
    } catch (e: any) {
      setError(e?.message ?? "Failed to send.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Send</h2>

      <div className="mt-4 space-y-3">
        <div>
          <label className="text-sm opacity-80">Recipient</label>
          <input
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="0x..."
            className="mt-1 w-full rounded-xl bg-white/5 px-3 py-2 outline-none"
          />
        </div>

        <div>
          <label className="text-sm opacity-80">Amount</label>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.01"
            className="mt-1 w-full rounded-xl bg-white/5 px-3 py-2 outline-none"
          />
        </div>

        <button
          onClick={onSend}
          disabled={!canSend || isSending}
          className="w-full rounded-xl bg-white text-black py-2 font-medium disabled:opacity-50"
        >
          {isSending ? "Sending..." : "Send"}
        </button>

        {error && <p className="text-sm text-red-400">{error}</p>}
        {txHash && (
          <p className="text-sm opacity-80 break-all">Tx: {txHash}</p>
        )}
      </div>
    </div>
  );
}
