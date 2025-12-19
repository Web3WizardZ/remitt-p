"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ConnectButton, usePanna } from "panna-sdk/react";

export default function AccountPage() {
  const router = useRouter();
  const panna = usePanna() as any;
  const authed = Boolean(panna?.account);

  useEffect(() => {
    if (authed) router.replace("/");
  }, [authed, router]);

  return (
    <main className="min-h-dvh px-5 py-10 flex items-center justify-center">
      <div className="w-full max-w-[420px]">
        {/* RemittEase branded hero */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 h-20 w-20 rounded-3xl bg-white/5 ring-1 ring-white/10 grid place-items-center">
            {/* simple lock icon */}
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" className="opacity-90">
              <path
                d="M7 11V8a5 5 0 0 1 10 0v3"
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M6.5 11h11A2.5 2.5 0 0 1 20 13.5v5A2.5 2.5 0 0 1 17.5 21h-11A2.5 2.5 0 0 1 4 18.5v-5A2.5 2.5 0 0 1 6.5 11Z"
                stroke="white"
                strokeWidth="1.6"
              />
            </svg>
          </div>

          <div className="text-3xl font-extrabold tracking-tight">
            RemittEase
          </div>
          <div className="mt-2 text-sm text-white/60">
            Sign up with Google, phone, or email — no external wallet required.
          </div>
        </div>

        {/* Card */}
        <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-5 backdrop-blur">
          {/* This is the key: Panna’s auth UI + flows */}
          <ConnectButton />

          <div className="mt-4 text-xs text-white/50 text-center">
            By continuing you agree to RemittEase Terms & Privacy.
          </div>
        </div>
      </div>
    </main>
  );
}
