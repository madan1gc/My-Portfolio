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
