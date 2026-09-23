import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';
import type { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group relative flex h-full flex-col overflow-hidden">
      <div className="relative flex-1">
        <h3 className="mb-2 text-lg font-semibold text-foreground">{project.title}</h3>
        <p className="text-sm text-muted">{project.summary}</p>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-surface/95 p-6 backdrop-blur transition-transform duration-300 group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:pointer-events-auto">
        <div className="mb-4 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
        <Link
          href={`/work/${project.slug}`}
          aria-label={`View case study: ${project.title}`}
          className="rounded text-sm font-medium text-accent-text hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          View case study{' '}
          <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </Card>
  );
}
