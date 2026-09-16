# Portfolio Foundation (Phase 1) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the static HTML/Sass portfolio with a Next.js (App Router,
TypeScript, Tailwind CSS) site that has a full dark-mode design system and a
complete, premium Home page: Hero, Trust, Skills, Experience, Testimonials,
Contact — wired together in a root layout with Nav/Footer, SEO basics, and a
content-tracking checklist for everything that's still a placeholder.

**Architecture:** A component library (`components/ui/*`) of small,
independently-tested primitives (Button, Tag, Card, StatTile, Timeline,
FadeIn) composes into page sections (`components/sections/*`), which read
from typed data files (`data/*.ts`). The Home page (`app/page.tsx`) and root
layout (`app/layout.tsx`) assemble everything. Later phases (Featured
Projects, Open Source, Community, Blog) will add new routes and reuse these
same primitives — nothing here is Home-page-specific except the section
components themselves.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS 3, Framer
Motion (scroll-reveal only), Geist Sans/Mono (`geist` npm package), Vitest +
React Testing Library for component tests, Yarn.

**Spec:** `docs/superpowers/specs/2026-09-16-portfolio-redesign-design.md`

## Global Constraints

- Dark mode only for this phase — no light-mode toggle. `color-scheme: dark`.
- Color tokens (exact hex, from spec §6): background `#0A0A0F`, surface
  `#12121A`, border `#232330`, foreground `#F5F5F7`, muted `#9CA3AF`, accent
  gradient `#6366F1 → #A855F7`. Accent used sparingly (CTAs, active states,
  hover glows), never as a global tint.
- Typography: Geist Sans for UI/headings, Geist Mono for tags/labels (spec §6).
- Spacing scale: Tailwind default 4px-based scale (spec §6) — no custom scale.
- No fabricated content: any field without a confirmed real value (spec §3)
  ships as clearly-flagged placeholder data plus a `CONTENT-TODO.md` entry —
  never as an invented metric, quote, or logo (spec §4, §7).
- No phone number, no Instagram/X link anywhere on the public site (spec §4).
- Real contact data (spec §3): email `madan1239@gmail.com`, GitHub
  `https://github.com/madan1gc`, LinkedIn
  `https://www.linkedin.com/in/madan-g-c-492b23198/`, WordPress.org
  `https://profiles.wordpress.org/madan1gc/`.
- Accessibility: semantic landmarks, skip-to-content link, visible focus
  states, AA contrast minimum, `prefers-reduced-motion` respected everywhere
  motion is used (spec §6, §8).
- Package manager is Yarn (matches existing `yarn.lock`).
- Placeholder domain for any URL that needs a real production domain later:
  `https://madangc.example` (RFC 2606 reserved TLD — obviously fake, never
  resolves, safe to leave in code until a real domain is chosen).

---

### Task 1: Scaffold the Next.js project and retire the static site

**Files:**
- Create: `package.json` (replace existing), `tsconfig.json`,
  `next.config.mjs`, `postcss.config.js`, `tailwind.config.ts`,
  `.eslintrc.json`, `.gitignore`, `app/layout.tsx`, `app/page.tsx`,
  `app/globals.css`
- Move: `images/me.jpg` → `public/images/me.jpg`
- Delete: `index.html`, `style.css`, `style.css.map`, `sass/style.scss`
  (and the now-empty `sass/` directory), `images/` (now empty after the move)

**Interfaces:**
- Produces: a buildable Next.js App Router project (`yarn build` succeeds),
  the `@/*` import alias resolving to the repo root, Tailwind processing
  `app/**/*.{ts,tsx}` and `components/**/*.{ts,tsx}`.

- [ ] **Step 1: Remove the static site files**

```bash
git rm index.html style.css style.css.map sass/style.scss
mkdir -p public/images
git mv images/me.jpg public/images/me.jpg
rmdir sass images 2>/dev/null || true
```

- [ ] **Step 2: Replace `package.json`**

```json
{
  "name": "madan-portfolio",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "geist": "^1.3.1",
    "framer-motion": "^11.3.0",
    "next": "^14.2.5",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.4.8",
    "@testing-library/react": "^16.0.0",
    "@testing-library/user-event": "^14.5.2",
    "@types/node": "^20.14.15",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.19",
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.5",
    "jsdom": "^24.1.1",
    "postcss": "^8.4.41",
    "tailwindcss": "^3.4.9",
    "typescript": "^5.5.4",
    "vitest": "^2.0.5"
  }
}
```

- [ ] **Step 3: Add `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Add `next.config.mjs`**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
```

- [ ] **Step 5: Add `postcss.config.js` and a minimal `tailwind.config.ts`**

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
};

export default config;
```

- [ ] **Step 6: Add `.eslintrc.json` and `.gitignore`**

```json
{
  "extends": "next/core-web-vitals"
}
```

```
node_modules/
.next/
out/
*.tsbuildinfo
next-env.d.ts
.env*.local
coverage/
```

- [ ] **Step 7: Add minimal `app/layout.tsx`, `app/page.tsx`, `app/globals.css`**

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

```tsx
export default function HomePage() {
  return <main>Hello, world</main>;
}
```

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 8: Install dependencies and verify the build**

Run: `yarn install && yarn build`
Expected: build completes with `✓ Compiled successfully` and no type errors.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js app, retire static HTML/Sass site"
```

---

### Task 2: Testing infrastructure (Vitest + React Testing Library)

**Files:**
- Create: `vitest.config.ts`, `vitest.setup.ts`, `components/ui/sanity.test.tsx`

**Interfaces:**
- Produces: `yarn test` running Vitest in jsdom with `@testing-library/jest-dom`
  matchers globally available, and mocked `IntersectionObserver`/`matchMedia`
  so Framer Motion's `whileInView` and any media-query code don't throw in
  jsdom. This is a dependency every later component test task relies on.

- [ ] **Step 1: Add `vitest.config.ts`**

```ts
import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
```

- [ ] **Step 2: Add `vitest.setup.ts`**

