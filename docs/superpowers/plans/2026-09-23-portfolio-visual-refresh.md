# Portfolio Visual Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the site's indigo/violet gradient-glow color system with a flat teal + warm-accent token system, add a light/dark theme toggle, and apply structural layout changes (split-panel hero, asymmetric project grid with glass-overlay cards, pull-quote testimonials, tracked nav links, dashed timeline) borrowed from the Nichol/Mikon reference research — so the site stops reading as generic AI-generated/"vibe coder" output.

**Architecture:** CSS custom properties (RGB triples) defined per theme in `app/globals.css`, consumed by `tailwind.config.ts` via the `rgb(var(--x) / <alpha-value>)` pattern so existing Tailwind utility *names* (`bg-background`, `text-foreground`, etc.) keep working unchanged while `accent.{from,to}` (a gradient pair) becomes `accent.{DEFAULT,strong,warm,text}` (solid tokens). A `data-theme` attribute on `<html>`, set by an inline pre-hydration script and flipped by a new `ThemeToggle` component, switches between the two token sets. Structural changes are applied file-by-file on top of the token system.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS 3, Vitest + React Testing Library — no new dependencies.

**Spec:** `docs/superpowers/specs/2026-09-23-portfolio-visual-refresh-design.md` (also read `docs/superpowers/specs/reference-style-guide.md` for the Nichol/Mikon research this spec draws from).

## Global Constraints

- No new npm dependencies (spec §8 — no `next-themes`; the toggle is a ~15-line inline script + one component).
- No fabricated content anywhere — site-wide policy carried over from Phases 1-5, unchanged by this phase.
- Every color token must hit ≥4.5:1 text contrast against its theme's `background`/`surface` (spec §3) — the exact hex/RGB values below were chosen for this; do not substitute different shades without rechecking contrast.
- No literal recreation of either reference site's layout — every structural idea in this plan is adapted, not copied (spec §8).
- `yarn test`, `yarn lint`, and `yarn build` must all succeed after every task (24 routes including `/icon` and `/opengraph-image`).
- Every task that touches a component with an existing test file updates that file in the same task — no task should leave the suite red for a later task to fix.

---

## Color token reference (used across every task below)

| Token | Dark hex | Dark RGB | Light hex | Light RGB |
|---|---|---|---|---|
| `background` | `#0B1211` | `11 18 17` | `#F7FAF9` | `247 250 249` |
| `surface` | `#121A19` | `18 26 25` | `#FFFFFF` | `255 255 255` |
| `border` | `#22302E` | `34 48 46` | `#DCE6E4` | `220 230 228` |
| `foreground` | `#F3F6F5` | `243 246 245` | `#0F1413` | `15 20 19` |
| `muted` | `#9BA8A5` | `155 168 165` | `#5B6664` | `91 102 100` |
| `accent` (DEFAULT) | `#2DD4BF` | `45 212 191` | `#0D9488` | `13 148 136` |
| `accent-strong` | `#0D9488` | `13 148 136` | `#0F766E` | `15 118 110` |
| `accent-text` | `#5EEAD4` | `94 234 212` | `#0F766E` | `15 118 110` |
| `accent-warm` | `#FDBA74` | `253 186 116` | `#C2410C` | `194 65 12` |

---

### Task 1: Color token system (CSS variables + Tailwind config) and mechanical single-line renames

**Files:**
- Modify: `app/globals.css`
- Modify: `tailwind.config.ts`
- Modify: `components/blog/BlogPostCard.tsx:17`
- Modify: `components/layout/Footer.tsx:22`
- Modify: `components/sections/BlogPreview.tsx:23`
- Modify: `components/sections/CommunityStrip.tsx:31`
- Modify: `components/sections/Trust.tsx:18`

**Interfaces:**
- Produces: Tailwind color tokens `background`, `surface`, `border`, `foreground`, `muted` (unchanged names, now CSS-var-backed) and `accent.DEFAULT` / `accent.strong` / `accent.warm` / `accent.text` (replaces the old `accent.from` / `accent.to` / `accent.text` shape). Every later task's `bg-accent-strong`, `text-accent`, `border-accent`, `ring-accent`, `bg-accent-warm` class names depend on this task landing first.

This task has no natural TDD RED/GREEN cycle (it's a global stylesheet + config change, the same category Phase 5 treated as verified by build/lint/full-suite rather than a new unit test — see that phase's spec §4). Its correctness gate is: the full existing test suite still passes, `yarn build` succeeds, and `yarn lint` is clean.

- [ ] **Step 1: Rewrite `app/globals.css`** with both themes' CSS custom properties (dark as the `:root` baseline, light as an override) and the native `color-scheme` per theme:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: dark;

  --color-background: 11 18 17;
  --color-surface: 18 26 25;
  --color-border: 34 48 46;
  --color-foreground: 243 246 245;
  --color-muted: 155 168 165;
  --color-accent: 45 212 191;
  --color-accent-strong: 13 148 136;
  --color-accent-text: 94 234 212;
  --color-accent-warm: 253 186 116;
}

