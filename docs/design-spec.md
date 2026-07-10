# shiftd.design — Portfolio Design Spec

## Context

Shifin George (shiftd.design) needs a new portfolio replacing two older sites: a dark 3D-sphere poster gallery (shifiyy.vercel.app) and a bold brick-red editorial one-pager (shifiyy-archive2.vercel.app). Goal: **minimal, classy, fun, engaging** — serving both freelance clients and recruiters. Inspirations: jaberelferkh.com (restraint + personality), oven.studio (confident copy), steven-hanley.com (numbered editorial index), ericsin.com (typography-first understatement).

Chosen concept: **"Red on Interaction"** — the site is ink-on-white monochrome at rest; the brand's brick red appears *only* when the visitor interacts. Red is the reward. Personality is discovered, not shown. Fun = micro-interactions + playful copy + easter eggs (user's explicit picks; no single "wow" set-piece).

Deliverable of this plan: the design spec below, saved into the repo at `docs/design-spec.md` as step one of implementation. Repo `/home/shiftd/code/myclaudeportfolio` is empty — greenfield.

---

## 1. Design tokens

### Color

| Token | Hex | Use |
|---|---|---|
| `--paper` | `#FAFAF8` | Page background (barely-warm white, not cream) |
| `--ink` | `#191716` | All text at rest, near-black warm |
| `--ink-soft` | `#8A8580` | Meta text: years, labels, captions |
| `--red` | `#BE3A26` | Interaction-only: hovers, selection, cursor dot, focus rings |
| `--red-deep` | `#8F2B1C` | Red hover-on-red states, visited nuance |
| `--flip` | `#F6F1EA` | Text color when sitting on a red flood |

**Hard rule:** at rest (no pointer/keyboard activity), the viewport contains **zero red** except one element — the cursor dot. First-time visitors see a strict ink/paper page; red reveals itself the moment they touch anything. `::selection { background: var(--red); color: var(--flip); }` globally.

Dark mode: none in v1. One committed look. (`prefers-color-scheme` ignored deliberately; revisit later.)

### Typography

| Role | Face | Source | Notes |
|---|---|---|---|
| Display | **Bricolage Grotesque** | Google Fonts (variable) | Headlines, wordmark. Quirky cuts give "fun" without decoration. Use weight 700–800, tight tracking (-0.02em), optical size axis high for big sizes |
| Body/UI | **Geist** | `geist` npm package | Quiet, excellent at small sizes; a nod to Vercel where this deploys |
| Utility mono | **Geist Mono** | `geist` npm package | Timestamps, section counters, meta labels, footer jokes |

Type scale (desktop / mobile):
- Hero headline: `clamp(2.5rem, 7vw, 5.5rem)` Bricolage 800
- Section labels: 0.75rem Geist Mono uppercase, letter-spacing 0.08em, `--ink-soft`
- Work row title: `clamp(1.5rem, 3.5vw, 2.75rem)` Bricolage 700
- Body: 1rem/1.6 Geist 400, max-width 34rem
- Footer wordmark: `clamp(4rem, 14vw, 12rem)` Bricolage 800

### Layout

- Single column, max-width 72rem, side padding `clamp(1.25rem, 5vw, 4rem)`
- Vertical rhythm: sections separated by `clamp(6rem, 15vh, 10rem)` — whitespace does the "classy"
- Hairline rules `1px solid rgb(25 23 22 / 0.12)` separate work rows only — structure encodes the list, nothing else
- No cards, no shadows, no border-radius anywhere. Flat editorial plane.

### Motion

- Library: Framer Motion (`motion`)
- Default ease: `[0.22, 1, 0.36, 1]` (easeOutQuint-ish), durations 0.3–0.6s
- Scroll reveals: single pattern site-wide — 12px rise + fade, once, stagger 60ms. No parallax.
- `prefers-reduced-motion`: all transforms/cursor-dot/marquee off; opacity fades only

---

## 2. Page structure & section specs

Single page. Order: Header → Hero → Selected Work → About/Toolkit → Contact → Footer.

### 2.1 Header (fixed, blends into paper)

```
shiftd.design                          [10:41 IST — KOCHI]        contact
```

- Left: wordmark, Bricolage 700, ~1.1rem. Click scrolls to top. (Also easter-egg trigger, §4.)
- Center-right: live local time + place in Geist Mono `--ink-soft` (Steven Hanley nod; humanizes)
- Right: "contact" anchor link → contact section
- Background: paper with subtle blur-backdrop once scrolled; hairline bottom rule appears after 80px scroll

### 2.2 Hero

Copy (keep the established voice):

```
They call it design.
I call it organized obsession.
```

Below, one line Geist body:

```
Shifin George — part designer, part vibe coder, full-time problem untangler.
```

