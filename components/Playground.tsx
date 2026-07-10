"use client";

import { useEffect, useState } from "react";
import { playground } from "@/lib/playground";

const TILTS = ["-0.8deg", "0.7deg", "0.6deg", "-0.7deg"];

export function Playground() {
  const [rotate, setRotate] = useState(false);

  useEffect(() => {
    setRotate(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <section
      id="playground"
      className="mx-auto max-w-6xl px-5 py-[clamp(6rem,15vh,10rem)] sm:px-8 lg:px-16"
    >
      <div className="mb-14">
        <h2 className="meta mb-4 font-mono text-[0.72rem] uppercase tracking-[0.08em]">
          [ playground ]
        </h2>
        <p className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-tight tracking-[-0.015em]">
          built when bored.
        </p>
        <p className="meta mt-3 font-mono text-[0.72rem] tracking-[0.04em]">
          no briefs. no clients. just an idea at the wrong hour.
        </p>
      </div>

      <ul className="grid gap-6 sm:grid-cols-2 sm:gap-8">
        {playground.map((p, i) => (
          <li key={p.title}>
            <a
              href={p.href}
              target="_blank"
              rel="noreferrer"
              style={rotate ? { transform: `rotate(${TILTS[i % TILTS.length]})` } : undefined}
              className="group block border border-transparent p-6 transition-[transform,border-color] duration-[350ms] ease-quint hover:rotate-0 hover:border-[var(--hot)] focus-visible:rotate-0 focus-visible:border-[var(--hot)] sm:p-8"
            >
              <div className="mb-4 flex items-center justify-between gap-3 font-mono text-[0.7rem] uppercase tracking-[0.08em]">
                <span className="meta">{p.tag}</span>
                {p.status === "building" && (
                  <span className="text-[var(--hot)]">[ still building ]</span>
                )}
              </div>

              <div className="flex items-start justify-between gap-4">
                <span className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.95] tracking-[-0.02em] transition-colors duration-300 ease-quint group-hover:text-[var(--hot)] group-focus-visible:text-[var(--hot)]">
                  {p.title}
                </span>
                <span className="mt-2 inline-block shrink-0 -translate-y-1 translate-x-1 text-2xl opacity-0 transition-all duration-300 ease-quint group-hover:translate-y-0 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-[var(--hot)] group-focus-visible:translate-y-0 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:text-[var(--hot)]">
                  ↗
                </span>
              </div>

              <p className="meta mt-3 max-w-[28rem] text-sm leading-relaxed">{p.story}</p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
