"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => router.replace("/account"), 900);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <main className="min-h-screen grid place-items-center px-6">
      <div className="flex flex-col items-center text-center">
        <div className="h-16 w-16 rounded-2xl bg-white/5 border border-white/10 grid place-items-center">
          <Image src="/RE icon.png" alt="RemittEase" width={44} height={44} priority />
        </div>

        <h1 className="mt-5 text-2xl font-semibold tracking-tight">RemittEase</h1>
        <p className="mt-2 text-white/70 text-sm max-w-xs">
          Send money globally with ease.
        </p>

        <div className="mt-6 h-1 w-40 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full w-1/2 animate-pulse bg-gradient-to-r from-indigo-500 to-pink-500" />
        </div>
      </div>
    </main>
  );
}
