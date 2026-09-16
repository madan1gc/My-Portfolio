# Portfolio Redesign — Design Spec

Date: 2026-09-16
Owner: Madan G.C

## 1. Purpose & goals

Rebuild `madan1gc`'s personal portfolio from a single static HTML/Sass page into a
premium, multi-page Next.js site that supports five outcomes:

1. Better frontend developer job opportunities
2. WordPress product development opportunities
3. Freelance client acquisition
4. Open source credibility (WordPress.org contributions)
5. Speaking/contributor opportunities in the WordPress community

Target audience: startup founders, agency owners, WordPress product companies,
recruiters, freelance clients.

Visual/UX bar: Linear, Vercel, Framer, Stripe, Raycast, Tailwind CSS marketing sites —
dark-mode-first, minimal, high-whitespace, subtle motion, strong typographic hierarchy.

## 2. Non-goals (this phase)

- No CMS / editor UI (rejected in favor of typed data files — see §5).
- No fabricated case-study metrics, client quotes, or WordCamp photos. Every
  results/metric/testimonial/photo field is either real (supplied by the user) or an
  explicitly tracked placeholder (see §7).
- No blog articles written yet — only the content strategy + listing/post
  infrastructure + 5 recommended stub entries.
- No phone number or Instagram/X links on the public site (explicit decisions, §4).

## 3. Confirmed real content (source: `Madan-GC-cv.pdf` + user replies, 2026-09-16)

- Name / role: Madan G.C — Frontend Developer & WordPress Product Builder
- Email: `madan1239@gmail.com`
- GitHub: `https://github.com/madan1gc`
- LinkedIn: `https://www.linkedin.com/in/madan-g-c-492b23198/`
- WordPress.org profile: `https://profiles.wordpress.org/madan1gc/`
- Phone: present on resume but **excluded from the public site** per user decision.
- Instagram/X: **not included** per user decision.
- Experience:
  - Codewing Solutions (Kathmandu) — Frontend Developer, May 2022–Present. Custom
    WordPress themes/plugins, custom Elementor widgets, React components,
    performance/SEO optimization, cross-functional collaboration.
  - Ekbana Solution (Kathmandu) — Frontend Intern, Jan 2022–Apr 2022. HTML/CSS/JS/React,
    mentorship under senior devs.
- Education: Bachelor's in Information Technology, Padmashree College, Kathmandu.
- Recognition: WordCamp Organizer, WordCamp Kathmandu 2022 (volunteer service).
- Tenure math: May 2022 → Sept 2026 is **4+ years**, not the "3+ years" on the old
  resume/site — hero stats should say **4+ Years Experience** (recompute at build time
  relative to a start-date constant, not a hardcoded string, so it stays correct).
- Resume PDF: user will place the file at `public/resume/Madan-GC-Resume.pdf`; the
  "Download Resume" button links there. **Blocked until the file exists in the repo.**

## 4. Key decisions (from brainstorming Q&A)

| Decision | Choice | Why |
|---|---|---|
| Framework | Next.js (App Router) + TypeScript | User explicitly chose this over static HTML/Astro, to demonstrate React skill directly to recruiters. |
| Content management | Typed data files in-repo (no CMS, no MDX requirement) | Solo maintainer, free, no third-party dependency, easy to diff in git. |
| Case-study / testimonial content | Build now with clearly-marked placeholders | User does not have real screenshots/metrics/quotes ready; wants to see full structure immediately. |
| Phone number | Omit from public site | Avoid spam/robocalls; email/GitHub/LinkedIn/WP.org are enough contact surface. |
| Instagram/X | Omit | Keep contact section focused on professional/dev channels for this audience. |
| Placeholder visibility | Realistic-looking filler copy + code `// TODO` comments + one `CONTENT-TODO.md` checklist, not visible on-page "placeholder" badges | Keeps the live demo looking finished; checklist is the single source of truth for what must be swapped before real launch. |
| Hosting | Vercel | Matches Next.js, zero-config, matches the aesthetic inspiration (Vercel is a direct reference). |

## 5. Information architecture

Multi-page site (case studies and blog posts need their own shareable/indexable URLs):

```
/                     Home
/work                 Case study index (all 7 projects)
/work/[slug]          Individual case study (7 pages)
/open-source          WordPress.org contributions, plugins, timeline
/community            WordCamp timeline (Kathmandu / Nepal / Asia)
/blog                 Blog index
/blog/[slug]          Blog post
```

Contact is **not** a separate route — it's the final Home section plus footer, to keep
the primary conversion path short.

Home page section order:
Hero → Trust strip → Featured Projects (3–4 cards linking into `/work`) → Skills →
Experience timeline → Open Source/WordCamp highlight strip (links to `/open-source` and
`/community`) → Testimonials → Blog preview (latest 3) → Contact CTA → Footer.

Nav (sticky, blurred backdrop): Work · Open Source · Community · Blog · Résumé
(download) · "Let's talk" CTA button.

## 6. Design system

**Color** (dark-mode-first; the only mode for v1 — no light-mode toggle in scope):
- Background: `#0A0A0F`
- Card surface: `#12121A`
- Border: `#232330`
- Text primary: `#F5F5F7`
- Text secondary: `#9CA3AF`
- Gradient accent: `#6366F1 → #A855F7`, used sparingly — CTAs, active nav state, card
  hover glow, section eyebrow labels. Not applied globally like the current cyan.

