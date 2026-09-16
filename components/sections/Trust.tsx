import { trustItems } from '@/data/trust';

export function Trust() {
  return (
    <section className="border-y border-border bg-surface/40 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-6 text-center text-xs uppercase tracking-[0.2em] text-muted">
          Trusted in the WordPress & frontend community
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {trustItems.map((item) => (
            <li key={item.name} className="text-sm font-medium text-muted">
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-from focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {item.name}
                </a>
              ) : (
                item.name
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
