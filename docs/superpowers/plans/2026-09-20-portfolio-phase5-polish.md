# Portfolio Phase 5 (Polish) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close the small cross-cutting issues deferred across Phases 1-4's
final reviews (heading-order gap, arrow-glyph inconsistency, a fragile React
key, a Nav landmark/keyboard gap), and ship the genuine "Polish" work the
parent spec scoped: a dynamic favicon and Open Graph image, structured data
on case studies and blog posts, and a finalized `CONTENT-TODO.md`.

**Architecture:** Small, targeted fixes to existing components (`Section`,
`Nav`, `FeaturedProjects`, `BlogPreview`, `/blog/[slug]`), two new Next.js
convention files using `next/og`'s `ImageResponse` for dynamically-generated
images, and two new `*JsonLd` helper components following the exact pattern
`PersonJsonLd` already established in `app/page.tsx` (Phase 1).

**Tech Stack:** Same as Phases 1-4 — Next.js 14 App Router, TypeScript,
Tailwind CSS, Vitest + React Testing Library, plus `next/og` (bundled with
Next.js, no new dependency).

**Spec:** `docs/superpowers/specs/2026-09-20-portfolio-phase5-polish-design.md`
(and parent: `docs/superpowers/specs/2026-09-16-portfolio-redesign-design.md`)

## Global Constraints

- No fabricated content: `BlogPosting` JSON-LD omits `datePublished`
  entirely (no real dates exist yet) rather than inventing one.
- Behavior-preserving where stated: `Section`'s default (`as="h2"`) behavior
  must stay byte-for-byte identical for its 6 existing default-usage callers
  (Skills, Experience, Testimonials, FeaturedProjects, CommunityStrip,
  BlogPreview) — only the `as="h1"` path changes.
- `app/icon.tsx`/`app/opengraph-image.tsx` are verified by `yarn build`
  succeeding and listing `/icon`/`/opengraph-image` routes, not a Vitest
  RED/GREEN cycle (see spec §4) — don't force a test file that doesn't add
  real signal.
- Focus-ring class-string duplication across 9 files is explicitly OUT of
  scope this phase (see spec §3) — do not refactor it.
- Package manager is Yarn. `@/*` import alias resolves to repo root.

---

### Task 1: Fix the heading-order gap in `Section`

**Files:**
- Modify: `components/ui/Section.tsx`, `components/ui/Section.test.tsx`

**Interfaces:**
- Produces: when `as="h1"`, `Section`'s `title` now renders as an `<h2>`
  instead of a `<p>`; when `as` is omitted/`"h2"` (default), `title` still
  renders as a plain `<p>` (unchanged).
- Consumed by: `/work`, `/community`, `/open-source`, `/blog` (all already
  pass `as="h1"`, already merged) — no changes needed in those files, this
  fix is entirely inside `Section` itself.

- [ ] **Step 1: Write the failing tests**

Add these two tests to the existing `describe('Section', ...)` block (keep
all 3 existing tests as-is):

```tsx
  it('renders the title as an h2 when as="h1" (closes the heading-order gap on route pages)', () => {
    render(
      <Section eyebrow="Work" title="Case studies." as="h1">
        <p>Body</p>
      </Section>,
    );
    expect(screen.getByRole('heading', { name: 'Case studies.', level: 2 })).toBeInTheDocument();
  });

  it('keeps the title as plain text, not a heading, for the default as="h2" case', () => {
    render(
      <Section eyebrow="Skills" title="Some descriptive title.">
        <p>Body</p>
      </Section>,
    );
    expect(screen.queryByRole('heading', { name: 'Some descriptive title.' })).toBeNull();
  });
```

- [ ] **Step 2: Run the tests and verify they fail**

Run: `yarn test Section`
Expected: the new "renders the title as an h2" test FAILs (title is
currently a `<p>` regardless of `as`); the "keeps the title as plain text"
test already passes (no change needed there, it documents existing
behavior).

