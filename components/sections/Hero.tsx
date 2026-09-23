import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/ui/FadeIn';
import { StatTile } from '@/components/ui/StatTile';
import { getHeroStats, profile } from '@/data/profile';

export function Hero() {
  const stats = getHeroStats();

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 pb-24 pt-20 sm:pt-28">
        <FadeIn>
          <div className="flex flex-col-reverse items-center gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-6 lg:max-w-xl">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-muted">
                <span className="h-2 w-2 rounded-full bg-accent-strong" />
                Available for freelance & full-time roles
              </span>

              <h1 className="max-w-2xl text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
                {profile.name}
                <span className="mt-2 block text-accent">
                  {profile.role}
                  <span
                    aria-hidden="true"
                    className="ml-1 inline-block h-[0.85em] w-[3px] translate-y-[0.1em] animate-caret bg-accent align-middle motion-reduce:animate-none"
                  />
                </span>
              </h1>

              <p className="max-w-prose text-lg text-muted sm:text-xl">{profile.tagline}</p>

              <div className="flex flex-wrap gap-4">
                <Button href="/work" variant="primary">
                  View Projects
                </Button>
                <Button href={profile.resumeUrl} variant="secondary" external>
                  Download Resume
                </Button>
                <Button href="#contact" variant="ghost">
                  Contact
                </Button>
              </div>
            </div>

            <div className="relative shrink-0">
              <div
                aria-hidden="true"
                className="absolute -inset-6 -z-10 rounded-full border border-dashed border-accent/40"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-3 -right-3 -z-10 h-48 w-48 bg-accent-strong sm:h-56 sm:w-56"
              />
              <div className="relative h-48 w-48 sm:h-56 sm:w-56">
                <Image
                  src="/images/me.jpg"
                  alt="Madan G.C, Frontend Developer"
                  fill
                  sizes="224px"
                  priority
                  className="rounded-2xl border border-border object-cover"
                />
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <dl className="grid grid-cols-2 gap-8 border-t border-border pt-10 sm:grid-cols-4">
            {stats.map((stat) => (
              <StatTile key={stat.label} label={stat.label} value={stat.value} />
            ))}
          </dl>
        </FadeIn>
      </div>
    </section>
  );
}
