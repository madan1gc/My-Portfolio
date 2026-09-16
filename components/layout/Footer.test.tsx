import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders the confirmed contact links only (no phone, no Instagram/X)', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'madan1239@gmail.com' })).toHaveAttribute(
      'href',
      'mailto:madan1239@gmail.com',
    );
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/madan1gc',
    );
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/madan-g-c-492b23198/',
    );
    expect(screen.getByRole('link', { name: 'WordPress.org' })).toHaveAttribute(
      'href',
      'https://profiles.wordpress.org/madan1gc/',
    );
    expect(screen.queryByText(/instagram/i)).toBeNull();
    expect(screen.queryByText(/9843222825/)).toBeNull();
  });
});
