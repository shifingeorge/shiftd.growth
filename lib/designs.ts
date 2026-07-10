// Seed gallery for /graphics — the poster globe.
//
// These are placeholder Unsplash images standing in for real design work.
// To swap in the actual portfolio:
//   1. Drop optimized images (ideally poster-ratio, ~1200x1600, .webp) into
//      `public/designs/`.
//   2. Replace the `src` values below with `/designs/your-file.webp`.
//   3. Update `title` / `category` to match. The list is cycled to fill the
//      sphere, so anywhere from 6 to 24+ unique entries works fine.

export type DesignWork = {
  src: string;
  title: string;
  category: string;
};

const seed: DesignWork[] = [
  {
    src: "https://images.unsplash.com/photo-1745965976680-d00be7dc0377?q=80&w=774&auto=format&fit=crop",
    title: "Geometric pattern",
    category: "poster",
  },
  {
    src: "https://images.unsplash.com/photo-1752588975228-21f44630bb3c?q=80&w=774&auto=format&fit=crop",
    title: "Textured surface",
    category: "experiment",
  },
  {
    src: "https://images.unsplash.com/photo-1755331039789-7e5680e26e8f?q=80&w=774&auto=format&fit=crop",
    title: "Abstract art",
    category: "poster",
  },
  {
    src: "https://images.unsplash.com/photo-1755353985163-c2a0fe5ac3d8?q=80&w=774&auto=format&fit=crop",
    title: "Contemporary art",
    category: "social",
  },
  {
    src: "https://images.unsplash.com/photo-1755497595318-7e5e3523854f?q=80&w=774&auto=format&fit=crop",
    title: "Digital artwork",
    category: "experiment",
  },
  {
    src: "https://images.unsplash.com/photo-1755569309049-98410b94f66d?q=80&w=772&auto=format&fit=crop",
    title: "Modern sculpture",
    category: "poster",
  },
];

const SLOT_COUNT = 24;

/** Seed list tiled out to fill every sphere slot. */
export const designs: DesignWork[] = Array.from(
  { length: SLOT_COUNT },
  (_, i) => seed[i % seed.length]
);
