"use client";

import { Component, useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { designs, type DesignWork } from "@/lib/designs";
import { GridFallback } from "./GridFallback";
import { Lightbox } from "./Lightbox";

// The three.js/R3F canvas can't run during SSR — it touches window/WebGL at
// module scope — so it's loaded client-side only, from inside this client
// component (Next 15 requires ssr:false dynamic imports to live in a
// client component, not a server one).
const GlobeScene = dynamic(() => import("./GlobeScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-ink-soft">
        loading the wall…
      </p>
    </div>
  ),
});

function supportsWebGL() {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

class GlobeErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("Globe failed to render, falling back to grid.", error);
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

export function GlobeGallery() {
  const [webglOk, setWebglOk] = useState<boolean | null>(null);
  const [selected, setSelected] = useState<DesignWork | null>(null);

  useEffect(() => {
    setWebglOk(supportsWebGL());
  }, []);

  const fallback = useMemo(
    () => <GridFallback items={designs} onSelect={setSelected} />,
    []
  );

  return (
    <div className="flex min-h-screen flex-col">
      <header className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 pt-24 sm:px-8 lg:px-16">
        <Link
          href="/"
          className="w-fit font-mono text-[0.72rem] uppercase tracking-[0.08em] text-ink-soft transition-colors duration-200 hover:text-[var(--hot)]"
        >
          ← shiftd.design
        </Link>
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h1 className="font-display text-[clamp(2rem,5vw,3.25rem)] font-bold leading-tight tracking-[-0.02em]">
            the wall, bent into a sphere.
          </h1>
          <span className="meta font-mono text-[0.68rem] uppercase tracking-[0.08em]">
            [ drag to spin · click to zoom ]
          </span>
        </div>
      </header>

      <div className="relative min-h-[60vh] flex-1">
        {webglOk === null ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-ink-soft">
              loading the wall…
            </p>
          </div>
        ) : webglOk ? (
          <div className="absolute inset-0">
            <GlobeErrorBoundary fallback={fallback}>
              <GlobeScene items={designs} onSelect={setSelected} />
            </GlobeErrorBoundary>
          </div>
        ) : (
          fallback
        )}
      </div>

      <footer className="mx-auto w-full max-w-6xl px-5 py-10 text-center sm:px-8 lg:px-16">
        <Link
          href="/"
          className="font-mono text-[0.65rem] uppercase tracking-[0.08em] text-ink-soft transition-colors duration-200 hover:text-[var(--hot)]"
        >
          designed &amp; vibe-coded by shifin · back home
        </Link>
      </footer>

      {selected && (
        <Lightbox item={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
