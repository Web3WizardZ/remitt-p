"use client";

import React from "react";

export function Card({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[rgb(var(--re-card))]/80 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur">
      <div className="mb-5">
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        {subtitle ? <p className="mt-1 text-sm text-[rgb(var(--re-muted))]">{subtitle}</p> : null}
      </div>
      {children}
    </div>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={[
        "h-11 w-full rounded-2xl border border-white/10 bg-black/20 px-4 text-sm outline-none",
        "placeholder:text-white/35 focus:border-white/20 focus:ring-2 focus:ring-white/10",
        props.className || "",
      ].join(" ")}
    />
  );
}

export function Button({
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" }) {
  const base =
    "h-11 w-full rounded-2xl text-sm font-medium transition active:scale-[0.99] disabled:opacity-60";
  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-[rgb(var(--re-violet))] via-[rgb(var(--re-indigo))] to-[rgb(var(--re-pink))] text-white shadow-lg shadow-purple-500/10"
      : "border border-white/10 bg-white/5 text-white hover:bg-white/10";
  return <button {...props} className={[base, styles, props.className || ""].join(" ")} />;
}
