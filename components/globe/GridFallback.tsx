"use client";

import type { DesignWork } from "@/lib/designs";

/** Plain responsive image grid — used when WebGL isn't available. */
export function GridFallback({
  items,
  onSelect,
}: {
  items: DesignWork[];
  onSelect: (item: DesignWork) => void;
}) {
  // Dedupe by src so the fallback doesn't repeat the same tiled seed image.
  const unique = items.filter(
    (item, i) => items.findIndex((x) => x.src === item.src) === i
  );

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:px-16">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {unique.map((item) => (
          <button
            key={item.src}
            type="button"
            onClick={() => onSelect(item)}
            className="group relative aspect-[1.1/1.45] w-full overflow-hidden rounded-sm bg-ink/5 text-left"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.src}
              alt={item.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[400ms] ease-quint group-hover:scale-105"
            />
            <span className="absolute inset-0 border border-transparent transition-colors duration-200 group-hover:border-[var(--hot)]" />
            <span className="absolute inset-x-0 bottom-0 bg-paper/90 px-2 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.06em] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              {item.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
