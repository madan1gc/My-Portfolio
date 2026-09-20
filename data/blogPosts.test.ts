import { describe, expect, it } from 'vitest';
import { blogPosts, getBlogPostBySlug } from './blogPosts';

describe('blogPosts', () => {
  it('has exactly 5 posts with unique slugs', () => {
    expect(blogPosts).toHaveLength(5);
    const slugs = blogPosts.map((post) => post.slug);
    expect(new Set(slugs).size).toBe(5);
  });

  it('gives every post at least one body paragraph', () => {
    blogPosts.forEach((post) => {
      expect(post.body.length).toBeGreaterThan(0);
    });
  });
});

describe('getBlogPostBySlug', () => {
  it('returns the matching post', () => {
    const post = getBlogPostBySlug('elementor-vs-bricks');
    expect(post?.title).toBe('Elementor vs Bricks');
  });

  it('returns undefined for an unknown slug', () => {
    expect(getBlogPostBySlug('does-not-exist')).toBeUndefined();
  });
});
