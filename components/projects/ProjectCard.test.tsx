import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { Project } from '@/data/projects';
import { ProjectCard } from './ProjectCard';

const project: Project = {
  slug: 'trailvista-theme',
  title: 'Trailvista Theme',
  summary: 'A custom WordPress theme built for outdoor/adventure travel brands.',
  overview: 'overview',
  challenge: 'challenge',
  approach: 'approach',
  techStack: ['WordPress', 'PHP', 'Gutenberg', 'SCSS'],
  results: 'results',
  learnings: 'learnings',
  featured: true,
};

describe('ProjectCard', () => {
  it('renders the title, summary, tech tags, and a link to the case study', () => {
    render(<ProjectCard project={project} />);
    expect(screen.getByRole('heading', { name: 'Trailvista Theme' })).toBeInTheDocument();
    expect(
      screen.getByText('A custom WordPress theme built for outdoor/adventure travel brands.'),
    ).toBeInTheDocument();
    expect(screen.getByText('Gutenberg')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'View case study: Trailvista Theme' })).toHaveAttribute(
      'href',
      '/work/trailvista-theme',
    );
  });

  it('marks the arrow decorative and gives it a hover transition', () => {
    const { container } = render(<ProjectCard project={project} />);
    const overlay = container.querySelector('[aria-hidden="true"]');
    const arrow = overlay?.querySelector('span > span');
    expect(arrow?.textContent).toBe('→');
    expect(arrow?.className).toContain('transition-transform');
  });

  it('reveals the tags and CTA text in a glass overlay on hover and on keyboard focus of the card link', () => {
    const { container } = render(<ProjectCard project={project} />);
    const overlay = container.querySelector('[aria-hidden="true"]');
    expect(overlay?.className).toContain('group-focus-within:translate-y-0');
    expect(overlay?.className).toContain('backdrop-blur');
  });
});