:root[data-theme='light'] {
  color-scheme: light;

  --color-background: 247 250 249;
  --color-surface: 255 255 255;
  --color-border: 220 230 228;
  --color-foreground: 15 20 19;
  --color-muted: 91 102 100;
  --color-accent: 13 148 136;
  --color-accent-strong: 15 118 110;
  --color-accent-text: 15 118 110;
  --color-accent-warm: 194 65 12;
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

- [ ] **Step 2: Update `tailwind.config.ts`'s `colors` block** to reference the CSS variables (keep `fontFamily`, `maxWidth`, `keyframes`, `animation` blocks exactly as they are — only `colors` changes):

```ts
colors: {
  background: 'rgb(var(--color-background) / <alpha-value>)',
  surface: 'rgb(var(--color-surface) / <alpha-value>)',
  border: 'rgb(var(--color-border) / <alpha-value>)',
  foreground: 'rgb(var(--color-foreground) / <alpha-value>)',
  muted: 'rgb(var(--color-muted) / <alpha-value>)',
  accent: {
    DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',
    strong: 'rgb(var(--color-accent-strong) / <alpha-value>)',
    warm: 'rgb(var(--color-accent-warm) / <alpha-value>)',
    text: 'rgb(var(--color-accent-text) / <alpha-value>)',
  },
},
```

This removes `accent.from` and `accent.to` entirely — every remaining `accent-from`/`accent-to`/`bg-gradient-to-*`/`shadow-accent-from` class in the codebase will silently stop rendering (no build error, just a missing style) until each file is migrated in its own task below. That's expected and fine within this branch; the whole-branch review before merge re-checks that none remain (see the plan's closing checklist).

- [ ] **Step 3: Fix the 5 single-line mechanical files.** Each one has exactly one occurrence of `focus-visible:ring-accent-from` that becomes `focus-visible:ring-accent` — no other change in these 5 files this task:
  - `components/blog/BlogPostCard.tsx:17`
  - `components/layout/Footer.tsx:22`
  - `components/sections/BlogPreview.tsx:23`
  - `components/sections/CommunityStrip.tsx:31`
  - `components/sections/Trust.tsx:18`

  Example (`Footer.tsx:22`):
  ```diff
  -                className="rounded hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-from focus-visible:ring-offset-2 focus-visible:ring-offset-background"
  +                className="rounded hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
  ```
  Apply the identical `ring-accent-from` → `ring-accent` substitution in the other 4 files at the line numbers listed above.

- [ ] **Step 4: Run the full test suite, lint, and build**

Run: `yarn test`
Expected: all 83 existing tests still PASS (none of them assert on `ring-accent-from`/gradient/shadow class strings on these 5 files).

Run: `yarn lint`
Expected: no errors.

Run: `yarn build`
Expected: succeeds, 24 routes listed.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css tailwind.config.ts components/blog/BlogPostCard.tsx components/layout/Footer.tsx components/sections/BlogPreview.tsx components/sections/CommunityStrip.tsx components/sections/Trust.tsx
git commit -m "feat: replace gradient accent tokens with flat light/dark CSS variable system"
```

---

### Task 2: Update `next/og` generated images to the new palette

**Files:**
- Modify: `app/icon.tsx`
- Modify: `app/opengraph-image.tsx`

**Interfaces:**
- Consumes: nothing from Task 1 directly (these files hardcode literal hex — `next/og`'s `ImageResponse` renders outside the browser and cannot read CSS custom properties, so they can't reference the new tokens programmatically; the color table above is copied in by hand).
- Produces: nothing consumed by later tasks.

No RED/GREEN test cycle here either, for the same reason Phase 5 gave these two files a build-only acceptance test (see that phase's spec §4): they're Next.js special-convention routes verified by `next build`, not unit-testable component logic.

- [ ] **Step 1: Update `app/icon.tsx`'s hardcoded colors**

```diff
-          background: 'linear-gradient(135deg, #6366F1, #A855F7)',
-          color: '#F5F5F7',
+          background: '#0D9488',
+          color: '#F3F6F5',
```

(Dark-theme `accent-strong` and `foreground` values from the token table — solid fill, no gradient, per spec §5.)

- [ ] **Step 2: Update `app/opengraph-image.tsx`'s hardcoded colors**

```diff
-          background: '#0A0A0F',
+          background: '#0B1211',
```
```diff
-        <div style={{ marginTop: 20, fontSize: 32, color: '#818CF8' }}>{profile.role}</div>
+        <div style={{ marginTop: 20, fontSize: 32, color: '#5EEAD4' }}>{profile.role}</div>
```

And update the shared `color: '#F5F5F7'` on the outer wrapper `div` to `color: '#F3F6F5'` (dark-theme `foreground`).

- [ ] **Step 3: Run the build**

Run: `yarn build`
Expected: succeeds; `/icon` and `/opengraph-image` still listed among the 24 routes.

- [ ] **Step 4: Commit**

```bash
git add app/icon.tsx app/opengraph-image.tsx
git commit -m "feat: update generated favicon/OG image colors to the new palette"
```

---

### Task 3: `ThemeToggle` component, no-FOUC script, and Nav wiring

**Files:**
- Create: `components/ui/ThemeToggle.tsx`
- Create: `components/ui/ThemeToggle.test.tsx`
- Modify: `app/layout.tsx`
- Modify: `components/layout/Nav.tsx`

**Interfaces:**
- Produces: `<ThemeToggle />` — a self-contained client component, no props, no exported types. Later tasks that touch `Nav.tsx` (Task 4) must not remove it.
- Consumes: nothing from earlier tasks except the `accent`/`background` tokens from Task 1 for its own focus ring.

- [ ] **Step 1: Write the failing test** for `components/ui/ThemeToggle.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { ThemeToggle } from './ThemeToggle';

