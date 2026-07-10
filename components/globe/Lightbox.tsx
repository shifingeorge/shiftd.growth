"use client";

import { useEffect } from "react";
import type { DesignWork } from "@/lib/designs";

export function Lightbox({
  item,
  onClose,
}: {
  item: DesignWork;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-5 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 font-mono text-[0.8rem] uppercase tracking-[0.08em] text-flip transition-colors duration-200 hover:text-[var(--hot)] sm:right-8 sm:top-8"
      >
        [ close ✕ ]
      </button>

      <div
        className="flex max-h-full max-w-3xl flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.src}
          alt={item.title}
          className="max-h-[75vh] w-auto max-w-full rounded-sm object-contain"
        />
        <div className="text-center font-mono text-[0.72rem] uppercase tracking-[0.08em] text-flip/80">
          {item.title} <span className="text-flip/50">· {item.category}</span>
        </div>
      </div>
    </div>
  );
}
