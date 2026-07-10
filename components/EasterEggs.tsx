"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { eggs } from "@/lib/content";

const TOAST_EVENT = "shiftd:toast";

function toast(message: string) {
  window.dispatchEvent(new CustomEvent(TOAST_EVENT, { detail: message }));
}

/**
 * Five rapid clicks on the wordmark flips the whole page to red-on-cream for 5s.
 * Returns a click registrar for Header to call.
 */
export function useObsessionMode() {
  const clicks = useRef<number[]>([]);

  return useCallback(() => {
    const now = performance.now();
    clicks.current = [...clicks.current, now].filter((t) => now - t < 1500);
    if (clicks.current.length < 5) return;

    clicks.current = [];
    document.body.dataset.obsession = "true";
    toast(eggs.obsessionMode);
    setTimeout(() => delete document.body.dataset.obsession, 5000);
  }, []);
}

function Toast() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const onToast = (e: Event) => {
      setMessage((e as CustomEvent<string>).detail);
      setTimeout(() => setMessage(null), 3200);
    };
    window.addEventListener(TOAST_EVENT, onToast);
    return () => window.removeEventListener(TOAST_EVENT, onToast);
  }, []);

  if (!message) return null;

  return (
    <div
      role="status"
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 border border-current px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.08em]"
    >
      {message}
    </div>
  );
}

/** Typing "shiftd" anywhere opens the archive of the old portfolios. */
function ArchiveOverlay() {
  const [open, setOpen] = useState(false);
  const buffer = useRef("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return setOpen(false);
      if (e.key.length !== 1) return;
      const target = e.target as HTMLElement | null;
      if (target && /input|textarea/i.test(target.tagName)) return;

      buffer.current = (buffer.current + e.key.toLowerCase()).slice(-6);
      if (buffer.current === "shiftd") {
        buffer.current = "";
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-paper/95 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div className="px-6 text-center" onClick={(e) => e.stopPropagation()}>
        <p className="meta font-mono text-[0.72rem] uppercase tracking-[0.08em]">
          {eggs.archiveTitle}
        </p>
        <p className="font-display mt-3 text-3xl font-extrabold tracking-tight">
          {eggs.archiveNote}
        </p>

        <ul className="mt-8 flex flex-col gap-3">
          {eggs.archive.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer noopener"
                className="font-mono text-[0.8rem] tracking-[0.04em] underline decoration-transparent underline-offset-4 transition-colors hover:text-[var(--hot)] hover:decoration-[var(--hot)]"
              >
                {item.label} ↗
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen(false)}
          className="meta mt-10 font-mono text-[0.7rem] uppercase tracking-[0.08em] transition-colors hover:text-[var(--hot)]"
        >
          close (esc)
        </button>
      </div>
    </div>
  );
}

export function EasterEggs() {
  useEffect(() => {
    console.log(
      `%c${eggs.consoleNote}`,
      "color:#BE3A26;font-family:monospace;font-size:12px"
    );
  }, []);

  return (
    <>
      <Toast />
      <ArchiveOverlay />
    </>
  );
}
