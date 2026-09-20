# Portfolio Phase 4 (Blog) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `/blog` and `/blog/[slug]` pages with 5 stub posts, a Home
page "From the Blog" preview, and close the **last** of the Nav's known
dead-link entries — after this phase, every Nav link resolves to a real page.

**Architecture:** Mirrors Phase 2's `/work` pattern: a typed `data/blogPosts.ts`
(5 entries, placeholder bodies, no fabricated dates) drives a `BlogPostCard`
component shared between the `/blog` index and the Home page's `BlogPreview`
section, plus a statically-generated `/blog/[slug]` article template.

**Tech Stack:** Same as Phases 1-3 — Next.js 14 App Router, TypeScript,
Tailwind CSS, Vitest + React Testing Library. No new dependencies.

**Spec:** `docs/superpowers/specs/2026-09-20-portfolio-phase4-blog-design.md`
(and parent: `docs/superpowers/specs/2026-09-16-portfolio-redesign-design.md`)

## Global Constraints

- No fabricated content: `data/blogPosts.ts` has no publish-date field at
  all — never add one with an invented date. Body paragraphs are short,
  generic, non-fabricated placeholder prose (no specific unverified
  technical claims, metrics, or achievements).
- Color tokens (from Phases 1-3, still binding): background `#0A0A0F`,
  surface `#12121A`, border `#232330`, foreground `#F5F5F7`, muted `#9CA3AF`,
  accent gradient `#6366F1 → #A855F7`, small-text accent `#818CF8`
  (`text-accent-text`).
- Accessibility: every new interactive link needs the existing
  `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-from focus-visible:ring-offset-2 focus-visible:ring-offset-background`
  classes. Every link with repeated visible text ("Read post →") needs a
  distinct `aria-label` per item, matching the pattern established in
  `ProjectCard`/`CommunityStrip` (Phases 2-3) — never ship two links with
  the same accessible name on one page.
- Each page has exactly one `<h1>`.
- Every placeholder decision this phase makes must be tracked in
  `CONTENT-TODO.md` (Task 6).
- Package manager is Yarn. `@/*` import alias resolves to repo root.

---

### Task 1: Data layer — `data/blogPosts.ts`

**Files:**
- Create: `data/blogPosts.ts`, `data/blogPosts.test.ts`

**Interfaces:**
- Produces: `interface BlogPost { slug: string; title: string; dek: string; body: string[] }`,
  `blogPosts: BlogPost[]` (exactly 5 entries), `getBlogPostBySlug(slug: string): BlogPost | undefined`.
- Consumed by: Task 2 (`BlogPostCard`), Task 3 (`/blog`), Task 4
  (`/blog/[slug]`), Task 5 (`BlogPreview`).

- [ ] **Step 1: Write the failing test**

```ts
import { describe, expect, it } from 'vitest';
import { blogPosts, getBlogPostBySlug } from './blogPosts';

describe('blogPosts', () => {
  it('has exactly 5 posts with unique slugs', () => {
    expect(blogPosts).toHaveLength(5);
    const slugs = blogPosts.map((post) => post.slug);
    expect(new Set(slugs).size).toBe(5);
  });

  it('gives every post at least one body paragraph', () => {
    blogPosts.forEach((post) => {
      expect(post.body.length).toBeGreaterThan(0);
    });
  });
});

describe('getBlogPostBySlug', () => {
  it('returns the matching post', () => {
    const post = getBlogPostBySlug('elementor-vs-bricks');
    expect(post?.title).toBe('Elementor vs Bricks');
  });

  it('returns undefined for an unknown slug', () => {
    expect(getBlogPostBySlug('does-not-exist')).toBeUndefined();
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `yarn test data/blogPosts`
Expected: FAIL — `Cannot find module './blogPosts'`.

- [ ] **Step 3: Implement `data/blogPosts.ts`**

```ts
export interface BlogPost {
  slug: string;
  title: string;
  dek: string;
  body: string[];
}

