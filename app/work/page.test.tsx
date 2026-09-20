import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import WorkPage from './page';

describe('WorkPage', () => {
  it('renders a heading and a card for all 7 projects', () => {
    render(<WorkPage />);
    expect(screen.getByRole('heading', { name: 'Work', level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();

    const titles = [
      'MGCora Unused Media Finder',
      'WP Travel Engine Testimonials',
      'Tripcart Pricing Page',
      'Shubha Events Refactor',
      'Trailvista Theme',
      'Codewing Website',
      'Hasta Arts Client Work',
    ];
    titles.forEach((title) => {
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
    });

    expect(screen.getAllByRole('link', { name: /^View case study:/ })).toHaveLength(7);
  });
});
