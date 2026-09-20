import { describe, expect, it } from 'vitest';
import { projects } from '@/data/projects';
import sitemap from './sitemap';

describe('sitemap', () => {
  it('includes the homepage, /work, and every case-study route', () => {
    const entries = sitemap();
    expect(entries).toHaveLength(projects.length + 2);

    const urls = entries.map((entry) => entry.url);
    expect(urls).toContain('https://madangc.example');
    expect(urls).toContain('https://madangc.example/work');
    projects.forEach((project) => {
      expect(urls).toContain(`https://madangc.example/work/${project.slug}`);
    });
  });
});
