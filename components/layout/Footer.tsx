import { profile } from '@/data/profile';

const links = [
  { href: `mailto:${profile.email}`, label: profile.email },
  { href: profile.github, label: 'GitHub' },
  { href: profile.linkedin, label: 'LinkedIn' },
  { href: profile.wordpressOrg, label: 'WordPress.org' },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}. {profile.location}.
        </p>
        <ul className="flex flex-wrap gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-from focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