// All 5 entries are placeholder content (spec §2) — short, generic intro
// paragraphs, not finished articles, and no publish-date field since none
// are actually published yet. Tracked in CONTENT-TODO.md.
export const blogPosts: BlogPost[] = [
  {
    slug: 'lessons-from-building-wordpress-plugins',
    title: 'Lessons from Building WordPress Plugins',
    dek: "A few things I've learned building WordPress plugins that only became obvious after shipping one.",
    body: [
      "Building a WordPress plugin is a different discipline from building a typical web app — you're extending a platform you don't control, for site owners with wildly different themes, page builders, and other plugins running alongside yours.",
      'The biggest lesson has been to design for compatibility first. A feature that works perfectly on a clean install can break in unexpected ways once real-world custom fields and page builders enter the picture, so testing across common setups matters more than polishing edge-case features.',
      "Working within WordPress's hook and filter system, rather than around it, has also made plugins easier to maintain — and much less likely to break when WordPress core or another plugin updates.",
    ],
  },
  {
    slug: 'what-i-learned-contributing-to-wordcamp',
    title: 'What I Learned Contributing to WordCamp',
    dek: 'Notes from volunteering as an organizer at WordCamp Kathmandu.',
    body: [
      'Volunteering to help organize WordCamp Kathmandu gave me a different view of the WordPress community than working with it purely as a developer — a lot of what makes an event work happens well before attendees ever show up.',
      "Coordinating with other volunteers, speakers, and sponsors is its own skill, separate from writing code, and it's made me appreciate how much community events depend on people willing to handle the unglamorous logistics.",
      "It's also been a good reminder that the WordPress ecosystem is held together by volunteers as much as by the software itself.",
    ],
  },
  {
    slug: 'elementor-vs-bricks',
    title: 'Elementor vs Bricks',
    dek: 'A practical comparison of two page builders I use regularly in client work.',
    body: [
      'Elementor and Bricks solve the same basic problem — visual page building for WordPress — but they come from noticeably different philosophies.',
      'Elementor is the more established, widely-supported option with a huge ecosystem of third-party widgets, which makes it a safe default for client projects where long-term support matters.',
      "Bricks leans more toward developer-friendly, performance-conscious output, which shows up in cleaner generated markup and fewer extra assets loaded on the frontend. Which one I reach for usually comes down to the client's team: how comfortable they are editing content themselves, and how much custom development the project actually needs.",
    ],
  },
  {
    slug: 'frontend-performance-tips',
    title: 'Frontend Performance Tips',
    dek: 'A few practical habits that make the biggest difference in real-world frontend performance.',
    body: [
      "Most frontend performance work isn't exotic — it's a handful of habits applied consistently: optimizing images before they ever reach the page, deferring non-critical JavaScript, and being deliberate about what loads above the fold versus what can wait.",
      "On WordPress sites specifically, plugin sprawl is usually the biggest performance risk. Every additional plugin is another set of scripts and styles that may or may not be needed on a given page, so auditing what's actually loading is often more valuable than any single optimization technique.",
      "Measuring before and after every change matters too — it's easy to assume something helped when the real gain came from somewhere else entirely.",
    ],
  },
  {
    slug: 'my-journey-as-a-frontend-developer',
    title: 'My Journey as a Frontend Developer',
    dek: "How I got into frontend development and WordPress, and what's kept me interested.",
    body: [
      'I got into frontend development the way a lot of people do — by wanting to build something and learning just enough HTML and CSS to make it happen, then gradually going deeper.',
      'WordPress became a natural focus once I started doing client work, since so much of the web still runs on it, and there was always more to learn: theme development, custom Elementor widgets, and eventually plugin development.',
      "What's kept me interested is the mix of frontend craft and the WordPress ecosystem's scale — the same skills that make a good frontend developer also make it possible to build tools and themes that other people actually use.",
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
```

- [ ] **Step 4: Run the test and verify it passes**

Run: `yarn test data/blogPosts`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add data/blogPosts.ts data/blogPosts.test.ts
git commit -m "feat: add blog posts data layer (5 stub entries, placeholder content)"
```

---

### Task 2: `BlogPostCard` component

**Files:**
- Create: `components/blog/BlogPostCard.tsx`, `components/blog/BlogPostCard.test.tsx`

**Interfaces:**
- Consumes: `Card` (Phase 1), `BlogPost` type (Task 1).
- Produces: `BlogPostCard({ post: BlogPost })`.
- Consumed by: Task 3 (`/blog` index), Task 5 (`BlogPreview`).

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { BlogPost } from '@/data/blogPosts';
import { BlogPostCard } from './BlogPostCard';

const post: BlogPost = {
  slug: 'elementor-vs-bricks',
  title: 'Elementor vs Bricks',
  dek: 'A practical comparison of two page builders I use regularly in client work.',
  body: ['Paragraph one.'],
};

describe('BlogPostCard', () => {
  it('renders the title, dek, and a link to the post', () => {
    render(<BlogPostCard post={post} />);
    expect(screen.getByRole('heading', { name: 'Elementor vs Bricks' })).toBeInTheDocument();
    expect(
      screen.getByText('A practical comparison of two page builders I use regularly in client work.'),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Read post: Elementor vs Bricks/ })).toHaveAttribute(
      'href',
      '/blog/elementor-vs-bricks',
    );
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `yarn test BlogPostCard`
Expected: FAIL — `Cannot find module './BlogPostCard'`.

- [ ] **Step 3: Implement `BlogPostCard`**

```tsx
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import type { BlogPost } from '@/data/blogPosts';

interface BlogPostCardProps {
  post: BlogPost;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Card>
      <h3 className="mb-2 text-lg font-semibold text-foreground">{post.title}</h3>
      <p className="mb-4 text-sm text-muted">{post.dek}</p>
      <Link
        href={`/blog/${post.slug}`}
        aria-label={`Read post: ${post.title}`}
        className="rounded text-sm font-medium text-accent-text hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-from focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        Read post <span aria-hidden="true">→</span>
      </Link>
    </Card>
  );
}
```

- [ ] **Step 4: Run the test and verify it passes**

Run: `yarn test BlogPostCard`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/blog/BlogPostCard.tsx components/blog/BlogPostCard.test.tsx
git commit -m "feat: add BlogPostCard component"
```

---

### Task 3: `/blog` index page

**Files:**
- Create: `app/blog/page.tsx`, `app/blog/page.test.tsx`

**Interfaces:**
- Consumes: `Section({..., as: 'h1'})` (Phase 3), `BlogPostCard` (Task 2),
  `blogPosts` (Task 1).
- Produces: the `/blog` route.

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import BlogPage from './page';

describe('BlogPage', () => {
  it('renders a heading and a card for all 5 posts', () => {
    render(<BlogPage />);
    expect(screen.getByRole('heading', { name: 'Blog', level: 1 })).toBeInTheDocument();

    const titles = [
      'Lessons from Building WordPress Plugins',
      'What I Learned Contributing to WordCamp',
      'Elementor vs Bricks',
      'Frontend Performance Tips',
      'My Journey as a Frontend Developer',
    ];
    titles.forEach((title) => {
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
    });

    expect(screen.getAllByRole('link', { name: /^Read post:/ })).toHaveLength(5);
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `yarn test "app/blog/page"`
Expected: FAIL — `Cannot find module './page'`.

- [ ] **Step 3: Implement `app/blog/page.tsx`**

```tsx
import type { Metadata } from 'next';
import { BlogPostCard } from '@/components/blog/BlogPostCard';
import { Section } from '@/components/ui/Section';
import { blogPosts } from '@/data/blogPosts';

export const metadata: Metadata = {
  title: 'Blog — Madan G.C',
  description: 'Notes on WordPress, frontend development, and the community.',
};

export default function BlogPage() {
  return (
    <Section
      as="h1"
      eyebrow="Blog"
      title="Notes on WordPress, frontend development, and the community."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 4: Run the test and verify it passes**

Run: `yarn test "app/blog/page"`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/blog/page.tsx app/blog/page.test.tsx
git commit -m "feat: add /blog index page"
```

---

### Task 4: `/blog/[slug]` article template

**Files:**
- Create: `app/blog/[slug]/page.tsx`, `app/blog/[slug]/page.test.tsx`

**Interfaces:**
- Consumes: `Button` (Phase 1), `blogPosts`/`getBlogPostBySlug` (Task 1).
- Produces: the `/blog/[slug]` route, `generateStaticParams()` returning the
  5 slugs.

**Design note:** unlike `/work`/`/community`/`/open-source`, this page does
NOT use `Section` — it's a single continuous article body (title, dek,
paragraphs), not a labeled multi-block layout, so a plain `<article>` with a
narrower `max-w-3xl` reading width (versus the site's usual `max-w-6xl`) is
more appropriate for long-form prose.

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { blogPosts } from '@/data/blogPosts';
import BlogPostPage, { generateStaticParams } from './page';

describe('generateStaticParams', () => {
  it('returns exactly the 5 post slugs', () => {
    const params = generateStaticParams();
    expect(params).toHaveLength(5);
    expect(params.map((param) => param.slug).sort()).toEqual(
      blogPosts.map((post) => post.slug).sort(),
    );
  });
});

describe('BlogPostPage', () => {
  it('renders the title, dek, body paragraphs, and a back link for a known slug', () => {
    render(<BlogPostPage params={{ slug: 'elementor-vs-bricks' }} />);

    expect(screen.getByRole('heading', { name: 'Elementor vs Bricks', level: 1 })).toBeInTheDocument();
    expect(
      screen.getByText('A practical comparison of two page builders I use regularly in client work.'),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Back to blog/ })).toHaveAttribute('href', '/blog');
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `yarn test "app/blog/[slug]/page"`
Expected: FAIL — `Cannot find module './page'`.

- [ ] **Step 3: Implement `app/blog/[slug]/page.tsx`**

```tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { blogPosts, getBlogPostBySlug } from '@/data/blogPosts';

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

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="mb-4 text-4xl font-semibold text-foreground sm:text-5xl">{post.title}</h1>
      <p className="mb-8 max-w-prose text-lg text-muted">{post.dek}</p>
      <div className="space-y-4">
        {post.body.map((paragraph) => (
          <p key={paragraph} className="text-muted">
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

- [ ] **Step 4: Run the test and verify it passes**

Run: `yarn test "app/blog/[slug]/page"`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add "app/blog/[slug]/page.tsx" "app/blog/[slug]/page.test.tsx"
git commit -m "feat: add /blog/[slug] article template"
```

---

### Task 5: `BlogPreview` Home section

**Files:**
- Create: `components/sections/BlogPreview.tsx`, `components/sections/BlogPreview.test.tsx`

**Interfaces:**
- Consumes: `Section` (Phase 2, default `as="h2"`), `BlogPostCard` (Task 2),
  `blogPosts` (Task 1).
- Produces: `BlogPreview()`.

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BlogPreview } from './BlogPreview';

describe('BlogPreview', () => {
  it('renders exactly the first 3 posts and a link to the full blog', () => {
    render(<BlogPreview />);

    expect(
      screen.getByRole('heading', { name: 'Lessons from Building WordPress Plugins' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'What I Learned Contributing to WordCamp' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Elementor vs Bricks' })).toBeInTheDocument();

    expect(screen.queryByRole('heading', { name: 'Frontend Performance Tips' })).toBeNull();

    expect(screen.getByRole('link', { name: /View all posts/ })).toHaveAttribute('href', '/blog');
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `yarn test BlogPreview`
Expected: FAIL — `Cannot find module './BlogPreview'`.

- [ ] **Step 3: Implement `BlogPreview`**

```tsx
import Link from 'next/link';
import { BlogPostCard } from '@/components/blog/BlogPostCard';
import { Section } from '@/components/ui/Section';
import { blogPosts } from '@/data/blogPosts';

export function BlogPreview() {
  const latest = blogPosts.slice(0, 3);

  return (
    <Section eyebrow="From the Blog" title="Notes on WordPress and frontend development.">
      <div className="grid gap-6 sm:grid-cols-3">
        {latest.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
      <div className="mt-8">
        <Link
          href="/blog"
          className="rounded text-sm font-medium text-accent-text hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-from focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          View all posts →
        </Link>
      </div>
    </Section>
  );
}
```

- [ ] **Step 4: Run the test and verify it passes**

Run: `yarn test BlogPreview`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/sections/BlogPreview.tsx components/sections/BlogPreview.test.tsx
git commit -m "feat: add BlogPreview Home section"
```

---

### Task 6: Wire into Home page, update sitemap, update `CONTENT-TODO.md`, final verification

**Files:**
- Modify: `app/page.tsx`, `app/page.test.tsx`, `app/sitemap.ts`,
  `app/sitemap.test.ts`, `CONTENT-TODO.md`

**Interfaces:**
- Consumes: `BlogPreview` (Task 5).

- [ ] **Step 1: Add `BlogPreview` to the Home page**

In `app/page.tsx`, add the import (alphabetically, before `CommunityStrip`):

```tsx
import { BlogPreview } from '@/components/sections/BlogPreview';
```

and replace:

```tsx
      <Testimonials />
      {/* Phase 4 will insert a "Latest from the blog" preview here. */}
      <Contact />
```

with:

```tsx
      <Testimonials />
      <BlogPreview />
      <Contact />
```

- [ ] **Step 2: Extend the Home page smoke test**

In `app/page.test.tsx`, add one assertion right after the Testimonials block
in the "renders distinctive content from every section" test:

```tsx
    // Testimonials
    expect(screen.getByText('Client Name')).toBeInTheDocument();

    // Blog preview
    expect(
      screen.getByRole('heading', { name: 'Lessons from Building WordPress Plugins' }),
    ).toBeInTheDocument();

    // Contact
```

- [ ] **Step 3: Run the test and verify it passes**

Run: `yarn test "app/page"`
Expected: PASS (3 tests, including the extended one).

- [ ] **Step 4: Update `app/sitemap.ts` to include `/blog` and every post**

```ts
import type { MetadataRoute } from 'next';
import { blogPosts } from '@/data/blogPosts';
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
    { url: `${baseUrl}/blog`, lastModified },
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified,
    })),
  ];
}
```

- [ ] **Step 5: Update `app/sitemap.test.ts` for the new route count**

Replace the whole file:

```ts
import { describe, expect, it } from 'vitest';
import { blogPosts } from '@/data/blogPosts';
import { projects } from '@/data/projects';
import sitemap from './sitemap';

describe('sitemap', () => {
  it('includes every route: homepage, /work + case studies, /open-source, /community, /blog + posts', () => {
    const entries = sitemap();
    expect(entries).toHaveLength(projects.length + blogPosts.length + 5);

    const urls = entries.map((entry) => entry.url);
    expect(urls).toContain('https://madangc.example');
    expect(urls).toContain('https://madangc.example/work');
    projects.forEach((project) => {
      expect(urls).toContain(`https://madangc.example/work/${project.slug}`);
    });
    expect(urls).toContain('https://madangc.example/open-source');
    expect(urls).toContain('https://madangc.example/community');
    expect(urls).toContain('https://madangc.example/blog');
    blogPosts.forEach((post) => {
      expect(urls).toContain(`https://madangc.example/blog/${post.slug}`);
    });
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
      are actually published, in the order they go live.

## Later phases (tracked here now, addressed when that phase is built)

- [ ] Phase 5 — Polish: SEO/schema audit, Lighthouse/performance pass,
      accessibility pass, final QA, and finalizing this checklist.
```

- [ ] **Step 8: Run the full suite and build**

Run: `yarn test && yarn build`
Expected: all tests pass; build succeeds with 6 more static pages than
Phase 3 generated (`/blog` + 5 `/blog/[slug]` pages).

- [ ] **Step 9: Commit**

```bash
git add app/page.tsx app/page.test.tsx app/sitemap.ts app/sitemap.test.ts CONTENT-TODO.md
git commit -m "feat: wire BlogPreview into Home page, update sitemap and content checklist"
```
