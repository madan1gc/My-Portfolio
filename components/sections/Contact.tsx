import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/ui/FadeIn';
import { profile } from '@/data/profile';

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-24 text-center">
      <FadeIn>
        <h2 className="mb-4 text-3xl font-semibold text-foreground sm:text-5xl">
          Have a project or product idea?
          <span className="block text-accent">
            Let&apos;s build something meaningful together.
          </span>
        </h2>
        <p className="mx-auto mb-10 max-w-prose text-muted">
          Open to frontend developer roles, WordPress product work, and freelance engagements.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button href={`mailto:${profile.email}`} variant="primary">
            Email Me
          </Button>
          <Button href={profile.github} variant="secondary" external>
            GitHub
          </Button>
          <Button href={profile.linkedin} variant="secondary" external>
            LinkedIn
          </Button>
          <Button href={profile.wordpressOrg} variant="secondary" external>
            WordPress.org
          </Button>
        </div>
      </FadeIn>
    </section>
  );
}
