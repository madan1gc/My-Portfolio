# Portfolio "Ascent": Concept & Design Spec

Date: 2026-11-07
Owner: Madan G.C.
Supersedes (visual/UX only): `2026-09-23-portfolio-visual-refresh-design.md`
Keeps: content policy, data files and routes from `2026-09-16-portfolio-redesign-design.md`

> Status: proposal. Madan asked for research plus a plan with no questions in
> between, and will review once it's done. Every decision here is a
> recommendation until he approves it. §12 lists the questions only he can answer.

---

## 1. The idea in one paragraph

The portfolio is a **trek from Kathmandu to the Himalaya, and scrolling is
climbing.** The page opens at the trailhead (Kathmandu, 1,400 m) and every
section is a waypoint on the Everest Base Camp trail: kit check, trail log,
routes climbed, the team, field notes. It ends at a viewpoint near 5,600 m,
where visitors can hang a prayer flag with a short message. Those flags
build up into a shared summit register that every later visitor sees. A
fixed **altimeter** replaces the usual nav and progress bar. The **sky
changes with altitude**, from warm morning at the trailhead to a starry
night at the top, so the theme comes from the story rather than a toggle.
Recruiters who don't want to walk can **"Take the helicopter"**: one
click to a plain, dense, one-page résumé view.

**Why it belongs to Madan and nobody else:** he lives in Kathmandu, he builds
software for trekking and tour operators (WP Travel Engine, Tripcart: real
products that literally have altitude profiles), and he organizes WordCamps,
which is leading an expedition team. A template can't copy the metaphor because
it's his biography.

Closing line at the top of the climb (draft copy):
*"Highest point so far: 5,644 m. The summit is still ahead. Want to climb together?"*
That's a humble framing. The altitude is a metaphor for the journey, not a
seniority claim.

---

## 2. What the research says, and how this concept answers it

Research summary (full notes and sources in Appendix A):

