import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { Tag } from '@/components/ui/Tag';
import { getProjectBySlug, projects } from '@/data/projects';

interface WorkCaseStudyPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: WorkCaseStudyPageProps): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    return {};
  }
  return {
    title: `${project.title} — Madan G.C`,
    description: project.summary,
  };
}

function CaseStudySection({ eyebrow, body }: { eyebrow: string; body: string }) {
  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <h2 className="mb-4 text-xs uppercase tracking-[0.2em] text-accent-text">{eyebrow}</h2>
      <p className="max-w-prose text-muted">{body}</p>
    </div>
  );
}

export default function WorkCaseStudyPage({ params }: WorkCaseStudyPageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <header className="mx-auto max-w-6xl px-6 pb-8 pt-24">
        <h1 className="mb-4 text-4xl font-semibold text-foreground sm:text-5xl">{project.title}</h1>
        <p className="mb-6 max-w-prose text-lg text-muted">{project.summary}</p>
        <div className="mb-6 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
        <div className="flex flex-wrap gap-4">
          {project.github && (
            <Button href={project.github} variant="secondary" external>
              GitHub
            </Button>
          )}
          {project.liveUrl && (
            <Button href={project.liveUrl} variant="secondary" external>
              Live Site
            </Button>
          )}
        </div>
      </header>

      <CaseStudySection eyebrow="Overview" body={project.overview} />
      <CaseStudySection eyebrow="Challenge" body={project.challenge} />
      <CaseStudySection eyebrow="Approach" body={project.approach} />

      <div className="mx-auto max-w-6xl px-6 py-8">
        <ImagePlaceholder label={project.title} />
      </div>

      <CaseStudySection eyebrow="Results" body={project.results} />
      <CaseStudySection eyebrow="Key Learnings" body={project.learnings} />

      <div className="mx-auto max-w-6xl px-6 pb-24">
        <Button href="/work" variant="ghost">
          ← Back to all projects
        </Button>
      </div>
    </>
  );
}
