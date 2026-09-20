import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { Timeline, type TimelineItem } from '@/components/ui/Timeline';
import { wordcamps } from '@/data/wordcamps';

export const metadata: Metadata = {
  title: 'Community — Madan G.C',
  description: 'WordCamp volunteering and community involvement.',
};

export default function CommunityPage() {
  const items: TimelineItem[] = wordcamps.map((entry) => ({
    title: entry.event,
    subtitle: entry.role,
    period: entry.year,
    description: entry.achievements,
  }));

  return (
    <Section
      as="h1"
      eyebrow="Community"
      title="Volunteering and organizing within the WordPress community."
    >
      <Timeline items={items} />
    </Section>
  );
}