```ts
import '@testing-library/jest-dom/vitest';

class IntersectionObserverMock {
  observe = () => {};
  unobserve = () => {};
  disconnect = () => {};
}

// jsdom does not implement IntersectionObserver; Framer Motion's
// whileInView needs it to exist.
// @ts-expect-error - test-only global assignment
global.IntersectionObserver = IntersectionObserverMock;

if (!window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList;
}
```

- [ ] **Step 3: Write a sanity test to prove the harness works**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('test harness', () => {
  it('renders and asserts with jest-dom matchers', () => {
    render(<p>hello</p>);
    expect(screen.getByText('hello')).toBeInTheDocument();
  });
});
```

- [ ] **Step 4: Run the test and verify it passes**

Run: `yarn test`
Expected: 1 passed test, no console errors about missing `IntersectionObserver`.

- [ ] **Step 5: Delete the sanity test (its job was to prove the setup, not to guard behavior)**

```bash
git rm components/ui/sanity.test.tsx
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "test: add Vitest + Testing Library harness with jsdom mocks"
```

---

### Task 3: Design tokens — Tailwind theme, fonts, global styles

**Files:**
- Modify: `tailwind.config.ts`, `app/globals.css`

**Interfaces:**
- Produces: Tailwind color utilities `bg-background`, `bg-surface`,
  `border-border`, `text-foreground`, `text-muted`, `from-accent-from`,
  `to-accent-to`; font families `font-sans` (Geist Sans) and `font-mono`
  (Geist Mono) via CSS variables `--font-geist-sans` / `--font-geist-mono`;
  a `max-w-prose` (68ch) utility; a `float` keyframe/animation utility used by
  the Hero background glow (Task 10).

- [ ] **Step 1: Extend `tailwind.config.ts` with the design tokens**

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0F',
        surface: '#12121A',
        border: '#232330',
        foreground: '#F5F5F7',
        muted: '#9CA3AF',
        accent: {
          from: '#6366F1',
          to: '#A855F7',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      maxWidth: {
        prose: '68ch',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 2: Replace `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: dark;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 3: Verify the build still succeeds**

Run: `yarn build`
Expected: build succeeds (no components use the new tokens yet, so this only
checks the config itself is valid).

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts app/globals.css
git commit -m "feat: add design system tokens (colors, fonts, spacing, motion)"
```

---

### Task 4: UI primitives — Button and Tag

**Files:**
- Create: `components/ui/Button.tsx`, `components/ui/Button.test.tsx`,
  `components/ui/Tag.tsx`, `components/ui/Tag.test.tsx`

**Interfaces:**
- Produces:
  - `Button({ href, variant?: 'primary' | 'secondary' | 'ghost', children, external?: boolean })`
  - `Tag({ children })`
- Consumed by: Nav, Hero, Contact (Button); Skills, Trust (Tag) — later tasks.

- [ ] **Step 1: Write the failing tests for `Button`**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders its children as a link to href', () => {
    render(<Button href="/work">View Projects</Button>);
    const link = screen.getByRole('link', { name: 'View Projects' });
    expect(link).toHaveAttribute('href', '/work');
  });

  it('opens external links safely in a new tab', () => {
    render(
      <Button href="https://github.com/madan1gc" external>
        GitHub
      </Button>,
    );
    const link = screen.getByRole('link', { name: 'GitHub' });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('does not add target/rel for internal links', () => {
    render(<Button href="/work">View Projects</Button>);
    const link = screen.getByRole('link', { name: 'View Projects' });
    expect(link).not.toHaveAttribute('target');
  });
});
```

- [ ] **Step 2: Run the tests and verify they fail**

Run: `yarn test Button`
Expected: FAIL — `Cannot find module './Button'`.

- [ ] **Step 3: Implement `Button`**

```tsx
import Link from 'next/link';
import type { ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps {
  href: string;
  variant?: ButtonVariant;
  children: ReactNode;
  external?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-accent-from to-accent-to text-white shadow-lg shadow-accent-from/20 hover:shadow-accent-from/40',
  secondary: 'border border-border text-foreground hover:border-accent-from',
  ghost: 'text-muted hover:text-foreground',
};

const focusRingClasses =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-from focus-visible:ring-offset-2 focus-visible:ring-offset-background';

export function Button({ href, variant = 'primary', children, external = false }: ButtonProps) {
  return (
    <Link
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-all duration-200 ${variantClasses[variant]} ${focusRingClasses}`}
    >
      {children}
    </Link>
  );
}
```

- [ ] **Step 4: Run the tests and verify they pass**

Run: `yarn test Button`
Expected: PASS (3 tests).

- [ ] **Step 5: Write the failing test for `Tag`**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Tag } from './Tag';

describe('Tag', () => {
  it('renders its label text', () => {
    render(<Tag>React</Tag>);
    expect(screen.getByText('React')).toBeInTheDocument();
  });
});
```

- [ ] **Step 6: Run the test and verify it fails**

Run: `yarn test Tag`
Expected: FAIL — `Cannot find module './Tag'`.

- [ ] **Step 7: Implement `Tag`**

```tsx
import type { ReactNode } from 'react';

interface TagProps {
  children: ReactNode;
}

export function Tag({ children }: TagProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted">
      {children}
    </span>
  );
}
```

- [ ] **Step 8: Run the test and verify it passes**

