"use client";

import React, { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui";
import { getAccount } from "@/lib/panna";

export default function AuthCallback() {
  const router = useRouter();
  const account = useMemo(() => getAccount(), []);

  useEffect(() => {
    // Panna docs indicate the account will be authenticated after redirect; check and move on. 
    const t = setTimeout(() => router.replace("/app"), 300);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <main className="min-h-screen px-4 py-10 flex items-center justify-center">
      <Card title="Signing you in…" subtitle={account.address ? `Wallet: ${account.address}` : "Finalizing authentication"}>
        <div className="text-sm text-[rgb(var(--re-muted))]">Please wait a moment.</div>
      </Card>
    </main>
  );
}
