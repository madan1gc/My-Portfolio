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
  // Darker gradient endpoints than accent.from/accent.to so white button
  // text clears AA (4.5:1) across the whole gradient — see contrast math in
  // the Phase 1 fix report. Shadows keep the brand accent colors since
  // shadow contrast isn't an AA text requirement.
  primary:
    'bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white shadow-lg shadow-accent-from/20 hover:shadow-accent-from/40',
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
