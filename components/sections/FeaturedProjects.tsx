import Link from 'next/link';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { Section } from '@/components/ui/Section';
import { getFeaturedProjects } from '@/data/projects';

export function FeaturedProjects() {
  const featured = getFeaturedProjects();

  return (
    <Section eyebrow="Featured Projects" title="Case studies from real WordPress and frontend work.">
      <div className="grid gap-6 sm:grid-cols-3">
        {featured.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
      <div className="mt-8">
        <Link
          href="/work"
          className="rounded text-sm font-medium text-accent-text hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-from focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          View all projects →
        </Link>
      </div>
    </Section>
  );
}