Run: `yarn test Tag`
Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add components/ui/Button.tsx components/ui/Button.test.tsx components/ui/Tag.tsx components/ui/Tag.test.tsx
git commit -m "feat: add Button and Tag UI primitives"
```

---

### Task 5: UI primitives — Card and StatTile

**Files:**
- Create: `components/ui/Card.tsx`, `components/ui/Card.test.tsx`,
  `components/ui/StatTile.tsx`, `components/ui/StatTile.test.tsx`

**Interfaces:**
- Produces: `Card({ children, className? })`, `StatTile({ label, value })`.
- Consumed by: Skills, Testimonials (Card); Hero (StatTile) — later tasks.

- [ ] **Step 1: Write the failing test for `Card`**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Card } from './Card';

describe('Card', () => {
  it('renders its children', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('merges a custom className with the base styles', () => {
    render(<Card className="custom-class">Content</Card>);
    expect(screen.getByText('Content')).toHaveClass('custom-class');
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `yarn test Card`
Expected: FAIL — `Cannot find module './Card'`.

- [ ] **Step 3: Implement `Card`**

```tsx
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:border-accent-from/50 hover:shadow-[0_0_40px_-15px_theme(colors.accent.from)] ${className}`}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 4: Run the test and verify it passes**

Run: `yarn test Card`
Expected: PASS (2 tests).

- [ ] **Step 5: Write the failing test for `StatTile`**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StatTile } from './StatTile';

describe('StatTile', () => {
  it('renders the value and label', () => {
    render(<StatTile label="Years Experience" value="4+" />);
    expect(screen.getByText('4+')).toBeInTheDocument();
    expect(screen.getByText('Years Experience')).toBeInTheDocument();
  });
});
```

- [ ] **Step 6: Run the test and verify it fails**

Run: `yarn test StatTile`
Expected: FAIL — `Cannot find module './StatTile'`.

- [ ] **Step 7: Implement `StatTile`**

```tsx
interface StatTileProps {
  label: string;
  value: string;
}

export function StatTile({ label, value }: StatTileProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-2xl font-semibold text-foreground sm:text-3xl">{value}</span>
      <span className="text-sm text-muted">{label}</span>
    </div>
  );
}
```

- [ ] **Step 8: Run the test and verify it passes**

