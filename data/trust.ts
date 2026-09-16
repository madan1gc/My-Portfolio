export interface TrustItem {
  name: string;
  href?: string;
}

// Only confirmed real affiliations. WordCamp Nepal / WordCamp Asia are
// listed in CONTENT-TODO.md pending confirmation of actual attendance —
// do not add them here until confirmed (spec §4, §10).
export const trustItems: TrustItem[] = [
  { name: 'Codewing Solutions' },
  { name: 'WordPress.org', href: 'https://profiles.wordpress.org/madan1gc/' },
  { name: 'WordCamp Kathmandu' },
];
