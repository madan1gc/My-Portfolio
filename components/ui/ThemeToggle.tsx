'use client';

import { useEffect, useState } from 'react';

function readInitialTheme(): 'light' | 'dark' {
  if (typeof document === 'undefined') {
    return 'dark';
  }
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  // The no-FOUC script in app/layout.tsx may set data-theme before this
  // component hydrates, so the server-rendered markup (always 'dark',
  // since `document` doesn't exist during SSR) can differ from the real
  // client theme. React 18 doesn't patch hydration mismatches — it warns
  // and keeps the SSR output — so without this effect a light-theme
  // visitor would see the wrong icon/label until their first click.
  // Re-reading the attribute post-mount forces a real re-render that
  // corrects it.
  useEffect(() => {
    setTheme(readInitialTheme());
  }, []);

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
      suppressHydrationWarning
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
