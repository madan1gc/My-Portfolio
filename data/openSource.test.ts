import { describe, expect, it } from 'vitest';
import { getProjectBySlug } from './projects';
import { openSource } from './openSource';

describe('openSource', () => {
  it('has the confirmed real WordPress.org profile URL', () => {
    expect(openSource.profileUrl).toBe('https://profiles.wordpress.org/madan1gc/');
  });

  it('references a project slug that actually exists in the projects data', () => {
    const project = getProjectBySlug(openSource.featuredProjectSlug);
    expect(project).toBeDefined();
    expect(project?.title).toBe('MGCora Unused Media Finder');
  });
});
