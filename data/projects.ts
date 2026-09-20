export interface Project {
  slug: string;
  title: string;
  summary: string;
  overview: string;
  challenge: string;
  approach: string;
  techStack: string[];
  results: string;
  learnings: string;
  github?: string;
  liveUrl?: string;
  featured: boolean;
}

// All 7 entries are placeholder content (spec §5, §7) — realistic-sounding
// but generic, no fabricated metrics, no real links yet. Tracked in
// CONTENT-TODO.md.
export const projects: Project[] = [
  {
    slug: 'mgcora-unused-media-finder',
    title: 'MGCora Unused Media Finder',
    summary:
      'A WordPress plugin that scans the media library for unused files and helps site owners reclaim storage safely.',
    overview:
      "MGCora Unused Media Finder is a WordPress plugin that scans a site's media library, cross-references every attachment against posts, pages, widgets, and theme templates, and flags files that appear unused so site owners can review and remove them with confidence.",
    challenge:
      "WordPress media libraries grow indefinitely with no built-in way to tell which uploaded files are still referenced anywhere on the site, so cleanup is either skipped entirely or done blindly, risking broken pages.",
    approach:
      'Built a scanning engine that checks attachment usage across post content, post meta, widgets, and common page-builder formats, then surfaces results in an admin screen with a confidence indicator per file so nothing gets deleted without review.',
    techStack: ['PHP', 'WordPress Plugin API', 'JavaScript', 'MySQL'],
    results:
      'Gives site owners a safe, guided way to reduce media library bloat and backup size without the risk of blindly deleting files that turn out to be in use.',
    learnings:
      "Reliably detecting 'usage' across arbitrary page builders and custom fields is harder than it looks — the plugin's confidence-scoring approach came out of realizing a binary used/unused flag wasn't trustworthy enough to act on directly.",
    featured: true,
  },
  {
    slug: 'wp-travel-engine-testimonials',
    title: 'WP Travel Engine Testimonials',
    summary: 'A custom testimonials module built for the WP Travel Engine plugin ecosystem.',
    overview:
      'A testimonials add-on built to integrate with WP Travel Engine, letting travel agencies collect and display customer reviews alongside their tour listings.',
    challenge:
      "WP Travel Engine didn't have a built-in way to attach customer testimonials to specific tours, so agencies were manually pasting review screenshots into page content — inconsistent, not responsive, and impossible to filter or moderate.",
    approach:
      'Designed a custom post type for testimonials with a tour-relationship field, then built front-end display components (grid and carousel layouts) that plug into existing WP Travel Engine tour pages without modifying core plugin files.',
    techStack: ['WordPress', 'PHP', 'JavaScript', 'Elementor'],
    results:
      'Gave agencies a structured, moderatable way to showcase real customer feedback per tour instead of static screenshots.',
    learnings:
      "Extending a third-party plugin's data model safely means working entirely through its public hooks and filters — an early version that touched WP Travel Engine's own templates directly broke on the plugin's next update.",
    featured: false,
  },
  {
    slug: 'tripcart-pricing-page',
    title: 'Tripcart Pricing Page',
    summary:
      'A redesigned pricing page for Tripcart focused on clarifying plan differences and reducing signup drop-off.',
    overview:
      "A ground-up redesign of Tripcart's pricing page, rebuilding the plan comparison and signup flow to be clearer and faster on mobile.",
    challenge:
      "The existing pricing page packed all plan details into a dense table that was hard to scan on mobile and didn't make it obvious which plan most visitors should pick.",
    approach:
      'Restructured the page around a simplified plan-comparison layout with a recommended-plan highlight, rebuilt the responsive breakpoints from scratch, and streamlined the signup call-to-action path.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'React'],
    results:
      "Produced a pricing page that's substantially easier to scan on mobile, with a clearer recommended-plan path through signup.",
    learnings:
      "A pricing page's job is to remove decisions, not present all of them at once — the recommended-plan highlight mattered more to the redesign than any visual polish.",
    featured: false,
  },
  {
    slug: 'shubha-events-refactor',
    title: 'Shubha Events Refactor',
    summary: "A performance and structure refactor of the Shubha Events website's frontend.",
    overview:
      'A frontend refactor of the Shubha Events site, cleaning up legacy markup and rebuilding key pages for better performance and maintainability.',
    challenge:
      "The site had accumulated years of ad-hoc markup and inline styles from incremental edits, making pages slow to load and risky to change without breaking something elsewhere.",
    approach:
      'Audited the existing templates page by page, consolidated duplicated styles into a shared stylesheet, replaced render-blocking scripts with deferred/async loading, and rebuilt the event-listing pages with semantic markup.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'WordPress'],
    results:
      "Left the site with cleaner, more maintainable templates and noticeably faster page loads, without changing the site's visual design.",
    learnings:
      'Refactoring a live site incrementally, page by page, kept the risk of a big-bang rewrite off the table while still letting the cleanup compound over time.',
    featured: false,
  },
  {
    slug: 'trailvista-theme',
    title: 'Trailvista Theme',
    summary: 'A custom WordPress theme built for outdoor/adventure travel brands.',
    overview:
      'Trailvista is a custom WordPress theme designed for outdoor and adventure travel businesses, with layout templates for tour listings, trip itineraries, and booking calls-to-action.',
    challenge:
      "Off-the-shelf travel themes were either too generic for an outdoor/adventure brand's visual identity or too rigid to adapt to different tour-operator business models.",
    approach:
      'Built a theme from scratch on top of the WordPress block editor, with custom block patterns for itineraries and trip highlights, a flexible tour-listing template, and full support for the site editor\'s global styles.',
    techStack: ['WordPress', 'PHP', 'Gutenberg', 'SCSS'],
    results:
      'Gives adventure travel operators a theme that matches their brand without needing custom development for every new tour page.',
    learnings:
      'Building for the block editor instead of a classic page-builder meant more upfront template work, but it gave site owners far more editing freedom afterward without touching code.',
    featured: true,
  },
  {
    slug: 'codewing-website',
    title: 'Codewing Website',
    summary: 'The marketing website for Codewing Solutions, the agency I work at.',
    overview:
      "The public marketing site for Codewing Solutions — services, portfolio, and contact pages built to represent the agency's own frontend and WordPress work.",
    challenge:
      "An agency's own website is its most-scrutinized portfolio piece — it needed to demonstrate the same frontend and WordPress craft the agency sells to clients.",
    approach:
      "Built the site with a component-based WordPress theme, custom Elementor widgets for the services and portfolio sections, and attention to performance since site speed is itself part of the agency's pitch.",
    techStack: ['WordPress', 'Elementor', 'PHP', 'JavaScript'],
    results: "Serves as Codewing's live portfolio piece and first impression for prospective clients.",
    learnings:
      "Working on your own company's site comes with more stakeholders and slower sign-off than client work — the build process mattered as much as the code.",
    featured: true,
  },
  {
    slug: 'hasta-arts-client-work',
    title: 'Hasta Arts Client Work',
    summary: 'Frontend development for the Hasta Arts client site, including custom Elementor components.',
    overview:
      "Frontend development work for Hasta Arts, including custom Elementor widgets and page-template work to match the client's brand design.",
    challenge:
      "The client's design called for layout and interaction patterns that standard Elementor widgets couldn't produce without heavy workarounds.",
    approach:
      "Built custom Elementor widgets tailored to the specific layouts in the design files, so the client's team could continue editing content themselves afterward without needing a developer for routine updates.",
    techStack: ['WordPress', 'Elementor', 'PHP', 'JavaScript'],
    results: "Delivered the client's design faithfully while keeping the site editable by their own team going forward.",
    learnings:
      'Custom Elementor widgets are worth the upfront build time when they save the client from needing a developer for every future content change.',
    featured: false,
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
