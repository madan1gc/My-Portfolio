# Portfolio Phase 3 (Open Source & Community) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `/open-source` and `/community` pages, close two more of the
Nav's known dead-link entries, and add a Home page "Community" highlight
strip — while shipping only confirmed-real content (no fabricated WordCamp
appearances or WordPress.org stats).

**Architecture:** Extends `Section` (from Phase 2) with an `as?: 'h1' | 'h2'`
prop so top-level route pages can reuse it instead of hand-rolling its
markup — closing the gap Phase 2's final review flagged and explicitly
deferred to this phase. `/community` reuses Phase 1's `Timeline`; `/open-source`
reuses Phase 2's `ProjectCard`. A new `CommunityStrip` Home section links to
both.

**Tech Stack:** Same as Phases 1-2 — Next.js 14 App Router, TypeScript,
Tailwind CSS, Vitest + React Testing Library. No new dependencies.

**Spec:** `docs/superpowers/specs/2026-09-20-portfolio-phase3-community-design.md`
(and parent: `docs/superpowers/specs/2026-09-16-portfolio-redesign-design.md`)

## Global Constraints

- No fabricated content: `data/wordcamps.ts` contains exactly one entry
  (WordCamp Kathmandu 2022, Organizer) — never add WordCamp Nepal/Asia
  entries, confirmed or not, in this phase. `data/openSource.ts` contains
  only the real WordPress.org profile URL and a reference to the existing
  `mgcora-unused-media-finder` project — never invent download counts,
  release dates, or additional plugin/theme entries.
- Color tokens (from Phase 1/2, still binding): background `#0A0A0F`,
  surface `#12121A`, border `#232330`, foreground `#F5F5F7`, muted `#9CA3AF`,
  accent gradient `#6366F1 → #A855F7`, small-text accent `#818CF8`
  (`text-accent-text`).
- Accessibility: every new interactive link needs the existing
  `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-from focus-visible:ring-offset-2 focus-visible:ring-offset-background`
  classes. Each page has exactly one `<h1>`.
- Every placeholder/thin-content decision this phase makes must be tracked
  in `CONTENT-TODO.md` (Task 7).
- Package manager is Yarn. `@/*` import alias resolves to repo root.

---

### Task 1: Make `Section` polymorphic; refactor `/work` to use it

**Files:**
- Modify: `components/ui/Section.tsx`, `components/ui/Section.test.tsx`,
  `app/work/page.tsx`
- Test (must keep passing unchanged): `app/work/page.test.tsx`

**Interfaces:**
- Produces: `Section({ eyebrow: string; title: string; as?: 'h1' | 'h2'; children: ReactNode })`
  — `as` defaults to `'h2'`, so every existing caller (Skills, Experience,
  Testimonials, FeaturedProjects) is unaffected.
- Consumed by: Task 4 (`/community`, `as="h1"`), Task 5 (`/open-source`,
  `as="h1"`).

Refactoring `/work` to use `Section` intentionally adds one small visual
change: the page header now fades in via `Section`'s built-in `FadeIn`,
matching every other page/section on the site (the old hand-rolled markup
didn't have this). This is expected, not a regression — `app/work/page.test.tsx`
doesn't test for animation state, only heading level and content, so it
should keep passing unchanged.

- [ ] **Step 1: Add a failing test for the `as` prop**

Add these two tests to the existing `describe('Section', ...)` block in
`components/ui/Section.test.tsx` (keep the existing test as-is):

```tsx
  it('renders the eyebrow as an <h1> when as="h1" is passed', () => {
    render(
      <Section eyebrow="Work" title="Case studies." as="h1">
        <p>Body</p>
      </Section>,
    );
    expect(screen.getByRole('heading', { name: 'Work', level: 1 })).toBeInTheDocument();
  });

  it('defaults to an <h2> eyebrow when as is omitted', () => {
    render(
      <Section eyebrow="Skills" title="Some descriptive title.">
        <p>Body</p>
      </Section>,
    );
    expect(screen.getByRole('heading', { name: 'Skills', level: 2 })).toBeInTheDocument();
  });
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `yarn test Section`
Expected: FAIL — `as="h1"` renders an `<h2>` (default), so the level-1 query
in the first new test finds nothing.

- [ ] **Step 3: Implement the `as` prop**

```tsx
import type { ReactNode } from 'react';
import { FadeIn } from '@/components/ui/FadeIn';

interface SectionProps {
  eyebrow: string;
  title: string;
  as?: 'h1' | 'h2';
  children: ReactNode;
}

export function Section({ eyebrow, title, as = 'h2', children }: SectionProps) {
  const Eyebrow = as;

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <FadeIn>
        <Eyebrow className="mb-2 text-xs uppercase tracking-[0.2em] text-accent-text">
          {eyebrow}
        </Eyebrow>
        <p className="mb-12 max-w-prose text-2xl font-semibold text-foreground sm:text-3xl">
          {title}
        </p>
      </FadeIn>
      {children}
    </section>
  );
}
```

- [ ] **Step 4: Run the test and verify it passes**

Run: `yarn test Section`
Expected: PASS (3 tests).

- [ ] **Step 5: Refactor `app/work/page.tsx` to use `Section`**

```tsx
import type { Metadata } from 'next';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { Section } from '@/components/ui/Section';
import { projects } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Work — Madan G.C',
  description: 'Case studies from WordPress and frontend projects I have built.',
};

