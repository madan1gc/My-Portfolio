export interface ExperienceEntry {
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  achievements: string[];
}

export const experience: ExperienceEntry[] = [
  {
    role: 'Frontend Developer',
    company: 'Codewing Solutions',
    location: 'Kathmandu, Nepal',
    start: 'May 2022',
    end: 'Present',
    achievements: [
      'Develop and maintain custom WordPress themes and plugins across diverse client industries.',
      'Build custom Elementor widgets that extend design flexibility for non-technical editors.',
      'Implement React components and dynamic interfaces to improve user experience.',
      'Optimize page performance and scalability, improving load times and SEO outcomes.',
      'Collaborate with designers, product managers, and QA to ship production releases.',
    ],
  },
  {
    role: 'Frontend Intern',
    company: 'Ekbana Solution',
    location: 'Kathmandu, Nepal',
    start: 'Jan 2022',
    end: 'Apr 2022',
    achievements: [
      'Assisted frontend development using HTML, CSS, JavaScript, and React.',
      'Contributed React components to existing production applications.',
      'Learned and applied industry best practices under senior developer mentorship.',
    ],
  },
];
