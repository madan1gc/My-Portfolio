export interface SkillCategory {
  title: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  { title: 'Frontend', skills: ['HTML', 'CSS', 'SCSS', 'JavaScript', 'React'] },
  {
    title: 'WordPress',
    skills: ['Theme Development', 'Elementor', 'Bricks', 'Gutenberg', 'Plugin Development'],
  },
  { title: 'Tools', skills: ['Git', 'GitHub', 'Figma', 'Cursor', 'AI Studio', 'n8n'] },
];
