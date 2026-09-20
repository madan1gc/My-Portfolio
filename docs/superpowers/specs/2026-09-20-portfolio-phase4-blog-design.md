# Portfolio Phase 4 — Blog — Design Spec

Date: 2026-09-20
Owner: Madan G.C
Parent spec: `docs/superpowers/specs/2026-09-16-portfolio-redesign-design.md`

## 1. Purpose

Closes the last of the Nav's known dead-link entries (`/blog` — after this
phase, every Nav link resolves to a real page). Implements parent spec §9
Phase 4 exactly as scoped: "index/post template, 5 stub entries, content
strategy notes... ships structure + strategy, not finished articles."

## 2. Ruling: placeholder bodies, no fabricated dates

Parent spec §7 pre-authorized shipping "PLACEHOLDER bodies" for the 5 named
articles ("Lessons from Building WordPress Plugins," "What I Learned
Contributing to WordCamp," "Elementor vs Bricks," "Frontend Performance
Tips," "My Journey as a Frontend Developer"). This phase writes short (2-3
paragraph), generic-but-plausible intro copy per post — setting up the topic
without asserting specific unverified technical claims or code details that
should come from the real author. No publish dates are invented (a specific,
checkable, fabricatable claim like a WordCamp date or a download count) —
posts are ordered by array position only, with no date field at all. All 5
are tracked in `CONTENT-TODO.md` as needing to actually be written before
public launch.

## 3. Non-goals

- No finished articles, no publish dates, no author bio/comments system.
- No CMS — same typed-data-file approach as every other phase.
- No changes to Phase 1-3 pages beyond the two additions in §5.

## 4. Data model

```ts
// data/blogPosts.ts
export interface BlogPost {
  slug: string;
  title: string;
  dek: string; // one-line summary, used on cards and as meta description
  body: string[]; // paragraphs, placeholder content
}

export const blogPosts: BlogPost[] = [
  // 5 entries, slugs derived from the 5 titles named in parent spec §7
];
```

## 5. Pages & Home integration

- **`app/blog/page.tsx`**: `Section as="h1"` + grid of `BlogPostCard` for all
  5 posts (same static-index pattern as `/work`).
- **`app/blog/[slug]/page.tsx`**: `generateStaticParams()` returning the 5
  slugs; renders title (`<h1>`), dek, body paragraphs, and a "← Back to
  blog" link. Simpler than the case-study template — one continuous article
  body, not multiple labeled sections.
- **`components/blog/BlogPostCard.tsx`**: `{post}` → title, dek, "Read post
  →" link with a distinct `aria-label` per post (matching the
  `ProjectCard`/`CommunityStrip` accessibility pattern established in
  Phases 2-3).
- **`components/sections/BlogPreview.tsx`**: Home page section — the first 3
  posts (array order, since no real dates exist) as `BlogPostCard`s, plus a
  "View all posts" link to `/blog`. Fills the Phase 4 placeholder slot
  already reserved in `app/page.tsx` (before Contact).

## 6. `CONTENT-TODO.md` updates

- Remove `/blog` from the Nav blocking item entirely — after this phase, no
  Nav links 404.
- Add: all 5 blog posts need their placeholder bodies replaced with real,
  finished articles before they're presented as genuine posts.
- Remove the "Phase 4 — Blog" later-phases bullet (now built).

## 7. Testing

Standard per-component/page tests following Phases 1-3 conventions:
`blogPosts.test.ts` (5 unique slugs), `BlogPostCard.test.tsx`,
`app/blog/page.test.tsx`, `app/blog/[slug]/page.test.tsx`
(`generateStaticParams` returns exactly 5 slugs), `BlogPreview.test.tsx`
(exactly 3 posts render), and one extended assertion in `app/page.test.tsx`
and one sitemap update (`app/sitemap.ts` +6 URLs: `/blog` + 5 posts).
