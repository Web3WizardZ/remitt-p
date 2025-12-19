"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    // Give the SDK a moment to finalize session, then go home
    const t = setTimeout(() => router.replace("/"), 250);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <main className="min-h-dvh px-5 py-10 flex items-center justify-center">
      <div className="w-full max-w-md rounded-3xl bg-white/5 ring-1 ring-white/10 p-6 text-center">
        <div className="text-lg font-semibold">Signing you in…</div>
        <div className="mt-2 text-sm text-white/60">Please wait a moment.</div>
      </div>
    </main>
  );
}
