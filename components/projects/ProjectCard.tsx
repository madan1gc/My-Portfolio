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
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-surface/95 p-6 backdrop-blur transition-transform duration-300 group-hover:translate-y-0 group-focus-within:translate-y-0"
      >
        <div className="mb-4 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
        <span className="inline-flex items-center text-sm font-medium text-accent-text">
          View case study{' '}
          <span className="ml-1 inline-block transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
      <Link
        href={`/work/${project.slug}`}
        aria-label={`View case study: ${project.title}`}
        className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      />
    </Card>
  );
}
