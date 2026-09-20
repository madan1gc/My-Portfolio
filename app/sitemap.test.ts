import { describe, expect, it } from 'vitest';
import { projects } from '@/data/projects';
import sitemap from './sitemap';

describe('sitemap', () => {
  it('includes the homepage, /work, every case-study route, /open-source, and /community', () => {
    const entries = sitemap();
    expect(entries).toHaveLength(projects.length + 4);

    const urls = entries.map((entry) => entry.url);
    expect(urls).toContain('https://madangc.example');
    expect(urls).toContain('https://madangc.example/work');
    projects.forEach((project) => {
      expect(urls).toContain(`https://madangc.example/work/${project.slug}`);
    });
    expect(urls).toContain('https://madangc.example/open-source');
    expect(urls).toContain('https://madangc.example/community');
  });
});
