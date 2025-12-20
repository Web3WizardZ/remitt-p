"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePanna } from "panna-sdk/react";

export default function Home() {
  const router = useRouter();
  const panna = usePanna() as any;
  const authed = Boolean(panna?.account);

  useEffect(() => {
    if (!authed) router.replace("/account");
  }, [authed, router]);

  // While redirecting
  if (!authed) return null;

  return (
    <div className="min-h-dvh px-5 py-10">
      <div className="mx-auto max-w-md">
        <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-6">
          <div className="text-xl font-semibold">RemittEase</div>
          <div className="mt-2 text-sm text-white/60">Signed in ✅</div>
        </div>
      </div>
    </div>
  );
}
