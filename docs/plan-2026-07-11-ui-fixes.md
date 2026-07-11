# UI Fix Pass — 2026-07-11

Planned by Fable 5. Implementation strictly by non-Fable models (Sonnet subagents).

## Orchestration

| Agent | Model | Files | Scope |
|-------|-------|-------|-------|
| A — content/brand | sonnet | `lib/content.ts`, `lib/experience.ts`, `lib/playground.ts`, `app/layout.tsx`, `app/graphics/page.tsx`, `components/globe/GlobeGallery.tsx` | data + brand string changes |
| B — layout/spacing | sonnet | `components/Hero.tsx`, `components/Playground.tsx`, `components/WorkIndex.tsx`, `components/About.tsx`, `components/Contact.tsx` | spacing, alignment, structure |

Agents run in parallel (no file overlap). Fable 5 verifies afterwards: `tsc --noEmit`, clean prod build, mobile + desktop screenshots.

## Change list

### Agent A — content/brand
1. `lib/playground.ts`: title `"kukku"` → `"kukku weds nizma"`.
2. `lib/content.ts`:
   - `site.wordmark`: `"shiftd.design"` → `"shiftd.growth"`.
   - `site.availability`: `"open for freelance + full-time"` → `"open for freelance"`.
   - `contact.socials`: add `{ label: "LinkedIn", href: "https://www.linkedin.com/in/shifiyy" }` after Email.
   - Leave `eggs.archive` label `"shiftd.design — v2"` untouched (historical archive reference).
3. `lib/experience.ts`:
   - org `"shiftd.design"` → `"shiftd.growth"`.
   - ongoing periods: `"May 2026 —"` → `"May 2026 — [present]"`, `"Feb 2025 —"` → `"Feb 2025 — [present]"`. Past ranges unchanged.
4. `app/layout.tsx`, `app/graphics/page.tsx`, `components/globe/GlobeGallery.tsx`: any user-visible/metadata `shiftd.design` → `shiftd.growth`.

### Agent B — layout/spacing
1. **Hero** (`Hero.tsx:63-65`): delete the red blinking `▮` cursor span entirely (mobile AND desktop).
2. **Playground** (`Playground.tsx`):
   - Mobile left-alignment: card `<a>` padding `p-6` → `px-0 py-6 sm:p-8` so card text lines up with section headings on mobile (matches Selected Work rows).
   - Header block `mb-14` → `mb-8` (tighten gap between "no briefs…" line and cards).
3. **WorkIndex** (`WorkIndex.tsx`): h2 `mb-10` → `mb-2` so heading→"restore point" gap visually matches Playground's heading→"built when bored." gap (first row adds `pt-6` of its own).
4. **About** (`About.tsx`):
   - h2 text `About` → `[ about ]`.
   - Mobile gap between heading and bio: `gap-10` → `gap-5` (keep `lg:gap-16`).
   - Experience rows restructured (all breakpoints): stack — role title (font-display bold) on top, org (meta, linked when `orgHref`) on its own line below, period below/beside. Remove the inline `" — "` join. Keep NOW/BEFORE label and flood hover effect. On `sm:` period may sit right-aligned on the title row; org always on its own line under the title.
5. **Contact** (`Contact.tsx`):
   - Label `Contact` → `[ contact ]`.
   - Label→headline: h2 `mt-8` → `mt-4`.
   - Headline→"say hello →" button: `mt-8` → `mt-4`.
   - Button→"or just email" line: `mt-3` → `mt-1`.
   - (LinkedIn social renders automatically from Agent A's data change.)

## Verification
- `npx tsc --noEmit` clean.
- `rm -rf .next && npm run build` (per memory: pkill next-server first, verify BUILD_ID mtime > latest edit).
- Screenshot 390px + 1440px: hero (no red block), playground alignment, about/experience layout, contact spacing, footer wordmark `shiftd.growth`.
