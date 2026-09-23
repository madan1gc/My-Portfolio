import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BlogPreview } from './BlogPreview';

describe('BlogPreview', () => {
  it('renders exactly the first 3 posts and a link to the full blog', () => {
    render(<BlogPreview />);

    expect(
      screen.getByRole('heading', { name: 'Lessons from Building WordPress Plugins' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'What I Learned Contributing to WordCamp' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Elementor vs Bricks' })).toBeInTheDocument();

    expect(screen.queryByRole('heading', { name: 'Frontend Performance Tips' })).toBeNull();

    expect(screen.getByRole('link', { name: /View all posts/ })).toHaveAttribute('href', '/blog');
  });

  it('gives the section title the one-off editorial italic-serif treatment', () => {
    render(<BlogPreview />);
    expect(screen.getByText('Notes on WordPress and frontend development.').className).toContain(
      'font-serif',
    );
  });
});