export default function WorkPage() {
  return (
    <Section
      as="h1"
      eyebrow="Work"
      title="Case studies from WordPress products, custom plugins, and client frontend work."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 6: Run `/work`'s existing test and confirm no regression**

Run: `yarn test "app/work/page"`
Expected: PASS (same test as before, unchanged).

- [ ] **Step 7: Run the full suite and build**

Run: `yarn test && yarn build`
Expected: all tests pass, build succeeds.

- [ ] **Step 8: Commit**

```bash
git add components/ui/Section.tsx components/ui/Section.test.tsx app/work/page.tsx
git commit -m "feat: make Section polymorphic (h1/h2), refactor /work to use it"
```

---

### Task 2: Data layer — `data/wordcamps.ts`

**Files:**
- Create: `data/wordcamps.ts`, `data/wordcamps.test.ts`

**Interfaces:**
- Produces: `interface WordCampEntry { event: string; role: string; year: string; achievements: string[] }`,
  `wordcamps: WordCampEntry[]` (exactly 1 entry).
- Consumed by: Task 4 (`/community`).

- [ ] **Step 1: Write the failing test**

```ts
import { describe, expect, it } from 'vitest';
import { wordcamps } from './wordcamps';

describe('wordcamps', () => {
  it('has exactly one confirmed entry: WordCamp Kathmandu 2022', () => {
    expect(wordcamps).toHaveLength(1);
    expect(wordcamps[0].event).toBe('WordCamp Kathmandu');
    expect(wordcamps[0].role).toBe('Organizer');
    expect(wordcamps[0].year).toBe('2022');
  });

  it('does not include unconfirmed WordCamp Nepal or Asia entries', () => {
    const events = wordcamps.map((entry) => entry.event);
    expect(events).not.toContain('WordCamp Nepal');
    expect(events).not.toContain('WordCamp Asia');
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `yarn test data/wordcamps`
Expected: FAIL — `Cannot find module './wordcamps'`.

- [ ] **Step 3: Implement `data/wordcamps.ts`**

```ts
export interface WordCampEntry {
  event: string;
  role: string;
  year: string;
  achievements: string[];
}

// Only confirmed real appearances. WordCamp Nepal/Asia attendance is
// unconfirmed — do not add entries for them until confirmed (spec §2, §10
// of the parent design doc).
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

- [ ] **Step 4: Run the test and verify it passes**

Run: `yarn test data/wordcamps`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add data/wordcamps.ts data/wordcamps.test.ts
git commit -m "feat: add wordcamps data layer (one confirmed entry)"
```

---

### Task 3: Data layer — `data/openSource.ts`

**Files:**
- Create: `data/openSource.ts`, `data/openSource.test.ts`

**Interfaces:**
- Produces: `openSource: { profileUrl, headline, description, featuredProjectSlug }`.
- Consumed by: Task 5 (`/open-source`).

- [ ] **Step 1: Write the failing test**

```ts
import { describe, expect, it } from 'vitest';
import { getProjectBySlug } from './projects';
import { openSource } from './openSource';

describe('openSource', () => {
  it('has the confirmed real WordPress.org profile URL', () => {
    expect(openSource.profileUrl).toBe('https://profiles.wordpress.org/madan1gc/');
  });

  it('references a project slug that actually exists in the projects data', () => {
    const project = getProjectBySlug(openSource.featuredProjectSlug);
    expect(project).toBeDefined();
    expect(project?.title).toBe('MGCora Unused Media Finder');
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `yarn test data/openSource`
Expected: FAIL — `Cannot find module './openSource'`.

- [ ] **Step 3: Implement `data/openSource.ts`**

```ts
export const openSource = {
  profileUrl: 'https://profiles.wordpress.org/madan1gc/',
  headline: 'Building in the open on WordPress.org.',
  description:
    'I contribute to the WordPress ecosystem through plugin development and community involvement. MGCora Unused Media Finder is my flagship open-source project — a WordPress plugin that helps site owners safely clean up unused media library files.',
  featuredProjectSlug: 'mgcora-unused-media-finder',
} as const;
```

- [ ] **Step 4: Run the test and verify it passes**

Run: `yarn test data/openSource`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add data/openSource.ts data/openSource.test.ts
git commit -m "feat: add openSource data layer (real profile link, one featured project)"
```

---

### Task 4: `/community` page

**Files:**
- Create: `app/community/page.tsx`, `app/community/page.test.tsx`

**Interfaces:**
- Consumes: `Section({..., as: 'h1'})` (Task 1), `Timeline`/`TimelineItem`
  (Phase 1), `wordcamps` (Task 2).
- Produces: the `/community` route.

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CommunityPage from './page';

describe('CommunityPage', () => {
  it('renders the WordCamp Kathmandu 2022 entry and nothing else', () => {
    render(<CommunityPage />);
    expect(screen.getByRole('heading', { name: 'Community', level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'WordCamp Kathmandu' })).toBeInTheDocument();
    expect(screen.getByText('Organizer')).toBeInTheDocument();
    expect(screen.getByText('2022')).toBeInTheDocument();
    expect(screen.queryByText('WordCamp Nepal')).toBeNull();
    expect(screen.queryByText('WordCamp Asia')).toBeNull();
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `yarn test "app/community/page"`
Expected: FAIL — `Cannot find module './page'`.

- [ ] **Step 3: Implement `app/community/page.tsx`**

```tsx
import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { Timeline, type TimelineItem } from '@/components/ui/Timeline';
import { wordcamps } from '@/data/wordcamps';

export const metadata: Metadata = {
  title: 'Community — Madan G.C',
  description: 'WordCamp volunteering and community involvement.',
};

export default function CommunityPage() {
  const items: TimelineItem[] = wordcamps.map((entry) => ({
    title: entry.event,
    subtitle: entry.role,
    period: entry.year,
    description: entry.achievements,
  }));

  return (
    <Section
      as="h1"
      eyebrow="Community"
      title="Volunteering and organizing within the WordPress community."
    >
      <Timeline items={items} />
    </Section>
  );
}
```

- [ ] **Step 4: Run the test and verify it passes**

Run: `yarn test "app/community/page"`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/community/page.tsx app/community/page.test.tsx
git commit -m "feat: add /community page"
```

---

### Task 5: `/open-source` page

**Files:**
- Create: `app/open-source/page.tsx`, `app/open-source/page.test.tsx`

**Interfaces:**
- Consumes: `Section({..., as: 'h1'})` (Task 1), `Button` (Phase 1),
  `ProjectCard` (Phase 2), `getProjectBySlug` (Phase 2), `openSource` (Task 3).
- Produces: the `/open-source` route.

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import OpenSourcePage from './page';

describe('OpenSourcePage', () => {
  it('renders the WordPress.org profile link and the featured project', () => {
    render(<OpenSourcePage />);
    expect(screen.getByRole('heading', { name: 'Open Source', level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'View WordPress.org Profile' })).toHaveAttribute(
      'href',
      'https://profiles.wordpress.org/madan1gc/',
    );
    expect(screen.getByRole('heading', { name: 'MGCora Unused Media Finder' })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `yarn test "app/open-source/page"`
Expected: FAIL — `Cannot find module './page'`.

- [ ] **Step 3: Implement `app/open-source/page.tsx`**

```tsx
import type { Metadata } from 'next';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { openSource } from '@/data/openSource';
import { getProjectBySlug } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Open Source — Madan G.C',
  description: openSource.headline,
};

export default function OpenSourcePage() {
  const featuredProject = getProjectBySlug(openSource.featuredProjectSlug);

  return (
    <Section as="h1" eyebrow="Open Source" title={openSource.headline}>
      <p className="mb-8 max-w-prose text-muted">{openSource.description}</p>
      <div className="mb-8">
        <Button href={openSource.profileUrl} variant="secondary" external>
          View WordPress.org Profile
        </Button>
      </div>
      {featuredProject && (
        <div className="max-w-sm">
          <ProjectCard project={featuredProject} />
        </div>
      )}
    </Section>
  );
}
```

- [ ] **Step 4: Run the test and verify it passes**

Run: `yarn test "app/open-source/page"`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/open-source/page.tsx app/open-source/page.test.tsx
git commit -m "feat: add /open-source page"
```

---

### Task 6: `CommunityStrip` Home section

**Files:**
- Create: `components/sections/CommunityStrip.tsx`, `components/sections/CommunityStrip.test.tsx`

**Interfaces:**
- Consumes: `Section` (Task 1, default `as="h2"`), `Card`/`FadeIn` (Phase 1).
- Produces: `CommunityStrip()`.

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CommunityStrip } from './CommunityStrip';

describe('CommunityStrip', () => {
  it('renders links to /open-source and /community', () => {
    render(<CommunityStrip />);
    expect(screen.getByRole('heading', { name: 'Open Source' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Community' })).toBeInTheDocument();

    const links = screen.getAllByRole('link', { name: /Learn more/ });
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', '/open-source');
    expect(links[1]).toHaveAttribute('href', '/community');
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `yarn test CommunityStrip`
Expected: FAIL — `Cannot find module './CommunityStrip'`.

- [ ] **Step 3: Implement `CommunityStrip`**

```tsx
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { FadeIn } from '@/components/ui/FadeIn';
import { Section } from '@/components/ui/Section';

const items = [
  {
    href: '/open-source',
    title: 'Open Source',
    description: 'Building and contributing to the WordPress ecosystem on WordPress.org.',
  },
  {
    href: '/community',
    title: 'Community',
    description: 'Volunteering and organizing within the local WordPress community.',
  },
];

export function CommunityStrip() {
  return (
    <Section eyebrow="Get Involved" title="Contributing beyond client work.">
      <div className="grid gap-6 sm:grid-cols-2">
        {items.map((item, index) => (
          <FadeIn key={item.href} delay={index * 0.1}>
            <Card>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="mb-4 text-sm text-muted">{item.description}</p>
              <Link
                href={item.href}
                className="rounded text-sm font-medium text-accent-text hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-from focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Learn more →
              </Link>
            </Card>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 4: Run the test and verify it passes**

Run: `yarn test CommunityStrip`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/sections/CommunityStrip.tsx components/sections/CommunityStrip.test.tsx
git commit -m "feat: add CommunityStrip Home section"
```

---

### Task 7: Wire into Home page, update sitemap, update `CONTENT-TODO.md`, final verification

**Files:**
- Modify: `app/page.tsx`, `app/page.test.tsx`, `app/sitemap.ts`,
  `app/sitemap.test.ts`, `CONTENT-TODO.md`

**Interfaces:**
- Consumes: `CommunityStrip` (Task 6).

- [ ] **Step 1: Add `CommunityStrip` to the Home page**

In `app/page.tsx`, add the import (alphabetically, after `Contact`):

```tsx
import { CommunityStrip } from '@/components/sections/CommunityStrip';
```

and replace:

```tsx
      <Experience />
      {/* Phase 3 will insert an Open Source/Community highlight strip here. */}
      <Testimonials />
```

with:

```tsx
      <Experience />
      <CommunityStrip />
      <Testimonials />
```

- [ ] **Step 2: Extend the Home page smoke test**

In `app/page.test.tsx`, add two assertions right after the Experience block
in the "renders distinctive content from every section" test:

```tsx
    // Experience
    expect(screen.getByRole('heading', { name: 'Frontend Developer' })).toBeInTheDocument();
    expect(screen.getByText('Codewing Solutions · Kathmandu, Nepal')).toBeInTheDocument();

    // Community strip
    expect(screen.getByRole('heading', { name: 'Open Source' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Community' })).toBeInTheDocument();

    // Testimonials
```

- [ ] **Step 3: Run the test and verify it passes**

Run: `yarn test "app/page"`
Expected: PASS (3 tests, including the extended one).

- [ ] **Step 4: Update `app/sitemap.ts` to include the two new routes**

```ts
import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://madangc.example';
  const lastModified = new Date();

  return [
    { url: baseUrl, lastModified },
    { url: `${baseUrl}/work`, lastModified },
    ...projects.map((project) => ({
      url: `${baseUrl}/work/${project.slug}`,
      lastModified,
    })),
    { url: `${baseUrl}/open-source`, lastModified },
    { url: `${baseUrl}/community`, lastModified },
  ];
}
```

- [ ] **Step 5: Update `app/sitemap.test.ts` for the new route count**

Replace the whole file:

```ts
import { describe, expect, it } from 'vitest';
import { projects } from '@/data/projects';
import sitemap from './sitemap';

describe('sitemap', () => {
  it('includes the homepage, /work, every case-study route, /open-source, and /community', () => {
    const entries = sitemap();
    expect(entries).toHaveLength(projects.length + 4);

    const urls = entries.map((entry) => entry.url);
    expect(urls).toContain('https://madangc.example');
    expect(urls).toContain('https://madangc.example/work');
    projects.forEach((project) => {
      expect(urls).toContain(`https://madangc.example/work/${project.slug}`);
    });
    expect(urls).toContain('https://madangc.example/open-source');
    expect(urls).toContain('https://madangc.example/community');
  });
});
```

- [ ] **Step 6: Run the test and verify it passes**

Run: `yarn test sitemap`
Expected: PASS.

- [ ] **Step 7: Update `CONTENT-TODO.md`**

Replace the entire file with:

```markdown
# Content To-Do

Every item below is placeholder or unconfirmed content shipped intentionally
so the site's structure could be reviewed immediately (spec §4, §7). Nothing
here should be treated as final copy.

## Blocking (site is not truly launch-ready without these)

- [ ] Add the real résumé PDF at `public/resume/Madan-GC-Resume.pdf`
      (referenced by `data/profile.ts` → `resumeUrl`).
- [ ] Replace the placeholder domain `https://madangc.example` with the real
      production domain in `app/layout.tsx` (`metadataBase`), `app/sitemap.ts`,
      `app/robots.ts`, and the `PersonJsonLd` block in `app/page.tsx`.
- [ ] Confirm `/images/me.jpg` is an appropriate professional headshot for the
      Hero photo — the original site's alt text called it "Mountain
      landscape," so verify it's actually a headshot before launch.
- [ ] The Home page's nav (`components/layout/Nav.tsx`) links to `/blog`,
      which doesn't exist yet (built in Phase 4). `/work`, `/open-source`,
      and `/community` now exist as of Phases 2-3.

## Content quality

Site works without these, but they're the difference between "structurally
complete" and "actually persuasive".

- [ ] Confirm or replace the "Plugin Author" hero stat in
      `data/profile.ts` → `getHeroStats()` (currently "In progress" and
      flagged `placeholder: true`). Remove it if no plugin will be published.
- [ ] Replace all three entries in `data/testimonials.ts` with real
      client/teammate/community quotes.
- [ ] Confirm WordCamp Nepal / WordCamp Asia attendance before adding them to
      `data/trust.ts` or `data/wordcamps.ts` — only WordCamp Kathmandu 2022
      is listed today because it's confirmed.
- [ ] The Hero's status badge text "Available for freelance & full-time
      roles" (`components/sections/Hero.tsx`) should be confirmed as still
      accurate before launch — it's an availability claim, not a
      placeholder, but worth a pre-launch check.
- [ ] No favicon or Open Graph/Twitter metadata exists yet (`app/layout.tsx`)
      — spec §8 calls for OG image generation; this was out of scope for
      Phase 1's "SEO basics" but should be tracked for a later phase.
- [ ] All 7 case studies in `data/projects.ts` (`/work` and `/work/[slug]`)
      have realistic-sounding placeholder copy for overview, challenge,
      approach, results, and key learnings, plausible but unverified
      `techStack` guesses, and no real screenshots, GitHub repos, or live
      URLs. Every field needs review against the real project before these
      are presented as verified work. The 3 featured on the Home page
      (`mgcora-unused-media-finder`, `trailvista-theme`, `codewing-website`)
      are an editorial placeholder choice too — revisit once real results
      exist.
- [ ] The hero stat "Major Projects: 7+" (`data/profile.ts` →
      `getHeroStats()`) now matches the 7 real case-study pages at `/work`,
      but those pages are still placeholder content — re-confirm the stat
      (or drop the "+") once the 7 case studies hold real, verified detail.
- [ ] `data/openSource.ts` and `/open-source` show only the real
      WordPress.org profile link and the one plugin-shaped project already in
      `data/projects.ts` — no contribution timeline, download counts, or
      release history, since none of that is confirmed yet. Expand once real
      WordPress.org contribution data is available.
- [ ] `data/wordcamps.ts` and `/community` show only the one confirmed
      appearance (WordCamp Kathmandu 2022, Organizer). Add further entries
      only once additional WordCamp attendance is confirmed — do not infer
      or estimate.

## Later phases (tracked here now, addressed when that phase is built)

- [ ] Phase 4 — Blog: the 5 recommended articles need to actually be written.
```

- [ ] **Step 8: Run the full suite and build**

Run: `yarn test && yarn build`
Expected: all tests pass; build succeeds with 2 more static pages
(`/open-source`, `/community`) than Phase 2 generated.

- [ ] **Step 9: Commit**

```bash
git add app/page.tsx app/page.test.tsx app/sitemap.ts app/sitemap.test.ts CONTENT-TODO.md
git commit -m "feat: wire CommunityStrip into Home page, update sitemap and content checklist"
```