Micro-interaction — **hover-ink**: each word of the headline is a span; on hover a word fills brick-red for as long as the pointer rests, fading back over 0.8s after leave. Visitors "paint" the headline and it un-paints itself. Touch devices: words flash red sequentially once on load instead (one-time, 1.2s total).

Bottom of hero: `scroll ↓` in Geist Mono, gently bobbing (reduced-motion: static).

### 2.3 Selected Work

Section label: `SELECTED WORK [04]` — count is mono, updates with the array length (numbering carries real information: how much is curated in).

Editorial index rows (Steven Hanley pattern), each row:

```
Restorepoint            web design            2025      ↗
```

- Full row is the link. Hairline rule between rows.
- **Row flood** (the site's core move): on hover, a red panel wipes in from the left edge of the row (scaleX transform, 0.35s), title/meta flip to `--flip`, the ↗ arrow translates 4px up-right. Leave: wipe out to the right. Keyboard focus triggers the same flood.
- **Image peek**: a 320×200 project thumbnail follows the cursor at 8% lag while inside a row (fixed-position, `pointer-events: none`). Touch/reduced-motion: thumbnail appears statically right-aligned in the row instead.
- Case-study links open in new tab (Notion/Medium, as current). Row meta line under title on mobile.

Content inventory (from old sites — **replace/extend when Shifin shares final details**):

| Project | Type | Case study |
|---|---|---|
| Restorepoint | Web design | Notion |
| Luna Bloom | Web design | Notion |
| Dresso | UI/UX case study | Medium |
| NT Digital | Web design | live site (under construction) |

Data lives in one `projects.ts` array: `{ title, type, year, href, caseStudyHref, thumb }`.

### 2.4 About + Toolkit

Two-column on desktop (stacks on mobile): left `ABOUT` label, right content (bio → experience → toolkit).

- Bio: ~80 words max, voice-first. Draft (replace with Shifin's final): *"I design like I argue: with structure, receipts, and one strong accent color. Based in Kochi, working anywhere the wifi reaches. Clients get obsession disguised as process — recruiters get case studies that show the mess and the method."*
- Toolkit: single mono line, comma-separated (Figma, Framer, Next.js, …) — not a logo grid, not skill bars. Each tool name floods red on hover (same reward language).
- **Experience** (mono-labeled `NOW / BEFORE` list under the bio — same editorial index language as work rows, hairline rules, no logos):

  ```
  NOW      Operations Manager        Smashed Burgers & Co        2026—
  BEFORE   (freelance design + earlier roles — dates/titles from Shifin)
  ```

  Copy angle: lean into the range — ops + design is a differentiator, not a detour. One-liner under the NOW row, e.g. *"running kitchens taught me more about systems design than any Figma file."* Rows flood red on hover like work rows. Data in `experience.ts`: `{ label, role, org, period, note? }`.

### 2.5 Contact

Kept intentionally big — this section converts both audiences.

```
got a project that needs to be seen?

say hello →
```

- Headline: Bricolage, ~3rem. "say hello →" is the email in disguise: **click copies email** to clipboard, label swaps to `copied — now write it` in mono for 2s (red text during swap). Secondary explicit `mailto:` link underneath for people who hate clipboard tricks.
- Social row: Email · WhatsApp · Figma · Medium · LinkedIn — mono text links, red underline slide-in on hover. (Final list from Shifin.)
- Availability line in mono: `● open for freelance + full-time` — the dot is the *one* other resting-red allowance if Shifin wants it; default keep it ink and let it pulse red on section-enter once.

### 2.6 Footer

- `thanks for scrolling` centered, mono, small.
- Below it the giant `shiftd.design` wordmark, cropped by the viewport bottom (~40% cut off, as in archive2). At rest: ink. On hover: letters flood red individually under the cursor (per-letter spans, 0.15s in / 0.6s out) — the footer is the playground the visitor earns by reaching the end.
- Tiny mono colophon: `designed & vibe-coded by shifin · kochi · v3`

---

## 3. Cursor

- Desktop only (`pointer: fine`): default cursor stays visible; a 6px red dot trails it at 0.12 lag — small enough to be jewelry, not a gimmick. Grows to 24px hollow ring over interactive elements.
- Touch/reduced-motion/keyboard: no dot; red focus rings (`2px solid var(--red)`, 3px offset) carry the language instead.

## 4. Easter eggs (user asked for these — keep each cheap and discoverable)

1. **Console note**: styled `console.log` — `"snooping? respect. say hello@… — the code is the case study."`
2. **Logo clicks**: 5 rapid clicks on header wordmark → page briefly inverts to red-paper/ink-flip theme for 5s with a mono toast `you found obsession mode`.
3. **Konami code** (or typing `shiftd`): opens a small overlay "the archive" linking both old portfolios — heritage as easter egg.
4. **Selection message**: selecting the entire hero headline swaps the sub-line to `you just selected the whole thesis. hired.` for 3s.
5. **404 page** (Next.js `not-found.tsx`): `this page is not organized. obsession failed.` + link home.

## 5. Tech & implementation shape

- **Stack**: Next.js (App Router, static export not required — Vercel), Tailwind CSS v4, `motion` (Framer Motion), `geist` font package, Bricolage Grotesque via `next/font/google`.
- One route (`app/page.tsx`) + `not-found.tsx`. Components: `Header`, `Hero`, `WorkIndex`, `WorkRow`, `About`, `Contact`, `Footer`, `CursorDot`, `EasterEggs` (client), `projects.ts` data.
- All copy in a single `content.ts` so Shifin's incoming details slot in without touching components.
- SEO: metadata (title `shiftd.design — Shifin George`, description, OG image = red flood + wordmark), sitemap, favicon (red dot on paper).
- Analytics: Vercel Analytics (free tier), no cookie banner needed.

## 6. Quality floor

- Responsive to 360px; work rows collapse to title + stacked meta; footer wordmark scales via `vw`.
- Keyboard: full tab order, floods trigger on `:focus-visible`, skip-link to work.
- `prefers-reduced-motion` honored everywhere (§1 Motion).
- Lighthouse targets: ≥95 performance/accessibility/SEO; fonts subset + `display: swap`; thumbnails `next/image`, AVIF/WebP ≤ 60KB each.
- Contrast: ink on paper 15.8:1; flip-on-red ≈ 4.9:1 (AA for large text — work-row titles qualify; meta text on red bumps to `--flip` at 700 weight or ≥18px).

## 7. Implementation workflow — tasks, model assignment, token budget

Principle: **Fable 5 stays orchestrator-only** (delegation + final review of reports, near-zero generation). Heavy lifting goes to cheaper models via subagents. Model fit: Haiku 4.5 = mechanical/scripted work; Sonnet 5 = component building + animation code; Opus 4.8 = taste/judgment passes only.

Sorted by assumed token usage (descending):

| # | Task | Model | Est. tokens | Why this model |
|---|---|---|---|---|
| T4 | Interaction layer: row flood, hero hover-ink, cursor dot, image peek, footer per-letter flood, reduced-motion variants | **Sonnet 5** | ~80–100k | Animation timing/transform code needs strong frontend reasoning; Opus overkill, Haiku fumbles Motion nuance |
| T3 | Static build: scaffold-on-top layout — Header, Hero, WorkIndex, About+Experience, Contact, Footer, `content.ts`/`projects.ts`/`experience.ts` | **Sonnet 5** | ~60–80k | Multi-component structure + spec fidelity; bulk of the codebase |
| T6 | Verification: gstack browse pass (responsive screenshots, hover diffs, console, keyboard, reduced-motion CDP), fix findings | **Sonnet 5** | ~40–60k | Screenshot interpretation + targeted fixes; iterative |
| T5 | Easter eggs (console note, obsession mode, konami archive, selection message) + `not-found.tsx` | **Sonnet 5** | ~25–40k | Small isolated client components, some event-handling subtlety |
| T8 | Design polish pass: one judgment review of live preview vs spec — spacing, type, red discipline | **Opus 4.8** | ~20–30k | Pure taste/critique, short output; the only place premium judgment pays |
| T1 | Scaffold: `create-next-app`, Tailwind v4, `geist` + Bricolage fonts, token `globals.css`, deploy skeleton to Vercel | **Haiku 4.5** | ~15–25k | Fully mechanical, well-documented commands |
| T7 | Content swap when Shifin shares final details (bio, socials, experience dates, thumbnails) | **Haiku 4.5** | ~8–12k | Pure data-file edits in `content.ts` et al. |
| T2 | Commit spec as `docs/design-spec.md`, git init, first commit | **Haiku 4.5** | ~3–5k | Trivial file + git ops |

Execution order: T1 → T2 → T3 → T4 → T5 → T6 → T8 → deploy → T7 (async, when details arrive).
Total estimate: **~250–350k tokens**, of which Fable 5 ≈ orchestration overhead only (~10–15k). Tasks registered via TaskCreate at implementation start; each subagent gets the spec section it implements, not the whole doc.

## 8. Verification

- `npm run dev` + gstack browse: screenshot desktop/tablet/mobile (`responsive`), assert work rows visible, test row hover flood via `hover` + `snapshot -D`, check `console` for JS errors (easter-egg log expected).
- Keyboard-only pass: tab through all interactive elements, confirm red focus rings.
- Emulate `prefers-reduced-motion` via CDP, confirm no transforms.
- Lighthouse run on preview deploy.

## GSTACK REVIEW REPORT

| Run | Status | Findings |
|---|---|---|
| — | NO REVIEWS YET | run `/autoplan` |
| — | — | — |
| — | — | — |
| — | — | — |
| Verdict | **NO REVIEWS YET — run `/autoplan`** | |
