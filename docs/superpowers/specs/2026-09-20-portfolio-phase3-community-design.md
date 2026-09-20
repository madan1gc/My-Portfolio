# Portfolio Phase 3 — Open Source & Community — Design Spec

Date: 2026-09-20
Owner: Madan G.C
Parent spec: `docs/superpowers/specs/2026-09-16-portfolio-redesign-design.md`

## 1. Purpose

Closes two more of the Nav's known dead-link entries (`/open-source`,
`/community` — `CONTENT-TODO.md` blocking item), and gives the WordPress
open-source/community credibility goal (parent spec §1, goal 4/5) an actual
page instead of a nav link to nowhere.

## 2. Ruling: honest-and-thin over complete-and-fabricated

The parent spec's aspirational description (§7) called for a "contribution
timeline," "plugin downloads," "releases," and multi-entry WordCamp
role/year/achievement lists. None of that data is confirmed real. Unlike
Phase 2's case-study prose (generic, non-fabricated placeholder narrative
about the user's own past work), a wrong download count or an invented
WordCamp Asia appearance would be a specific, checkable, false claim about a
real public WordPress.org profile and real named community events — a
materially worse integrity risk. So this phase does not build the
aspirational multi-entry timelines. It ships only what's confirmed:

- **`/community`**: a single `Timeline` entry — WordCamp Kathmandu 2022,
  Organizer (already confirmed real in Phase 1's `data/trust.ts` and the
  original resume). No Nepal/Asia entries.
- **`/open-source`**: the real WordPress.org profile link
  (`https://profiles.wordpress.org/madan1gc/`) as the primary CTA, plus a
  feature callout for **MGCora Unused Media Finder** — the one plugin-shaped
  project already established in Phase 2's `data/projects.ts` — linking to
  its existing case study at `/work/mgcora-unused-media-finder`. No invented
  download counts, release dates, or additional plugin/theme entries.

Both pages are intentionally short. `CONTENT-TODO.md` tracks expanding them
once real contribution history and confirmed additional WordCamp appearances
exist.

## 3. Non-goals

- No fabricated WordCamp Nepal/Asia entries, no invented WordPress.org stats.
- No blog (Phase 4).
- No changes to Phase 1/2 pages beyond the two additions in §5 below.

## 4. Data model

```ts
// data/wordcamps.ts
export interface WordCampEntry {
  event: string;
  role: string;
  year: string;
  achievements: string[];
}

export const wordcamps: WordCampEntry[] = [
  {
    event: 'WordCamp Kathmandu',
    role: 'Organizer',
    year: '2022',
    achievements: [
      'Volunteered as an organizer for WordCamp Kathmandu 2022.',
      'Recognized for dedicated volunteer service to the local WordPress community.',
    ],
  },
];
```

```ts
// data/openSource.ts
export const openSource = {
  profileUrl: 'https://profiles.wordpress.org/madan1gc/',
  headline: 'Building in the open on WordPress.org.',
  description:
    "I contribute to the WordPress ecosystem through plugin development and community involvement. MGCora Unused Media Finder is my flagship open-source project — a WordPress plugin that helps site owners safely clean up unused media library files.",
  featuredProjectSlug: 'mgcora-unused-media-finder',
} as const;
```

`featuredProjectSlug` is looked up against Phase 2's `getProjectBySlug()` at
render time — one data source for the project's title/summary/link, not a
duplicated copy.

## 5. Pages & Home integration

- **`app/open-source/page.tsx`**: `<h1>` + description, a prominent "View
  WordPress.org Profile" `Button` (external), and a `ProjectCard` (reusing
  Phase 2's component) for the featured project via `getProjectBySlug`.
- **`app/community/page.tsx`**: `<h1>` + description, `Timeline` (reusing
  Phase 1's component) rendering the single `wordcamps` entry mapped to
  `TimelineItem` shape (`event`→title, `role`→subtitle, `year`→period,
  `achievements`→description).
- **`components/sections/CommunityStrip.tsx`**: the Home page's "Open
  Source/Community highlight strip" (parent spec §5's already-reserved slot,
  between Experience and Testimonials) — two simple linked cards, one per
  page, each a short teaser + link.
- `app/page.tsx`: replace the Phase 3 HTML comment with `<CommunityStrip />`.

## 6. `CONTENT-TODO.md` updates

- Remove `/open-source` and `/community` from the Nav dead-links blocking
  item (only `/blog` remains pending, for Phase 4).
- Add: real WordPress.org contribution stats/timeline pending; additional
  WordCamp appearances (Nepal/Asia or others) pending confirmation before
  adding to `/community`.

## 7. Testing

Standard per-component/page tests, following Phase 1/2 conventions:
`wordcamps.test.ts`/`openSource.test.ts` (data shape), `app/open-source/page.test.tsx`,
`app/community/page.test.tsx`, `CommunityStrip.test.tsx`, and one extended
assertion in `app/page.test.tsx` for the new Home section.
