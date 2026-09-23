'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { profile } from '@/data/profile';

const navLinks = [
  { href: '/work', label: 'Work' },
  { href: '/open-source', label: 'Open Source' },
  { href: '/community', label: 'Community' },
  { href: '/blog', label: 'Blog' },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleButtonRef.current?.focus();
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
            className="rounded font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {profile.name}
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`rounded border-b-2 pb-1 text-xs font-medium uppercase tracking-[0.1em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                      isActive
                        ? 'border-accent text-foreground'
                        : 'border-transparent text-muted hover:text-foreground'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-4 md:flex">
            <ThemeToggle />
            <Button href={profile.resumeUrl} variant="ghost" external>
              Résumé
            </Button>
            <Button href="/#contact" variant="primary">
              Let&apos;s talk
            </Button>
          </div>

          <button
            ref={toggleButtonRef}
            type="button"
            className="flex flex-col gap-1.5 rounded md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
                  className="rounded text-sm text-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <div className="flex items-center justify-between gap-4">
                <Button href="/#contact" variant="primary">
                  Let&apos;s talk
                </Button>
                <ThemeToggle />
              </div>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
