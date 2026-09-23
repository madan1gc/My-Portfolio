import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { FadeIn } from '@/components/ui/FadeIn';
import { Section } from '@/components/ui/Section';

const items = [
  {
    href: '/open-source',
    title: 'Open Source',
    description: 'Building and contributing to the WordPress ecosystem on WordPress.org.',
  },
  {
    href: '/community',
    title: 'Community',
    description: 'Volunteering and organizing within the local WordPress community.',
  },
];

export function CommunityStrip() {
  return (
    <Section eyebrow="Get Involved" title="Contributing beyond client work.">
      <div className="grid gap-6 sm:grid-cols-2">
        {items.map((item, index) => (
          <FadeIn key={item.href} delay={index * 0.1}>
            <Card>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="mb-4 text-sm text-muted">{item.description}</p>
              <Link
                href={item.href}
                aria-label={`Learn more about ${item.title}`}
                className="rounded text-sm font-medium text-accent-text hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </Card>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