**Typography**: Geist for UI/headings (free, matches the Vercel reference directly),
Geist Mono for tags/labels/code snippets. Hero heading ~88px desktop / ~40px mobile,
tight letter-spacing, weight 600–700. Body copy max-width ~68ch, 16–18px, 1.6–1.7 line
height.

**Spacing scale**: 4/8/12/16/24/32/48/64/96/128 (Tailwind default scale).

**Core components** (built once, reused everywhere):
- Button: primary (gradient fill), secondary (outline), ghost
- Tag/pill (tech stack labels, skill badges)
- Card: project card, skill card, testimonial card — border + hover-lift + gradient glow
- Timeline (shared by Experience and WordCamp sections)
- Stat tile (hero quick stats)
- Section wrapper (consistent vertical rhythm/eyebrow/heading pattern)
- Nav bar, Footer

## 7. Content model & placeholder tracking

Each data file below drives one or more sections/routes. Fields marked **REAL** come
from §3; fields marked **PLACEHOLDER** get realistic filler text now and must be
tracked in `CONTENT-TODO.md` for the user to replace before public launch.

- `data/profile.ts` — name, role, bio, contact links, résumé path. **REAL** (§3).
- `data/skills.ts` — Frontend / WordPress / Tools categories. **REAL** (from resume +
  brief's expanded list: HTML, CSS, SCSS, JS, React / Theme Dev, Elementor, Bricks,
  Gutenberg, Plugin Dev / Git, GitHub, Figma, Cursor, AI Studio, n8n).
- `data/experience.ts` — Codewing + Ekbana entries. **REAL** (§3).
- `data/projects.ts` — 7 projects (MGCora Unused Media Finder, WP Travel Engine
  Testimonials, Tripcart Pricing Page, Shubha Events Refactor, Trailvista Theme,
  Codewing Website, Hasta Arts Client Work). Per project: overview, challenge,
  approach/solution, tech stack, screenshots, before/after, GitHub/live URL, results,
  key learnings. **PLACEHOLDER** for challenge/solution/results/screenshots/before-after
  until the user supplies specifics per project; tech stack can be reasonably inferred
  from context and confirmed later.
- `data/openSource.ts` — WordPress.org profile stats, plugin/theme contributions,
  timeline entries. **PLACEHOLDER** — needs real contribution history from
  profiles.wordpress.org/madan1gc/.
- `data/wordcamps.ts` — WordCamp Kathmandu (2022, Organizer — **REAL**), WordCamp Nepal,
  WordCamp Asia entries (role/year/achievements/photos). **PLACEHOLDER** for Nepal/Asia
  until confirmed whether/when attended.
- `data/testimonials.ts` — client/team/community quotes. **PLACEHOLDER** — no real
  quotes supplied yet.
- `data/blogPosts.ts` — 5 recommended article stubs (title + dek + placeholder body):
  "Lessons from Building WordPress Plugins," "What I Learned Contributing to
  WordCamp," "Elementor vs Bricks," "Frontend Performance Tips," "My Journey as a
  Frontend Developer." **PLACEHOLDER** bodies — this phase ships structure + strategy,
  not finished articles.

`CONTENT-TODO.md` (repo root) will enumerate every PLACEHOLDER field above with the
exact file/line to edit, so nothing fabricated silently ships to production.

## 8. Technical architecture

- Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion for scroll-reveal/hover
  micro-interactions (client islands only; respects `prefers-reduced-motion`).
- Server Components by default; motion/interactive pieces are the only client
  components.
- Images via `next/image`; project screenshots under `public/projects/[slug]/`.
- SEO: per-route `metadata` exports, OG image generation, JSON-LD (`Person` on Home,
  `CreativeWork` on case studies, `BlogPosting` on posts), `sitemap.xml`/`robots.txt` via
  Next.js file conventions.
- Accessibility: semantic landmarks, skip-to-content link, visible focus states, AA
  contrast minimum, reduced-motion support throughout.
- Deployment: Vercel.

## 9. Implementation phases

1. **Foundation** — Next.js scaffold, design system/tokens, Tailwind config, shared
   components (Button/Tag/Card/Timeline/StatTile/Nav/Footer), Home page sections
   (Hero, Trust strip, Skills, Experience, Testimonials-placeholder, Contact), SEO
   basics, Vercel deploy pipeline.
2. **Featured Projects** — `data/projects.ts`, case-study page template, `/work` index,
   7 `/work/[slug]` pages, Home "Featured Projects" grid.
3. **Open Source + Community** — `/open-source` and `/community` pages with timeline
   component reuse.
4. **Blog** — index/post template, 5 stub entries, content strategy notes.
5. **Polish** — SEO/schema audit, Lighthouse/performance pass, accessibility pass,
   `CONTENT-TODO.md` finalization, final QA.

Each phase is independently shippable; Phase 1 alone already replaces the current
single-page site with a materially stronger one.

## 10. Open risks / follow-ups

- Résumé download is blocked until the PDF is placed in the repo.
- Case study, open-source, WordCamp, and testimonial content require real input from
  the user before public launch — tracked in `CONTENT-TODO.md`, not blocking Phase 1–2
  scaffolding.
- WordCamp Nepal/Asia participation not yet confirmed — may need to be dropped from
  `/community` if the user never attended those.
