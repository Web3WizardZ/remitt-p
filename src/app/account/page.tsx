"use client";

import Image from "next/image";
import { ConnectButton } from "panna-sdk/react";
import {
  useActiveAccount,
  useActiveWallet,
  useLogout,
  useTokenBalances,
  usePanna,
  useActivities,
} from "panna-sdk/react";
import { chain as pannaChain } from "panna-sdk/core";

export default function AccountPage() {
  const account = useActiveAccount();
  const wallet = useActiveWallet();
  const { disconnect } = useLogout();
  const { client, chainId } = usePanna();

  const address = account?.address ?? "";
  const { data: balances = [], isLoading: balancesLoading } = useTokenBalances(
    { address },
    { enabled: Boolean(account?.address) }
  );

  const envChain = chainId === "4202" ? pannaChain.liskSepolia : pannaChain.lisk;

  const { data: activities } = useActivities(
    { address, client, chain: envChain, limit: 10, offset: 0 },
    { enabled: Boolean(account?.address && client) }
  );

  const totalFiat =
    balances?.reduce((sum, b) => sum + (b.fiatBalance?.amount ?? 0), 0) ?? 0;

  return (
    <main className="min-h-dvh">
      <div className="mx-auto max-w-md px-5 pt-10 pb-14">
        <header className="flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-xl">
            <Image
              src="/RE%20icon.png"
              alt="RemittEase"
              width={40}
              height={40}
              priority
            />
          </div>
          <div>
            <p className="text-sm text-white/60">RemittEase</p>
            <h1 className="text-xl font-semibold tracking-tight text-white">
              Account
            </h1>
          </div>
        </header>

        {!account ? (
          <section className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-white/70">
              Create your RemittEase account or sign in to send money globally.
            </p>

            <div className="mt-4">
              <ConnectButton connectButton={{ title: "Sign in / Create account" }} />
            </div>

            <p className="mt-3 text-xs text-white/50">
              By continuing, you agree to our Terms & Privacy Policy.
            </p>
          </section>
        ) : (
          <>
            <section className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs text-white/50">Estimated balance</p>
                  <p className="mt-1 text-2xl font-semibold text-white">
                    ${totalFiat.toFixed(2)}
                  </p>
                  <p className="mt-1 text-xs text-white/50 break-all">{address}</p>
                </div>

                <button
                  className="rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/15"
                  onClick={() => wallet && disconnect(wallet)}
                >
                  Sign out
                </button>
              </div>
            </section>

            <section className="mt-4 grid grid-cols-3 gap-3">
              <button className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-white">
                Send
              </button>
              <button className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-white">
                Receive
              </button>
              <button className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-white">
                Deposit
              </button>
            </section>

            <section className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-white">Balances</h2>
                {balancesLoading ? (
                  <span className="text-xs text-white/50">Loading…</span>
                ) : null}
              </div>

              <div className="mt-3 space-y-2">
                {balances.map((b) => (
                  <div
                    key={`${b.token?.symbol}-${b.token?.address}`}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-black/10 px-3 py-2"
                  >
                    <div className="min-w-0">
                      <p className="text-sm text-white">{b.token?.symbol}</p>
                      <p className="text-xs text-white/50 truncate">
                        {b.token?.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-white">
                        {b.tokenBalance?.displayValue} {b.token?.symbol}
                      </p>
                      <p className="text-xs text-white/50">
                        ${Number(b.fiatBalance?.amount ?? 0).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <h2 className="text-sm font-semibold text-white">Recent activity</h2>
              <div className="mt-3 space-y-2">
                {(activities?.activities ?? []).slice(0, 6).map((a: any, idx: number) => (
                  <div
                    key={a?.hash ?? idx}
                    className="rounded-xl border border-white/10 bg-black/10 px-3 py-2"
                  >
                    <p className="text-xs text-white/70 break-all">
                      {a?.hash ?? "Activity"}
                    </p>
                  </div>
                ))}
                {!activities?.activities?.length ? (
                  <p className="text-xs text-white/50">No activity yet.</p>
                ) : null}
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
