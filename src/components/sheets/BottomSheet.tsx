"use client";

import React, { useEffect } from "react";

export function BottomSheet({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-label="Close"
      />
      <div className="absolute bottom-0 left-0 right-0 mx-auto w-full max-w-md rounded-t-3xl border border-white/10 bg-[#0b0620] p-4 shadow-2xl">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-sm font-semibold text-white/90">{title}</div>
          <button
            onClick={onClose}
            className="rounded-xl px-3 py-1 text-xs text-white/70 hover:text-white"
          >
            Close
          </button>
        </div>
        <div className="max-h-[70vh] overflow-auto pb-2">{children}</div>
      </div>
    </div>
  );
}
