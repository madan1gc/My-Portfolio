# Portfolio Phase 2 (Featured Projects) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the case-study system for the 7 named projects — a `/work`
index, 7 statically-generated `/work/[slug]` case-study pages, a "Featured
Projects" Home page section — and close the `/work` 404 gap that Phase 1's
`CONTENT-TODO.md` flagged as blocking.

**Architecture:** A shared `Section` UI primitive (extracted from Phase 1's
triplicated Skills/Experience/Testimonials pattern) plus a new
`components/projects/ProjectCard` compose into a `/work` index and a
`FeaturedProjects` Home section; a typed `data/projects.ts` (7 entries, all
placeholder content per this session's decisions) drives all three. The
case-study template (`/work/[slug]`) uses `generateStaticParams()` for the 7
known slugs and a lightweight inline eyebrow+paragraph pattern for its five
body sections (Overview/Challenge/Approach/Results/Key Learnings) — see the
note under Task 6 for why this doesn't reuse `Section` directly.

**Tech Stack:** Same as Phase 1 — Next.js 14 App Router, TypeScript, Tailwind
CSS, Vitest + React Testing Library. No new dependencies.

**Spec:** `docs/superpowers/specs/2026-09-20-portfolio-phase2-projects-design.md`
(and its parent, `docs/superpowers/specs/2026-09-16-portfolio-redesign-design.md`)

## Global Constraints

- Color tokens (from Phase 1, still binding): background `#0A0A0F`, surface
  `#12121A`, border `#232330`, foreground `#F5F5F7`, muted `#9CA3AF`, accent
  gradient `#6366F1 → #A855F7`, small-text accent `#818CF8`
  (`text-accent-text`, AA-compliant — use this, not `text-accent-from`, for
  any new small eyebrow-style label text).
- No fabricated content: all 7 projects' `github`/`liveUrl` fields stay
  `undefined` (confirmed this session — no real links exist yet); challenge/
  solution/results/learnings copy must read as plausible and generic, never
  as invented specific metrics (no fake percentages, dollar amounts, or user
  counts).
- Every placeholder field this phase introduces must be tracked in
  `CONTENT-TODO.md` (Task 8).
- Accessibility: every new interactive link needs the existing
  `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-from focus-visible:ring-offset-2 focus-visible:ring-offset-background`
  classes (same pattern as Phase 1's `Button`/`Nav`/`Footer`/`Trust`). Each
  page has exactly one `<h1>`; section-level labels are `<h2>`.
- Package manager is Yarn. `@/*` import alias resolves to repo root
  (unchanged from Phase 1).
- The 3 `featured: true` projects are exactly: `mgcora-unused-media-finder`,
  `trailvista-theme`, `codewing-website` (chosen in the spec for goal
  variety — plugin / theme / agency site).

---

### Task 1: Extract `Section` and refactor Skills/Experience/Testimonials

**Files:**
- Create: `components/ui/Section.tsx`, `components/ui/Section.test.tsx`
- Modify: `components/sections/Skills.tsx`, `components/sections/Experience.tsx`,
  `components/sections/Testimonials.tsx`
- Test (must keep passing unchanged): `components/sections/Skills.test.tsx`,
  `components/sections/Experience.test.tsx`, `components/sections/Testimonials.test.tsx`

**Interfaces:**
- Produces: `Section({ eyebrow: string; title: string; children: ReactNode })`
  — renders the eyebrow as an `<h2 className="mb-2 text-xs uppercase tracking-[0.2em] text-accent-text">`,
  the title as a `<p className="mb-12 max-w-prose text-2xl font-semibold text-foreground sm:text-3xl">`,
  both wrapped in `FadeIn`, followed by `children` rendered as siblings
  (not wrapped in `FadeIn`) inside a `<section className="mx-auto max-w-6xl px-6 py-24">`.
- Consumed by: Task 7's `FeaturedProjects`.

This is a **behavior-preserving refactor**: `Skills`, `Experience`, and
`Testimonials` must render byte-for-byte the same DOM as before. Their
existing test files are your regression proof — do not modify them in this
task.

- [ ] **Step 1: Write the failing test for `Section`**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Section } from './Section';

describe('Section', () => {
  it('renders the eyebrow, title, and children', () => {
    render(
      <Section eyebrow="Skills" title="Some descriptive title.">
        <p>Section body</p>
      </Section>,
    );
    expect(screen.getByRole('heading', { name: 'Skills' })).toBeInTheDocument();
    expect(screen.getByText('Some descriptive title.')).toBeInTheDocument();
    expect(screen.getByText('Section body')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `yarn test Section`
Expected: FAIL — `Cannot find module './Section'`.

- [ ] **Step 3: Implement `Section`**

```tsx
import type { ReactNode } from 'react';
import { FadeIn } from '@/components/ui/FadeIn';

interface SectionProps {
  eyebrow: string;
  title: string;
  children: ReactNode;
}

export function Section({ eyebrow, title, children }: SectionProps) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <FadeIn>
        <h2 className="mb-2 text-xs uppercase tracking-[0.2em] text-accent-text">{eyebrow}</h2>
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
Expected: PASS.

- [ ] **Step 5: Refactor `Skills.tsx` to use `Section`**

```tsx
import { Card } from '@/components/ui/Card';
import { FadeIn } from '@/components/ui/FadeIn';
import { Section } from '@/components/ui/Section';
import { Tag } from '@/components/ui/Tag';
import { skillCategories } from '@/data/skills';

export function Skills() {
  return (
    <Section eyebrow="Skills" title="Tools I use to ship WordPress products and frontend interfaces.">
      <div className="grid gap-6 sm:grid-cols-3">
        {skillCategories.map((category, index) => (
          <FadeIn key={category.title} delay={index * 0.1}>
            <Card>
              <h3 className="mb-4 text-sm font-semibold text-foreground">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Tag key={skill}>{skill}</Tag>
                ))}
              </div>
            </Card>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 6: Run Skills' existing tests and confirm no regression**

Run: `yarn test Skills`
Expected: PASS (same 2 tests as before, unchanged).

- [ ] **Step 7: Refactor `Experience.tsx` to use `Section`**

```tsx
import { FadeIn } from '@/components/ui/FadeIn';
import { Section } from '@/components/ui/Section';
import { Timeline, type TimelineItem } from '@/components/ui/Timeline';
import { experience } from '@/data/experience';

export function Experience() {
  const items: TimelineItem[] = experience.map((entry) => ({
    title: entry.role,
    subtitle: `${entry.company} · ${entry.location}`,
    period: `${entry.start} — ${entry.end}`,
    description: entry.achievements,
  }));

  return (
    <Section eyebrow="Experience" title="Where I've shipped production WordPress and frontend work.">
      <FadeIn delay={0.1}>
        <Timeline items={items} />
      </FadeIn>
    </Section>
  );
}
```

- [ ] **Step 8: Run Experience's existing tests and confirm no regression**

Run: `yarn test Experience`
Expected: PASS (same 1 test as before, unchanged).

- [ ] **Step 9: Refactor `Testimonials.tsx` to use `Section`**

```tsx
import { Card } from '@/components/ui/Card';
import { FadeIn } from '@/components/ui/FadeIn';
import { Section } from '@/components/ui/Section';
import { testimonials } from '@/data/testimonials';

export function Testimonials() {
  return (
    <Section eyebrow="Testimonials" title="What clients, teammates, and the community say.">
      <div className="grid gap-6 sm:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <FadeIn key={`${testimonial.name}-${testimonial.role}`} delay={index * 0.1}>
            <Card>
              <p className="mb-4 text-sm text-muted">&ldquo;{testimonial.quote}&rdquo;</p>
              <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
              <p className="text-xs text-muted">{testimonial.role}</p>
            </Card>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 10: Run Testimonials' existing tests and confirm no regression**

Run: `yarn test Testimonials`
Expected: PASS (same 1 test as before, unchanged).

- [ ] **Step 11: Run the full suite and build**

Run: `yarn test && yarn build`
Expected: all tests pass, build succeeds.

- [ ] **Step 12: Commit**

```bash
git add components/ui/Section.tsx components/ui/Section.test.tsx components/sections/Skills.tsx components/sections/Experience.tsx components/sections/Testimonials.tsx
git commit -m "refactor: extract shared Section component from Skills/Experience/Testimonials"
```

---

### Task 2: `ImagePlaceholder` UI primitive

**Files:**
- Create: `components/ui/ImagePlaceholder.tsx`, `components/ui/ImagePlaceholder.test.tsx`

**Interfaces:**
- Produces: `ImagePlaceholder({ label: string })`.
- Consumed by: Task 6's case-study page.

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ImagePlaceholder } from './ImagePlaceholder';

describe('ImagePlaceholder', () => {
  it('renders the label and a coming-soon note', () => {
    render(<ImagePlaceholder label="MGCora Unused Media Finder" />);
    expect(screen.getByText('MGCora Unused Media Finder')).toBeInTheDocument();
    expect(screen.getByText('Screenshot coming soon')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `yarn test ImagePlaceholder`
Expected: FAIL — `Cannot find module './ImagePlaceholder'`.

- [ ] **Step 3: Implement `ImagePlaceholder`**

```tsx
interface ImagePlaceholderProps {
  label: string;
}

export function ImagePlaceholder({ label }: ImagePlaceholderProps) {
  return (
    <div className="flex aspect-video w-full items-center justify-center rounded-2xl border border-border bg-gradient-to-br from-surface to-background">
      <div className="text-center">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="mt-1 text-xs text-muted">Screenshot coming soon</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run the test and verify it passes**

Run: `yarn test ImagePlaceholder`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/ui/ImagePlaceholder.tsx components/ui/ImagePlaceholder.test.tsx
git commit -m "feat: add ImagePlaceholder UI primitive"
```

---

### Task 3: Data layer — `data/projects.ts`

**Files:**
- Create: `data/projects.ts`, `data/projects.test.ts`

**Interfaces:**
- Produces:
  - `interface Project { slug: string; title: string; summary: string; overview: string; challenge: string; approach: string; techStack: string[]; results: string; learnings: string; github?: string; liveUrl?: string; featured: boolean }`
  - `projects: Project[]` (exactly 7 entries)
  - `getFeaturedProjects(): Project[]`
  - `getProjectBySlug(slug: string): Project | undefined`
- Consumed by: Task 4 (`ProjectCard`), Task 5 (`/work`), Task 6 (`/work/[slug]`),
  Task 7 (`FeaturedProjects`).

- [ ] **Step 1: Write the failing test**

```ts
import { describe, expect, it } from 'vitest';
import { getFeaturedProjects, getProjectBySlug, projects } from './projects';

describe('projects', () => {
  it('has exactly 7 projects with unique slugs', () => {
    expect(projects).toHaveLength(7);
    const slugs = projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(7);
  });

  it('has exactly 3 featured projects: mgcora-unused-media-finder, trailvista-theme, codewing-website', () => {
    const featured = getFeaturedProjects();
    expect(featured).toHaveLength(3);
    expect(featured.map((project) => project.slug).sort()).toEqual(
      ['codewing-website', 'mgcora-unused-media-finder', 'trailvista-theme'].sort(),
    );
  });

  it('leaves github and liveUrl unset on every project (no fabricated links)', () => {
    projects.forEach((project) => {
      expect(project.github).toBeUndefined();
      expect(project.liveUrl).toBeUndefined();
    });
  });
});

describe('getProjectBySlug', () => {
  it('returns the matching project', () => {
    const project = getProjectBySlug('trailvista-theme');
    expect(project?.title).toBe('Trailvista Theme');
  });

  it('returns undefined for an unknown slug', () => {
    expect(getProjectBySlug('does-not-exist')).toBeUndefined();
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `yarn test data/projects`
Expected: FAIL — `Cannot find module './projects'`.

- [ ] **Step 3: Implement `data/projects.ts`**

```ts
export interface Project {
  slug: string;
  title: string;
  summary: string;
  overview: string;
  challenge: string;
  approach: string;
  techStack: string[];
  results: string;
  learnings: string;
  github?: string;
  liveUrl?: string;
  featured: boolean;
}

// All 7 entries are placeholder content (spec §5, §7) — realistic-sounding
// but generic, no fabricated metrics, no real links yet. Tracked in
// CONTENT-TODO.md.
export const projects: Project[] = [
  {
    slug: 'mgcora-unused-media-finder',
    title: 'MGCora Unused Media Finder',
    summary:
      'A WordPress plugin that scans the media library for unused files and helps site owners reclaim storage safely.',
    overview:
      "MGCora Unused Media Finder is a WordPress plugin that scans a site's media library, cross-references every attachment against posts, pages, widgets, and theme templates, and flags files that appear unused so site owners can review and remove them with confidence.",
    challenge:
      "WordPress media libraries grow indefinitely with no built-in way to tell which uploaded files are still referenced anywhere on the site, so cleanup is either skipped entirely or done blindly, risking broken pages.",
    approach:
      'Built a scanning engine that checks attachment usage across post content, post meta, widgets, and common page-builder formats, then surfaces results in an admin screen with a confidence indicator per file so nothing gets deleted without review.',
    techStack: ['PHP', 'WordPress Plugin API', 'JavaScript', 'MySQL'],
    results:
      'Gives site owners a safe, guided way to reduce media library bloat and backup size without the risk of blindly deleting files that turn out to be in use.',
    learnings:
      "Reliably detecting 'usage' across arbitrary page builders and custom fields is harder than it looks — the plugin's confidence-scoring approach came out of realizing a binary used/unused flag wasn't trustworthy enough to act on directly.",
    featured: true,
  },
  {
    slug: 'wp-travel-engine-testimonials',
    title: 'WP Travel Engine Testimonials',
    summary: 'A custom testimonials module built for the WP Travel Engine plugin ecosystem.',
    overview:
      'A testimonials add-on built to integrate with WP Travel Engine, letting travel agencies collect and display customer reviews alongside their tour listings.',
    challenge:
      "WP Travel Engine didn't have a built-in way to attach customer testimonials to specific tours, so agencies were manually pasting review screenshots into page content — inconsistent, not responsive, and impossible to filter or moderate.",
    approach:
      'Designed a custom post type for testimonials with a tour-relationship field, then built front-end display components (grid and carousel layouts) that plug into existing WP Travel Engine tour pages without modifying core plugin files.',
    techStack: ['WordPress', 'PHP', 'JavaScript', 'Elementor'],
    results:
      'Gave agencies a structured, moderatable way to showcase real customer feedback per tour instead of static screenshots.',
    learnings:
      "Extending a third-party plugin's data model safely means working entirely through its public hooks and filters — an early version that touched WP Travel Engine's own templates directly broke on the plugin's next update.",
    featured: false,
  },
  {
    slug: 'tripcart-pricing-page',
    title: 'Tripcart Pricing Page',
    summary:
      'A redesigned pricing page for Tripcart focused on clarifying plan differences and reducing signup drop-off.',
    overview:
      "A ground-up redesign of Tripcart's pricing page, rebuilding the plan comparison and signup flow to be clearer and faster on mobile.",
    challenge:
      "The existing pricing page packed all plan details into a dense table that was hard to scan on mobile and didn't make it obvious which plan most visitors should pick.",
    approach:
      'Restructured the page around a simplified plan-comparison layout with a recommended-plan highlight, rebuilt the responsive breakpoints from scratch, and streamlined the signup call-to-action path.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'React'],
    results:
      "Produced a pricing page that's substantially easier to scan on mobile, with a clearer recommended-plan path through signup.",
    learnings:
      "A pricing page's job is to remove decisions, not present all of them at once — the recommended-plan highlight mattered more to the redesign than any visual polish.",
    featured: false,
  },
  {
    slug: 'shubha-events-refactor',
    title: 'Shubha Events Refactor',
    summary: "A performance and structure refactor of the Shubha Events website's frontend.",
    overview:
      'A frontend refactor of the Shubha Events site, cleaning up legacy markup and rebuilding key pages for better performance and maintainability.',
    challenge:
      "The site had accumulated years of ad-hoc markup and inline styles from incremental edits, making pages slow to load and risky to change without breaking something elsewhere.",
    approach:
      'Audited the existing templates page by page, consolidated duplicated styles into a shared stylesheet, replaced render-blocking scripts with deferred/async loading, and rebuilt the event-listing pages with semantic markup.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'WordPress'],
    results:
      "Left the site with cleaner, more maintainable templates and noticeably faster page loads, without changing the site's visual design.",
    learnings:
      'Refactoring a live site incrementally, page by page, kept the risk of a big-bang rewrite off the table while still letting the cleanup compound over time.',
    featured: false,
  },
  {
    slug: 'trailvista-theme',
    title: 'Trailvista Theme',
    summary: 'A custom WordPress theme built for outdoor/adventure travel brands.',
    overview:
      'Trailvista is a custom WordPress theme designed for outdoor and adventure travel businesses, with layout templates for tour listings, trip itineraries, and booking calls-to-action.',
    challenge:
      "Off-the-shelf travel themes were either too generic for an outdoor/adventure brand's visual identity or too rigid to adapt to different tour-operator business models.",
    approach:
      'Built a theme from scratch on top of the WordPress block editor, with custom block patterns for itineraries and trip highlights, a flexible tour-listing template, and full support for the site editor\'s global styles.',
    techStack: ['WordPress', 'PHP', 'Gutenberg', 'SCSS'],
    results:
      'Gives adventure travel operators a theme that matches their brand without needing custom development for every new tour page.',
    learnings:
      'Building for the block editor instead of a classic page-builder meant more upfront template work, but it gave site owners far more editing freedom afterward without touching code.',
    featured: true,
  },
  {
    slug: 'codewing-website',
    title: 'Codewing Website',
    summary: 'The marketing website for Codewing Solutions, the agency I work at.',
    overview:
      "The public marketing site for Codewing Solutions — services, portfolio, and contact pages built to represent the agency's own frontend and WordPress work.",
    challenge:
      "An agency's own website is its most-scrutinized portfolio piece — it needed to demonstrate the same frontend and WordPress craft the agency sells to clients.",
    approach:
      "Built the site with a component-based WordPress theme, custom Elementor widgets for the services and portfolio sections, and attention to performance since site speed is itself part of the agency's pitch.",
    techStack: ['WordPress', 'Elementor', 'PHP', 'JavaScript'],
    results: "Serves as Codewing's live portfolio piece and first impression for prospective clients.",
    learnings:
      "Working on your own company's site comes with more stakeholders and slower sign-off than client work — the build process mattered as much as the code.",
    featured: true,
  },
  {
    slug: 'hasta-arts-client-work',
    title: 'Hasta Arts Client Work',
    summary: 'Frontend development for the Hasta Arts client site, including custom Elementor components.',
    overview:
      "Frontend development work for Hasta Arts, including custom Elementor widgets and page-template work to match the client's brand design.",
    challenge:
      "The client's design called for layout and interaction patterns that standard Elementor widgets couldn't produce without heavy workarounds.",
    approach:
      "Built custom Elementor widgets tailored to the specific layouts in the design files, so the client's team could continue editing content themselves afterward without needing a developer for routine updates.",
    techStack: ['WordPress', 'Elementor', 'PHP', 'JavaScript'],
    results: "Delivered the client's design faithfully while keeping the site editable by their own team going forward.",
    learnings:
      'Custom Elementor widgets are worth the upfront build time when they save the client from needing a developer for every future content change.',
    featured: false,
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
```

- [ ] **Step 4: Run the test and verify it passes**

Run: `yarn test data/projects`
Expected: PASS (5 tests).

- [ ] **Step 5: Commit**

```bash
git add data/projects.ts data/projects.test.ts
git commit -m "feat: add projects data layer (7 case studies, placeholder content)"
```

---

### Task 4: `ProjectCard` component

**Files:**
- Create: `components/projects/ProjectCard.tsx`, `components/projects/ProjectCard.test.tsx`

**Interfaces:**
- Consumes: `Card` (Phase 1), `Tag` (Phase 1), `Project` type (Task 3).
- Produces: `ProjectCard({ project: Project })`.
- Consumed by: Task 5 (`/work` index), Task 7 (`FeaturedProjects`).

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { Project } from '@/data/projects';
import { ProjectCard } from './ProjectCard';

const project: Project = {
  slug: 'trailvista-theme',
  title: 'Trailvista Theme',
  summary: 'A custom WordPress theme built for outdoor/adventure travel brands.',
  overview: 'overview',
  challenge: 'challenge',
  approach: 'approach',
  techStack: ['WordPress', 'PHP', 'Gutenberg', 'SCSS'],
  results: 'results',
  learnings: 'learnings',
  featured: true,
};

describe('ProjectCard', () => {
  it('renders the title, summary, tech tags, and a link to the case study', () => {
    render(<ProjectCard project={project} />);
    expect(screen.getByRole('heading', { name: 'Trailvista Theme' })).toBeInTheDocument();
    expect(
      screen.getByText('A custom WordPress theme built for outdoor/adventure travel brands.'),
    ).toBeInTheDocument();
    expect(screen.getByText('Gutenberg')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /View case study/ })).toHaveAttribute(
      'href',
      '/work/trailvista-theme',
    );
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `yarn test ProjectCard`
Expected: FAIL — `Cannot find module './ProjectCard'`.

- [ ] **Step 3: Implement `ProjectCard`**

```tsx
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';
import type { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card>
      <h3 className="mb-2 text-lg font-semibold text-foreground">{project.title}</h3>
      <p className="mb-4 text-sm text-muted">{project.summary}</p>
      <div className="mb-4 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <Tag key={tech}>{tech}</Tag>
        ))}
      </div>
      <Link
        href={`/work/${project.slug}`}
        className="rounded text-sm font-medium text-accent-text hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-from focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        View case study →
      </Link>
    </Card>
  );
}
```

- [ ] **Step 4: Run the test and verify it passes**

Run: `yarn test ProjectCard`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/projects/ProjectCard.tsx components/projects/ProjectCard.test.tsx
git commit -m "feat: add ProjectCard component"
```

---

### Task 5: `/work` index page

**Files:**
- Create: `app/work/page.tsx`, `app/work/page.test.tsx`

**Interfaces:**
- Consumes: `ProjectCard` (Task 4), `projects` (Task 3).
- Produces: the `/work` route.

Note: this page's own `<h1>` heading is written directly (not via `Section`,
which renders an `<h2>`) — a top-level route page needs exactly one `<h1>`.

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import WorkPage from './page';

describe('WorkPage', () => {
  it('renders a heading and a card for all 7 projects', () => {
    render(<WorkPage />);
    expect(screen.getByRole('heading', { name: 'Work', level: 1 })).toBeInTheDocument();

    const titles = [
      'MGCora Unused Media Finder',
      'WP Travel Engine Testimonials',
      'Tripcart Pricing Page',
      'Shubha Events Refactor',
      'Trailvista Theme',
      'Codewing Website',
      'Hasta Arts Client Work',
    ];
    titles.forEach((title) => {
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
    });

    expect(screen.getAllByRole('link', { name: /View case study/ })).toHaveLength(7);
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `yarn test app/work/page`
Expected: FAIL — `Cannot find module './page'`.

- [ ] **Step 3: Implement `app/work/page.tsx`**

```tsx
import type { Metadata } from 'next';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { projects } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Work — Madan G.C',
  description: 'Case studies from WordPress and frontend projects I have built.',
};

export default function WorkPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <h1 className="mb-2 text-xs uppercase tracking-[0.2em] text-accent-text">Work</h1>
      <p className="mb-12 max-w-prose text-2xl font-semibold text-foreground sm:text-3xl">
        Case studies from WordPress products, custom plugins, and client frontend work.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run the test and verify it passes**

Run: `yarn test app/work/page`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/work/page.tsx app/work/page.test.tsx
git commit -m "feat: add /work project index page"
```

---

### Task 6: `/work/[slug]` case-study template

**Files:**
- Create: `app/work/[slug]/page.tsx`, `app/work/[slug]/page.test.tsx`

**Interfaces:**
- Consumes: `Button` (Phase 1), `Tag` (Phase 1), `ImagePlaceholder` (Task 2),
  `getProjectBySlug`/`projects` (Task 3).
- Produces: the `/work/[slug]` route, `generateStaticParams()` returning the
  7 slugs.

**Design note — why this doesn't reuse `Section`:** `Section` (Task 1) is
shaped for "eyebrow + one bold intro sentence + rich children below" (that's
what Skills/Experience/Testimonials need). A case study's five body blocks
(Overview/Challenge/Approach/Results/Key Learnings) are each just "eyebrow +
a paragraph of plain prose" — forcing that into `Section`'s bold `text-2xl`
title slot would visually misrepresent plain body copy as a section
headline. This task defines a small private `CaseStudySection` helper inside
the page file instead (same eyebrow visual language, no headline styling)
rather than stretching `Section` to fit a shape it wasn't designed for.

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { projects } from '@/data/projects';
import WorkCaseStudyPage, { generateStaticParams } from './page';

describe('generateStaticParams', () => {
  it('returns exactly the 7 project slugs', () => {
    const params = generateStaticParams();
    expect(params).toHaveLength(7);
    expect(params.map((param) => param.slug).sort()).toEqual(
      projects.map((project) => project.slug).sort(),
    );
  });
});

describe('WorkCaseStudyPage', () => {
  it('renders the title, tech tags, and all 5 content sections for a known slug', () => {
    render(<WorkCaseStudyPage params={{ slug: 'trailvista-theme' }} />);

    expect(screen.getByRole('heading', { name: 'Trailvista Theme', level: 1 })).toBeInTheDocument();
    expect(screen.getByText('Gutenberg')).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'Overview' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Challenge' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Approach' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Results' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Key Learnings' })).toBeInTheDocument();

    expect(screen.getByText('Screenshot coming soon')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Back to all projects/ })).toHaveAttribute(
      'href',
      '/work',
    );
  });

  it('does not render GitHub/Live Site buttons when a project has no links yet', () => {
    render(<WorkCaseStudyPage params={{ slug: 'trailvista-theme' }} />);
    expect(screen.queryByRole('link', { name: 'GitHub' })).toBeNull();
    expect(screen.queryByRole('link', { name: 'Live Site' })).toBeNull();
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `yarn test "app/work/[slug]/page"`
Expected: FAIL — `Cannot find module './page'`. (Double-quoting is enough —
POSIX shells don't glob-expand inside double quotes, so no backslash-escaping
of the brackets is needed or wanted.)

- [ ] **Step 3: Implement `app/work/[slug]/page.tsx`**

```tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { Tag } from '@/components/ui/Tag';
import { getProjectBySlug, projects } from '@/data/projects';

interface WorkCaseStudyPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: WorkCaseStudyPageProps): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    return {};
  }
  return {
    title: `${project.title} — Madan G.C`,
    description: project.summary,
  };
}

function CaseStudySection({ eyebrow, body }: { eyebrow: string; body: string }) {
  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <h2 className="mb-4 text-xs uppercase tracking-[0.2em] text-accent-text">{eyebrow}</h2>
      <p className="max-w-prose text-muted">{body}</p>
    </div>
  );
}

export default function WorkCaseStudyPage({ params }: WorkCaseStudyPageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <header className="mx-auto max-w-6xl px-6 pb-8 pt-24">
        <h1 className="mb-4 text-4xl font-semibold text-foreground sm:text-5xl">{project.title}</h1>
        <p className="mb-6 max-w-prose text-lg text-muted">{project.summary}</p>
        <div className="mb-6 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
        <div className="flex flex-wrap gap-4">
          {project.github && (
            <Button href={project.github} variant="secondary" external>
              GitHub
            </Button>
          )}
          {project.liveUrl && (
            <Button href={project.liveUrl} variant="secondary" external>
              Live Site
            </Button>
          )}
        </div>
      </header>

      <CaseStudySection eyebrow="Overview" body={project.overview} />
      <CaseStudySection eyebrow="Challenge" body={project.challenge} />
      <CaseStudySection eyebrow="Approach" body={project.approach} />

      <div className="mx-auto max-w-6xl px-6 py-8">
        <ImagePlaceholder label={project.title} />
      </div>

      <CaseStudySection eyebrow="Results" body={project.results} />
      <CaseStudySection eyebrow="Key Learnings" body={project.learnings} />

      <div className="mx-auto max-w-6xl px-6 pb-24">
        <Button href="/work" variant="ghost">
          ← Back to all projects
        </Button>
      </div>
    </>
  );
}
```

- [ ] **Step 4: Run the test and verify it passes**

Run: `yarn test "app/work/[slug]/page"`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add "app/work/[slug]/page.tsx" "app/work/[slug]/page.test.tsx"
git commit -m "feat: add /work/[slug] case-study template"
```

---

### Task 7: `FeaturedProjects` Home section

**Files:**
- Create: `components/sections/FeaturedProjects.tsx`, `components/sections/FeaturedProjects.test.tsx`

**Interfaces:**
- Consumes: `Section` (Task 1), `ProjectCard` (Task 4), `getFeaturedProjects` (Task 3).
- Produces: `FeaturedProjects()`.

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FeaturedProjects } from './FeaturedProjects';

describe('FeaturedProjects', () => {
  it('renders exactly the 3 featured projects and a link to all projects', () => {
    render(<FeaturedProjects />);

    expect(screen.getByRole('heading', { name: 'MGCora Unused Media Finder' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Trailvista Theme' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Codewing Website' })).toBeInTheDocument();

    expect(screen.queryByRole('heading', { name: 'WP Travel Engine Testimonials' })).toBeNull();

    expect(screen.getByRole('link', { name: /View all projects/ })).toHaveAttribute('href', '/work');
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `yarn test FeaturedProjects`
Expected: FAIL — `Cannot find module './FeaturedProjects'`.

- [ ] **Step 3: Implement `FeaturedProjects`**

```tsx
import Link from 'next/link';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { Section } from '@/components/ui/Section';
import { getFeaturedProjects } from '@/data/projects';

export function FeaturedProjects() {
  const featured = getFeaturedProjects();

  return (
    <Section eyebrow="Featured Projects" title="Case studies from real WordPress and frontend work.">
      <div className="grid gap-6 sm:grid-cols-3">
        {featured.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
      <div className="mt-8">
        <Link
          href="/work"
          className="rounded text-sm font-medium text-accent-text hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-from focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          View all projects →
        </Link>
      </div>
    </Section>
  );
}
```

- [ ] **Step 4: Run the test and verify it passes**

Run: `yarn test FeaturedProjects`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/sections/FeaturedProjects.tsx components/sections/FeaturedProjects.test.tsx
git commit -m "feat: add FeaturedProjects Home section"
```

---

### Task 8: Wire into Home page, update `CONTENT-TODO.md`, final verification

**Files:**
- Modify: `app/page.tsx`, `app/page.test.tsx`, `CONTENT-TODO.md`

**Interfaces:**
- Consumes: `FeaturedProjects` (Task 7).

- [ ] **Step 1: Add `FeaturedProjects` to the Home page**

In `app/page.tsx`, add the import and replace the Phase 2 placeholder
comment:

```tsx
import { Contact } from '@/components/sections/Contact';
import { Experience } from '@/components/sections/Experience';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { Hero } from '@/components/sections/Hero';
import { Skills } from '@/components/sections/Skills';
import { Testimonials } from '@/components/sections/Testimonials';
import { Trust } from '@/components/sections/Trust';
import { profile } from '@/data/profile';
```

and in the returned JSX, replace:

```tsx
      <Trust />
      {/* Phase 2 will insert a "Featured Projects" section here. */}
      <Skills />
```

with:

```tsx
      <Trust />
      <FeaturedProjects />
      <Skills />
```

(`PersonJsonLd` and everything else in the file is unchanged.)

- [ ] **Step 2: Extend the Home page smoke test**

In `app/page.test.tsx`, add one assertion to the existing "renders
distinctive content from every section" test, right after the Trust
assertion:

```tsx
    // Trust
    expect(screen.getByText('Codewing Solutions')).toBeInTheDocument();

    // Featured Projects
    expect(screen.getByRole('heading', { name: 'Trailvista Theme' })).toBeInTheDocument();

    // Skills
```

- [ ] **Step 3: Run the test and verify it passes**

Run: `yarn test app/page`
Expected: PASS (3 tests, including the extended one).

- [ ] **Step 4: Update `CONTENT-TODO.md`**

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
- [ ] The Home page's nav (`components/layout/Nav.tsx`) links to
      `/open-source`, `/community`, and `/blog`, none of which exist yet
      (they're built in Phases 3-4). `/work` now exists as of Phase 2. Either
      add stub "Coming soon" pages for the remaining three routes, or do not
      deploy the site publicly, until those routes exist.

## Content quality

Site works without these, but they're the difference between "structurally
complete" and "actually persuasive".

- [ ] Confirm or replace the "Plugin Author" hero stat in
      `data/profile.ts` → `getHeroStats()` (currently "In progress" and
      flagged `placeholder: true`). Remove it if no plugin will be published.
- [ ] Replace all three entries in `data/testimonials.ts` with real
      client/teammate/community quotes.
- [ ] Confirm WordCamp Nepal / WordCamp Asia attendance before adding them to
      `data/trust.ts` — only Codewing Solutions, WordPress.org, and WordCamp
      Kathmandu are listed today because they're confirmed.
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

## Later phases (tracked here now, addressed when that phase is built)

- [ ] Phase 3 — Open Source & Community: real WordPress.org contribution
      history, plugin/theme downloads, WordCamp roles/years/photos.
- [ ] Phase 4 — Blog: the 5 recommended articles need to actually be written.
```

- [ ] **Step 5: Run the full suite and build**

Run: `yarn test && yarn build`
Expected: all tests pass; build succeeds with 8 static pages now generated
(`/`, `/work`, and 7 `/work/[slug]` pages, plus `/_not-found`,
`/robots.txt`, `/sitemap.xml`).

- [ ] **Step 6: Commit**

```bash
git add app/page.tsx app/page.test.tsx CONTENT-TODO.md
git commit -m "feat: wire FeaturedProjects into Home page, update content checklist"
```
