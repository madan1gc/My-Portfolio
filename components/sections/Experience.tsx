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
        <h2 className="mb-2 text-xs uppercase tracking-[0.2em] text-accent-text">Experience</h2>
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
