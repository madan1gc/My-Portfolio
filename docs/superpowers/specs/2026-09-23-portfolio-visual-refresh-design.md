# Portfolio Visual Refresh — Design Spec

Date: 2026-09-23
Owner: Madan G.C
Parent spec: `docs/superpowers/specs/2026-09-16-portfolio-redesign-design.md`
Reference notes: `docs/superpowers/specs/reference-style-guide.md`

## 1. Purpose

The Phase 1 design system (dark navy background, indigo→purple gradient
blur-glow hero, `bg-clip-text` gradient headlines, rounded-full pill
badges everywhere) reads as generic — specifically, as the default look
produced by AI coding assistants and no-code "vibe coding" tools. The
user's own words: "it feel like the current design color are what every
vibe coder make. i want something new and fresh. also the current design
is way too dark."

This phase replaces the color system and several signature visual
patterns site-wide, and adds a light/dark theme toggle. It does not
change information architecture, routes, or content.

## 2. Scope

**In scope (applies across every page/component):**
- A CSS-custom-property-based color token system, replacing the
  hardcoded hex values in `tailwind.config.ts`, with distinct light and
  dark values for every token.
- A light/dark theme toggle (`ThemeToggle`), defaulting to the visitor's
  OS preference, overridable and persisted in `localStorage`, with no
  flash-of-wrong-theme on load.
- A fresh accent palette: **teal** as the primary accent (replaces
  indigo/violet), plus one **warm** secondary accent used sparingly for
  small highlight moments (replaces amber-as-gradient-partner).
- Removal of every gradient-blur / `bg-clip-text` gradient-text pattern,
  replaced with solid-color equivalents (see §5).
- Hero restructure: the soft blur-glow orb + circular photo becomes a
  hard-edged split panel.
- Card/button hover restructure: soft glow-shadow becomes a hard
  border-color shift + slight lift.
- Section eyebrow restructure: rounded-full pill becomes a flatter
  bracket-style tag (a small solid accent square + label, no full pill).
- Footer gets one solid-color full-bleed block (not wavy — a wavy blob
  shape is its own generic tell) as the one loud color moment on the
  page, echoing Nichol's idea without the cliché shape.

**Out of scope / explicit deferrals:**
- No new routes, no content changes, no information-architecture changes.
- No literal recreation of either reference site's layout.
- No animated theme-transition choreography beyond a simple CSS
  `transition-colors` — this is a token swap, not a new animation system.
- No fabricated content anywhere (unchanged policy from Phase 1-5).

## 3. Color tokens

All colors move from literal Tailwind hex values to CSS custom
properties defined in `app/globals.css`, referenced by
`tailwind.config.ts`. Both themes are defined explicitly (not derived
from `prefers-color-scheme` alone) so the toggle can force either one
regardless of OS setting.

| Token | Dark value | Light value | Used for |
|---|---|---|---|
| `--color-background` | `#0B1211` | `#F7FAF9` | page background |
| `--color-surface` | `#121A19` | `#FFFFFF` | card/panel background |
| `--color-border` | `#22302E` | `#DCE6E4` | borders, dividers |
| `--color-foreground` | `#F3F6F5` | `#0F1413` | primary text |
| `--color-muted` | `#9BA8A5` | `#5B6664` | secondary text |
| `--color-accent` | `#2DD4BF` | `#0D9488` | links, icons, small accents |
| `--color-accent-strong` | `#0D9488` | `#0F766E` | solid button fills (AA white-text contrast on both) |
| `--color-accent-text` | `#5EEAD4` | `#0F766E` | small colored text (eyebrows, "+", stat highlights) — pre-picked per theme for AA at small sizes |
| `--color-accent-warm` | `#FDBA74` | `#C2410C` | secondary accent — used only as a background tint (≤15% opacity) or icon fill, never as text color |

Both dark and light values above were chosen for ≥4.5:1 text contrast
against their theme's `background`/`surface` (teal-300/700 and
teal-400/600 families are safe at those pairings; exact values may be
nudged ±1 shade during implementation if an automated contrast check
in the review phase finds an edge case — see §7).

