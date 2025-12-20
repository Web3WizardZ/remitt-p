"use client";

import React from "react";

export function BottomSheet({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/60"
      />
      <div className="absolute bottom-0 left-0 right-0 rounded-t-3xl border border-white/10 bg-neutral-950 p-5">
        <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-white/20" />
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold text-white">{title}</h3>
          <button onClick={onClose} className="text-white/70 hover:text-white">
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
