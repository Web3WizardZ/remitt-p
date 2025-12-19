"use client";

import Image from "next/image";
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
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 h-20 w-20 rounded-3xl bg-white/5 ring-1 ring-white/10 grid place-items-center overflow-hidden">
            {/* If filename has a space, encode it */}
            <Image
              src="/RE%20icon.png"
              alt="RemittEase"
              width={80}
              height={80}
              priority
            />
          </div>

          <div className="text-3xl font-extrabold tracking-tight">RemittEase</div>
          <div className="mt-2 text-sm text-white/60">
            Sign in to continue — Google, email, or phone.
          </div>
        </div>

        {/* Card */}
        <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-5 backdrop-blur">
          {/* We keep Panna’s auth features, but control the wording */}
          <div className="re-connect">
            <ConnectButton connectButton={{ title: "Sign in / Create account" }} />
          </div>

          <p className="mt-4 text-xs text-white/50 text-center">
            RemittEase is a payments app — you’re creating an account, not “connecting a wallet”.
          </p>
        </div>
      </div>
    </main>
  );
}
