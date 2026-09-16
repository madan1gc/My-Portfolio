import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/ui/FadeIn';
import { StatTile } from '@/components/ui/StatTile';
import { getHeroStats, profile } from '@/data/profile';

export function Hero() {
  const stats = getHeroStats();

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[-120px] -z-10 flex justify-center">
        <div className="h-[420px] w-[420px] animate-float rounded-full bg-gradient-to-r from-accent-from to-accent-to opacity-20 blur-3xl" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 pb-24 pt-20 sm:pt-28">
        <FadeIn>
          <div className="flex flex-col-reverse items-center gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-6">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-muted">
                <span className="h-2 w-2 rounded-full bg-gradient-to-r from-accent-from to-accent-to" />
                Available for freelance & full-time roles
              </span>

              <h1 className="max-w-2xl text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
                {profile.name}
                <span className="mt-2 block bg-gradient-to-r from-accent-from to-accent-to bg-clip-text text-transparent">
                  {profile.role}
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

            <div className="relative h-48 w-48 shrink-0 sm:h-56 sm:w-56">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-from to-accent-to opacity-70 blur-xl" />
              <Image
                src="/images/me.jpg"
                alt="Madan G.C, Frontend Developer"
                fill
                sizes="224px"
                priority
                className="relative rounded-full border border-border object-cover"
              />
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
