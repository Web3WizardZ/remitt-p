"use client";

import { useEffect, useMemo, useState } from "react";
import { getWalletBalance } from "thirdweb/wallets";
import { getContract } from "thirdweb";
import { getBalance as getErc20Balance } from "thirdweb/extensions/erc20";
import { appChain, thirdwebClient } from "@/lib/thirdweb";
import type { AppToken } from "@/lib/tokens";

export type BalanceRow = {
  symbol: string;
  name: string;
  displayValue: string;
  address?: string;
};

export function useBalances(address?: string, tokens?: AppToken[]) {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<BalanceRow[]>([]);
  const safeTokens = useMemo(() => tokens ?? [], [tokens]);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!address) {
        setRows([]);
        return;
      }
      setLoading(true);

      try {
        const native = await getWalletBalance({
          address,
          client: thirdwebClient,
          chain: appChain,
        });

        const erc20Rows: BalanceRow[] = [];
        for (const t of safeTokens) {
          if (!t.address) continue;
          const contract = getContract({
            client: thirdwebClient,
            chain: appChain,
            address: t.address,
          });

          const b = await getErc20Balance({ contract, address });
          erc20Rows.push({
            symbol: b.symbol,
            name: b.name,
            displayValue: b.displayValue,
            address: t.address,
          });
        }

        if (!cancelled) {
          setRows([
            {
              symbol: native.symbol,
              name: native.name ?? "Native",
              displayValue: native.displayValue,
            },
            ...erc20Rows,
          ]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [address, safeTokens]);

  return { loading, rows };
}
