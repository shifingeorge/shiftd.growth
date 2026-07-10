"use client";

import { useEffect, useRef, useState } from "react";
import { hero } from "@/lib/content";

/**
 * Hero headline is painted word by word. On a fine pointer the visitor paints it
 * themselves; on touch the words flash once on load so the language still lands.
 */
export function Hero() {
  const [autoPaint, setAutoPaint] = useState<number>(-1);
  const [selectionHit, setSelectionHit] = useState(false);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (fine || still) return;

    let i = 0;
    const id = setInterval(() => {
      setAutoPaint(i);
      i += 1;
      if (i > hero.headline.length) {
        clearInterval(id);
        setAutoPaint(-1);
      }
    }, 1200 / hero.headline.length);
    return () => clearInterval(id);
  }, []);

  // Selecting the entire headline swaps the subline. Egg #4.
  useEffect(() => {
    const onSelect = () => {
      const text = window.getSelection()?.toString().replace(/\s+/g, " ").trim();
      if (!text) return;
      const full = hero.headline.join(" ");
      if (text.includes(full)) {
        setSelectionHit(true);
        setTimeout(() => setSelectionHit(false), 3000);
      }
    };
    document.addEventListener("selectionchange", onSelect);
    return () => document.removeEventListener("selectionchange", onSelect);
  }, []);

  return (
    <section className="mx-auto flex min-h-svh max-w-6xl flex-col justify-center px-5 pt-28 pb-16 sm:px-8 lg:px-16">
      <h1
        ref={headlineRef}
        className="font-display max-w-5xl text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[1.02] tracking-[-0.02em]"
      >
        {hero.headline.map((word, i) => (
          <span
            key={`${word}-${i}`}
            data-painted={autoPaint === i || undefined}
            className="inline-block transition-colors duration-[800ms] ease-quint hover:text-[var(--hot)] hover:duration-100 data-[painted]:text-[var(--hot)]"
          >
            {word}
            {i < hero.headline.length - 1 ? " " : ""}
          </span>
        ))}
      </h1>

      <p className="mt-8 max-w-[34rem] text-base leading-relaxed">
        {selectionHit ? (
          <span className="text-[var(--hot)]">{hero.selectionReward}</span>
        ) : (
          hero.subline
        )}
      </p>

      <a
        href="#work"
        className="meta mt-20 inline-flex w-fit items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.08em] transition-colors hover:text-[var(--hot)]"
      >
        scroll <span className="animate-[bob_1.8s_ease-in-out_infinite]">↓</span>
      </a>

      <style>{`@keyframes bob { 0%,100% { transform: translateY(0) } 50% { transform: translateY(4px) } }`}</style>
    </section>
  );
}