- [ ] **Step 3: Implement the fix**

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
  const Title = as === 'h1' ? 'h2' : 'p';

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <FadeIn>
        <Eyebrow className="mb-2 text-xs uppercase tracking-[0.2em] text-accent-text">
          {eyebrow}
        </Eyebrow>
        <Title className="mb-12 max-w-prose text-2xl font-semibold text-foreground sm:text-3xl">
          {title}
        </Title>
      </FadeIn>
      {children}
    </section>
  );
}
```

- [ ] **Step 4: Run the tests and verify they pass**

Run: `yarn test Section`
Expected: PASS (5 tests).

- [ ] **Step 5: Run the full suite to confirm no regression on the 6 default-usage callers**

Run: `yarn test`
Expected: all tests pass — `Skills.test.tsx`, `Experience.test.tsx`,
`Testimonials.test.tsx`, `FeaturedProjects.test.tsx`,
`CommunityStrip.test.tsx`, `BlogPreview.test.tsx` all still pass unchanged,
proving the default `as="h2"` path is untouched.

- [ ] **Step 6: Commit**

```bash
git add components/ui/Section.tsx components/ui/Section.test.tsx
git commit -m "fix: promote Section's title to h2 when as=\"h1\", closing heading-order gap"
```

---

### Task 2: Make "View all X" footer arrows consistent

**Files:**
- Modify: `components/sections/FeaturedProjects.tsx`,
  `components/sections/BlogPreview.tsx`

**Interfaces:**
- No interface changes — purely a markup/accessibility fix inside two
  existing components.

- [ ] **Step 1: Update `FeaturedProjects.tsx`**

Change:

```tsx
        <Link
          href="/work"
          className="rounded text-sm font-medium text-accent-text hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-from focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          View all projects →
        </Link>
```

to:

```tsx
        <Link
          href="/work"
          className="rounded text-sm font-medium text-accent-text hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-from focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          View all projects <span aria-hidden="true">→</span>
        </Link>
```

- [ ] **Step 2: Update `BlogPreview.tsx`**

Change:

```tsx
        <Link
          href="/blog"
          className="rounded text-sm font-medium text-accent-text hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-from focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          View all posts →
        </Link>
```

to:

```tsx
        <Link
          href="/blog"
          className="rounded text-sm font-medium text-accent-text hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-from focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          View all posts <span aria-hidden="true">→</span>
        </Link>
```

- [ ] **Step 3: Run the existing tests and confirm no regression**

Run: `yarn test FeaturedProjects BlogPreview`
Expected: PASS — both existing tests query by `name: /View all projects/`
and `name: /View all posts/` (regex, partial match), which still match
since `aria-hidden` only removes the arrow glyph from the computed
accessible name, not the "View all projects"/"View all posts" text itself.

- [ ] **Step 4: Commit**

```bash
git add components/sections/FeaturedProjects.tsx components/sections/BlogPreview.tsx
git commit -m "fix: hide decorative arrow glyphs in FeaturedProjects/BlogPreview footer links"
```

---

### Task 3: Fix the fragile React key in `/blog/[slug]`

**Files:**
- Modify: `app/blog/[slug]/page.tsx`

**Interfaces:**
- No interface changes — internal rendering fix only.

- [ ] **Step 1: Fix the key**

Change:

```tsx
      <div className="space-y-4">
        {post.body.map((paragraph) => (
          <p key={paragraph} className="text-muted">
            {paragraph}
          </p>
        ))}
      </div>
```

to:

```tsx
      <div className="space-y-4">
        {post.body.map((paragraph, index) => (
          <p key={`${post.slug}-${index}`} className="text-muted">
            {paragraph}
          </p>
        ))}
      </div>
```

- [ ] **Step 2: Run the existing test and confirm no regression**

Run: `yarn test "app/blog/[slug]/page"`
Expected: PASS — the existing test asserts on rendered paragraph text, not
on key values, so this is unaffected.

- [ ] **Step 3: Commit**

```bash
git add "app/blog/[slug]/page.tsx"
git commit -m "fix: use a stable index-based key for blog post paragraphs"
```

---

### Task 4: Nav accessibility — nest the mobile menu in the landmark, add Escape-to-close

**Files:**
- Modify: `components/layout/Nav.tsx`, `components/layout/Nav.test.tsx`

**Interfaces:**
- No prop/interface changes — internal structure and behavior only.

- [ ] **Step 1: Write the failing tests**

Add these two tests to the existing `describe('Nav', ...)` block (keep all
3 existing tests as-is):

```tsx
  it('nests the mobile menu inside the Primary nav landmark', async () => {
    const user = userEvent.setup();
    render(<Nav />);
    await user.click(screen.getByRole('button', { name: 'Toggle navigation menu' }));
    const nav = screen.getByRole('navigation', { name: 'Primary' });
    const mobileMenu = document.getElementById('mobile-nav');
    expect(mobileMenu).not.toBeNull();
    expect(nav.contains(mobileMenu)).toBe(true);
  });

  it('closes the mobile menu when Escape is pressed', async () => {
    const user = userEvent.setup();
    render(<Nav />);
    await user.click(screen.getByRole('button', { name: 'Toggle navigation menu' }));
    expect(document.getElementById('mobile-nav')).not.toBeNull();
    await user.keyboard('{Escape}');
    expect(document.getElementById('mobile-nav')).toBeNull();
  });
