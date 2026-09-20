# Content To-Do

Every item below is placeholder or unconfirmed content shipped intentionally
so the site's structure could be reviewed immediately (spec §4, §7). Nothing
here should be treated as final copy.

## Blocking (site is not truly launch-ready without these)

- [ ] Add the real résumé PDF at `public/resume/Madan-GC-Resume.pdf`
      (referenced by `data/profile.ts` → `resumeUrl`). Until this file
      exists, the Nav's "Résumé" button and the Hero's "Download Resume"
      button both 404.
- [ ] Replace the placeholder domain `https://madangc.example` with the real
      production domain in `app/layout.tsx` (`metadataBase`), `app/sitemap.ts`,
      `app/robots.ts`, and the `PersonJsonLd`/`CreativeWorkJsonLd`/
      `BlogPostingJsonLd` blocks across `app/page.tsx`,
      `app/work/[slug]/page.tsx`, and `app/blog/[slug]/page.tsx`.
- [ ] Confirm `/images/me.jpg` is an appropriate professional headshot for the
      Hero photo — the original site's alt text called it "Mountain
      landscape," so verify it's actually a headshot before launch.

## Content quality

Site works without these, but they're the difference between "structurally
complete" and "actually persuasive".

- [ ] Confirm or replace the "Plugin Author" hero stat in
      `data/profile.ts` → `getHeroStats()` (currently "In progress" and
      flagged `placeholder: true`). Remove it if no plugin will be published.
- [ ] Replace all three entries in `data/testimonials.ts` with real
      client/teammate/community quotes.
- [ ] Confirm WordCamp Nepal / WordCamp Asia attendance before adding them to
      `data/trust.ts` or `data/wordcamps.ts` — only WordCamp Kathmandu 2022
      is listed today because it's confirmed.
- [ ] The Hero's status badge text "Available for freelance & full-time
      roles" (`components/sections/Hero.tsx`) should be confirmed as still
      accurate before launch — it's an availability claim, not a
      placeholder, but worth a pre-launch check.
- [ ] All 7 case studies in `data/projects.ts` (`/work` and `/work/[slug]`)
      have realistic-sounding placeholder copy for overview, challenge,
      approach, results, and key learnings, plausible but unverified
      `techStack` guesses, and no real screenshots, GitHub repos, or live
      URLs. Every field needs review against the real project before these
      are presented as verified work. The 3 featured on the Home page
      (`mgcora-unused-media-finder`, `trailvista-theme`, `codewing-website`)
      are an editorial placeholder choice too — revisit once real results
      exist.
- [ ] The hero stat "Major Projects: 7+" (`data/profile.ts` →
      `getHeroStats()`) now matches the 7 real case-study pages at `/work`,
      but those pages are still placeholder content — re-confirm the stat
      (or drop the "+") once the 7 case studies hold real, verified detail.
- [ ] `data/openSource.ts` and `/open-source` show only the real
      WordPress.org profile link and the one plugin-shaped project already in
      `data/projects.ts` — no contribution timeline, download counts, or
      release history, since none of that is confirmed yet. Expand once real
      WordPress.org contribution data is available.
- [ ] `/open-source`'s description of MGCora Unused Media Finder should be
      upgraded once the plugin is actually published — `data/profile.ts`'s
      "Plugin Author" hero stat still says "In progress", so avoid language
      that implies the plugin is already live or established.
- [ ] `data/wordcamps.ts` and `/community` show only the one confirmed
      appearance (WordCamp Kathmandu 2022, Organizer). Add further entries
      only once additional WordCamp attendance is confirmed — do not infer
      or estimate.
- [ ] All 5 posts in `data/blogPosts.ts` (`/blog` and `/blog/[slug]`) have
      short, generic placeholder bodies rather than finished articles.
      Replace each with a real, complete write-up before presenting them as
      genuine posts. No publish dates exist yet either — add them once posts
      are actually published, in the order they go live, and add
      `datePublished` to each post's `BlogPosting` JSON-LD
      (`app/blog/[slug]/page.tsx`) at the same time.

## Known technical debt (non-blocking, low priority)

- [ ] The focus-visible ring class string
      (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-from focus-visible:ring-offset-2 focus-visible:ring-offset-background`)
      is duplicated across 9 files (`Nav`, `Footer`, `Trust`, `Button`,
      `ProjectCard`, `CommunityStrip`, `FeaturedProjects`, `BlogPostCard`,
      `BlogPreview`). Extracting it to a shared constant or CSS utility would
      make the accessibility contract easier to maintain — purely a
      dev-ergonomics improvement, zero end-user impact today.
- [ ] `patches/next+14.2.35.patch` fixes a Windows-specific bug in Next.js's
      vendored `@vercel/og` (used by `app/icon.tsx`/`app/opengraph-image.tsx`)
      where a `path.join()` call on a `file://` URL breaks on Windows.
      `patch-package`'s `postinstall` hook reapplies it automatically, but
      the patch targets Next's internal, unversioned `dist/compiled` output
      — if Next.js is ever upgraded past 14.2.35, `patch-package` will fail
      loudly at install time (a safe failure, not silent breakage) and
      whoever does that upgrade will need to re-diagnose whether the bug
      still exists and regenerate the patch if so.

## Final QA

- [ ] A Lighthouse/accessibility pass against the live built site is
      planned as a follow-up to this phase — findings will be appended here.
