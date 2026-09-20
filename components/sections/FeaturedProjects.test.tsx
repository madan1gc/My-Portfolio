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
});
