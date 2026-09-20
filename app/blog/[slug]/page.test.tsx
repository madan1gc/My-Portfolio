import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { blogPosts } from '@/data/blogPosts';
import BlogPostPage, { generateStaticParams } from './page';

describe('generateStaticParams', () => {
  it('returns exactly the 5 post slugs', () => {
    const params = generateStaticParams();
    expect(params).toHaveLength(5);
    expect(params.map((param) => param.slug).sort()).toEqual(
      blogPosts.map((post) => post.slug).sort(),
    );
  });
});

describe('BlogPostPage', () => {
  it('renders the title, dek, body paragraphs, and a back link for a known slug', () => {
    render(<BlogPostPage params={{ slug: 'elementor-vs-bricks' }} />);

    expect(screen.getByRole('heading', { name: 'Elementor vs Bricks', level: 1 })).toBeInTheDocument();
    expect(
      screen.getByText('A practical comparison of two page builders I use regularly in client work.'),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Back to blog/ })).toHaveAttribute('href', '/blog');
  });
});
