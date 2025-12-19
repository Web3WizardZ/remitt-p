"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useConnect } from "thirdweb/react";
import { inAppWallet } from "thirdweb/wallets";
import { preAuthenticate } from "thirdweb/wallets/in-app";
import { twClient } from "@/lib/thirdweb";

type Mode = "idle" | "email" | "phone";

export default function AuthPage() {
  const router = useRouter();

  const { connect, isConnecting, error } = useConnect({ client: twClient });

  const partnerId = process.env.NEXT_PUBLIC_PARTNER_ID;

  const walletFactory = useMemo(
    () =>
      inAppWallet({
        partnerId, // important for Panna-style partner attribution
        auth: {
          mode: "popup",
          options: ["google", "email", "phone"],
        },
        metadata: {
          name: process.env.NEXT_PUBLIC_APP_NAME ?? "RemittEase",
        },
      }),
    [partnerId],
  );

  const [mode, setMode] = useState<Mode>("idle");

  // email
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [emailCodeSent, setEmailCodeSent] = useState(false);

  // phone
  const [phone, setPhone] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [phoneCodeSent, setPhoneCodeSent] = useState(false);

  const loginWithGoogle = async () => {
    await connect(async () => {
      await walletFactory.connect({ client: twClient, strategy: "google" });
      return walletFactory;
    });
    router.push("/");
  };

  const sendEmailCode = async () => {
    await preAuthenticate({
      client: twClient,
      strategy: "email",
      email,
    });
    setEmailCodeSent(true);
  };

  const verifyEmail = async () => {
    await connect(async () => {
      await walletFactory.connect({
        client: twClient,
        strategy: "email",
        email,
        verificationCode: emailCode,
      });
      return walletFactory;
    });
    router.push("/");
  };

  const sendPhoneCode = async () => {
    await preAuthenticate({
      client: twClient,
      strategy: "phone",
      phoneNumber: phone,
    });
    setPhoneCodeSent(true);
  };

  const verifyPhone = async () => {
    await connect(async () => {
      await walletFactory.connect({
        client: twClient,
        strategy: "phone",
        phoneNumber: phone,
        verificationCode: phoneCode,
      });
      return walletFactory;
    });
    router.push("/");
  };

  return (
    <div className="min-h-[100dvh] px-5 py-10">
      <div className="mx-auto w-full max-w-[420px]">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-white/10 ring-1 ring-white/10 grid place-items-center">
              <span className="font-black tracking-tight">RE</span>
            </div>
            <div>
              <div className="text-xl font-semibold leading-tight">RemittEase</div>
              <div className="text-sm text-white/60">Send money globally with ease</div>
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-3xl bg-[var(--card)] ring-1 ring-[var(--stroke)] p-5 backdrop-blur">
          <div className="mb-4">
            <div className="text-lg font-semibold">Sign in</div>
            <div className="text-sm text-white/60">
              Create your RemittEase wallet using Google, phone, or email.
            </div>
          </div>

          {/* Primary actions */}
          {mode === "idle" && (
            <div className="space-y-3">
              <button
                onClick={loginWithGoogle}
                disabled={isConnecting}
                className="w-full rounded-2xl bg-white/10 hover:bg-white/15 ring-1 ring-white/10 px-4 py-3 text-left transition"
              >
                <div className="font-medium">Continue with Google</div>
                <div className="text-xs text-white/60">Fast signup, no wallet extensions</div>
              </button>

              <button
                onClick={() => setMode("phone")}
                className="w-full rounded-2xl bg-white/10 hover:bg-white/15 ring-1 ring-white/10 px-4 py-3 text-left transition"
              >
                <div className="font-medium">Continue with phone</div>
                <div className="text-xs text-white/60">SMS verification</div>
              </button>

              <button
                onClick={() => setMode("email")}
                className="w-full rounded-2xl bg-white/10 hover:bg-white/15 ring-1 ring-white/10 px-4 py-3 text-left transition"
              >
                <div className="font-medium">Continue with email</div>
                <div className="text-xs text-white/60">Email code verification</div>
              </button>
            </div>
          )}

          {/* Email flow */}
          {mode === "email" && (
            <div className="space-y-3">
              <div className="text-sm text-white/70">Email</div>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full rounded-2xl bg-black/20 ring-1 ring-white/10 px-4 py-3 outline-none"
              />

              {emailCodeSent && (
                <>
                  <div className="text-sm text-white/70">Verification code</div>
                  <input
                    value={emailCode}
                    onChange={(e) => setEmailCode(e.target.value)}
                    placeholder="123456"
                    className="w-full rounded-2xl bg-black/20 ring-1 ring-white/10 px-4 py-3 outline-none"
                  />
                </>
              )}

              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => {
                    setMode("idle");
                    setEmailCodeSent(false);
                    setEmailCode("");
                  }}
                  className="flex-1 rounded-2xl bg-white/5 hover:bg-white/10 ring-1 ring-white/10 px-4 py-3 transition"
                >
                  Back
                </button>

                {!emailCodeSent ? (
                  <button
                    onClick={sendEmailCode}
                    disabled={!email || isConnecting}
                    className="flex-1 rounded-2xl bg-[var(--yellow)] text-black font-semibold px-4 py-3 disabled:opacity-60 transition"
                  >
                    Send code →
                  </button>
                ) : (
                  <button
                    onClick={verifyEmail}
                    disabled={!emailCode || isConnecting}
                    className="flex-1 rounded-2xl bg-[var(--yellow)] text-black font-semibold px-4 py-3 disabled:opacity-60 transition"
                  >
                    Verify →
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Phone flow */}
          {mode === "phone" && (
            <div className="space-y-3">
              <div className="text-sm text-white/70">Phone number</div>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+27821234567"
                className="w-full rounded-2xl bg-black/20 ring-1 ring-white/10 px-4 py-3 outline-none"
              />

              {phoneCodeSent && (
                <>
                  <div className="text-sm text-white/70">Verification code</div>
                  <input
                    value={phoneCode}
                    onChange={(e) => setPhoneCode(e.target.value)}
                    placeholder="123456"
                    className="w-full rounded-2xl bg-black/20 ring-1 ring-white/10 px-4 py-3 outline-none"
                  />
                </>
              )}

              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => {
                    setMode("idle");
                    setPhoneCodeSent(false);
                    setPhoneCode("");
                  }}
                  className="flex-1 rounded-2xl bg-white/5 hover:bg-white/10 ring-1 ring-white/10 px-4 py-3 transition"
                >
                  Back
                </button>

                {!phoneCodeSent ? (
                  <button
                    onClick={sendPhoneCode}
                    disabled={!phone || isConnecting}
                    className="flex-1 rounded-2xl bg-[var(--yellow)] text-black font-semibold px-4 py-3 disabled:opacity-60 transition"
                  >
                    Send code →
                  </button>
                ) : (
                  <button
                    onClick={verifyPhone}
                    disabled={!phoneCode || isConnecting}
                    className="flex-1 rounded-2xl bg-[var(--yellow)] text-black font-semibold px-4 py-3 disabled:opacity-60 transition"
                  >
                    Verify →
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Error */}
          {error && <div className="mt-4 text-sm text-red-300">{error.message}</div>}
        </div>

        <div className="mt-6 text-xs text-white/50">
          By continuing, you agree to RemittEase Terms & Privacy.
        </div>
      </div>
    </div>
  );
}
