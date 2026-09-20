import { describe, expect, it } from 'vitest';
import { getFeaturedProjects, getProjectBySlug, projects } from './projects';

describe('projects', () => {
  it('has exactly 7 projects with unique slugs', () => {
    expect(projects).toHaveLength(7);
    const slugs = projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(7);
  });

  it('has exactly 3 featured projects: mgcora-unused-media-finder, trailvista-theme, codewing-website', () => {
    const featured = getFeaturedProjects();
    expect(featured).toHaveLength(3);
    expect(featured.map((project) => project.slug).sort()).toEqual(
      ['codewing-website', 'mgcora-unused-media-finder', 'trailvista-theme'].sort(),
    );
  });

  it('leaves github and liveUrl unset on every project (no fabricated links)', () => {
    projects.forEach((project) => {
      expect(project.github).toBeUndefined();
      expect(project.liveUrl).toBeUndefined();
    });
  });

  it('has no duplicate techStack entries within any single project', () => {
    projects.forEach((project) => {
      expect(new Set(project.techStack).size).toBe(project.techStack.length);
    });
  });
});

describe('getProjectBySlug', () => {
  it('returns the matching project', () => {
    const project = getProjectBySlug('trailvista-theme');
    expect(project?.title).toBe('Trailvista Theme');
  });

  it('returns undefined for an unknown slug', () => {
    expect(getProjectBySlug('does-not-exist')).toBeUndefined();
  });
});
