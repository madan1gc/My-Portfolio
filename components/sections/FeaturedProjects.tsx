import Link from 'next/link';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { Section } from '@/components/ui/Section';
import { getFeaturedProjects } from '@/data/projects';

export function FeaturedProjects() {
  const featured = getFeaturedProjects();

  return (
    <Section eyebrow="Featured Projects" title="Case studies from real WordPress and frontend work.">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
        {featured.map((project, index) => (
          <div key={project.slug} className={index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Link
          href="/work"
          className="rounded text-sm font-medium text-accent-text hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          View all projects <span aria-hidden="true">→</span>
        </Link>
      </div>
    </Section>
  );
}
