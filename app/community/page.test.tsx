import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CommunityPage from './page';

describe('CommunityPage', () => {
  it('renders the WordCamp Kathmandu 2022 entry and nothing else', () => {
    render(<CommunityPage />);
    expect(screen.getByRole('heading', { name: 'Community', level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'WordCamp Kathmandu' })).toBeInTheDocument();
    expect(screen.getByText('Organizer')).toBeInTheDocument();
    expect(screen.getByText('2022')).toBeInTheDocument();
    expect(screen.queryByText('WordCamp Nepal')).toBeNull();
    expect(screen.queryByText('WordCamp Asia')).toBeNull();
  });
});
