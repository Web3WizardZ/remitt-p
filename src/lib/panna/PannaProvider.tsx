"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { createPublicClient, createWalletClient, custom, http, isAddress, parseEther } from "viem";
import { liskMainnet, liskSepolia } from "@/lib/chains/lisk";
import { getPannaClient } from "@/lib/panna/getPannaClient";

type TxResult = { hash: string };

type PannaCtx = {
  ready: boolean;
  address: string | null;
  chainId: number;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  sendNative: (to: string, amountEth: string) => Promise<TxResult>;
  explorerTxUrl: (hash: string) => string;
};

const Ctx = createContext<PannaCtx | null>(null);

function getTargetChain() {
  const id = Number(process.env.NEXT_PUBLIC_CHAIN_ID || 4202);
  return id === 1135 ? liskMainnet : liskSepolia;
}

export function PannaProvider({ children }: { children: React.ReactNode }) {
  const chain = useMemo(() => getTargetChain(), []);
  const [ready, setReady] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  // Viem fallback (MetaMask)
  const publicClient = useMemo(
    () => createPublicClient({ chain, transport: http(chain.rpcUrls.default.http[0]) }),
    [chain]
  );

  const walletClient = useMemo(() => {
    if (typeof window === "undefined" || !(window as any).ethereum) return null;
    return createWalletClient({ chain, transport: custom((window as any).ethereum) });
  }, [chain]);

  // Try to read address from Panna or MetaMask
  const refreshAddress = useCallback(async () => {
    try {
      const panna = await getPannaClient();

      const wallet =
        panna.wallet ??
        panna.Wallet ??
        panna.auth?.wallet ??
        panna.wallets?.primary ??
        panna.account;

      const addr =
        (typeof wallet?.getAddress === "function" && (await wallet.getAddress())) ||
        wallet?.address ||
        panna.address ||
        null;

      if (addr && typeof addr === "string") {
        setAddress(addr);
        return;
      }
    } catch {
      // ignore, fallback below
    }

    if (walletClient) {
      const addrs = await walletClient.getAddresses();
      setAddress(addrs?.[0] ?? null);
    }
  }, [walletClient]);

  useEffect(() => {
    (async () => {
      await refreshAddress();
      setReady(true);
    })();
  }, [refreshAddress]);

  const connect = useCallback(async () => {
    // 1) Prefer Panna connect (no Panna UI)
    try {
      const panna = await getPannaClient();
      const wallet =
        panna.wallet ??
        panna.Wallet ??
        panna.auth?.wallet ??
        panna.wallets?.primary ??
        panna.account;

      const connectFn =
        wallet?.connect ?? wallet?.login ?? wallet?.authenticate ?? panna.connect ?? panna.login;

      if (typeof connectFn === "function") {
        const res = await connectFn({ chainId: chain.id });
        const addr =
          (typeof wallet?.getAddress === "function" && (await wallet.getAddress())) ||
          res?.address ||
          wallet?.address ||
          panna.address;

        if (addr) setAddress(addr);
        return;
      }
    } catch {
      // ignore, fallback below
    }

    // 2) Fallback: MetaMask
    if (!walletClient) throw new Error("No wallet available (Panna connect failed and MetaMask not found).");
    const addrs = await walletClient.requestAddresses();
    setAddress(addrs?.[0] ?? null);
  }, [chain.id, walletClient]);

  const disconnect = useCallback(async () => {
    try {
      const panna = await getPannaClient();
      const wallet =
        panna.wallet ??
        panna.Wallet ??
        panna.auth?.wallet ??
        panna.wallets?.primary ??
        panna.account;

      const disconnectFn = wallet?.disconnect ?? panna.disconnect;
      if (typeof disconnectFn === "function") await disconnectFn();
    } finally {
      setAddress(null);
    }
  }, []);

  const sendNative = useCallback(
    async (to: string, amountEth: string): Promise<TxResult> => {
      if (!isAddress(to)) throw new Error("Invalid recipient address.");
      if (!address) throw new Error("Connect a wallet first.");

      // 1) Prefer Panna transaction module
      try {
        const panna = await getPannaClient();
        const tx =
          panna.transaction ??
          panna.Transaction ??
          panna.tx ??
          panna.transactions;

        const sendFn = tx?.send ?? tx?.sendTransaction ?? panna.sendTransaction;
        if (typeof sendFn === "function") {
          const res = await sendFn({
            to,
            value: parseEther(amountEth),
            chainId: chain.id,
          });
          const hash = res?.hash ?? res?.transactionHash ?? res;
          if (typeof hash === "string") return { hash };
        }
      } catch {
        // ignore, fallback below
      }

      // 2) Fallback: viem + MetaMask
      if (!walletClient) throw new Error("No wallet client available to send.");
      const hash = await walletClient.sendTransaction({
        account: address as `0x${string}`,
        to,
        value: parseEther(amountEth),
        chain,
      });
      return { hash };
    },
    [address, chain, walletClient]
  );

  const explorerTxUrl = useCallback(
    (hash: string) => `${chain.blockExplorers?.default.url}/tx/${hash}`,
    [chain]
  );

  const value: PannaCtx = useMemo(
    () => ({
      ready,
      address,
      chainId: chain.id,
      connect,
      disconnect,
      sendNative,
      explorerTxUrl,
    }),
    [ready, address, chain.id, connect, disconnect, sendNative, explorerTxUrl]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function usePanna() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("usePanna must be used inside <PannaProvider />");
  return ctx;
}
