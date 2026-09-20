export interface BlogPost {
  slug: string;
  title: string;
  dek: string;
  body: string[];
}

// All 5 entries are placeholder content (spec §2) — short, generic intro
// paragraphs, not finished articles, and no publish-date field since none
// are actually published yet. Tracked in CONTENT-TODO.md.
export const blogPosts: BlogPost[] = [
  {
    slug: 'lessons-from-building-wordpress-plugins',
    title: 'Lessons from Building WordPress Plugins',
    dek: "A few things I've learned building WordPress plugins that only became obvious after shipping one.",
    body: [
      "Building a WordPress plugin is a different discipline from building a typical web app — you're extending a platform you don't control, for site owners with wildly different themes, page builders, and other plugins running alongside yours.",
      'The biggest lesson has been to design for compatibility first. A feature that works perfectly on a clean install can break in unexpected ways once real-world custom fields and page builders enter the picture, so testing across common setups matters more than polishing edge-case features.',
      "Working within WordPress's hook and filter system, rather than around it, has also made plugins easier to maintain — and much less likely to break when WordPress core or another plugin updates.",
    ],
  },
  {
    slug: 'what-i-learned-contributing-to-wordcamp',
    title: 'What I Learned Contributing to WordCamp',
    dek: 'Notes from volunteering as an organizer at WordCamp Kathmandu.',
    body: [
      'Volunteering to help organize WordCamp Kathmandu gave me a different view of the WordPress community than working with it purely as a developer — a lot of what makes an event work happens well before attendees ever show up.',
      "Coordinating with other volunteers, speakers, and sponsors is its own skill, separate from writing code, and it's made me appreciate how much community events depend on people willing to handle the unglamorous logistics.",
      "It's also been a good reminder that the WordPress ecosystem is held together by volunteers as much as by the software itself.",
    ],
  },
  {
    slug: 'elementor-vs-bricks',
    title: 'Elementor vs Bricks',
    dek: 'A practical comparison of two page builders I use regularly in client work.',
    body: [
      'Elementor and Bricks solve the same basic problem — visual page building for WordPress — but they come from noticeably different philosophies.',
      'Elementor is the more established, widely-supported option with a huge ecosystem of third-party widgets, which makes it a safe default for client projects where long-term support matters.',
      "Bricks leans more toward developer-friendly, performance-conscious output, which shows up in cleaner generated markup and fewer extra assets loaded on the frontend. Which one I reach for usually comes down to the client's team: how comfortable they are editing content themselves, and how much custom development the project actually needs.",
    ],
  },
  {
    slug: 'frontend-performance-tips',
    title: 'Frontend Performance Tips',
    dek: 'A few practical habits that make the biggest difference in real-world frontend performance.',
    body: [
      "Most frontend performance work isn't exotic — it's a handful of habits applied consistently: optimizing images before they ever reach the page, deferring non-critical JavaScript, and being deliberate about what loads above the fold versus what can wait.",
      "On WordPress sites specifically, plugin sprawl is usually the biggest performance risk. Every additional plugin is another set of scripts and styles that may or may not be needed on a given page, so auditing what's actually loading is often more valuable than any single optimization technique.",
      "Measuring before and after every change matters too — it's easy to assume something helped when the real gain came from somewhere else entirely.",
    ],
  },
  {
    slug: 'my-journey-as-a-frontend-developer',
    title: 'My Journey as a Frontend Developer',
    dek: "How I got into frontend development and WordPress, and what's kept me interested.",
    body: [
      'I got into frontend development the way a lot of people do — by wanting to build something and learning just enough HTML and CSS to make it happen, then gradually going deeper.',
      'WordPress became a natural focus once I started doing client work, since so much of the web still runs on it, and there was always more to learn: theme development, custom Elementor widgets, and eventually plugin development.',
      "What's kept me interested is the mix of frontend craft and the WordPress ecosystem's scale — the same skills that make a good frontend developer also make it possible to build tools and themes that other people actually use.",
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
