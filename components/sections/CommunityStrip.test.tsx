import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CommunityStrip } from './CommunityStrip';

describe('CommunityStrip', () => {
  it('renders links to /open-source and /community', () => {
    render(<CommunityStrip />);
    expect(screen.getByRole('heading', { name: 'Open Source' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Community' })).toBeInTheDocument();

    expect(screen.getByRole('link', { name: 'Learn more about Open Source' })).toHaveAttribute(
      'href',
      '/open-source',
    );
    expect(screen.getByRole('link', { name: 'Learn more about Community' })).toHaveAttribute(
      'href',
      '/community',
    );
  });
});
