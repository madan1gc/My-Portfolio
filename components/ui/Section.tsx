import type { ReactNode } from 'react';
import { FadeIn } from '@/components/ui/FadeIn';

interface SectionProps {
  eyebrow: string;
  title: string;
  as?: 'h1' | 'h2';
  titleClassName?: string;
  children: ReactNode;
}

export function Section({ eyebrow, title, as = 'h2', titleClassName = '', children }: SectionProps) {
  const Eyebrow = as;
  const Title = as === 'h1' ? 'h2' : 'p';

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <FadeIn>
        <Eyebrow className="mb-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-accent-text">
          <span aria-hidden="true" className="h-2.5 w-2.5 bg-accent-strong" />
          {eyebrow}
        </Eyebrow>
        <Title className={`mb-12 max-w-prose text-2xl font-semibold text-foreground sm:text-3xl ${titleClassName}`.trim()}>
          {title}
        </Title>
      </FadeIn>
      {children}
    </section>
  );
}
