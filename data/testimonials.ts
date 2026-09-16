export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  placeholder: boolean;
}

// All three entries are placeholders — see CONTENT-TODO.md. Replace with
// real client/team/community quotes before public launch (spec §7).
export const testimonials: Testimonial[] = [
  {
    quote: 'Add a real client quote describing the outcome of working with Madan.',
    name: 'Client Name',
    role: 'Founder, Client Company',
    placeholder: true,
  },
  {
    quote: 'Add a real teammate quote describing how Madan works day-to-day.',
    name: 'Teammate Name',
    role: 'Project Manager, Codewing Solutions',
    placeholder: true,
  },
  {
    quote: 'Add a real community quote from a WordCamp organizer or contributor.',
    name: 'Community Member',
    role: 'WordCamp Kathmandu',
    placeholder: true,
  },
];
