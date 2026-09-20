import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import OpenSourcePage from './page';

describe('OpenSourcePage', () => {
  it('renders the WordPress.org profile link and the featured project', () => {
    render(<OpenSourcePage />);
    expect(screen.getByRole('heading', { name: 'Open Source', level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'View WordPress.org Profile' })).toHaveAttribute(
      'href',
      'https://profiles.wordpress.org/madan1gc/',
    );
    expect(screen.getByRole('heading', { name: 'MGCora Unused Media Finder' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^View case study:/ })).toHaveAttribute(
      'href',
      '/work/mgcora-unused-media-finder',
    );
  });
});
