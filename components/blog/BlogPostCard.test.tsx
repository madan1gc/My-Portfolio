import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { BlogPost } from '@/data/blogPosts';
import { BlogPostCard } from './BlogPostCard';

const post: BlogPost = {
  slug: 'elementor-vs-bricks',
  title: 'Elementor vs Bricks',
  dek: 'A practical comparison of two page builders I use regularly in client work.',
  body: ['Paragraph one.'],
};

describe('BlogPostCard', () => {
  it('renders the title, dek, and a link to the post', () => {
    render(<BlogPostCard post={post} />);
    expect(screen.getByRole('heading', { name: 'Elementor vs Bricks' })).toBeInTheDocument();
    expect(
      screen.getByText('A practical comparison of two page builders I use regularly in client work.'),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Read post: Elementor vs Bricks/ })).toHaveAttribute(
      'href',
      '/blog/elementor-vs-bricks',
    );
  });
});
