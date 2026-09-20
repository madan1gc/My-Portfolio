import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';
import type { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card>
      <h3 className="mb-2 text-lg font-semibold text-foreground">{project.title}</h3>
      <p className="mb-4 text-sm text-muted">{project.summary}</p>
      <div className="mb-4 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <Tag key={tech}>{tech}</Tag>
        ))}
      </div>
      <Link
        href={`/work/${project.slug}`}
        className="rounded text-sm font-medium text-accent-text hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-from focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        View case study →
      </Link>
    </Card>
  );
}
