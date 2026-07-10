"use client";

import { useEffect, useRef, useState } from "react";
import { footer } from "@/lib/content";

const SESSION_KEY = "shiftd:hint-shown";
const OBSESSION_FOUND_KEY = "shiftd:obsession-found";
const SCROLL_THRESHOLD = 0.6;
const VISIBLE_MS = 6000;
const EXIT_MS = 450;

/**
 * A one-time "thought" that surfaces from the bottom of the viewport once the
 * visitor has scrolled deep into the page, nudging them toward the wordmark
 * easter egg. Skips itself if obsession mode is already active or was already
 * found this session, and never repeats within a session.
 */
export function HintToast() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    if (sessionStorage.getItem(OBSESSION_FOUND_KEY)) return;

    const dismiss = () => {
      if (dismissTimer.current) clearTimeout(dismissTimer.current);
      setVisible(false);
      exitTimer.current = setTimeout(() => setMounted(false), EXIT_MS);
    };

    const onScroll = () => {
      if (document.body.dataset.obsession === "true") return;

      const doc = document.documentElement;
      const scrolled = (window.scrollY + window.innerHeight) / doc.scrollHeight;
      if (scrolled < SCROLL_THRESHOLD) return;

      sessionStorage.setItem(SESSION_KEY, "1");
      window.removeEventListener("scroll", onScroll);

      setMounted(true);
      requestAnimationFrame(() => setVisible(true));
      dismissTimer.current = setTimeout(dismiss, VISIBLE_MS);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (dismissTimer.current) clearTimeout(dismissTimer.current);
      if (exitTimer.current) clearTimeout(exitTimer.current);
    };
  }, []);

  const handleDismiss = () => {
    if (dismissTimer.current) clearTimeout(dismissTimer.current);
    setVisible(false);
    exitTimer.current = setTimeout(() => setMounted(false), EXIT_MS);
  };

  if (!mounted) return null;

  return (
    <button
      type="button"
      onClick={handleDismiss}
      role="status"
      className={`hint-toast fixed bottom-6 left-1/2 z-50 -translate-x-1/2 border border-current bg-[var(--color-paper)] px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.06em] transition-[transform,opacity] duration-[400ms] ease-quint motion-reduce:duration-300 motion-reduce:transition-opacity ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0 motion-reduce:translate-y-0"
      }`}
    >
      [ {footer.hint} ]
    </button>
  );
}