`tailwind.config.ts`'s `colors.accent` shape changes from `{from, to,
text}` (a gradient pair) to `{DEFAULT, strong, warm, text}` — every
current reference to `accent-from`/`accent-to`/`accent-text` is updated
in the same pass (mechanical rename, no behavior change beyond the new
values). `bg-gradient-to-r from-accent-from to-accent-to` call sites are
replaced with a solid `bg-accent-strong` (buttons, dots, icons) — there
is no gradient utility left to reference. The widely-duplicated
`focus-visible:ring-accent-from` string (9 files, already flagged as
tech debt in `CONTENT-TODO.md`) becomes `focus-visible:ring-accent`
(the plain `DEFAULT` token) — same mechanical rename, still not
extracted to a shared constant (that extraction stays out of scope,
per the existing CONTENT-TODO entry).

## 4. Theme toggle mechanics

- `data-theme="light"` / `data-theme="dark"` attribute on `<html>`,
  read by CSS (`:root[data-theme='light'] { ... }` /
  `:root[data-theme='dark'] { ... }` blocks defining the tokens above).
  Each block also sets the native `color-scheme` property (`light` /
  `dark`) so browser-native UI (scrollbars, form controls) matches —
  replacing `globals.css`'s current hardcoded `color-scheme: dark`.
- A small inline script in `app/layout.tsx`'s `<head>` (via
  `dangerouslySetInnerHTML`, no external dependency) runs before first
  paint: reads `localStorage.theme`; if absent, reads
  `window.matchMedia('(prefers-color-scheme: dark)')`; sets the
  attribute immediately. This prevents a flash of the wrong theme —
  the same technique the `next-themes` library uses internally, kept
  dependency-free since the logic is ~10 lines.
- `components/ui/ThemeToggle.tsx` (new, client component): a button in
  `Nav` (both desktop and mobile menu) that reads the current
  `data-theme`, flips it, updates `localStorage.theme`, and re-applies
  the attribute. Icon-only button with `aria-label` ("Switch to light
  theme" / "Switch to dark theme", reflecting the *next* state).
- No system-preference "auto" third state in the UI — once toggled, the
  explicit choice persists. (Matches the user's ask for "a toggle,"
  keeps the component simpler than a three-way switch.)

## 5. Removing gradient patterns — solid replacements

| Current pattern | Replacement |
|---|---|
| Hero's `blur-3xl` floating gradient orb behind the headline | Removed. Replaced by the split-panel hard edge (§6). |
| Hero photo: circular crop + gradient blur glow ring | Square-cropped photo inside the split panel, `border` only, no glow. |
| `bg-gradient-to-r ... bg-clip-text text-transparent` on Hero role text, Contact's closing headline | Solid `text-accent` on the emphasized line — no gradient, no clip-text. |
| `Button` primary variant's `bg-gradient-to-r from-[#4F46E5] to-[#7C3AED]` + glow shadow | Solid `bg-accent-strong` fill, `hover:bg-accent` (a plain shade shift), no shadow glow. |
| `Card`'s `hover:shadow-[0_0_40px_-15px_...]` glow | `hover:border-accent` (hard border-color shift) + `hover:-translate-y-0.5`. |
| Timeline dot: `bg-gradient-to-r from-accent-from to-accent-to` | Solid `bg-accent-strong`. |
| Section eyebrow: rounded-full pill with gradient dot | Small solid `bg-accent-strong` square (4px) to the left of flat-tracked uppercase text, no pill container, no border. |
| Footer: plain border-top, no color moment | One full-bleed `bg-accent-strong` block wrapping the copyright/links row (solid color, hard top edge — no wave). Text inside is fixed near-black (`#0B1211`, reused from the dark background value) in both themes — `accent-strong`'s two theme values (`#0D9488`/`#0F766E`) are both mid-dark teals where black text clears AA more reliably than white; links additionally get an underline (not color alone) so they're distinguishable without relying on a second color against the band. |

## 6. Structural / layout changes drawn from the references

A token-and-shadow swap alone would still be "the same template, new
paint" — the point of this phase is to also borrow actual *layout*
ideas from Nichol/Mikon (per `reference-style-guide.md`) so the result
reads as a distinct, considered design, not a one-shot generic template.
Each change below is adapted (not copied) and stays within the new flat
color system — no reference site's literal shapes or stock art.

### 6.1 Hero — split panel + orbiting accent

Replace the current centered/reversed-flex hero (photo blob + text) with
a two-column split at `lg` and up (stacked on mobile, unchanged from
current stacking behavior):
- **Text column:** name, role (keeps the existing blinking-caret
  treatment from the prior polish pass, recolored to `accent`), tagline,
  CTAs, stats — all unchanged in content and order.
- **Photo column:** the existing `/images/me.jpg`, square-cropped
  (`aspect-square`, `rounded-2xl` — not circular), sitting inside a
  solid `bg-accent-strong` panel slightly larger than the photo (an
  offset hard-edged frame, Mikon's split-block idea), no blur, no glow.
- **Orbiting dashed ring** (Nichol's dashed-motion-line idea, adapted):
  a single `border-dashed` circle/arc, `border-accent/40`, positioned
  behind/around the photo panel — a flat SVG or CSS `border-dashed`
  circle, no blur, no illustration. One decorative touch, not a motif
  repeated everywhere.

This is a layout change to `Hero.tsx` only; no new data fields, no
change to `profile`/`getHeroStats`.

### 6.2 Featured Projects — glass-overlay hover, asymmetric grid

- **Grid:** replace the uniform 3-equal-columns grid with an
  asymmetric layout on `lg`+ — the first (primary) featured project
  spans 2 columns / larger tile, the remaining two stack as smaller
  tiles beside it (a simple bento-style split, `grid-cols-3` with the
  first card `col-span-2`). Falls back to the current stacked/2-column
  behavior below `lg`. Card order stays exactly as `getFeaturedProjects()`
  returns it — the layout doesn't imply a ranking change beyond what's
  already true (first item = first result).
- **Hover treatment:** replace the current accent-tint sheen (from the
  prior polish pass) with a proper glass-overlay panel, Mikon-style —
  on hover, a `backdrop-blur` panel slides up from the bottom of the
  card containing the tech tags and the "View case study →" CTA, over
  a scrim; the title stays visible above it at all times. Still no
  fabricated screenshots (per Phase 5's CONTENT-TODO note that no real
  project screenshots exist yet) — the overlay sits over the card's
  existing solid surface, not over an image.

### 6.3 Testimonials — large pull-quote layout

Replace the plain 3-card grid with one larger featured quote (the
first testimonial) set in the large italic-serif treatment (extending
the one-serif-moment rule from the prior polish pass to this second,
deliberate spot) plus attribution, with the remaining testimonials in a
smaller two-up row below it — an editorial "lead quote + supporting
quotes" layout instead of three equal boxes.

### 6.4 Nav — flat tracked links

Nav links switch from `text-muted` soft gray to uppercase,
letter-spaced (`tracking-[0.1em] text-xs font-medium`) labels with a
2px `accent`-colored underline on the active route (Mikon's nav
treatment), replacing the current plain-weight lowercase links. Desktop
only — the mobile menu keeps its current larger tap-friendly labels
(uppercase tracking at mobile sizes hurts tap-target legibility more
than it adds polish). Active-route detection uses `usePathname()` from
`next/navigation` (`Nav` is already a client component); the current
route's link gets the underline, others don't — no active state on `/`
sub-anchors like `/#contact`.

### 6.5 Experience/Timeline — dashed connector

The existing vertical timeline (`components/ui/Timeline.tsx`) switches
its solid `border-l` connector to `border-dashed`, echoing the Hero's
dashed-ring accent as a small recurring (but not overused) motif tying
the two sections together. Dot markers stay solid `bg-accent-strong`
(no dashed dots — solid anchors on a dashed line reads clearly, dashed
dots would not).

## 7. Testing approach

- **`ThemeToggle`**: standard Vitest/RTL — renders, click toggles
  `document.documentElement.dataset.theme`, writes to
  `localStorage.theme`, updates its own `aria-label`. `window.matchMedia`
  is already mocked in `vitest.setup.ts` (default `matches: false`);
  tests override it per-case with `vi.fn()` the same way reduced-motion
  tests do.
- **Every component test that asserts on `className` content**
  referencing old tokens (`accent-from`, `bg-gradient`, `rounded-full`
  on the eyebrow, etc. — see the Phase-5-polish additions to
  `Section.test.tsx`/`StatTile.test.tsx`/`Hero.test.tsx`/
  `ProjectCard.test.tsx`) is updated to assert the new class names.
  Tests that only assert on text/role/href content are unaffected.
- **New/updated coverage for the structural changes in §6**: `Nav.test.tsx`
  gets a case asserting the current route's link carries the active
  underline class and others don't (mocking `usePathname`, same pattern
  as any existing Next-navigation mock in this suite, or `vi.mock`
  otherwise); `FeaturedProjects.test.tsx` asserts the first card
  carries the spanning class; `ProjectCard.test.tsx` asserts the
  overlay panel exists and is `aria-hidden` off (i.e. its content is
  still reachable/readable, not visually-hidden from assistive tech)
  since it duplicates no unique information (tags/CTA already exist in
  the base card); `Testimonials.test.tsx` asserts the first testimonial
  renders in the lead-quote treatment and the other two render in the
  supporting row.
- **No automated contrast/visual-regression test** — contrast is
  hand-verified against the token table in §3 during implementation
  review (the same "verify color choices are AA" step Phase 1 did for
  `accent-text`), and a manual Playwright screenshot pass (both themes,
  desktop + mobile) is part of the controller's final whole-branch
  review before merge, the same way Phase 5's Lighthouse pass worked —
  not a task in the SDD loop itself.
- `yarn build` must still succeed (24 routes, `/icon` and
  `/opengraph-image` included). `app/icon.tsx` / `app/opengraph-image.tsx`
  use `next/og`'s `ImageResponse`, which renders outside the browser and
  cannot read CSS custom properties — both files currently hardcode the
  old literal hex values (`#6366F1`→`#A855F7` gradient, `#0A0A0F`,
  `#818CF8`) and need a direct, manual edit to the new dark-theme hex
  values from §3's table (`icon.tsx`'s gradient background becomes a
  solid `#0D9488`, per the no-gradient rule in §5). This is its own
  small task in the implementation plan, not a side effect of the
  token-system change.

## 8. Non-goals / explicit deferrals (recap)

- No dependency added for theming (no `next-themes`) — the inline
  script + CSS attribute selector covers it at this scale.
- No redesign of information architecture, copy, or data files.
- No attempt to literally match Nichol's or Mikon's layouts — patterns
  are adapted, not copied (per `reference-style-guide.md`'s "what not
  to copy directly").
