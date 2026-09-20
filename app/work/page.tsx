import type { Metadata } from 'next';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { projects } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Work — Madan G.C',
  description: 'Case studies from WordPress and frontend projects I have built.',
};

export default function WorkPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <h1 className="mb-2 text-xs uppercase tracking-[0.2em] text-accent-text">Work</h1>
      <p className="mb-12 max-w-prose text-2xl font-semibold text-foreground sm:text-3xl">
        Case studies from WordPress products, custom plugins, and client frontend work.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
