# shiftd.design

my portfolio. one designer, one accent color, way too much obsession about
easing curves.

**live:** https://shiftd.design *(placeholder — swap once deployed)*

---

## what it is

a personal portfolio for Shifin George — part designer, part vibe coder. the
whole thing runs on a "red on interaction" design system: quiet paper/ink
type until you touch something, then it goes red. work, side projects, and a
3D wall of posters bent into a sphere, all in one build.

## stack

- [Next.js 15](https://nextjs.org/) — App Router
- [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Motion](https://motion.dev/) for interaction/scroll animation
- [three.js](https://threejs.org/) + [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) + [@react-three/drei](https://github.com/pmndrs/drei) for the `/graphics` globe
- TypeScript
- deployed on [Vercel](https://vercel.com/)

## pages & sections

**`/` (home)**
- hero — headline painted word by word, one line of context
- work index — real projects, real links
- playground — vibe-coded side projects, built when bored
- about — bio + toolkit
- contact — one CTA, socials
- footer — wordmark, colophon

**`/graphics`** — a globe of graphic-design posters. drag to spin, click a
tile to zoom into a lightbox. falls back to a plain image grid if WebGL
isn't available.

## design system

- **tokens** — `--color-paper`, `--color-ink`, `--color-red` for the base
  palette, plus interaction-only vars: `--hot`, `--flood`, `--flood-text`.
  components should never hardcode red — always reach for `--hot`/`--flood`
  so theming (see below) stays intact.
- **type** — Bricolage for display, Geist Mono for metadata/labels.
- **motion** — `--ease-quint` easing everywhere, reduced-motion respected
  throughout (no rotation/parallax when the user has asked for less motion).
- there are a couple of easter eggs tucked into the site. one of them flips
  the whole page's palette for a few seconds if you know where to click and
  how fast. won't spoil the rest — go find them.

## running locally

```bash
npm i
npm run dev
```

then open `http://localhost:3000`.

```bash
npm run build   # production build
npm run lint    # lint
```

## swapping the globe's images

`/graphics` ships with placeholder Unsplash images. to put in real work:

1. drop optimized, poster-ratio images (roughly 1200×1600, `.webp`) into
   `public/designs/`.
2. open `lib/designs.ts` and point each `src` at `/designs/your-file.webp`,
   updating `title` and `category` to match.
3. anywhere from 6 to 24+ entries works — the list is cycled to fill every
   slot on the sphere.

## credits

designed & vibe-coded by Shifin George.
