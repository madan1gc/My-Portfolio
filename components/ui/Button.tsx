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
  // accent-strong is picked per-theme (see the color token table in the
  // visual-refresh spec) so white button text clears AA on both themes.
  primary: 'bg-accent-strong text-white hover:bg-accent',
  secondary: 'border border-border text-foreground hover:border-accent',
  ghost: 'text-muted hover:text-foreground',
};

const focusRingClasses =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background';

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