Run: `yarn test StatTile`
Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add components/ui/Card.tsx components/ui/Card.test.tsx components/ui/StatTile.tsx components/ui/StatTile.test.tsx
git commit -m "feat: add Card and StatTile UI primitives"
```

---

### Task 6: UI primitive — Timeline

**Files:**
- Create: `components/ui/Timeline.tsx`, `components/ui/Timeline.test.tsx`

**Interfaces:**
- Produces: `TimelineItem { title: string; subtitle: string; period: string; description: string[] }`
  and `Timeline({ items: TimelineItem[] })`.
- Consumed by: Experience section (this phase) and the future Community/WordCamp
  page (Phase 3), which is why it takes generic `TimelineItem[]` rather than
  an experience-shaped type.

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Timeline, type TimelineItem } from './Timeline';

const items: TimelineItem[] = [
  {
    title: 'Frontend Developer',
    subtitle: 'Codewing Solutions · Kathmandu, Nepal',
    period: 'May 2022 — Present',
    description: ['Built things', 'Shipped things'],
  },
  {
    title: 'Frontend Intern',
    subtitle: 'Ekbana Solution · Kathmandu, Nepal',
    period: 'Jan 2022 — Apr 2022',
    description: ['Learned things'],
  },
];

describe('Timeline', () => {
  it('renders a heading, subtitle, and period for every item', () => {
    render(<Timeline items={items} />);
    expect(screen.getByRole('heading', { name: 'Frontend Developer' })).toBeInTheDocument();
    expect(screen.getByText('Codewing Solutions · Kathmandu, Nepal')).toBeInTheDocument();
    expect(screen.getByText('May 2022 — Present')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Frontend Intern' })).toBeInTheDocument();
  });

  it('renders every description line for every item', () => {
    render(<Timeline items={items} />);
    expect(screen.getByText('Built things')).toBeInTheDocument();
    expect(screen.getByText('Shipped things')).toBeInTheDocument();
    expect(screen.getByText('Learned things')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `yarn test Timeline`
Expected: FAIL — `Cannot find module './Timeline'`.

- [ ] **Step 3: Implement `Timeline`**

```tsx
export interface TimelineItem {
  title: string;
  subtitle: string;
  period: string;
  description: string[];
}

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <ol className="relative border-l border-border pl-6">
      {items.map((item) => (
        <li key={`${item.title}-${item.period}`} className="relative mb-10 last:mb-0">
          <span className="absolute -left-[29px] mt-1.5 h-2.5 w-2.5 rounded-full bg-gradient-to-r from-accent-from to-accent-to" />
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
            <span className="text-sm text-muted">{item.period}</span>
          </div>
          <p className="mb-3 text-sm text-muted">{item.subtitle}</p>
          <ul className="space-y-2">
            {item.description.map((line) => (
              <li key={line} className="flex gap-2 text-sm text-muted">
                <span className="text-accent-from">—</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
```

- [ ] **Step 4: Run the test and verify it passes**

Run: `yarn test Timeline`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add components/ui/Timeline.tsx components/ui/Timeline.test.tsx
git commit -m "feat: add Timeline UI primitive"
```

---

### Task 7: UI primitive — FadeIn (scroll-reveal animation)

**Files:**
- Create: `components/ui/FadeIn.tsx`, `components/ui/FadeIn.test.tsx`

**Interfaces:**
- Produces: `FadeIn({ children, delay?: number })` — a client component
  wrapping Framer Motion's `whileInView` for a one-time fade/slide-up reveal.
- Consumed by: Hero, Skills, Experience, Testimonials, Contact (later tasks)
  to deliver the "premium, subtle animation" requirement from the spec.
- Depends on: the `IntersectionObserver` mock added in Task 2 (Framer Motion
  requires it to be defined even in jsdom).

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FadeIn } from './FadeIn';

describe('FadeIn', () => {
  it('renders its children', () => {
    render(
      <FadeIn>
        <p>Revealed content</p>
      </FadeIn>,
    );
    expect(screen.getByText('Revealed content')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `yarn test FadeIn`
Expected: FAIL — `Cannot find module './FadeIn'`.

- [ ] **Step 3: Implement `FadeIn`**

```tsx
'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
}

export function FadeIn({ children, delay = 0 }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 4: Run the test and verify it passes**

Run: `yarn test FadeIn`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/ui/FadeIn.tsx components/ui/FadeIn.test.tsx
git commit -m "feat: add FadeIn scroll-reveal animation primitive"
```

---

### Task 8: Data layer — profile, trust, skills, experience, testimonials

**Files:**
- Create: `lib/date.ts`, `lib/date.test.ts`, `data/profile.ts`,
  `data/profile.test.ts`, `data/trust.ts`, `data/skills.ts`,
  `data/experience.ts`, `data/testimonials.ts`

**Interfaces:**
- Produces:
  - `getYearsOfExperience(referenceDate?: Date): number` (`lib/date.ts`)
  - `profile: { name, role, tagline, email, github, linkedin, wordpressOrg, resumeUrl, location }` (`data/profile.ts`)
  - `getHeroStats(): { label: string; value: string; placeholder?: boolean }[]` (`data/profile.ts`)
  - `trustItems: { name: string; href?: string }[]` (`data/trust.ts`)
  - `skillCategories: { title: string; skills: string[] }[]` (`data/skills.ts`)
  - `experience: { role, company, location, start, end, achievements: string[] }[]` (`data/experience.ts`)
  - `testimonials: { quote, name, role, placeholder: boolean }[]` (`data/testimonials.ts`)
- Consumed by: Nav, Footer, Hero, Trust, Skills, Experience, Testimonials,
  Contact (Task 9 onward).

- [ ] **Step 1: Write the failing test for `getYearsOfExperience`**

```ts
import { describe, expect, it } from 'vitest';
import { getYearsOfExperience } from './date';

describe('getYearsOfExperience', () => {
  it('returns 0 for a date less than a year after the start date', () => {
    expect(getYearsOfExperience(new Date('2022-11-01'))).toBe(0);
  });

  it('returns 4 for September 2026, given a May 2022 start date', () => {
    expect(getYearsOfExperience(new Date('2026-09-16'))).toBe(4);
  });

  it('returns 1 exactly one year after the start date', () => {
    expect(getYearsOfExperience(new Date('2023-05-01'))).toBe(1);
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `yarn test date`
Expected: FAIL — `Cannot find module './date'`.

- [ ] **Step 3: Implement `lib/date.ts`**

```ts
const EXPERIENCE_START = new Date('2022-05-01');
const MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365.25;

export function getYearsOfExperience(referenceDate: Date = new Date()): number {
  const years = (referenceDate.getTime() - EXPERIENCE_START.getTime()) / MS_PER_YEAR;
  return Math.floor(years);
}
```

- [ ] **Step 4: Run the test and verify it passes**

Run: `yarn test date`
Expected: PASS (3 tests).

- [ ] **Step 5: Write the failing test for `data/profile.ts`**

```ts
import { describe, expect, it, vi } from 'vitest';
import { getHeroStats, profile } from './profile';

describe('profile', () => {
  it('has the confirmed real contact links', () => {
    expect(profile.email).toBe('madan1239@gmail.com');
    expect(profile.github).toBe('https://github.com/madan1gc');
    expect(profile.linkedin).toBe('https://www.linkedin.com/in/madan-g-c-492b23198/');
    expect(profile.wordpressOrg).toBe('https://profiles.wordpress.org/madan1gc/');
  });
});

describe('getHeroStats', () => {
  it('computes a real years-of-experience stat instead of a hardcoded string', () => {
    vi.setSystemTime(new Date('2026-09-16'));
    const stats = getHeroStats();
    const years = stats.find((stat) => stat.label === 'Years Experience');
    expect(years?.value).toBe('4+');
    vi.useRealTimers();
  });

  it('flags the unconfirmed Plugin Author stat as a placeholder', () => {
    const stats = getHeroStats();
    const pluginAuthor = stats.find((stat) => stat.label === 'Plugin Author');
    expect(pluginAuthor?.placeholder).toBe(true);
  });
});
```

- [ ] **Step 6: Run the test and verify it fails**

Run: `yarn test profile`
Expected: FAIL — `Cannot find module './profile'`.

- [ ] **Step 7: Implement `data/profile.ts`**

```ts
import { getYearsOfExperience } from '@/lib/date';

export const profile = {
  name: 'Madan G.C',
  role: 'Frontend Developer & WordPress Product Builder',
  tagline:
    'I build fast, scalable WordPress experiences, custom plugins, and modern frontend interfaces using React, JavaScript, Elementor, Bricks, and WordPress.',
  email: 'madan1239@gmail.com',
  github: 'https://github.com/madan1gc',
  linkedin: 'https://www.linkedin.com/in/madan-g-c-492b23198/',
  wordpressOrg: 'https://profiles.wordpress.org/madan1gc/',
  resumeUrl: '/resume/Madan-GC-Resume.pdf',
  location: 'Kathmandu, Nepal',
} as const;

export interface HeroStat {
  label: string;
  value: string;
  placeholder?: boolean;
}

export function getHeroStats(): HeroStat[] {
  return [
    { label: 'Years Experience', value: `${getYearsOfExperience()}+` },
    { label: 'Major Projects', value: '7+' },
    { label: 'Community Role', value: 'WordCamp Organizer' },
    { label: 'Plugin Author', value: 'In progress', placeholder: true },
  ];
}
```

- [ ] **Step 8: Run the test and verify it passes**

Run: `yarn test profile`
Expected: PASS (3 tests).

- [ ] **Step 9: Add the remaining data files (no tests — plain data, already covered by section-level tests in later tasks)**

```ts
// data/trust.ts
export interface TrustItem {
  name: string;
  href?: string;
}

// Only confirmed real affiliations. WordCamp Nepal / WordCamp Asia are
// listed in CONTENT-TODO.md pending confirmation of actual attendance —
// do not add them here until confirmed (spec §4, §10).
export const trustItems: TrustItem[] = [
  { name: 'Codewing Solutions' },
  { name: 'WordPress.org', href: 'https://profiles.wordpress.org/madan1gc/' },
  { name: 'WordCamp Kathmandu' },
];
```

```ts
// data/skills.ts
export interface SkillCategory {
  title: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  { title: 'Frontend', skills: ['HTML', 'CSS', 'SCSS', 'JavaScript', 'React'] },
  {
    title: 'WordPress',
    skills: ['Theme Development', 'Elementor', 'Bricks', 'Gutenberg', 'Plugin Development'],
  },
  { title: 'Tools', skills: ['Git', 'GitHub', 'Figma', 'Cursor', 'AI Studio', 'n8n'] },
];
```

```ts
// data/experience.ts
export interface ExperienceEntry {
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  achievements: string[];
}

export const experience: ExperienceEntry[] = [
  {
    role: 'Frontend Developer',
    company: 'Codewing Solutions',
    location: 'Kathmandu, Nepal',
    start: 'May 2022',
    end: 'Present',
    achievements: [
      'Develop and maintain custom WordPress themes and plugins across diverse client industries.',
      'Build custom Elementor widgets that extend design flexibility for non-technical editors.',
      'Implement React components and dynamic interfaces to improve user experience.',
      'Optimize page performance and scalability, improving load times and SEO outcomes.',
      'Collaborate with designers, product managers, and QA to ship production releases.',
    ],
  },
  {
    role: 'Frontend Intern',
    company: 'Ekbana Solution',
    location: 'Kathmandu, Nepal',
    start: 'Jan 2022',
    end: 'Apr 2022',
    achievements: [
      'Assisted frontend development using HTML, CSS, JavaScript, and React.',
      'Contributed React components to existing production applications.',
      'Learned and applied industry best practices under senior developer mentorship.',
    ],
  },
];
```

```ts
// data/testimonials.ts
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  placeholder: boolean;
}

// All three entries are placeholders — see CONTENT-TODO.md. Replace with
// real client/team/community quotes before public launch (spec §7).
export const testimonials: Testimonial[] = [
  {
    quote: 'Add a real client quote describing the outcome of working with Madan.',
    name: 'Client Name',
    role: 'Founder, Client Company',
    placeholder: true,
  },
  {
    quote: 'Add a real teammate quote describing how Madan works day-to-day.',
    name: 'Teammate Name',
    role: 'Project Manager, Codewing Solutions',
    placeholder: true,
  },
  {
    quote: 'Add a real community quote from a WordCamp organizer or contributor.',
    name: 'Community Member',
    role: 'WordCamp Kathmandu',
    placeholder: true,
  },
];
```

- [ ] **Step 10: Run the full test suite and confirm nothing is broken**

Run: `yarn test`
Expected: all tests pass.

- [ ] **Step 11: Commit**

```bash
git add lib/date.ts lib/date.test.ts data/profile.ts data/profile.test.ts data/trust.ts data/skills.ts data/experience.ts data/testimonials.ts
git commit -m "feat: add typed data layer for profile, skills, experience, testimonials"
```

---

### Task 9: Layout — Nav, Footer, root layout

**Files:**
- Create: `components/layout/Nav.tsx`, `components/layout/Nav.test.tsx`,
  `components/layout/Footer.tsx`, `components/layout/Footer.test.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `Button` (Task 4), `profile` (Task 8).
- Produces: `Nav()` and `Footer()` server/client components rendered by the
  root layout around `{children}`; the skip-link target `#main-content`.

- [ ] **Step 1: Write the failing tests for `Nav`**

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Nav } from './Nav';

describe('Nav', () => {
  it('renders the primary nav links', () => {
    render(<Nav />);
    expect(screen.getByRole('link', { name: 'Work' })).toHaveAttribute('href', '/work');
    expect(screen.getByRole('link', { name: 'Open Source' })).toHaveAttribute('href', '/open-source');
    expect(screen.getByRole('link', { name: 'Community' })).toHaveAttribute('href', '/community');
    expect(screen.getByRole('link', { name: 'Blog' })).toHaveAttribute('href', '/blog');
  });

  it('toggles the mobile menu open and closed', async () => {
    const user = userEvent.setup();
    render(<Nav />);
    const toggle = screen.getByRole('button', { name: 'Toggle navigation menu' });
    // The desktop nav list is always in the DOM (hidden only via a CSS
    // class, which jsdom does not apply in tests), so we assert on the
    // mobile menu's conditional render by id rather than by role/visibility.
    expect(document.getElementById('mobile-nav')).toBeNull();
    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(document.getElementById('mobile-nav')).not.toBeNull();
    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(document.getElementById('mobile-nav')).toBeNull();
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `yarn test Nav`
Expected: FAIL — `Cannot find module './Nav'`.

- [ ] **Step 3: Implement `Nav`**

```tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
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

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4" aria-label="Primary">
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
          <Button href="#contact" variant="primary">
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
      </nav>

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
            <Button href="#contact" variant="primary">
              Let&apos;s talk
            </Button>
          </li>
        </ul>
      )}
    </header>
  );
}
```

- [ ] **Step 4: Run the test and verify it passes**

Run: `yarn test Nav`
Expected: PASS (2 tests).

- [ ] **Step 5: Write the failing test for `Footer`**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders the confirmed contact links only (no phone, no Instagram/X)', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'madan1239@gmail.com' })).toHaveAttribute(
      'href',
      'mailto:madan1239@gmail.com',
    );
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/madan1gc',
    );
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/madan-g-c-492b23198/',
    );
    expect(screen.getByRole('link', { name: 'WordPress.org' })).toHaveAttribute(
      'href',
      'https://profiles.wordpress.org/madan1gc/',
    );
    expect(screen.queryByText(/instagram/i)).toBeNull();
    expect(screen.queryByText(/9843222825/)).toBeNull();
  });
});
```

- [ ] **Step 6: Run the test and verify it fails**

Run: `yarn test Footer`
Expected: FAIL — `Cannot find module './Footer'`.

- [ ] **Step 7: Implement `Footer`**

```tsx
import { profile } from '@/data/profile';

const links = [
  { href: `mailto:${profile.email}`, label: profile.email },
  { href: profile.github, label: 'GitHub' },
  { href: profile.linkedin, label: 'LinkedIn' },
  { href: profile.wordpressOrg, label: 'WordPress.org' },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}. {profile.location}.
        </p>
        <ul className="flex flex-wrap gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-from focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
```

- [ ] **Step 8: Run the test and verify it passes**

Run: `yarn test Footer`
Expected: PASS.

- [ ] **Step 9: Wire Nav and Footer into the root layout with SEO metadata, fonts, and a skip link**

```tsx
import type { Metadata } from 'next';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import { Footer } from '@/components/layout/Footer';
import { Nav } from '@/components/layout/Nav';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://madangc.example'),
  title: 'Madan G.C — Frontend Developer & WordPress Product Builder',
  description:
    'I build fast, scalable WordPress experiences, custom plugins, and modern frontend interfaces using React, JavaScript, Elementor, Bricks, and WordPress.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="bg-background font-sans text-foreground antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-surface focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 10: Verify the build still succeeds**

Run: `yarn build`
Expected: build succeeds.

- [ ] **Step 11: Commit**

```bash
git add components/layout/Nav.tsx components/layout/Nav.test.tsx components/layout/Footer.tsx components/layout/Footer.test.tsx app/layout.tsx
git commit -m "feat: add Nav and Footer, wire root layout with SEO metadata"
```

---

### Task 10: Hero section

**Files:**
- Create: `components/sections/Hero.tsx`, `components/sections/Hero.test.tsx`

**Interfaces:**
- Consumes: `Button` (Task 4), `StatTile` (Task 5), `FadeIn` (Task 7),
  `profile`/`getHeroStats` (Task 8).
- Produces: `Hero()`, the first section rendered on the Home page (Task 16).

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Hero } from './Hero';

describe('Hero', () => {
  it('renders the name, role, and tagline', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { name: /Madan G\.C/ })).toBeInTheDocument();
    expect(screen.getByText('Frontend Developer & WordPress Product Builder')).toBeInTheDocument();
    expect(
      screen.getByText(/I build fast, scalable WordPress experiences/),
    ).toBeInTheDocument();
  });

  it('renders the three primary CTAs with correct destinations', () => {
    render(<Hero />);
    expect(screen.getByRole('link', { name: 'View Projects' })).toHaveAttribute('href', '/work');
    expect(screen.getByRole('link', { name: 'Download Resume' })).toHaveAttribute(
      'href',
      '/resume/Madan-GC-Resume.pdf',
    );
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '#contact');
  });

  it('renders a computed years-of-experience stat, not a hardcoded string', () => {
    vi.setSystemTime(new Date('2026-09-16'));
    render(<Hero />);
    expect(screen.getByText('4+')).toBeInTheDocument();
    expect(screen.getByText('Years Experience')).toBeInTheDocument();
    vi.useRealTimers();
  });

  it('renders the profile photo with descriptive alt text', () => {
    render(<Hero />);
    expect(screen.getByAltText('Madan G.C, Frontend Developer')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `yarn test Hero`
Expected: FAIL — `Cannot find module './Hero'`.

- [ ] **Step 3: Implement `Hero`**

```tsx
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/ui/FadeIn';
import { StatTile } from '@/components/ui/StatTile';
import { getHeroStats, profile } from '@/data/profile';

export function Hero() {
  const stats = getHeroStats();

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[-120px] -z-10 flex justify-center">
        <div className="h-[420px] w-[420px] animate-float rounded-full bg-gradient-to-r from-accent-from to-accent-to opacity-20 blur-3xl" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 pb-24 pt-20 sm:pt-28">
        <FadeIn>
          <div className="flex flex-col-reverse items-center gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-6">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-muted">
                <span className="h-2 w-2 rounded-full bg-gradient-to-r from-accent-from to-accent-to" />
                Available for freelance & full-time roles
              </span>

              <h1 className="max-w-2xl text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
                {profile.name}
                <span className="mt-2 block bg-gradient-to-r from-accent-from to-accent-to bg-clip-text text-transparent">
                  {profile.role}
                </span>
              </h1>

              <p className="max-w-prose text-lg text-muted sm:text-xl">{profile.tagline}</p>

              <div className="flex flex-wrap gap-4">
                <Button href="/work" variant="primary">
                  View Projects
                </Button>
                <Button href={profile.resumeUrl} variant="secondary" external>
                  Download Resume
                </Button>
                <Button href="#contact" variant="ghost">
                  Contact
                </Button>
              </div>
            </div>

            <div className="relative h-48 w-48 shrink-0 sm:h-56 sm:w-56">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-from to-accent-to opacity-70 blur-xl" />
              <Image
                src="/images/me.jpg"
                alt="Madan G.C, Frontend Developer"
                fill
                sizes="224px"
                priority
                className="relative rounded-full border border-border object-cover"
              />
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <dl className="grid grid-cols-2 gap-8 border-t border-border pt-10 sm:grid-cols-4">
            {stats.map((stat) => (
              <StatTile key={stat.label} label={stat.label} value={stat.value} />
            ))}
          </dl>
        </FadeIn>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run the test and verify it passes**

Run: `yarn test Hero`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add components/sections/Hero.tsx components/sections/Hero.test.tsx
git commit -m "feat: add Hero section"
```

---

### Task 11: Trust section

**Files:**
- Create: `components/sections/Trust.tsx`, `components/sections/Trust.test.tsx`

**Interfaces:**
- Consumes: `trustItems` (Task 8).
- Produces: `Trust()`.

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Trust } from './Trust';

describe('Trust', () => {
  it('renders every confirmed trust item', () => {
    render(<Trust />);
    expect(screen.getByText('Codewing Solutions')).toBeInTheDocument();
    expect(screen.getByText('WordCamp Kathmandu')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'WordPress.org' })).toHaveAttribute(
      'href',
      'https://profiles.wordpress.org/madan1gc/',
    );
  });

  it('does not render unconfirmed affiliations', () => {
    render(<Trust />);
    expect(screen.queryByText('WordCamp Asia')).toBeNull();
    expect(screen.queryByText('WordCamp Nepal')).toBeNull();
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `yarn test Trust`
Expected: FAIL — `Cannot find module './Trust'`.

- [ ] **Step 3: Implement `Trust`**

```tsx
import { trustItems } from '@/data/trust';

export function Trust() {
  return (
    <section className="border-y border-border bg-surface/40 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-6 text-center text-xs uppercase tracking-[0.2em] text-muted">
          Trusted in the WordPress & frontend community
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {trustItems.map((item) => (
            <li key={item.name} className="text-sm font-medium text-muted">
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-from focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {item.name}
                </a>
              ) : (
                item.name
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run the test and verify it passes**

Run: `yarn test Trust`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add components/sections/Trust.tsx components/sections/Trust.test.tsx
git commit -m "feat: add Trust section"
```

---

### Task 12: Skills section

**Files:**
- Create: `components/sections/Skills.tsx`, `components/sections/Skills.test.tsx`

**Interfaces:**
- Consumes: `Card` (Task 5), `Tag` (Task 4), `FadeIn` (Task 7),
  `skillCategories` (Task 8).
- Produces: `Skills()`.

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Skills } from './Skills';

describe('Skills', () => {
  it('renders every skill category heading', () => {
    render(<Skills />);
    expect(screen.getByRole('heading', { name: 'Frontend' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'WordPress' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Tools' })).toBeInTheDocument();
  });

  it('renders individual skills as tags', () => {
    render(<Skills />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Elementor')).toBeInTheDocument();
    expect(screen.getByText('Figma')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `yarn test Skills`
Expected: FAIL — `Cannot find module './Skills'`.

- [ ] **Step 3: Implement `Skills`**

```tsx
import { Card } from '@/components/ui/Card';
import { FadeIn } from '@/components/ui/FadeIn';
import { Tag } from '@/components/ui/Tag';
import { skillCategories } from '@/data/skills';

export function Skills() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <FadeIn>
        <h2 className="mb-2 text-xs uppercase tracking-[0.2em] text-accent-from">Skills</h2>
        <p className="mb-12 max-w-prose text-2xl font-semibold text-foreground sm:text-3xl">
          Tools I use to ship WordPress products and frontend interfaces.
        </p>
      </FadeIn>
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
    </section>
  );
}
```

- [ ] **Step 4: Run the test and verify it passes**

Run: `yarn test Skills`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add components/sections/Skills.tsx components/sections/Skills.test.tsx
git commit -m "feat: add Skills section"
```

---

### Task 13: Experience section

**Files:**
- Create: `components/sections/Experience.tsx`,
  `components/sections/Experience.test.tsx`

**Interfaces:**
- Consumes: `Timeline` (Task 6), `FadeIn` (Task 7), `experience` (Task 8).
- Produces: `Experience()`.

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Experience } from './Experience';

describe('Experience', () => {
  it('renders both experience entries with company and period', () => {
    render(<Experience />);
    expect(screen.getByRole('heading', { name: 'Frontend Developer' })).toBeInTheDocument();
    expect(screen.getByText('Codewing Solutions · Kathmandu, Nepal')).toBeInTheDocument();
    expect(screen.getByText('May 2022 — Present')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Frontend Intern' })).toBeInTheDocument();
    expect(screen.getByText('Ekbana Solution · Kathmandu, Nepal')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `yarn test Experience`
Expected: FAIL — `Cannot find module './Experience'`.

- [ ] **Step 3: Implement `Experience`**

```tsx
import { FadeIn } from '@/components/ui/FadeIn';
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
    <section className="mx-auto max-w-6xl px-6 py-24">
      <FadeIn>
        <h2 className="mb-2 text-xs uppercase tracking-[0.2em] text-accent-from">Experience</h2>
        <p className="mb-12 max-w-prose text-2xl font-semibold text-foreground sm:text-3xl">
          Where I&apos;ve shipped production WordPress and frontend work.
        </p>
      </FadeIn>
      <FadeIn delay={0.1}>
        <Timeline items={items} />
      </FadeIn>
    </section>
  );
}
```

- [ ] **Step 4: Run the test and verify it passes**

Run: `yarn test Experience`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/sections/Experience.tsx components/sections/Experience.test.tsx
git commit -m "feat: add Experience section"
```

---

### Task 14: Testimonials section

**Files:**
- Create: `components/sections/Testimonials.tsx`,
  `components/sections/Testimonials.test.tsx`

**Interfaces:**
- Consumes: `Card` (Task 5), `FadeIn` (Task 7), `testimonials` (Task 8).
- Produces: `Testimonials()`.

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Testimonials } from './Testimonials';

describe('Testimonials', () => {
  it('renders a quote, name, and role for every testimonial', () => {
    render(<Testimonials />);
    expect(screen.getByText('Client Name')).toBeInTheDocument();
    expect(screen.getByText('Founder, Client Company')).toBeInTheDocument();
    expect(screen.getByText('Teammate Name')).toBeInTheDocument();
    expect(screen.getByText('Community Member')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `yarn test Testimonials`
Expected: FAIL — `Cannot find module './Testimonials'`.

- [ ] **Step 3: Implement `Testimonials`**

```tsx
import { Card } from '@/components/ui/Card';
import { FadeIn } from '@/components/ui/FadeIn';
import { testimonials } from '@/data/testimonials';

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <FadeIn>
        <h2 className="mb-2 text-xs uppercase tracking-[0.2em] text-accent-from">Testimonials</h2>
        <p className="mb-12 max-w-prose text-2xl font-semibold text-foreground sm:text-3xl">
          What clients, teammates, and the community say.
        </p>
      </FadeIn>
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
    </section>
  );
}
```

- [ ] **Step 4: Run the test and verify it passes**

Run: `yarn test Testimonials`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/sections/Testimonials.tsx components/sections/Testimonials.test.tsx
git commit -m "feat: add Testimonials section"
```

---

### Task 15: Contact section

**Files:**
- Create: `components/sections/Contact.tsx`,
  `components/sections/Contact.test.tsx`

**Interfaces:**
- Consumes: `Button` (Task 4), `FadeIn` (Task 7), `profile` (Task 8).
- Produces: `Contact()`, including the `id="contact"` anchor target used by
  the Nav's "Let's talk" button and the Hero's "Contact" button.

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Contact } from './Contact';

describe('Contact', () => {
  it('exposes a #contact anchor target', () => {
    const { container } = render(<Contact />);
    expect(container.querySelector('#contact')).not.toBeNull();
  });

  it('renders the CTA heading and all contact links, with no phone number', () => {
    render(<Contact />);
    expect(
      screen.getByRole('heading', { name: /Let's build something meaningful together/ }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Email Me' })).toHaveAttribute(
      'href',
      'mailto:madan1239@gmail.com',
    );
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/madan1gc',
    );
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/madan-g-c-492b23198/',
    );
    expect(screen.getByRole('link', { name: 'WordPress.org' })).toHaveAttribute(
      'href',
      'https://profiles.wordpress.org/madan1gc/',
    );
    expect(screen.queryByText(/9843222825/)).toBeNull();
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `yarn test Contact`
Expected: FAIL — `Cannot find module './Contact'`.

- [ ] **Step 3: Implement `Contact`**

```tsx
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/ui/FadeIn';
import { profile } from '@/data/profile';

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-24 text-center">
      <FadeIn>
        <h2 className="mb-4 text-3xl font-semibold text-foreground sm:text-5xl">
          Have a project or product idea?
          <span className="block bg-gradient-to-r from-accent-from to-accent-to bg-clip-text text-transparent">
            Let&apos;s build something meaningful together.
          </span>
        </h2>
        <p className="mx-auto mb-10 max-w-prose text-muted">
          Open to frontend developer roles, WordPress product work, and freelance engagements.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button href={`mailto:${profile.email}`} variant="primary">
            Email Me
          </Button>
          <Button href={profile.github} variant="secondary" external>
            GitHub
          </Button>
          <Button href={profile.linkedin} variant="secondary" external>
            LinkedIn
          </Button>
          <Button href={profile.wordpressOrg} variant="secondary" external>
            WordPress.org
          </Button>
        </div>
      </FadeIn>
    </section>
  );
}
```

- [ ] **Step 4: Run the test and verify it passes**

Run: `yarn test Contact`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add components/sections/Contact.tsx components/sections/Contact.test.tsx
git commit -m "feat: add Contact section"
```

---

### Task 16: Assemble the Home page, SEO basics, and CONTENT-TODO.md

**Files:**
- Modify: `app/page.tsx`
- Create: `app/sitemap.ts`, `app/robots.ts`, `CONTENT-TODO.md`

**Interfaces:**
- Consumes: `Hero`, `Trust`, `Skills`, `Experience`, `Testimonials`, `Contact`
  (Tasks 10–15).
- Produces: the live Home page at `/`, `sitemap.xml`, `robots.txt`, a
  `Person` JSON-LD block, and the running content checklist referenced by
  the spec (§7, §10).

- [ ] **Step 1: Replace `app/page.tsx` with the full Home page and Person schema**

```tsx
import { Contact } from '@/components/sections/Contact';
import { Experience } from '@/components/sections/Experience';
import { Hero } from '@/components/sections/Hero';
import { Skills } from '@/components/sections/Skills';
import { Testimonials } from '@/components/sections/Testimonials';
import { Trust } from '@/components/sections/Trust';
import { profile } from '@/data/profile';

function PersonJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.role,
    url: 'https://madangc.example',
    sameAs: [profile.github, profile.linkedin, profile.wordpressOrg],
  };

  return (
    // eslint-disable-next-line react/no-danger
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export default function HomePage() {
  return (
    <>
      <PersonJsonLd />
      <Hero />
      <Trust />
      {/* Phase 2 will insert a "Featured Projects" section here. */}
      <Skills />
      <Experience />
      {/* Phase 3 will insert an Open Source/Community highlight strip here. */}
      <Testimonials />
      {/* Phase 4 will insert a "Latest from the blog" preview here. */}
      <Contact />
    </>
  );
}
```

- [ ] **Step 2: Add `app/sitemap.ts` and `app/robots.ts`**

```ts
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://madangc.example';
  return [{ url: baseUrl, lastModified: new Date() }];
}
```

```ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://madangc.example/sitemap.xml',
  };
}
```

- [ ] **Step 3: Write `CONTENT-TODO.md` at the repo root**

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

## Content quality (site works without these, but they're the difference
## between "structurally complete" and "actually persuasive")

- [ ] Confirm or replace the "Plugin Author" hero stat in
      `data/profile.ts` → `getHeroStats()` (currently "In progress" and
      flagged `placeholder: true`). Remove it if no plugin will be published.
- [ ] Replace all three entries in `data/testimonials.ts` with real
      client/teammate/community quotes.
- [ ] Confirm WordCamp Nepal / WordCamp Asia attendance before adding them to
      `data/trust.ts` — only Codewing Solutions, WordPress.org, and WordCamp
      Kathmandu are listed today because they're confirmed.

## Later phases (tracked here now, addressed when that phase is built)

- [ ] Phase 2 — Featured Projects: 7 case studies need real
      challenge/solution/results/screenshots/before-after content.
- [ ] Phase 3 — Open Source & Community: real WordPress.org contribution
      history, plugin/theme downloads, WordCamp roles/years/photos.
- [ ] Phase 4 — Blog: the 5 recommended articles need to actually be written.
```

- [ ] **Step 4: Run the full test suite and the production build**

Run: `yarn test && yarn build`
Expected: all tests pass; build completes with no type errors.

- [ ] **Step 5: Manually verify the Home page in the browser**

Run: `yarn dev`, open `http://localhost:3000`
Expected: Hero (with photo, stats, gradient headline, floating glow), Trust
strip, Skills cards, Experience timeline, Testimonials cards, and Contact
CTA all render in the dark theme with visible hover states and scroll-reveal
animations; the mobile nav menu opens/closes below the `md` breakpoint.

- [ ] **Step 6: Commit**

```bash
git add app/page.tsx app/sitemap.ts app/robots.ts CONTENT-TODO.md
git commit -m "feat: assemble Home page, add SEO basics and CONTENT-TODO checklist"
```
