# Portfolio Phase 2 — Featured Projects / Case Studies — Design Spec

Date: 2026-09-20
Owner: Madan G.C
Parent spec: `docs/superpowers/specs/2026-09-16-portfolio-redesign-design.md`

## 1. Purpose

Phase 1 (Foundation, merged to `main` at commit `4033c5b`) shipped the design
system, layout, and Home page. Its nav and Hero already link to `/work`, which
does not exist yet — a known, tracked gap in `CONTENT-TODO.md`. Phase 2 closes
that gap: it builds the case-study system for the 7 named projects (parent
spec §7) that is the single most important section for the site's stated
goals (freelance clients and recruiters judge real work, not claims).

This phase does not change any decision from the parent spec — it implements
what parent spec §5 (IA), §7 (content model), and §9 (Phase 2 scope) already
call for, plus the two decisions made in this session's brainstorming (image
placeholder strategy, and keeping all 7 projects' links as placeholder).

## 2. Non-goals

- No real screenshots, GitHub repos, or live URLs — all 7 projects ship with
  placeholder content exactly like Phase 1's testimonials, tracked in
  `CONTENT-TODO.md`. (Confirmed this session: user has no real links ready
  now and wants consistency across all 7 rather than a partial mix.)
- No blog, Open Source, or Community pages — those are Phases 3-4.
- No image upload/CMS tooling — screenshots, when real ones exist, are added
  the same way `public/images/me.jpg` was: a file drop plus a data-file field
  update.

## 3. Decisions from this session's brainstorming

| Decision | Choice | Why |
|---|---|---|
| Screenshot placeholder | Styled `ImagePlaceholder` block (gradient + project name + "Screenshot coming soon"), sized like a real screenshot | Looks intentional rather than broken; swapping in a real image later is a one-field data change, not a layout change. |
| Project links (GitHub/live URL) | All 7 stay placeholder (`undefined`) for now | User has no real links ready; consistency across all 7 avoids an awkward partial-real-partial-placeholder look on the `/work` index. |
| Shared section pattern | Extract `components/ui/Section.tsx` before building case-study sections | Phase 1's final review flagged that Skills/Experience/Testimonials already triplicate the eyebrow+heading+`FadeIn` pattern; Phase 2 adds 5 more section instances per case study × 7 pages — the duplication would otherwise multiply badly. |

## 4. Information architecture

```
/work                 Project index — grid of all 7 case studies
/work/[slug]           Individual case study (7 static pages)
```

Both statically generated (`generateStaticParams()` returning the 7 fixed
slugs), matching the rest of the site's static-export pattern.

Home page gains one new section (per parent spec §5's already-defined order,
which reserved this exact slot): **Featured Projects**, inserted between
Trust and Skills — the HTML comment placeholder Phase 1 left at that spot in
`app/page.tsx` is replaced with the real section.

## 5. Data model — `data/projects.ts`

```ts
export interface Project {
  slug: string;
  title: string;
  summary: string;       // one-line card description
  overview: string;
  challenge: string;
  approach: string;
  techStack: string[];
  results: string;
  learnings: string;
  github?: string;       // undefined for all 7 initially
  liveUrl?: string;      // undefined for all 7 initially
  featured: boolean;     // drives Home page "Featured Projects" selection
}
```