```

- [ ] **Step 2: Run the tests and verify they fail**

Run: `yarn test Nav`
Expected: both new tests FAIL — the mobile `<ul>` is currently a sibling of
`<nav>`, not nested inside it, and there's no Escape-key handler yet.

- [ ] **Step 3: Implement the fix**

```tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { profile } from '@/data/profile';

const navLinks = [
  { href: '/work', label: 'Work' },
  { href: '/open-source', label: 'Open Source' },
  { href: '/community', label: 'Community' },
  { href: '/blog', label: 'Blog' },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
      <nav className="mx-auto max-w-6xl px-6 py-4" aria-label="Primary">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="rounded font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-from focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {profile.name}
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded text-sm text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-from focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-4 md:flex">
            <Button href={profile.resumeUrl} variant="ghost" external>
              Résumé
            </Button>
            <Button href="/#contact" variant="primary">
              Let&apos;s talk
            </Button>
          </div>

          <button
            type="button"
            className="flex flex-col gap-1.5 rounded md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-from focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation menu"
            onClick={() => setOpen((prev) => !prev)}
          >
            <span className="block h-0.5 w-6 bg-foreground" />
            <span className="block h-0.5 w-6 bg-foreground" />
            <span className="block h-0.5 w-6 bg-foreground" />
          </button>
        </div>

        {open && (
          <ul id="mobile-nav" className="flex flex-col gap-4 border-t border-border px-6 py-4 md:hidden">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded text-sm text-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-from focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Button href="/#contact" variant="primary">
                Let&apos;s talk
              </Button>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
```

- [ ] **Step 4: Run the tests and verify they pass**

Run: `yarn test Nav`
Expected: PASS (5 tests).

- [ ] **Step 5: Run the full suite to confirm no regression**

Run: `yarn test`
Expected: all tests pass — the 3 pre-existing Nav tests (primary links,
"Let's talk" hrefs, toggle open/close) all still pass, since every
`className`/`aria-*` attribute is unchanged and only the DOM nesting and the
new Escape handler were added.

- [ ] **Step 6: Commit**

```bash
git add components/layout/Nav.tsx components/layout/Nav.test.tsx
git commit -m "fix: nest mobile nav inside Primary landmark, add Escape-to-close"
```

---

### Task 5: Dynamic favicon and Open Graph image

**Files:**
- Create: `app/icon.tsx`, `app/opengraph-image.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Produces: Next.js auto-discovers `app/icon.tsx` and
  `app/opengraph-image.tsx` and wires up the corresponding `<link>`/`<meta>`
  tags and `/icon`, `/opengraph-image` routes automatically — no manual
  wiring needed elsewhere.

This task has no Vitest RED/GREEN cycle (see spec §4) — verification is
`yarn build` succeeding and listing both routes.

- [ ] **Step 1: Create `app/icon.tsx`**

```tsx
import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #6366F1, #A855F7)',
          color: '#F5F5F7',
          fontSize: 18,
          fontWeight: 700,
        }}
      >
        MG
      </div>
    ),
    { ...size },
  );
}
```

- [ ] **Step 2: Create `app/opengraph-image.tsx`**

```tsx
import { ImageResponse } from 'next/og';
import { profile } from '@/data/profile';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0A0A0F',
          color: '#F5F5F7',
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 700 }}>{profile.name}</div>
        <div style={{ marginTop: 20, fontSize: 32, color: '#818CF8' }}>{profile.role}</div>
      </div>
    ),
    { ...size },
  );
}
```

(`profile.role` text uses the same `#818CF8` accent-text color already used
elsewhere for AA-compliant small accent text, rather than a `backgroundClip`
gradient trick that may not render identically across `next/og`'s Satori
renderer — keeping this simple and robust matters more here than visual
flourish.)

- [ ] **Step 3: Add Twitter card metadata to `app/layout.tsx`**

Add a `twitter` field to the existing `metadata` export:

```tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://madangc.example'),
  title: 'Madan G.C — Frontend Developer & WordPress Product Builder',
  description:
    'I build fast, scalable WordPress experiences, custom plugins, and modern frontend interfaces using React, JavaScript, Elementor, Bricks, and WordPress.',
  twitter: {
    card: 'summary_large_image',
  },
};
```

(Next.js automatically uses `app/opengraph-image.tsx`'s output for both
`og:image` and, via the `summary_large_image` card type, the Twitter
preview image too — no separate `twitter-image.tsx` file needed.)

- [ ] **Step 4: Run the full suite and build**

Run: `yarn test && yarn build`
Expected: all tests pass (no test file changes in this task); build
succeeds and the route list includes `/icon` and `/opengraph-image`.

- [ ] **Step 5: Commit**

```bash
git add app/icon.tsx app/opengraph-image.tsx app/layout.tsx
git commit -m "feat: add dynamic favicon and Open Graph image via next/og"
```

---

### Task 6: Structured data for case studies and blog posts

**Files:**
- Modify: `app/work/[slug]/page.tsx`, `app/work/[slug]/page.test.tsx`,
  `app/blog/[slug]/page.tsx`, `app/blog/[slug]/page.test.tsx`

**Interfaces:**
- No exported interface changes — adds a `<script type="application/ld+json">`
  block to each page, following the exact pattern `PersonJsonLd` already
  established in `app/page.tsx` (Phase 1).

- [ ] **Step 1: Write the failing test for the case-study page**

Add this test to `app/work/[slug]/page.test.tsx` (keep the 2 existing tests
as-is):

```tsx
  it('renders CreativeWork JSON-LD structured data for the project', () => {
    const { container } = render(<WorkCaseStudyPage params={{ slug: 'trailvista-theme' }} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();
    const data = JSON.parse(script?.innerHTML ?? '{}');
    expect(data['@type']).toBe('CreativeWork');
    expect(data.name).toBe('Trailvista Theme');
  });
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `yarn test "app/work/[slug]/page"`
Expected: FAIL — no `<script type="application/ld+json">` exists yet.

- [ ] **Step 3: Implement `CreativeWorkJsonLd` in `app/work/[slug]/page.tsx`**

Add the import and helper, and render it as the first child of the returned
fragment:

```tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { Tag } from '@/components/ui/Tag';
import { profile } from '@/data/profile';
import { getProjectBySlug, projects, type Project } from '@/data/projects';

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

function CreativeWorkJsonLd({ project }: { project: Project }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.summary,
    creator: {
      '@type': 'Person',
      name: profile.name,
    },
  };

  return (
    // eslint-disable-next-line react/no-danger
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export default function WorkCaseStudyPage({ params }: WorkCaseStudyPageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <CreativeWorkJsonLd project={project} />
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

- [ ] **Step 5: Write the failing test for the blog post page**

Add this test to `app/blog/[slug]/page.test.tsx` (keep the 2 existing tests
as-is):

```tsx
  it('renders BlogPosting JSON-LD structured data for the post', () => {
    const { container } = render(<BlogPostPage params={{ slug: 'elementor-vs-bricks' }} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();
    const data = JSON.parse(script?.innerHTML ?? '{}');
    expect(data['@type']).toBe('BlogPosting');
    expect(data.headline).toBe('Elementor vs Bricks');
  });
```

- [ ] **Step 6: Run the test and verify it fails**

Run: `yarn test "app/blog/[slug]/page"`
Expected: FAIL — no `<script type="application/ld+json">` exists yet.

- [ ] **Step 7: Implement `BlogPostingJsonLd` in `app/blog/[slug]/page.tsx`**

```tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { blogPosts, getBlogPostBySlug, type BlogPost } from '@/data/blogPosts';
import { profile } from '@/data/profile';

interface BlogPostPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = getBlogPostBySlug(params.slug);
  if (!post) {
    return {};
  }
  return {
    title: `${post.title} — Madan G.C`,
    description: post.dek,
  };
}

function BlogPostingJsonLd({ post }: { post: BlogPost }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.dek,
    author: {
      '@type': 'Person',
      name: profile.name,
    },
  };

  return (
    // eslint-disable-next-line react/no-danger
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-24">
      <BlogPostingJsonLd post={post} />
      <h1 className="mb-4 text-4xl font-semibold text-foreground sm:text-5xl">{post.title}</h1>
      <p className="mb-8 max-w-prose text-lg text-muted">{post.dek}</p>
      <div className="space-y-4">
        {post.body.map((paragraph, index) => (
          <p key={`${post.slug}-${index}`} className="text-muted">
            {paragraph}
          </p>
        ))}
      </div>
      <div className="mt-12">
        <Button href="/blog" variant="ghost">
          ← Back to blog
        </Button>
      </div>
    </article>
  );
}
```

(This is the same file Task 3 already touched — this step's version
includes Task 3's key fix so the file stays consistent; if Task 3 already
landed, this step is a small additive diff on top of it, not a revert.)

- [ ] **Step 8: Run the test and verify it passes**

Run: `yarn test "app/blog/[slug]/page"`
Expected: PASS (3 tests).

- [ ] **Step 9: Run the full suite and build**

Run: `yarn test && yarn build`
Expected: all tests pass; build succeeds.

- [ ] **Step 10: Commit**

```bash
git add "app/work/[slug]/page.tsx" "app/work/[slug]/page.test.tsx" "app/blog/[slug]/page.tsx" "app/blog/[slug]/page.test.tsx"
git commit -m "feat: add CreativeWork and BlogPosting JSON-LD structured data"
```

---

### Task 7: Finalize `CONTENT-TODO.md`, final verification

**Files:**
- Modify: `CONTENT-TODO.md`

**Interfaces:**
- None — documentation only.

- [ ] **Step 1: Replace `CONTENT-TODO.md`**

```markdown
# Content To-Do

Every item below is placeholder or unconfirmed content shipped intentionally
so the site's structure could be reviewed immediately (spec §4, §7). Nothing
here should be treated as final copy.

## Blocking (site is not truly launch-ready without these)

- [ ] Add the real résumé PDF at `public/resume/Madan-GC-Resume.pdf`
      (referenced by `data/profile.ts` → `resumeUrl`). Until this file
      exists, the Nav's "Résumé" button and the Hero's "Download Resume"
      button both 404.
- [ ] Replace the placeholder domain `https://madangc.example` with the real
      production domain in `app/layout.tsx` (`metadataBase`), `app/sitemap.ts`,
      `app/robots.ts`, and the `PersonJsonLd`/`CreativeWorkJsonLd`/
      `BlogPostingJsonLd` blocks across `app/page.tsx`,
      `app/work/[slug]/page.tsx`, and `app/blog/[slug]/page.tsx`.
- [ ] Confirm `/images/me.jpg` is an appropriate professional headshot for the
      Hero photo — the original site's alt text called it "Mountain
      landscape," so verify it's actually a headshot before launch.

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
- [ ] `/open-source`'s description of MGCora Unused Media Finder should be
      upgraded once the plugin is actually published — `data/profile.ts`'s
      "Plugin Author" hero stat still says "In progress", so avoid language
      that implies the plugin is already live or established.
- [ ] `data/wordcamps.ts` and `/community` show only the one confirmed
      appearance (WordCamp Kathmandu 2022, Organizer). Add further entries
      only once additional WordCamp attendance is confirmed — do not infer
      or estimate.
- [ ] All 5 posts in `data/blogPosts.ts` (`/blog` and `/blog/[slug]`) have
      short, generic placeholder bodies rather than finished articles.
      Replace each with a real, complete write-up before presenting them as
      genuine posts. No publish dates exist yet either — add them once posts
      are actually published, in the order they go live, and add
      `datePublished` to each post's `BlogPosting` JSON-LD
      (`app/blog/[slug]/page.tsx`) at the same time.

## Known technical debt (non-blocking, low priority)

- [ ] The focus-visible ring class string
      (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-from focus-visible:ring-offset-2 focus-visible:ring-offset-background`)
      is duplicated across 9 files (`Nav`, `Footer`, `Trust`, `Button`,
      `ProjectCard`, `CommunityStrip`, `FeaturedProjects`, `BlogPostCard`,
      `BlogPreview`). Extracting it to a shared constant or CSS utility would
      make the accessibility contract easier to maintain — purely a
      dev-ergonomics improvement, zero end-user impact today.

## Final QA

- [ ] A Lighthouse/accessibility pass against the live built site is
      planned as a follow-up to this phase — findings will be appended here.
```

- [ ] **Step 2: Run the full suite and build one final time**

Run: `yarn test && yarn build`
Expected: all tests pass (should be 74: the 69 from Phase 4 plus the 5 new
ones this phase added — 2 in `Section.test.tsx`, 2 in `Nav.test.tsx`, 1 in
`app/work/[slug]/page.test.tsx`, 1 in `app/blog/[slug]/page.test.tsx` — note
this arithmetic is 69+2+2+1+1=75, recount against the actual suite output
rather than trusting this number, since a prior phase's plan got a
page-count arithmetic claim wrong); build succeeds and includes `/icon` and
`/opengraph-image` in the route list alongside every existing route.

- [ ] **Step 3: Commit**

```bash
git add CONTENT-TODO.md
git commit -m "docs: finalize CONTENT-TODO.md for Phase 5"
```