| Finding from award winners (2019–2026) | How Ascent answers it |
|---|---|
| Winners commit to **one metaphor that belongs to the person** (Bruno Simon's car, Jesse Zhou's ramen shop, Lynn Fisher's yearly redesign). | The trek is one metaphor, carried into navigation, color, type, copy and interaction. |
| The 2025–26 bar is a **world, not a page**. Bruno Simon's 2025 rebuild (Awwwards SOTD Jan 2026) added shared state: visitor messages, global counters, weather. | Shared **prayer-flag summit register**: the summit changes because other people visited. |
| **Clichés to avoid:** OS/desktop portfolios, fake terminals, Three.js desk rooms, the "Dennis Snellenberg" recipe (magnetic buttons, giant name, blob cursor, marquee), custom cursors on their own, % preloaders. | None of these appear. No custom cursor, no preloader counter, no OS chrome. |
| **Sound** works only when it's optional and sparing (Josh Comeau, Bruno 2025). | Optional wind ambience plus one soft bell for UI. Off by default. |
| **Process as content** (Lynn's version numbers, Bruno's open-source repo and case study). | The trail log and an optional "view as hooks" developer layer (§5.7). The repo can be public. |
| Recruiter usability is the gap even in winners. Bruno's case study doesn't cover accessibility or how to reach him. | Helicopter mode, contact always one click away, real URLs per project, works without JS, honors reduced motion. |

---

## 3. Concepts considered and set aside

| Concept | Why not the lead idea |
|---|---|
| **wp-admin dashboard parody** (sections as "plugins" you activate) | Clever for WordPress people, meaningless to founders and recruiters. Copying the admin UI also borrows a real product's look. |
| **Live block-editor playground** (rearrange your own portfolio) | A strong interaction but a weak story. Kept as a possible future *Field note* experiment. |
| **Prayer-flag site** (five colors as the section system) | Too thin alone and easy to slide into kitsch. Folded into Ascent as the summit register only. |
| **Kathmandu street/mandala map** | Good, but the trek has a natural start→end order that maps onto a career and onto scroll. A map doesn't. |
| **Full 3D WebGL world** (Bruno-style) | Big build, weak on budget Android in Nepal and South Asia, and 3D rooms are trending toward cliché. Ascent gets depth from layered 2D SVG instead. WebGL stays an optional later upgrade. |
| **OS / terminal portfolio** | Now a template that AI builders ship by default. Ruled out. |

---

## 4. Goals, non-goals, anti-goals

**Goals**
1. Memorable within 5 seconds: the first screen alone says "this person is different".
2. Keeps the five outcomes from the original spec: frontend jobs, WordPress
   product work, freelance clients, open-source credibility, speaking.
3. Award-worthy craft: worth submitting to Awwwards / CSSDA / FWA (as a
   stretch, not a requirement).
4. Fast and accessible: Lighthouse ≥ 95 for Performance and Accessibility on mobile.

**Non-goals (this project)**
- No WebGL/3D in v1.
- No CMS: content stays in typed `data/*.ts` files.
- No new content invented. Placeholder policy from `CONTENT-TODO.md` still applies.

**Anti-goals (failure even if it "works")**
- **Scenery over substance:** projects or contact buried behind visuals. A
  recruiter must reach email and résumé in **one click from any scroll position**.
- **Everest kitsch:** clip-art peaks, yak emojis, stock photos of climbers,
  "conquer the summit" language.
- **Altitude as bragging:** altitude must never read as a seniority or skill score.
- **Stutter on a mid-range Android phone.**
- **Scroll-jacking:** native scroll always. No hijacked wheel, no snap that fights the user.

---

## 5. The experience

### 5.1 The route (home page, top to bottom)

> **Superseded order:** the section order and all copy now live in
> `2026-11-07-ascent-content-and-seo.md` §2–3 (work first, then a freelance
> "Hire me" section at Namche Bazaar). The table below is the original draft.

Altitudes follow the real Everest Base Camp trail. **Builder: verify each
figure against one source before launch**, since published numbers vary by a
few dozen meters.

| Waypoint | Altitude | Section (plain label first) | What's here | Data source |
|---|---|---|---|---|
| **Kathmandu**: Trailhead | 1,400 m | Intro | Name, role, one-line pitch, `Start the climb ↓` and `Take the helicopter ⟶`. Morning light. | `profile.ts` |
| **Lukla**: Kit check | 2,860 m | Skills | Skills laid out as a packed kit list (Frontend / WordPress / Tools pockets). | `skills.ts` |
| **Namche Bazaar**: Trail log | 3,440 m | Experience | Career entries as dated log entries pinned along the path. | `experience.ts` |
| **Tengboche**: Routes climbed | 3,867 m | Featured work | 3 featured projects as route cards (§5.5), plus a link to all routes. | `projects.ts` |
| **Dingboche**: Gear for others | 4,410 m | Open source | Plugins and contributions, WordPress.org link. | `openSource.ts` |
| **Lobuche**: The expedition team | 4,940 m | Community | WordCamp organizing and community roles. | `wordcamps.ts`, `trust.ts` |
| **Gorak Shep**: Field notes | 5,164 m | Blog | Latest 3 posts. | `blogPosts.ts` |
| **Base Camp**: Voices from camp | 5,364 m | Testimonials | Quotes. **Hide this waypoint until real testimonials exist**; skip straight past it. | `testimonials.ts` |
| **Kala Patthar**: Viewpoint | 5,644 m | Contact + summit register | Night sky, the closing line, email / LinkedIn / GitHub / résumé, then the prayer-flag register. | `profile.ts`, register store |

Sections stay ordinary semantic `<section>`s with plain `<h2>` headings
("Skills", "Experience"…). The waypoint name and altitude are a visual
eyebrow, not the heading, so screen readers and search engines get plain
meaning.

### 5.2 The altimeter (primary navigation on the home page)

- Fixed on the left edge (desktop) or as a slim bottom bar (mobile).
- Shows the current altitude, which counts smoothly as you scroll, plus the
  current waypoint name.
- Waypoint ticks are real links (`<nav aria-label="Trail">` with a list of
  anchors). Click or keyboard to jump. Plain labels show on focus and hover.
- Next to it, always visible: **Email**, **Hire me**, **Helicopter**.
  This fulfills the "one click from anywhere" anti-goal.
- The top nav shrinks to a wordmark plus Work / Writing / Community / Open source.

### 5.3 Atmosphere: color that comes from altitude

One scroll-driven value, `--alt` (0 at the trailhead, 1 at the viewpoint),
drives four sky bands that blend into each other:

#### Final palette: "Mountain Blue" (approved by Madan 2026-11-07)

Layered blue ranges fading into haze, on a warm off-white, with a gold
highlight and terracotta accents. Chosen after comparing six palettes, then
brightened one step at Madan's request. Contrast was checked on 2026-11-07,
and every text pair passes WCAG AA.

| Token | Role | Hex | Contrast |
|---|---|---|---|
| `--paper` | page background | `#F7F6F2` | |
| `--card` | content surfaces | `#FFFFFF` | |
| `--line` | borders, hairlines | `#DDE3EA` | |
| `--ink` | body text | `#172437` | 14+:1 on paper |
| `--smoke` | muted text | `#4E5D70` | 6.2:1 on paper |
| `--primary` | buttons, logo, favicon, altimeter | `#2F5E96` mountain blue | white text 6.6:1 |
| `--accent-text` | subtitle, italic headline words, stats | `#BA4A28` terracotta | 4.7:1 on paper |
| `--highlight` | helicopter button, freelance ticket, award badge | `#F6BF4E` gold | ink on it 9.3:1 |
| `--secondary` | badges, tags | `#2A7262` alpine green | 5.7:1 on card |
| `--panel` | form panel, quiet fills | `#E2EBF5` | muted text 5.6:1 |
| `--night` | night surfaces | `#16233A` | |
| `--night-ink` / `--night-smoke` / `--night-accent` | text on night | `#F7F6F2` / `#A9B7CC` / `#F6AC84` peach | 14.9 / 8.1 / 8.4:1 |

Prayer flags (flags and waypoint markers only, never UI colours): blue
`#2F6DB5`, white `#F7F6F2`, red `#C7362F`, green `#3D8A55`, yellow `#E8B53D`.

Code tokens: the prototype kept older variable names (`--brick` was the
primary blue, `--brick-text` the terracotta, `--marigold` the gold,
`--juniper` the green, `--dusk` the night, `--rhodo` the peach). In the build,
use the role names in the table above.

#### Sky bands

| Band | Altitude | Sky (top → horizon) | Ridges (back → front) |
|---|---|---|---|
| Dawn | 1,400–2,800 m | `#D8E6F4` → `#FAE9DC` | `#B0C6DE` `#83A2C8` `#5880AC` `#34598E` |
| Day | 2,800–4,000 m | `#C2DAF0` → `#F4F7FA` | `#A6C1DE` `#7598C4` `#4B73A8` `#2C5089` |
| High day | 4,000–4,800 m | `#B9D3EE` → `#F7F6F2` | `#9DBADB` `#6A90BE` `#41699F` `#26487F` |
| Alpenglow dusk | 4,800–5,300 m | `#33467A` → `#EFA88A` | `#8D93BA` `#5F6AA0` `#3C4B80` `#243266` |
| Night | 5,300 m+ | `#0C1527` → `#16233A` | `#22304C` `#1C2A43` `#16233A` `#101B2E` |

Clouds and birds fade out above the high-day band, and stars fade in for the
night band.

- **Text never sits straight on the sky.** Content lives on "trail-map paper"
  surfaces: warm off-white paper by day, dark slate by night. Each surface has
  fixed, contrast-checked text colors (AA minimum), so readability doesn't
  depend on blending.
- **Prayer-flag colors** (blue, white, red, green, yellow, in the traditional
  order) are reserved for the flags and tiny waypoint markers. They're never a
  UI palette.
- The global light/dark toggle **goes away on the home page**, because
  altitude is the theme. Inner pages keep a light/dark toggle (§6.2). The
  current `ThemeToggle` and no-flash script carry over there.
- Blend in OKLCH (`color-mix(in oklch, …)`) so the transitions don't go muddy.

### 5.4 Landscape: layered ridgelines

- 5–7 SVG ridge layers. Front layers move faster than back layers (parallax)
  as you scroll, which gives depth without 3D.
- Ridges come from a **seeded noise generator at build time** (static SVG
  paths, no runtime cost). The far layer near the top is hand-drawn after a
  recognizable Khumbu skyline silhouette, but stylized rather than traced
  from a photo.
- **Topographic contour lines** are the texture language: faint contours
  behind sections, contour-line dividers, survey-style labels in mono
  (`27.7172° N  85.3240° E · 1,400 m`).
- Stars appear above 5,000 m and a few snow particles at Day/Dusk, all drawn
  on one small `<canvas>` that pauses when offscreen. Both are disabled under
  `prefers-reduced-motion`.
- The first view's ridges draw in once (stroke animation, <1 s). No preloader.

### 5.5 Route cards (projects)

Each project is a "route" card:
- Title, one-line summary, tech tags, `Read the route →` (to `/work/[slug]`).
- A small **elevation-profile line** across the top of the card, with three
  marked points: *Challenge → Approach → Result*. Hover or focus a point and
  that part of the case study shows in a tooltip.
- **The profile shape is decorative** (seeded from the slug). It must not look
  like a chart of real metrics: no axis numbers. Caption it as the route, not data.
- Hover: the card lifts and the line draws from left to right. No glow.

### 5.6 Summit register (shared prayer flags)

The 2025–26 "world, not a page" idea, done in a WordPress-community way.

- At the viewpoint, a string of prayer flags hangs across the night sky.
  Each flag is a visitor's note: **name (≤30 chars), country (optional),
  message (≤80 chars)**.
- Flags flutter gently (CSS, paused under reduced motion). Hover or focus a
  flag to read it, or use a "Read all flags" list view that is fully accessible.
- `Hang a flag` opens a small form. Submissions are **pending until Madan
  approves them**. Spam protection: honeypot field, rate limit per IP, length
  limits, basic profanity filter.
- A counter reads "**N people have reached this viewpoint**" (approved flags only).
- **Fallback:** if the store is unavailable or empty, show a seeded string of
  Madan's own flags ("Thanks for climbing", WordCamp Kathmandu, and so on).
  The site never breaks without the backend.
- Storage and moderation: see §12 (depends on hosting).

### 5.7 Optional developer layer: "View the trail as hooks"

A small toggle in the footer (`</> View as hooks`). Each section then shows
its WordPress-style hook as an overlay label, for example
`do_action( 'ascent_camp_namche' )` or `apply_filters( 'ascent_route_cards', $projects )`.
It's a wink to WordPress developers and product companies that costs almost
nothing. **Phase 5, cut first if time is short.**

### 5.8 Sound (optional)

Off by default, with a toggle beside the altimeter. Wind ambience whose
volume rises with altitude, plus one soft singing-bowl tap when you hang a
flag. Stays under 150 KB total, lazy-loaded only after the toggle.

### 5.9 Helicopter mode (in-page flight)

**Decision (Madan, 2026-11-07):** the helicopter must not open a new page. It
is a flight that happens on top of the trek.

- **Trigger:** the "Helicopter" button in the top bar, always visible. It's a
  real link to `#flight` (or to a printable summary) so it still works without JS.
- **Lift-off (about 1.4 s):** a full-screen sky overlay fades in. A small SVG
  helicopter rises from the bottom with spinning rotors and settles, hovering,
  in the top-right corner. The ridges drop away and clouds rush past.
- **Aerial view ("Airborne · hovering at 6,000 m"):** the heading is "The
  whole trek, *from above*". Two panels:
  - **Flight map:** a top-down topographic map with a dashed terracotta
    route zigzagging through all 8 stops (Intro → Contact). Each stop is a
    button showing its section name plus place and altitude, with labels
    alternating left and right so none overlap. **Tapping a stop lands the
    helicopter and drops the visitor at that section.**
  - **Flight briefing:** portrait, name and role, an "Open for freelance"
    tag, four stats (21,000+ sites, 4+ yrs, Speaker, 363K+ Unsplash views),
    "Landmarks spotted" (the top 4 products with install counts), and
    actions: "Drop me at Hire me", Email, LinkedIn.
- **Land:** the Land button or Esc. The helicopter descends and focus returns
  to where the visitor was.
- **Accessibility:** `role="dialog"`, `aria-modal`, focus moves to Land on
  open, the body is scroll-locked while flying, all text is ≥14px, and under
  reduced motion the view appears straight away without the flight.
- **Phones:** the panels stack and the map gets taller (labels still never
  overlap). The helicopter parks smaller in the corner.
- **Printable résumé:** still worth having as a separate print-only route
  (`/resume`), but it's not what the helicopter opens.

---

## 6. Information architecture

### 6.1 Routes

| Route | Status | Notes |
|---|---|---|
| `/` | rebuilt | the trek |
| `/resume` | **new, optional** | print-friendly one-page résumé (the helicopter itself is an in-page flight, §5.9) |
| `/work`, `/work/[slug]` | restyled | "Routes": case studies as route write-ups |
| `/blog`, `/blog/[slug]` | restyled | "Field notes" |
| `/community` | restyled | "Expedition log" |
| `/open-source` | restyled | "Gear for others" |
| `/api/register` (or server action) | **new** | summit register submit + list |

Nav labels stay **plain words first** (Work, Writing, Community, Open source).
The metaphor appears as small eyebrows, so the site is never confusing.

### 6.2 Inner pages: the "field journal" template

Inner pages are for reading, not scenery:
- Calm paper background, one thin ridgeline header that matches the waypoint
  the page belongs to (Work uses Tengboche's daylight, for example).
- Case study layout: route header (title, tags, links), then sections in the
  existing data order (Overview, Challenge, Approach, Results, Learnings),
  with the decorative elevation line as a reading-progress indicator.
- Light/dark toggle is kept here.

---

## 7. Visual language

- **Type**
  - Display: **Archivo** (variable, has a width axis). Signature detail:
    headings get **narrower as you climb** (wide at the trailhead, condensed at
    the viewpoint), like thinning air. Done with `font-variation-settings`
    tied to `--alt`, and fixed per section under reduced motion.
  - Body: **Geist Sans** (already installed).
  - Labels, coordinates, altitudes: **Geist Mono** (already installed).
  - Playfair Display is dropped.
- **Shapes:** hard edges, hairline rules, contour lines. No pills, no blobs,
  no gradient glows (keeps the spirit of the Phase 6 rule against vibe-coded looks).
- **Imagery:** illustration and SVG only. If Madan has his **own trek photos**,
  one or two could appear as "postcards" in the trail log (see §12).
  No stock photography.
- **Headshot:** a small, square "trekking permit" style ID card in the hero
  (photo, name, role, "Permit No. 2022-FE", issued Kathmandu). It's playful and
  still professional. Uses `/images/me.jpg` once it's confirmed to be a headshot.
- **Motion principles:** motion follows the scroll and never runs on its own
  timer, except flags and stars. Everything has a reduced-motion equivalent.

---

## 8. Technical approach

Built on the **existing stack**: Next.js 14 App Router, Tailwind, framer-motion,
Vitest + Testing Library. No framework change.

- **Scroll → atmosphere:** one `requestAnimationFrame`-throttled scroll
  handler (or framer-motion `useScroll`) writes `--alt` on `<html>`. Colors,
  type width and parallax all read that one variable. Use CSS scroll-driven
  animations (`animation-timeline: scroll()`) where supported, with the JS
  variable as fallback.
- **Ridges:** generated by a small `lib/ridges.ts` (seeded noise → SVG path
  strings) at build time or in a server component. Unit-tested for
  determinism.
- **Altitude mapping:** `lib/altitude.ts` maps scroll position to meters by
  interpolating between waypoint anchors (measured section offsets), so the
  altimeter reads exactly the waypoint's altitude when its section arrives.
  Unit-tested.
- **Canvas (stars/snow):** one lazy client component, IntersectionObserver
  pause, DPR-capped at 2, disabled under reduced motion and `Save-Data`.
- **Register backend:** see §12. Abstract it behind `lib/register.ts` with
  `listApproved()`, `submit()` and `approve()`, so the store can be swapped and
  the UI tests can mock it.
- **No JS / SSR:** all content renders server-side. Without JS you get a
  static, correctly ordered page with the atmosphere fixed per section (each
  section carries its band as a class).
- **Performance budget:** LCP < 2.0 s and CLS < 0.05 on a mid-range Android
  over 4G. Home-page client JS ≤ 120 KB gzipped beyond the Next.js runtime.
  Fonts subset and preloaded.
- **Accessibility:** WCAG 2.2 AA. Altimeter is a real nav landmark, the
  register has a list view, every decorative SVG is `aria-hidden`, focus is
  visible on paper and night surfaces, and the sound toggle defaults to off.
- **Tests:** keep the existing Vitest setup. Component tests are rewritten
  for the new components, data tests stay as-is, and the `lib/` helpers get
  new unit tests.
- **SEO:** the metadata and JSON-LD carry over. New OG image: name plus a
  ridgeline at dusk, generated with `next/og` like today.

---

## 9. Content & copy voice

- Calm and warm, a little wry. A good trekking guide, not a motivational poster.
- Metaphor lives in the eyebrows and microcopy. Core facts stay literal
  ("Frontend Developer at Codewing Solutions since May 2022").
- No new claims. Everything in `CONTENT-TODO.md` is still open, and the
  testimonials waypoint stays hidden until real quotes exist.
- Copy hooks to write: hero pitch, 9 waypoint eyebrows, helicopter tooltip,
  the closing line, register form microcopy, empty and fallback states.

---

## 10. Phased roadmap

| Phase | Outcome | Key deliverables | Exit check |
|---|---|---|---|
| **0. Spike** (throwaway, ~1 day) | Feel the core before committing | One page: 5 ridge layers, `--alt` sky blend, a working altimeter, a font-width test. Run on a real mid-range phone. | Madan says "yes, this is it" or the concept gets adjusted. Code is thrown away. |
| **1. Foundation** | The systems everything else uses | `lib/altitude.ts`, `lib/ridges.ts`, atmosphere tokens, Archivo setup, paper surfaces, altimeter + slim nav, sky canvas, reduced-motion paths | Unit tests green. Contrast checked on all 4 bands. |
| **2. The trek** | Home page rebuilt | 9 waypoint sections on existing data, route cards, permit ID card, hero, closing viewpoint (static flags fallback) | Home works with JS off. Lighthouse ≥ 95 on mobile. |
| **3. Field journal + helicopter** | Inner pages and the in-page helicopter flight | Restyled work/community/open-source templates, flight overlay (§5.9), optional `/resume` print page | Every route reviewed. Flight works with keyboard and reduced motion. |
| **4. Summit register** | Shared flags live | Store + `lib/register.ts`, submit form, moderation path, counter, accessible list view | Spam tests pass. Approval flow verified end to end. |
| **5. Polish & launch** | Award-ready finish | Sound, hooks layer, OG image, perf/a11y audit, real domain, award submission package (screenshots, short screen recording, write-up) | Launch checklist done. Submit to Awwwards / CSSDA if Madan wants. |

Phases 1–3 deliver a complete, launchable site. Phase 4 adds the social
layer, and Phase 5 is finish. If anything slips, cut the hooks layer and
sound first, then the register (the static flag fallback ships instead).

Work happens on a feature branch in a worktree **outside** the repo's own tree
(see the worktree-placement lesson from earlier phases).

---

## 11. What's left to the builder

- Exact color values within each band (keep the AA rule), easing curves,
  parallax speeds, number of ridge layers.
- Noise algorithm and seed values for the ridges and route profiles.
- Whether to use framer-motion `useScroll` or native scroll-driven CSS for each effect.
- Component breakdown and file names.
- Altimeter layout details on tablet sizes.
- Exact wording of microcopy, inside the voice in §9.

---

## 12. Open questions for Madan (only he can answer)

1. **Hosting:** where will this deploy? Vercel is assumed. It decides the
   register store (recommended: Upstash Redis via the Vercel Marketplace, or
   Supabase if you'd prefer a dashboard for moderation).
2. **Summit register moderation:** is approving flags by hand OK? It could be
   an email with an approve link, or a tiny password-protected `/admin/flags` page.
3. **Your own trek photos:** have you walked any of this trail, or another
   Himalayan trek? Real photos as "postcards" would make it more personal. If
   not, illustration only, which works fine.
4. **The name:** "Ascent" is a working name for the concept. Keep it, or
   something else (for example "Trailhead" or "Base Camp")?
5. **Domain:** still `madangc.example`. The real domain is needed before launch.

---

## Appendix A: Research notes

Researched 2026-11-07 across Awwwards, Muzli, press, and the portfolios themselves.
Awards are listed only where they were confirmed. Others are marked.

| Site | Concept | Signature interaction | Recognition |
|---|---|---|---|
| Bruno Simon (2019), bruno-simon.com | Drive a toy car through your career | Physics driving, crash into project billboards | Awwwards SOTY 2019 + Developer SOTY 2019 |
| Bruno Simon (2025 rebuild) | Same car, now on a shared living island | Visitor "whispers", global counters, leaderboards, shared weather, WebGPU | Awwwards SOTD 21 Jan 2026 + Dev Award |
| Henry Heffernan, henryheffernan.com | 3D retro computer that zooms into a working 2D OS | Camera dolly into the screen | No award found. Cult hit, widely cloned |
| Lynn Fisher, lynnandtonic.com | A brand-new site every year (v. XIX) | Yearly gimmick, often responsive-resize art | web.dev Community Highlight |
| Robby Leonardi, rleonardi.com/interactive-resume | Résumé as a side-scrolling platformer | Scroll moves the character | net Awards 2014 nominee |
| Josh Comeau, joshwcomeau.com | Whimsy as craft | Optional sound effects, playful toggles | Large audience, no award verified |
| Jesse Zhou, "Jesse's Ramen" | Portfolio as a 3D ramen shop | Explore a miniature scene | Awwwards Honorable Mention 2022 |
| Dennis Snellenberg | Editorial minimalism | Magnetic buttons, big type | Awwwards SOTD 2022. So widely copied that Awwwards has a "Copy Dennis" collection, a warning sign |
| Henri Heymans '25 | Strict black and white, craft in the motion | Typographic transitions | Awwwards SOTD Feb 2025 |
| Lando Norris (OFF+BRAND) | Personal brand site | n/a | Awwwards SOTY 2025: personal sites can win the top prize |
| Muzli 2025/26 picks (Phantom.Land, Grit Pictures, Mikki Sindhunata, Jordan Delcros) | Strong single framings: a shape-shifting vessel, a scrapbook, choreography | n/a | Muzli Top 100 |

**Patterns rewarded now:** one committed metaphor, a shared and persistent
"world", craft over spectacle, optional sound, process as content. Muzli
sums up what reviewers want as "judgment, clarity, and ownership".

**Clichés now:** OS/desktop and terminal portfolios (AI builders ship them as
templates), the Snellenberg recipe, custom cursors on their own, stagger-in
text on every section, Three.js desk rooms, % preloaders.

**Recruiter usability:** a fast lane past the spectacle, content without JS,
lazy heavy assets, reduced-motion support, contact one click away, outcomes
over visuals.

**Sources**
- https://www.awwwards.com/websites/sites_of_the_year/
- https://www.awwwards.com/sites/brunos-portfolio
- https://www.awwwards.com/brunos-portfolio-case-study.html
- https://www.awwwards.com/sites/dennis-snellenberg
- https://www.awwwards.com/sites/jesses-ramen-portfolio
- https://www.awwwards.com/sites/henri-heymans-25
- https://muz.li/blog/top-100-most-creative-and-unique-portfolio-websites-of-2025/
- https://web.dev/community-highlight-lynn-fisher/
- https://xd.adobe.com/ideas/perspectives/interviews/lynn-fishers-annual-portfolio-redesign-skills-sharp
- https://www.themuse.com/advice/this-is-it-the-best-resume-weve-ever-seen
- https://www.creativebloq.com/news/3d-car-portfolio
- https://www.wearedevelopers.com/en/magazine/644/five-nostalgic-developer-portfolios-for-inspiration-644
- https://bolt.new/blog/how-to-create-a-macos-style-porfolio-website