The 7 entries (slugs derived from parent spec §7's named list): MGCora Unused
Media Finder, WP Travel Engine Testimonials, Tripcart Pricing Page, Shubha
Events Refactor, Trailvista Theme, Codewing Website, Hasta Arts Client Work.
`overview`/`challenge`/`approach`/`results`/`learnings` are realistic-sounding
placeholder text (same policy as Phase 1's testimonials): plausible given the
project name, clearly generic rather than fabricated-specific claims, and
every field tracked in `CONTENT-TODO.md` for replacement with real detail.
`techStack` is a reasonable inferred guess per project name (e.g. a
"WordPress Theme" project lists WordPress/PHP/SCSS) — also flagged for
confirmation. 3 of the 7 are marked `featured: true` for the Home page strip,
chosen for variety across the site's stated goals rather than at random:
**MGCora Unused Media Finder** (open-source WordPress plugin — supports the
open-source-credibility goal), **Trailvista Theme** (WordPress theme —
supports the WordPress-product goal), **Codewing Website** (agency client
site — supports the freelance/frontend-dev goal). This selection is a
placeholder editorial choice like everything else in this data set (see §10)
and should be revisited once real results exist.

## 6. Components

- **`components/ui/Section.tsx`** — `{ eyebrow, title, children }`, wraps
  content in the existing eyebrow/heading/`FadeIn` markup currently
  duplicated in `Skills.tsx`/`Experience.tsx`/`Testimonials.tsx`. Those three
  are refactored to use it (behavior-preserving refactor — their existing
  tests must keep passing unchanged, proving no visible/behavioral change).
- **`components/ui/ImagePlaceholder.tsx`** — `{ label }`, the styled
  "screenshot coming soon" block described in §3.
- **`components/projects/ProjectCard.tsx`** — `{ project: Project }`, a
  `Card`-based summary tile (title, summary, tech tags, "View case study"
  link to `/work/[slug]`) — used by both `/work`'s grid and Home's Featured
  Projects strip.

## 7. Pages

- **`app/work/page.tsx`** — index page: heading + grid of all 7
  `ProjectCard`s via `data/projects.ts`.
- **`app/work/[slug]/page.tsx`** — case-study template: header (title,
  summary, tech tags, GitHub/Live `Button`s rendered only when that project's
  field is set — none are today), then `Section`-wrapped Overview, Challenge,
  Approach, an `ImagePlaceholder`, Results, and Key Learnings.
  `generateStaticParams()` returns the 7 slugs; an unknown slug 404s via
  Next.js's default not-found behavior (no custom handling needed for 7
  fixed, known-good slugs).
- **`components/sections/FeaturedProjects.tsx`** — Home page section: the 3
  `featured: true` projects as `ProjectCard`s, plus a "View all projects"
  link to `/work`.

## 8. Testing

Following Phase 1's pattern: a colocated test per new component/page.
- `Section.test.tsx`, `ImagePlaceholder.test.tsx`, `ProjectCard.test.tsx` —
  standard rendering/prop tests.
- `Skills.test.tsx`/`Experience.test.tsx`/`Testimonials.test.tsx` — existing
  tests must pass unchanged after the `Section` refactor (regression proof).
- `app/work/page.test.tsx` — asserts all 7 project titles/links render.
- `app/work/[slug]/page.test.tsx` — one test rendering a specific known slug,
  asserting title, tech tags, and all 6 content sections render; a second
  test confirming `generateStaticParams()` returns exactly the 7 expected
  slugs.
- `FeaturedProjects.test.tsx` — asserts exactly the 3 `featured: true`
  projects render, plus the "View all projects" link.
- `app/page.test.tsx` (Phase 1's Home smoke test) — extended with one
  assertion that the Featured Projects section is now present.

## 9. `CONTENT-TODO.md` updates

Add one consolidated entry per project (or one entry covering all 7,
whichever reads better at write time) noting: real screenshots, real
challenge/solution/results/learnings copy, and confirmed GitHub/live URLs
are all outstanding for every one of the 7 case studies. Remove or update the
existing "Major Projects: 7+" entry once these 7 are live, since the number
is now backed by real pages rather than an unverified stat.

## 10. Risks / follow-ups

- `techStack` guesses per project could be wrong given no real detail exists
  yet — flagged in `CONTENT-TODO.md` for confirmation alongside the rest of
  each project's content.
- Which 3 projects are `featured: true` is a placeholder editorial choice,
  not a strategic one — worth revisiting once real results exist and it's
  clear which projects actually demonstrate the strongest outcomes.
