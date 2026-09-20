# Content To-Do

Every item below is placeholder or unconfirmed content shipped intentionally
so the site's structure could be reviewed immediately (spec §4, §7). Nothing
here should be treated as final copy.

## Blocking (site is not truly launch-ready without these)

- [ ] Add the real résumé PDF at `public/resume/Madan-GC-Resume.pdf`
      (referenced by `data/profile.ts` → `resumeUrl`).
- [ ] Replace the placeholder domain `https://madangc.example` with the real
      production domain in `app/layout.tsx` (`metadataBase`), `app/sitemap.ts`,
      `app/robots.ts`, and the `PersonJsonLd` block in `app/page.tsx`.
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
- [ ] No favicon or Open Graph/Twitter metadata exists yet (`app/layout.tsx`)
      — spec §8 calls for OG image generation; this was out of scope for
      Phase 1's "SEO basics" but should be tracked for a later phase.
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
      are actually published, in the order they go live.

## Later phases (tracked here now, addressed when that phase is built)

- [ ] Phase 5 — Polish: SEO/schema audit, Lighthouse/performance pass,
      accessibility pass, final QA, and finalizing this checklist.
