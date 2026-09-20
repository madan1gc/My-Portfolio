import { FadeIn } from '@/components/ui/FadeIn';
import { Section } from '@/components/ui/Section';
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
    <Section eyebrow="Experience" title="Where I've shipped production WordPress and frontend work.">
      <FadeIn delay={0.1}>
        <Timeline items={items} />
      </FadeIn>
    </Section>
  );
}