describe('ThemeToggle', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme');
    localStorage.clear();
  });

  afterEach(() => {
    document.documentElement.removeAttribute('data-theme');
  });

  it('reads the current theme from the <html> attribute on mount', () => {
    document.documentElement.setAttribute('data-theme', 'light');
    render(<ThemeToggle />);
    expect(screen.getByRole('button', { name: 'Switch to dark theme' })).toBeInTheDocument();
  });

  it('toggles the data-theme attribute and persists the choice on click', async () => {
    document.documentElement.setAttribute('data-theme', 'dark');
    const user = userEvent.setup();
    render(<ThemeToggle />);

    await user.click(screen.getByRole('button', { name: 'Switch to light theme' }));

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
    expect(screen.getByRole('button', { name: 'Switch to dark theme' })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `yarn test ThemeToggle`
Expected: FAIL — `./ThemeToggle` does not exist yet.

- [ ] **Step 3: Create `components/ui/ThemeToggle.tsx`**

```tsx
'use client';

import { useState } from 'react';

function readInitialTheme(): 'light' | 'dark' {
  if (typeof document === 'undefined') {
    return 'dark';
  }
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(readInitialTheme);

  function toggle() {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Storage may be unavailable (private mode, disabled storage) — the
      // toggle still works for this page load, it just won't persist.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
      className="rounded p-2 text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {theme === 'light' ? (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.36 6.36-1.42-1.42M7.05 7.05 5.64 5.64m12.72 0-1.41 1.41M7.05 16.95l-1.41 1.41M12 8a4 4 0 100 8 4 4 0 000-8z"
          />
        </svg>
      ) : (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      )}
    </button>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `yarn test ThemeToggle`
Expected: PASS (2 tests).

- [ ] **Step 5: Add the no-FOUC inline script to `app/layout.tsx`**

Add a `<head>` element as the first child of `<html>`, before `<body>`:

```diff
     <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${playfairDisplay.variable}`}>
+      <head>
+        <script
+          dangerouslySetInnerHTML={{
+            __html:
+              "(function(){try{var s=localStorage.getItem('theme');var t=(s==='light'||s==='dark')?s:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);}catch(e){}})();",
+          }}
+        />
+      </head>
       <body className="bg-background font-sans text-foreground antialiased">
```

- [ ] **Step 6: Wire `<ThemeToggle />` into `Nav.tsx`** — add the import and render it next to the existing desktop buttons and inside the mobile menu, without changing anything else in the file yet (link styling/active-route logic is Task 4):

```diff
 import Link from 'next/link';
 import { useEffect, useRef, useState } from 'react';
 import { Button } from '@/components/ui/Button';
+import { ThemeToggle } from '@/components/ui/ThemeToggle';
 import { profile } from '@/data/profile';
```

```diff
           <div className="hidden items-center gap-4 md:flex">
+            <ThemeToggle />
             <Button href={profile.resumeUrl} variant="ghost" external>
               Résumé
             </Button>
```

```diff
             <li>
-              <Button href="/#contact" variant="primary">
-                Let&apos;s talk
-              </Button>
+              <div className="flex items-center justify-between gap-4">
+                <Button href="/#contact" variant="primary">
+                  Let&apos;s talk
+                </Button>
+                <ThemeToggle />
+              </div>
             </li>
```

- [ ] **Step 7: Run the full test suite**

Run: `yarn test`
Expected: all existing `Nav.test.tsx` tests still PASS (adding a `<button>` doesn't affect the existing link-based assertions), plus the 2 new `ThemeToggle` tests. `yarn build` succeeds.

- [ ] **Step 8: Commit**

```bash
git add components/ui/ThemeToggle.tsx components/ui/ThemeToggle.test.tsx app/layout.tsx components/layout/Nav.tsx
git commit -m "feat: add light/dark ThemeToggle with no-flash inline script"
```

---

### Task 4: Nav — tracked uppercase links with active-route underline

**Files:**
- Modify: `components/layout/Nav.tsx`
- Modify: `components/layout/Nav.test.tsx`

**Interfaces:**
- Consumes: `ThemeToggle` from Task 3 (already wired in, untouched here).
- Produces: nothing new consumed elsewhere.

- [ ] **Step 1: Write the failing test.** Add a `next/navigation` mock and a new test to `components/layout/Nav.test.tsx`:

```diff
 import { render, screen } from '@testing-library/react';
 import userEvent from '@testing-library/user-event';
-import { describe, expect, it } from 'vitest';
+import { beforeEach, describe, expect, it, vi } from 'vitest';
 import { Nav } from './Nav';
+
+const { usePathname } = vi.hoisted(() => ({ usePathname: vi.fn(() => '/') }));
+
+vi.mock('next/navigation', () => ({
+  usePathname,
+}));

 describe('Nav', () => {
+  beforeEach(() => {
+    usePathname.mockReturnValue('/');
+  });
+
   it('renders the primary nav links', () => {
```

Add the new test at the end of the `describe` block:

```tsx
  it("underlines the active route's link and leaves the others plain", () => {
    usePathname.mockReturnValue('/work');
    render(<Nav />);
    expect(screen.getByRole('link', { name: 'Work' }).className).toContain('border-accent');
    expect(screen.getByRole('link', { name: 'Blog' }).className).toContain('border-transparent');
  });
```

- [ ] **Step 2: Run test to verify it fails**

Run: `yarn test Nav`
Expected: FAIL — either a `usePathname` invariant error (if not yet mocked before the component calls it) or the new active-route test failing because `Nav.tsx` doesn't call `usePathname` yet.

- [ ] **Step 3: Rewrite the desktop nav links and imports in `components/layout/Nav.tsx`**

```diff
 'use client';

 import Link from 'next/link';
+import { usePathname } from 'next/navigation';
 import { useEffect, useRef, useState } from 'react';
 import { Button } from '@/components/ui/Button';
 import { ThemeToggle } from '@/components/ui/ThemeToggle';
 import { profile } from '@/data/profile';
```

```diff
 export function Nav() {
   const [open, setOpen] = useState(false);
   const toggleButtonRef = useRef<HTMLButtonElement>(null);
+  const pathname = usePathname();
```

```diff
           <Link
             href="/"
-            className="rounded font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-from focus-visible:ring-offset-2 focus-visible:ring-offset-background"
+            className="rounded font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
           >
             {profile.name}
           </Link>

           <ul className="hidden items-center gap-8 md:flex">
-            {navLinks.map((link) => (
-              <li key={link.href}>
-                <Link
-                  href={link.href}
-                  className="rounded text-sm text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-from focus-visible:ring-offset-2 focus-visible:ring-offset-background"
-                >
-                  {link.label}
-                </Link>
-              </li>
-            ))}
+            {navLinks.map((link) => {
+              const isActive = pathname === link.href;
+              return (
+                <li key={link.href}>
+                  <Link
+                    href={link.href}
+                    className={`rounded border-b-2 pb-1 text-xs font-medium uppercase tracking-[0.1em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
+                      isActive
+                        ? 'border-accent text-foreground'
+                        : 'border-transparent text-muted hover:text-foreground'
+                    }`}
+                  >
+                    {link.label}
+                  </Link>
+                </li>
+              );
+            })}
           </ul>
```

- [ ] **Step 4: Rename the remaining `ring-accent-from` occurrences in the same file** (mobile toggle button and mobile menu links — the spec's tracked-uppercase treatment is desktop-only per §6.4, so the mobile menu links keep their current sizing/casing, just the ring token renames):

```diff
             className="flex flex-col gap-1.5 rounded md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-from focus-visible:ring-offset-2 focus-visible:ring-offset-background"
```
→ `ring-accent-from` → `ring-accent` (toggle button), and the same substitution on the mobile `<Link>` inside the `#mobile-nav` list.

- [ ] **Step 5: Run the tests**

Run: `yarn test Nav`
Expected: PASS — all prior Nav tests plus the new active-underline test.

Run: `yarn test`
Expected: full suite green.

Run: `yarn lint && yarn build`
Expected: both succeed.

- [ ] **Step 6: Commit**

```bash
git add components/layout/Nav.tsx components/layout/Nav.test.tsx
git commit -m "feat: track+underline active nav link, finish accent token rename in Nav"
```

---

### Task 5: `Button` and `Card` — solid fills, hard-edge hover

**Files:**
- Modify: `components/ui/Button.tsx`
- Modify: `components/ui/Button.test.tsx`
- Modify: `components/ui/Card.tsx`
- Modify: `components/ui/Card.test.tsx`

**Interfaces:**
- Produces: `Button`'s `variantClasses` and `Card`'s hover classes are consumed visually everywhere but no type/signature changes — every existing call site (`<Button href=... variant=...>`, `<Card className=...>`) keeps working unchanged.

- [ ] **Step 1: Write the failing tests.** Add to `components/ui/Button.test.tsx`:

```tsx
  it('uses a solid accent fill for the primary variant, no gradient', () => {
    render(<Button href="/work">View Projects</Button>);
    const link = screen.getByRole('link', { name: 'View Projects' });
    expect(link.className).toContain('bg-accent-strong');
    expect(link.className).not.toContain('bg-gradient-to-r');
  });
```

Add to `components/ui/Card.test.tsx`:

```tsx
  it('uses a hard border-color hover state, no blur glow shadow', () => {
    render(<Card>Content</Card>);
    const card = screen.getByText('Content');
    expect(card.className).toContain('hover:border-accent');
    expect(card.className).not.toContain('shadow-[');
  });
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `yarn test Button Card`
Expected: both new tests FAIL against the current gradient/glow implementation.

- [ ] **Step 3: Rewrite `components/ui/Button.tsx`'s variant/focus classes**

```diff
 const variantClasses: Record<ButtonVariant, string> = {
-  // Darker gradient endpoints than accent.from/accent.to so white button
-  // text clears AA (4.5:1) across the whole gradient — see contrast math in
-  // the Phase 1 fix report. Shadows keep the brand accent colors since
-  // shadow contrast isn't an AA text requirement.
-  primary:
-    'bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white shadow-lg shadow-accent-from/20 hover:shadow-accent-from/40',
-  secondary: 'border border-border text-foreground hover:border-accent-from',
+  // accent-strong is picked per-theme (see the color token table in the
+  // visual-refresh spec) so white button text clears AA on both themes.
+  primary: 'bg-accent-strong text-white hover:bg-accent',
+  secondary: 'border border-border text-foreground hover:border-accent',
   ghost: 'text-muted hover:text-foreground',
 };

 const focusRingClasses =
-  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-from focus-visible:ring-offset-2 focus-visible:ring-offset-background';
+  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background';
```

- [ ] **Step 4: Rewrite `components/ui/Card.tsx`'s hover classes**

```diff
 export function Card({ children, className = '' }: CardProps) {
   return (
     <div
-      className={`rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:border-accent-from/50 hover:shadow-[0_0_40px_-15px_theme(colors.accent.from)] ${className}`}
+      className={`rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent ${className}`}
     >
       {children}
     </div>
   );
 }
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `yarn test Button Card`
Expected: PASS (all Button/Card tests, including the 2 new ones).

Run: `yarn test && yarn lint && yarn build`
Expected: all succeed.

- [ ] **Step 6: Commit**

```bash
git add components/ui/Button.tsx components/ui/Button.test.tsx components/ui/Card.tsx components/ui/Card.test.tsx
git commit -m "feat: replace Button/Card gradient-glow with solid accent + hard-edge hover"
```

---

### Task 6: `Section` eyebrow — solid square marker, not a pill

**Files:**
- Modify: `components/ui/Section.tsx`
- Modify: `components/ui/Section.test.tsx`

**Interfaces:**
- Produces: no prop/signature change — every section using `<Section eyebrow=... title=...>` is unaffected structurally.

- [ ] **Step 1: Update the existing test** (from the prior polish pass) to describe and assert the new marker instead of the pill:

```diff
-  it('renders the eyebrow as a pill with a decorative dot', () => {
+  it('renders the eyebrow with a solid square accent marker, not a pill', () => {
     render(
       <Section eyebrow="Skills" title="Some descriptive title.">
         <p>Body</p>
       </Section>,
     );
     const eyebrow = screen.getByRole('heading', { name: 'Skills' });
-    expect(eyebrow.className).toContain('rounded-full');
-    expect(eyebrow.querySelector('[aria-hidden="true"]')).not.toBeNull();
+    expect(eyebrow.className).not.toContain('rounded-full');
+    const marker = eyebrow.querySelector('[aria-hidden="true"]');
+    expect(marker).not.toBeNull();
+    expect(marker?.className).toContain('bg-accent-strong');
   });
```

- [ ] **Step 2: Run test to verify it fails**

Run: `yarn test Section`
Expected: FAIL — current eyebrow still renders `rounded-full` pill classes.

- [ ] **Step 3: Rewrite the eyebrow markup in `components/ui/Section.tsx`**

```diff
-        <Eyebrow className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-accent-text">
-          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-accent-from to-accent-to" />
+        <Eyebrow className="mb-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-accent-text">
+          <span aria-hidden="true" className="h-2.5 w-2.5 bg-accent-strong" />
           {eyebrow}
         </Eyebrow>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `yarn test Section`
Expected: PASS.

Run: `yarn test && yarn lint && yarn build`
Expected: all succeed (every section on the site uses `Section`, so this is a good moment to also visually sanity-check one page in the browser before moving on — not a blocking gate, just worth a look).

- [ ] **Step 5: Commit**

```bash
git add components/ui/Section.tsx components/ui/Section.test.tsx
git commit -m "feat: replace Section's pill eyebrow with a solid square accent marker"
```

---

### Task 7: `Timeline` dashed connector + `Contact` solid heading

**Files:**
- Modify: `components/ui/Timeline.tsx`
- Modify: `components/ui/Timeline.test.tsx`
- Modify: `components/sections/Contact.tsx`

**Interfaces:**
- No signature changes to either component.

- [ ] **Step 1: Write the failing test.** Add to `components/ui/Timeline.test.tsx`:

```tsx
  it('uses a dashed connector line, not a solid one', () => {
    const { container } = render(<Timeline items={items} />);
    const list = container.querySelector('ol');
    expect(list?.className).toContain('border-dashed');
  });
```

- [ ] **Step 2: Run test to verify it fails**

Run: `yarn test Timeline`
Expected: FAIL.

- [ ] **Step 3: Update `components/ui/Timeline.tsx`**

```diff
-    <ol className="relative border-l border-border pl-6">
+    <ol className="relative border-l border-dashed border-border pl-6">
       {items.map((item) => (
         <li key={`${item.title}-${item.period}`} className="relative mb-10 last:mb-0">
-          <span className="absolute -left-[29px] mt-1.5 h-2.5 w-2.5 rounded-full bg-gradient-to-r from-accent-from to-accent-to" />
+          <span className="absolute -left-[29px] mt-1.5 h-2.5 w-2.5 rounded-full bg-accent-strong" />
```

- [ ] **Step 4: Run test to verify it passes**

Run: `yarn test Timeline`
Expected: PASS.

- [ ] **Step 5: Update `components/sections/Contact.tsx`'s heading** — no new test needed here since the existing test (`renders the CTA heading...`) matches on the heading's accessible name via regex, which is unaffected by the class change:

```diff
         <h2 className="mb-4 text-3xl font-semibold text-foreground sm:text-5xl">
           Have a project or product idea?
-          <span className="block bg-gradient-to-r from-accent-from to-accent-to bg-clip-text text-transparent">
+          <span className="block text-accent">
             Let&apos;s build something meaningful together.
           </span>
         </h2>
```

- [ ] **Step 6: Run the full suite**

Run: `yarn test && yarn lint && yarn build`
Expected: all succeed, including the existing `Contact.test.tsx` heading assertion.

- [ ] **Step 7: Commit**

```bash
git add components/ui/Timeline.tsx components/ui/Timeline.test.tsx components/sections/Contact.tsx
git commit -m "feat: dashed Timeline connector and solid-color Contact heading"
```

---

### Task 8: `Hero` restructure — split panel, dashed orbit, square photo

**Files:**
- Modify: `components/sections/Hero.tsx`
- Modify: `components/sections/Hero.test.tsx`

**Interfaces:**
- No prop changes — `Hero` still takes no props, still reads `getHeroStats()` and `profile` exactly as before.

- [ ] **Step 1: Write the failing test.** Add to `components/sections/Hero.test.tsx`:

```tsx
  it('does not render the old gradient-blur glow orb', () => {
    const { container } = render(<Hero />);
    expect(container.innerHTML).not.toContain('blur-3xl');
    expect(container.innerHTML).not.toContain('blur-xl');
  });
```

- [ ] **Step 2: Run test to verify it fails**

Run: `yarn test Hero`
Expected: FAIL — the current hero still has both `blur-3xl` (background orb) and `blur-xl` (photo glow ring).

- [ ] **Step 3: Rewrite `components/sections/Hero.tsx`** in full:

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
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 pb-24 pt-20 sm:pt-28">
        <FadeIn>
          <div className="flex flex-col-reverse items-center gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-6 lg:max-w-xl">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-muted">
                <span className="h-2 w-2 rounded-full bg-accent-strong" />
                Available for freelance & full-time roles
              </span>

              <h1 className="max-w-2xl text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
                {profile.name}
                <span className="mt-2 block text-accent">
                  {profile.role}
                  <span
                    aria-hidden="true"
                    className="ml-1 inline-block h-[0.85em] w-[3px] translate-y-[0.1em] animate-caret bg-accent align-middle motion-reduce:animate-none"
                  />
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

            <div className="relative shrink-0">
              <div
                aria-hidden="true"
                className="absolute -inset-6 -z-10 rounded-full border border-dashed border-accent/40"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-3 -right-3 -z-10 h-48 w-48 bg-accent-strong sm:h-56 sm:w-56"
              />
              <div className="relative h-48 w-48 sm:h-56 sm:w-56">
                <Image
                  src="/images/me.jpg"
                  alt="Madan G.C, Frontend Developer"
                  fill
                  sizes="224px"
                  priority
                  className="rounded-2xl border border-border object-cover"
                />
              </div>
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

- [ ] **Step 4: Run tests to verify they pass**

Run: `yarn test Hero`
Expected: PASS — the new no-blur test plus every pre-existing Hero test (name/role/tagline, 3 CTAs, computed years-of-experience stat, photo alt text, blinking caret — all unchanged in content, only re-colored/re-laid-out).

- [ ] **Step 5: Run the full suite and build**

Run: `yarn test && yarn lint && yarn build`
Expected: all succeed.

- [ ] **Step 6: Commit**

```bash
git add components/sections/Hero.tsx components/sections/Hero.test.tsx
git commit -m "feat: restructure Hero into a hard-edged split panel with dashed orbit accent"
```

---

### Task 9: `FeaturedProjects` asymmetric grid + `ProjectCard` glass-overlay hover

**Files:**
- Modify: `components/sections/FeaturedProjects.tsx`
- Modify: `components/sections/FeaturedProjects.test.tsx`
- Modify: `components/projects/ProjectCard.tsx`
- Modify: `components/projects/ProjectCard.test.tsx`

**Interfaces:**
- No prop changes to either component.

- [ ] **Step 1: Write the failing tests.** Add to `components/sections/FeaturedProjects.test.tsx`:

```tsx
  it('spans the first featured project across two columns on large screens', () => {
    const { container } = render(<FeaturedProjects />);
    const grid = container.querySelector('.grid');
    const firstItem = grid?.firstElementChild;
    expect(firstItem?.className).toContain('lg:col-span-2');
  });
```

Add to `components/projects/ProjectCard.test.tsx`:

```tsx
  it('reveals the tags and CTA in a glass overlay on hover and on keyboard focus', () => {
    render(<ProjectCard project={project} />);
    const link = screen.getByRole('link', { name: 'View case study: Trailvista Theme' });
    const overlay = link.closest('div');
    expect(overlay?.className).toContain('group-focus-within:translate-y-0');
    expect(overlay?.className).toContain('backdrop-blur');
  });
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `yarn test FeaturedProjects ProjectCard`
Expected: both new tests FAIL.

- [ ] **Step 3: Rewrite `components/projects/ProjectCard.tsx`**

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
    <Card className="group relative flex h-full flex-col overflow-hidden">
      <div className="relative flex-1">
        <h3 className="mb-2 text-lg font-semibold text-foreground">{project.title}</h3>
        <p className="text-sm text-muted">{project.summary}</p>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-surface/95 p-6 backdrop-blur transition-transform duration-300 group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:pointer-events-auto">
        <div className="mb-4 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
        <Link
          href={`/work/${project.slug}`}
          aria-label={`View case study: ${project.title}`}
          className="rounded text-sm font-medium text-accent-text hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          View case study{' '}
          <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </Card>
  );
}
```

(The overlay is `pointer-events-none` and off-screen by default so it never intercepts clicks meant for the card behind it, but keyboard Tab order still reaches the link inside — `group-focus-within` slides the panel into view the moment it receives focus, so keyboard users see the same reveal mouse users get on hover.)

- [ ] **Step 4: Rewrite `components/sections/FeaturedProjects.tsx`**

```diff
   return (
     <Section eyebrow="Featured Projects" title="Case studies from real WordPress and frontend work.">
-      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
-        {featured.map((project) => (
-          <ProjectCard key={project.slug} project={project} />
-        ))}
+      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
+        {featured.map((project, index) => (
+          <div key={project.slug} className={index === 0 ? 'lg:col-span-2' : ''}>
+            <ProjectCard project={project} />
+          </div>
+        ))}
       </div>
       <div className="mt-8">
         <Link
           href="/work"
-          className="rounded text-sm font-medium text-accent-text hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-from focus-visible:ring-offset-2 focus-visible:ring-offset-background"
+          className="rounded text-sm font-medium text-accent-text hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
         >
           View all projects <span aria-hidden="true">→</span>
         </Link>
       </div>
     </Section>
   );
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `yarn test FeaturedProjects ProjectCard`
Expected: PASS — both new tests, plus every pre-existing test in both files (titles/summary/tags/link href/arrow-decoration are all unchanged).

- [ ] **Step 6: Run the full suite and build**

Run: `yarn test && yarn lint && yarn build`
Expected: all succeed.

- [ ] **Step 7: Commit**

```bash
git add components/sections/FeaturedProjects.tsx components/sections/FeaturedProjects.test.tsx components/projects/ProjectCard.tsx components/projects/ProjectCard.test.tsx
git commit -m "feat: asymmetric Featured Projects grid with glass-overlay ProjectCard hover"
```

---

### Task 10: `Testimonials` — lead pull-quote + supporting row

**Files:**
- Modify: `components/sections/Testimonials.tsx`
- Modify: `components/sections/Testimonials.test.tsx`

**Interfaces:**
- No prop changes — still reads the full `testimonials` array from `data/testimonials.ts` (3 entries today; the component must not assume exactly 3 — see Step 3).

- [ ] **Step 1: Write the failing test.** Add to `components/sections/Testimonials.test.tsx`:

```tsx
  it('renders the first testimonial as a large lead quote and the rest in a supporting row', () => {
    const { container } = render(<Testimonials />);
    const lead = container.querySelector('blockquote');
    expect(lead?.textContent).toContain(
      'Add a real client quote describing the outcome of working with Madan.',
    );
    expect(lead?.className).toContain('italic');

    const supportingItems = container.querySelectorAll('.grid > *');
    expect(supportingItems).toHaveLength(2);
  });
```

- [ ] **Step 2: Run test to verify it fails**

Run: `yarn test Testimonials`
Expected: FAIL — no `blockquote` element exists yet.

- [ ] **Step 3: Rewrite `components/sections/Testimonials.tsx`**

```tsx
import { Card } from '@/components/ui/Card';
import { FadeIn } from '@/components/ui/FadeIn';
import { Section } from '@/components/ui/Section';
import { testimonials } from '@/data/testimonials';

export function Testimonials() {
  const [lead, ...rest] = testimonials;

  return (
    <Section eyebrow="Testimonials" title="What clients, teammates, and the community say.">
      {lead && (
        <FadeIn>
          <figure className="mb-10 border-l-2 border-accent pl-6">
            <blockquote className="font-serif text-2xl italic text-foreground sm:text-3xl">
              &ldquo;{lead.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-4 text-sm text-muted">
              <span className="font-semibold text-foreground">{lead.name}</span> — {lead.role}
            </figcaption>
          </figure>
        </FadeIn>
      )}
      <div className="grid gap-6 sm:grid-cols-2">
        {rest.map((testimonial, index) => (
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

(`lead && (...)` guards against an empty `testimonials` array — not a case that exists in `data/testimonials.ts` today, but the component shouldn't crash if a testimonial is ever removed down to zero.)

- [ ] **Step 4: Run test to verify it passes**

Run: `yarn test Testimonials`
Expected: PASS — the new lead/supporting test, plus the pre-existing "renders a quote, name, and role for every testimonial" test (all 3 names/roles still appear somewhere in the render regardless of layout).

- [ ] **Step 5: Run the full suite and build**

Run: `yarn test && yarn lint && yarn build`
Expected: all succeed.

- [ ] **Step 6: Commit**

```bash
git add components/sections/Testimonials.tsx components/sections/Testimonials.test.tsx
git commit -m "feat: lead pull-quote + supporting row layout for Testimonials"
```

---

### Task 11: `Footer` — one solid full-bleed accent block

**Files:**
- Modify: `components/layout/Footer.tsx`
- Modify: `components/layout/Footer.test.tsx`

**Interfaces:**
- No prop changes. Supersedes Task 1's `ring-accent-from` → `ring-accent` edit to this same file — the new solid `accent-strong` background needs a higher-contrast fixed near-black ring color instead of the plain `accent` token (a teal ring on a teal background would have poor contrast), so this task replaces that focus-ring class rather than building on it.

- [ ] **Step 1: Write the failing test.** Add to `components/layout/Footer.test.tsx`:

```tsx
  it('uses one solid full-bleed accent-strong band as the page\'s closing color moment', () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector('footer');
    expect(footer?.className).toContain('bg-accent-strong');
  });

  it('underlines footer links instead of relying on color alone for affordance', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: 'GitHub' });
    expect(link.className).toContain('underline');
  });
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `yarn test Footer`
Expected: both new tests FAIL against the current plain `bg-background` footer.

- [ ] **Step 3: Rewrite `components/layout/Footer.tsx`**

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
    <footer className="bg-accent-strong text-[#0B1211]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}. {profile.location}.
        </p>
        <ul className="flex flex-wrap gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded underline underline-offset-4 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1211] focus-visible:ring-offset-2 focus-visible:ring-offset-accent-strong"
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

(`text-[#0B1211]` is a fixed near-black, not a theme token — both themes' `accent-strong` values are mid-dark teals where black text clears AA more reliably than white, per spec §5's footer row. The focus ring uses the same fixed near-black rather than the `accent` token, since a teal ring on a teal band would be nearly invisible.)

- [ ] **Step 4: Run tests to verify they pass**

Run: `yarn test Footer`
Expected: PASS — both new tests plus the pre-existing links test (hrefs/names unchanged).

- [ ] **Step 5: Run the full suite and build**

Run: `yarn test && yarn lint && yarn build`
Expected: all succeed.

- [ ] **Step 6: Commit**

```bash
git add components/layout/Footer.tsx components/layout/Footer.test.tsx
git commit -m "feat: solid accent-strong full-bleed Footer band as the page's closing color moment"
```

---

## Closing checklist (whole-branch review, before merge — not its own task)

- [ ] `grep -rn "accent-from\|accent-to\|bg-gradient\|blur-3xl\|blur-xl\|shadow-accent\|bg-clip-text" --include="*.tsx" components app` returns nothing (confirms every old-pattern reference was migrated across Tasks 1-10).
- [ ] `yarn test && yarn lint && yarn build` all green.
- [ ] Manual Playwright screenshot pass in both themes (toggle click), desktop + mobile widths, per spec §7 — not an automated test, a human-style visual check before merge.
- [ ] Confirm the `ThemeToggle`'s default (no stored preference) matches the OS `prefers-color-scheme` in both a light-OS and dark-OS emulation.
