# Portfolio Phase 5 — Polish — Design Spec

Date: 2026-09-20
Owner: Madan G.C
Parent spec: `docs/superpowers/specs/2026-09-16-portfolio-redesign-design.md`

## 1. Purpose

The final phase in the original roadmap (parent spec §9: "Polish —
SEO/schema audit, Lighthouse/performance pass, accessibility pass,
`CONTENT-TODO.md` finalization, final QA"). Phases 1-4's final reviews each
surfaced small cross-cutting issues that were deliberately deferred here
rather than patched piecemeal per-phase (several reviewers explicitly
recommended this). This phase closes that backlog and does the genuine new
"Polish" work the parent spec scoped: dynamic favicon/OG image generation
and structured data for case studies and blog posts.

## 2. Scope

**Closing the accumulated backlog:**
- Heading-order gap (`<h1>` straight to `<h3>`, no `<h2>`) on `/work`,
  `/community`, `/open-source`, `/blog` — all four use `Section as="h1"`,
  whose title sentence renders as a `<p>`. Promote it to `<h2>` specifically
  when `as="h1"`, leaving the default (`as="h2"`, used by every Home
  section) untouched.
- `FeaturedProjects` and `BlogPreview`'s "View all X →" footer links render
  a bare arrow glyph, unlike `ProjectCard`/`BlogPostCard`/`CommunityStrip`,
  which all wrap it in `aria-hidden`. Make the two footer links consistent
  with the established pattern.
- `app/blog/[slug]/page.tsx` uses `key={paragraph}` (paragraph text as React
  key) — fragile if a future post repeats a paragraph verbatim. Fix to an
  index-based key.
- `components/layout/Nav.tsx`'s mobile menu `<ul>` renders as a sibling of
  `<nav>`, not nested inside it — links in the mobile menu sit outside the
  "Primary" navigation landmark. Also has no Escape-to-close handling. Fix
  both.

**Genuine new Polish work (parent spec §8):**
- Dynamic favicon (`app/icon.tsx`) and Open Graph image
  (`app/opengraph-image.tsx`) generated via `next/og`'s `ImageResponse` —
  real, functioning images built from the site's own design tokens and
  copy, not placeholder assets requiring an external file.
- `CreativeWork` JSON-LD on `/work/[slug]` pages, `BlogPosting` JSON-LD on
  `/blog/[slug]` pages (parent spec §8 named these explicitly; `Person`
  JSON-LD on Home already shipped in Phase 1).
- `CONTENT-TODO.md` finalization: fold in the newly-resolved items, add the
  explicit résumé-404 caveat a Phase 4 reviewer recommended, and record the
  one deliberately-deferred item (focus-ring class-string duplication across
  9 files) as accepted low-priority technical debt rather than silently
  dropping it.

## 3. Non-goals / explicit deferrals

- **Focus-ring class-string extraction** (duplicated across 9 files) is
  real duplication but zero end-user impact — recorded in
  `CONTENT-TODO.md` as accepted technical debt, not fixed this phase, to
  keep this phase's diff focused on user-facing/SEO/a11y impact.
- **No fabricated `datePublished`** on `BlogPosting` JSON-LD — omitted
  entirely until real publish dates exist (tracked in `CONTENT-TODO.md`),
  consistent with every prior phase's no-fabrication policy.
- **No Lighthouse/browser audit as an SDD task** — `next/og` image
  generation and live performance/accessibility auditing aren't
  TDD-shaped work (no meaningful RED state, and Lighthouse needs a running
  server + browser). The controller runs a real Lighthouse/accessibility
  pass against the merged, built site after this phase lands and appends
  findings directly to `CONTENT-TODO.md`'s "Final QA" section, fixing
  anything significant as its own follow-up rather than folding
  open-ended exploration into this plan's task loop.

## 4. Testing approach for non-TDD-shaped work

`app/icon.tsx` and `app/opengraph-image.tsx` are Next.js special convention
files verified by the framework's own build step (they appear as `/icon`
and `/opengraph-image` routes in `next build`'s output) — the same way
`export const metadata` blocks elsewhere in this codebase have never had
dedicated unit tests. Their acceptance criterion is `yarn build` succeeding
and listing both routes, not a RED/GREEN Vitest cycle.

Everything else in this phase (`Section`, `Nav`, the JSON-LD additions) is
ordinary component logic and gets the same TDD treatment as every prior
phase.
