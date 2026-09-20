import type { Metadata } from 'next';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { openSource } from '@/data/openSource';
import { getProjectBySlug } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Open Source — Madan G.C',
  description: openSource.headline,
};

export default function OpenSourcePage() {
  const featuredProject = getProjectBySlug(openSource.featuredProjectSlug);

  return (
    <Section as="h1" eyebrow="Open Source" title={openSource.headline}>
      <p className="mb-8 max-w-prose text-muted">{openSource.description}</p>
      <div className="mb-8">
        <Button href={openSource.profileUrl} variant="secondary" external>
          View WordPress.org Profile
        </Button>
      </div>
      {featuredProject && (
        <div className="max-w-sm">
          <ProjectCard project={featuredProject} />
        </div>
      )}
    </Section>
  );
}
