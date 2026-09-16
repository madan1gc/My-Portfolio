import { getYearsOfExperience } from '@/lib/date';

export const profile = {
  name: 'Madan G.C',
  role: 'Frontend Developer & WordPress Product Builder',
  tagline:
    'I build fast, scalable WordPress experiences, custom plugins, and modern frontend interfaces using React, JavaScript, Elementor, Bricks, and WordPress.',
  email: 'madan1239@gmail.com',
  github: 'https://github.com/madan1gc',
  linkedin: 'https://www.linkedin.com/in/madan-g-c-492b23198/',
  wordpressOrg: 'https://profiles.wordpress.org/madan1gc/',
  resumeUrl: '/resume/Madan-GC-Resume.pdf',
  location: 'Kathmandu, Nepal',
} as const;

export interface HeroStat {
  label: string;
  value: string;
  placeholder?: boolean;
}

export function getHeroStats(): HeroStat[] {
  return [
    { label: 'Years Experience', value: `${getYearsOfExperience()}+` },
    { label: 'Major Projects', value: '7+' },
    { label: 'Community Role', value: 'WordCamp Organizer' },
    { label: 'Plugin Author', value: 'In progress', placeholder: true },
  ];
}
