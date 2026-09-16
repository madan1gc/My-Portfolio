import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Trust } from './Trust';

describe('Trust', () => {
  it('renders every confirmed trust item', () => {
    render(<Trust />);
    expect(screen.getByText('Codewing Solutions')).toBeInTheDocument();
    expect(screen.getByText('WordCamp Kathmandu')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'WordPress.org' })).toHaveAttribute(
      'href',
      'https://profiles.wordpress.org/madan1gc/',
    );
  });

  it('does not render unconfirmed affiliations', () => {
    render(<Trust />);
    expect(screen.queryByText('WordCamp Asia')).toBeNull();
    expect(screen.queryByText('WordCamp Nepal')).toBeNull();
  });
});
