# Spec — Playground section + Graphics globe page

Date: 2026-07-10 · Site: shiftd.design v3 ("red on interaction")

Two additions to the existing portfolio. Both must inherit the existing design
system: paper/ink palette, `--hot`/`--flood`/`--flood-text` interaction tokens,
obsession-mode compatibility, Bricolage display type, Geist mono metadata,
`--ease-quint` easing, reduced-motion respect.

---

## 1. Playground section (home page)

A "built when bored" section for vibe-coded side projects. Sits on the home
page **between WorkIndex and About**. Tone: looser and more playful than the
work index, but same typographic system — no cards with drop shadows, no
gradients.

### Data — `lib/playground.ts`

```ts
export type PlaygroundProject = {
  title: string;
  story: string;      // one-liner, lowercase, personal voice
  href: string;
  tag: string;        // mono label, e.g. "wedding gift", "3d experiment"
  status?: "live" | "building";
};
```

Entries (exact content):

| title | href | tag | story | status |
|---|---|---|---|---|
| kukku | https://nizmakukku.vercel.app/ | wedding gift | built for my friend nizma's wedding — because a card felt lazy | live |
| ingsight | https://ingsight.vercel.app/ | petty tooling | finds who i follow that doesn't follow back. safely. no login drama | live |
| code a tree | https://codeatree.vercel.app/ | 3d experiment | first ever three.js thing — top 5 at a tinkerhub competition | live |
| orbit | https://orbit-tm.vercel.app/ | trello, but mine | started because i hated trello for no reason. still building | building |

### Component — `components/Playground.tsx`

- Section `id="playground"`, header row matching About/WorkIndex convention:
  mono kicker `[ playground ]` + display heading like "built when bored."
  plus one meta line: "no briefs. no clients. just an idea at the wrong hour."
- Layout: 2-col grid on `sm+` (1-col mobile) of oversized text tiles. Each tile
  is an `<a target="_blank" rel="noreferrer">` containing: mono tag + status,
  display-font title (large, ~clamp 2–3.5rem), story line in `meta` color.
- Each tile gets a slight resting rotation (alternating ±0.6–1deg via
  `nth-child` or inline style) — "sticky note" energy. On hover: rotation
  straightens to 0, title fills `var(--hot)`, a 1px `var(--hot)` border/frame
  draws in, arrow `↗` slides in. Transition uses `--ease-quint`, ~300–400ms.
- `status === "building"` renders a mono badge `[ still building ]` in
  `var(--hot)`.
- Reduced motion: no rotation transform at all (static, straight).
- Must work in obsession mode (use tokens, never hardcoded red).

### Wiring

- `app/page.tsx`: `<Playground />` between `<WorkIndex />` and `<About />`.

---

## 2. Graphics page — `/graphics`

Separate page: a 3D globe of graphic-design posters (successor to
https://shifiyy.vercel.app/'s "poster sphere", but on-brand and better).

### Dependencies

Add: `three`, `@react-three/fiber` (v9 — React 19 compatible),
`@react-three/drei`, dev: `@types/three`.

### Data — `lib/designs.ts`

```ts
export type DesignWork = {
  src: string;        // remote URL now; later /designs/*.webp in /public
  title: string;
  category: string;   // "poster", "social", "experiment"…
};
```

Seed with the old site's actual gallery images (user swaps in real work later
by dropping files into `public/designs/` and editing this array — say so in a
comment):

- https://images.unsplash.com/photo-1745965976680-d00be7dc0377?q=80&w=774&auto=format&fit=crop — "Geometric pattern"
- https://images.unsplash.com/photo-1752588975228-21f44630bb3c?q=80&w=774&auto=format&fit=crop — "Textured surface"
- https://images.unsplash.com/photo-1755331039789-7e5680e26e8f?q=80&w=774&auto=format&fit=crop — "Abstract art"
- https://images.unsplash.com/photo-1755353985163-c2a0fe5ac3d8?q=80&w=774&auto=format&fit=crop — "Contemporary art"
- https://images.unsplash.com/photo-1755497595318-7e5e3523854f?q=80&w=774&auto=format&fit=crop — "Digital artwork"
- https://images.unsplash.com/photo-1755569309049-98410b94f66d?q=80&w=772&auto=format&fit=crop — "Modern sculpture"

Repeat/tile the list to ~24 sphere slots so the globe reads full (cycle
through the array).

### Page — `app/graphics/page.tsx` + components

- `app/graphics/page.tsx`: server component exporting metadata
  (`title: "graphics — shiftd.design"`), renders client `<GlobeGallery />`.
- `components/globe/GlobeGallery.tsx` (`"use client"`, and the Canvas tree
  must be loaded with `next/dynamic` + `ssr: false` to avoid SSR/three
  issues):
  - Full-viewport canvas section under a slim header: wordmark link back to
    `/` (mono `← shiftd.design`), page title "the wall, bent into a sphere."
    or similar, mono hint `[ drag to spin · click to zoom ]`.
  - **Globe**: N image planes distributed on a sphere via Fibonacci/golden-
    spiral distribution, each plane oriented tangent to the surface facing
    outward (lookAt center, then flip). Radius ~3.2, planes ~1.1×1.45
    (poster ratio).
  - Idle: slow auto-rotation (~0.04 rad/s). Pointer drag rotates the group
    with inertia (velocity damping ~0.95/frame); auto-rotation resumes after
    ~2s idle. Touch drag works.
  - Hover tile: scale to ~1.12, red (`--hot` sampled to hex at runtime or the
    known `#be3a26`) border frame plane behind it; cursor becomes pointer;
    HTML tooltip (drei `Html` or DOM overlay) with mono title.
  - Click tile: DOM lightbox overlay (plain fixed div, not in-canvas): the
    image large, title + category in mono, close on ✕ / Esc / backdrop click.
    Body scroll locked while open.
  - Scene: transparent canvas over `--color-paper` page background so
    obsession mode / theming still works; subtle fog optional. No lights
    needed if using `meshBasicMaterial`.
  - Performance: `dpr={[1, 2]}`, textures via drei `useTexture` with
    suspense fallback (simple mono "loading the wall…" line).
  - Reduced motion: no auto-rotation (drag still works).
  - No-WebGL / error fallback: plain responsive image grid of the same data
    (`<GridFallback />`), also used under `<noscript>`-ish failure. Detect via
    try/catch on canvas creation or `WebGLRenderingContext` check.
- Footer strip on page: reuse mono colophon style, link back home.

### Header link (home)

In `components/Header.tsx`, add a nav link `graphics ↗`-style (mono, matches
existing right-side cluster) pointing to `/graphics`. Keep it visible on
mobile if space allows, else `hidden sm:inline`.

---

## 3. README.md (repo root)

Proper README: project name + one-liner, live URL placeholder, tech stack,
design-system notes (tokens, obsession mode), pages/sections map (including
playground + /graphics), how to run (`npm i`, `npm run dev`), how to swap
globe placeholder images with real work, credits/license line.

## 4. Verification & commits

- `npm run build` must pass clean after each phase.
- Browser check: home playground hover states, /graphics globe drag + click
  lightbox, mobile viewport.
- Conventional commits, one per phase:
  1. `docs: spec for playground section and graphics globe page`
  2. `feat: playground section — vibe-coded side projects, built when bored`
  3. `feat: /graphics — 3D poster globe gallery with drag, lightbox, fallbacks`
  4. `docs: add README with stack, design system, and content guide`
