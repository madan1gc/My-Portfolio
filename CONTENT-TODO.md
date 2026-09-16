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
- [ ] The Home page's nav (`components/layout/Nav.tsx`) links to `/work`,
      `/open-source`, `/community`, and `/blog`, and the Hero's "View
      Projects" button (`components/sections/Hero.tsx`) also links to
      `/work` — none of these routes exist yet (they're built in Phases
      2-4). This means the primary navigation 404s on a public deploy of
      this branch as-is. Either add stub "Coming soon" pages for these
      routes, or do not deploy the site publicly, until those routes exist.

## Content quality

Site works without these, but they're the difference between "structurally
complete" and "actually persuasive".

- [ ] Confirm or replace the "Plugin Author" hero stat in
      `data/profile.ts` → `getHeroStats()` (currently "In progress" and
      flagged `placeholder: true`). Remove it if no plugin will be published.
- [ ] Replace all three entries in `data/testimonials.ts` with real
      client/teammate/community quotes.
- [ ] Confirm WordCamp Nepal / WordCamp Asia attendance before adding them to
      `data/trust.ts` — only Codewing Solutions, WordPress.org, and WordCamp
      Kathmandu are listed today because they're confirmed.
- [ ] The hero stat "Major Projects: 7+" (`data/profile.ts` →
      `getHeroStats()`) should be reconciled with the actual number of case
      studies once Phase 2 defines them — the spec names exactly 7 projects,
      so "7+" may overstate.
- [ ] The Hero's status badge text "Available for freelance & full-time
      roles" (`components/sections/Hero.tsx`) should be confirmed as still
      accurate before launch — it's an availability claim, not a
      placeholder, but worth a pre-launch check.
- [ ] No favicon or Open Graph/Twitter metadata exists yet (`app/layout.tsx`)
      — spec §8 calls for OG image generation; this was out of scope for
      Phase 1's "SEO basics" but should be tracked for a later phase.

## Later phases (tracked here now, addressed when that phase is built)

- [ ] Phase 2 — Featured Projects: 7 case studies need real
      challenge/solution/results/screenshots/before-after content.
- [ ] Phase 3 — Open Source & Community: real WordPress.org contribution
      history, plugin/theme downloads, WordCamp roles/years/photos.
- [ ] Phase 4 — Blog: the 5 recommended articles need to actually be written.
