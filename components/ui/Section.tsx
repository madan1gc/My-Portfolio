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
