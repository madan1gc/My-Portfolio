import { describe, expect, it } from 'vitest';
import { blogPosts } from '@/data/blogPosts';
import { projects } from '@/data/projects';
import sitemap from './sitemap';

describe('sitemap', () => {
  it('includes every route: homepage, /work + case studies, /open-source, /community, /blog + posts', () => {
    const entries = sitemap();
    expect(entries).toHaveLength(projects.length + blogPosts.length + 5);

    const urls = entries.map((entry) => entry.url);
    expect(urls).toContain('https://madangc.example');
    expect(urls).toContain('https://madangc.example/work');
    projects.forEach((project) => {
      expect(urls).toContain(`https://madangc.example/work/${project.slug}`);
    });
    expect(urls).toContain('https://madangc.example/open-source');
    expect(urls).toContain('https://madangc.example/community');
    expect(urls).toContain('https://madangc.example/blog');
    blogPosts.forEach((post) => {
      expect(urls).toContain(`https://madangc.example/blog/${post.slug}`);
    });
  });
});
