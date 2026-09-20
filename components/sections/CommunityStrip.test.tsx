import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CommunityStrip } from './CommunityStrip';

describe('CommunityStrip', () => {
  it('renders links to /open-source and /community', () => {
    render(<CommunityStrip />);
    expect(screen.getByRole('heading', { name: 'Open Source' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Community' })).toBeInTheDocument();

    const links = screen.getAllByRole('link', { name: /Learn more/ });
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', '/open-source');
    expect(links[1]).toHaveAttribute('href', '/community');
  });
});
