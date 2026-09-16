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

## Content quality (site works without these, but they're the difference
## between "structurally complete" and "actually persuasive")

- [ ] Confirm or replace the "Plugin Author" hero stat in
      `data/profile.ts` → `getHeroStats()` (currently "In progress" and
      flagged `placeholder: true`). Remove it if no plugin will be published.
- [ ] Replace all three entries in `data/testimonials.ts` with real
      client/teammate/community quotes.
- [ ] Confirm WordCamp Nepal / WordCamp Asia attendance before adding them to
      `data/trust.ts` — only Codewing Solutions, WordPress.org, and WordCamp
      Kathmandu are listed today because they're confirmed.

## Later phases (tracked here now, addressed when that phase is built)

- [ ] Phase 2 — Featured Projects: 7 case studies need real
      challenge/solution/results/screenshots/before-after content.
- [ ] Phase 3 — Open Source & Community: real WordPress.org contribution
      history, plugin/theme downloads, WordCamp roles/years/photos.
- [ ] Phase 4 — Blog: the 5 recommended articles need to actually be written.
