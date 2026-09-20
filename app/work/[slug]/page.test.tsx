import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { projects } from '@/data/projects';
import WorkCaseStudyPage, { generateStaticParams } from './page';

describe('generateStaticParams', () => {
  it('returns exactly the 7 project slugs', () => {
    const params = generateStaticParams();
    expect(params).toHaveLength(7);
    expect(params.map((param) => param.slug).sort()).toEqual(
      projects.map((project) => project.slug).sort(),
    );
  });
});

describe('WorkCaseStudyPage', () => {
  it('renders the title, tech tags, and all 5 content sections for a known slug', () => {
    render(<WorkCaseStudyPage params={{ slug: 'trailvista-theme' }} />);

    expect(screen.getByRole('heading', { name: 'Trailvista Theme', level: 1 })).toBeInTheDocument();
    expect(screen.getByText('Gutenberg')).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'Overview' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Challenge' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Approach' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Results' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Key Learnings' })).toBeInTheDocument();

    expect(screen.getByText('Screenshot coming soon')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Back to all projects/ })).toHaveAttribute(
      'href',
      '/work',
    );
  });

  it('does not render GitHub/Live Site buttons when a project has no links yet', () => {
    render(<WorkCaseStudyPage params={{ slug: 'trailvista-theme' }} />);
    expect(screen.queryByRole('link', { name: 'GitHub' })).toBeNull();
    expect(screen.queryByRole('link', { name: 'Live Site' })).toBeNull();
  });
});
