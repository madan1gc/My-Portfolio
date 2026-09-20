import type { Metadata } from 'next';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { Section } from '@/components/ui/Section';
import { projects } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Work — Madan G.C',
  description: 'Case studies from WordPress and frontend projects I have built.',
};

export default function WorkPage() {
  return (
    <Section
      as="h1"
      eyebrow="Work"
      title="Case studies from WordPress products, custom plugins, and client frontend work."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  );
}
