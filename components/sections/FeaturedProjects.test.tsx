import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FeaturedProjects } from './FeaturedProjects';

describe('FeaturedProjects', () => {
  it('renders exactly the 3 featured projects and a link to all projects', () => {
    render(<FeaturedProjects />);

    expect(screen.getByRole('heading', { name: 'MGCora Unused Media Finder' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Trailvista Theme' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Codewing Website' })).toBeInTheDocument();

    expect(screen.queryByRole('heading', { name: 'WP Travel Engine Testimonials' })).toBeNull();

    expect(screen.getByRole('link', { name: /View all projects/ })).toHaveAttribute('href', '/work');
  });

  it('spans the first featured project across two columns on large screens', () => {
    const { container } = render(<FeaturedProjects />);
    const grid = container.querySelector('.grid');
    const firstItem = grid?.firstElementChild;
    expect(firstItem?.className).toContain('lg:col-span-2');
    expect(firstItem?.className).toContain('lg:row-span-2');
  });
});
