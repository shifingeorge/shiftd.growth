"use client";

import { useEffect, useRef, useState } from "react";

const INTERACTIVE = "a, button, [role='button'], input, textarea, select";

export function CursorDot() {
  const [enabled, setEnabled] = useState(false);
  const dot = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(fine && !still);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      const over = (e.target as Element | null)?.closest?.(INTERACTIVE);
      dot.current?.setAttribute("data-hot", over ? "true" : "false");
    };

    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.12;
      pos.current.y += (target.current.y - pos.current.y) * 0.12;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dot}
      aria-hidden
      data-hot="false"
      className="pointer-events-none fixed left-0 top-0 z-50 h-1.5 w-1.5 rounded-full bg-[var(--flood)] transition-[width,height,background-color,border-width] duration-200 ease-quint data-[hot=true]:h-6 data-[hot=true]:w-6 data-[hot=true]:border-2 data-[hot=true]:border-[var(--flood)] data-[hot=true]:bg-transparent"
    />
  );
}
