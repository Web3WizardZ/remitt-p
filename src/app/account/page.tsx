"use client";

import Image from "next/image";
import { useRef } from "react";
import { ConnectButton, usePanna } from "panna-sdk/react";

export default function AccountPage() {
  const panna = usePanna() as any;
  const isAuthed = Boolean(panna?.account);

  // We render Panna's ConnectButton, but keep it visually hidden.
  // Our RemittEase button programmatically clicks it, so we never show "Connect wallet" copy.
  const hiddenConnectRef = useRef<HTMLDivElement | null>(null);

  const openPannaAuth = () => {
    const btn =
      hiddenConnectRef.current?.querySelector("button") ??
      hiddenConnectRef.current?.querySelector('[role="button"]');

    if (btn instanceof HTMLElement) btn.click();
  };

  return (
    <main className="min-h-dvh bg-black text-white">
      <div className="mx-auto w-full max-w-md px-5 py-10">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Image
            src="/RE%20icon.png"
            alt="RemittEase"
            width={44}
            height={44}
            priority
            className="rounded-xl"
          />
          <div>
            <div className="text-lg font-semibold tracking-tight">RemittEase</div>
            <div className="text-sm text-white/60">
              Send money globally with ease
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset]">
          {!isAuthed ? (
            <>
              <h1 className="text-xl font-semibold tracking-tight">
                Sign in to continue
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Create your RemittEase account or sign in using Google, email, or your
                phone number.
              </p>

              <button
                onClick={openPannaAuth}
                className="mt-5 w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:opacity-90 active:opacity-80"
              >
                Sign in / Create account
              </button>

              <p className="mt-3 text-center text-xs text-white/50">
                By continuing, you agree to our Terms & Privacy Policy.
              </p>

              {/* Hidden Panna auth UI (still powers the flow) */}
              <div ref={hiddenConnectRef} className="sr-only">
                <ConnectButton />
              </div>
            </>
          ) : (
            <>
              <h1 className="text-xl font-semibold tracking-tight">Your account</h1>

              <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-4">
                <div className="text-xs text-white/50">Signed in as</div>
                <div className="mt-1 break-all text-sm text-white/90">
                  {panna?.account?.address ?? "—"}
                </div>
              </div>

              <div className="mt-4 text-sm text-white/70">
                You’re signed in. You can now send money, view activity, and manage your
                profile.
              </div>

              {/* Optional: keep ConnectButton available (hidden) for account management flows */}
              <div className="sr-only">
                <ConnectButton />
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
