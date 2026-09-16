import { describe, expect, it, vi } from 'vitest';
import { getHeroStats, profile } from './profile';

describe('profile', () => {
  it('has the confirmed real contact links', () => {
    expect(profile.email).toBe('madan1239@gmail.com');
    expect(profile.github).toBe('https://github.com/madan1gc');
    expect(profile.linkedin).toBe('https://www.linkedin.com/in/madan-g-c-492b23198/');
    expect(profile.wordpressOrg).toBe('https://profiles.wordpress.org/madan1gc/');
  });
});

describe('getHeroStats', () => {
  it('computes a real years-of-experience stat instead of a hardcoded string', () => {
    vi.setSystemTime(new Date('2026-09-16'));
    const stats = getHeroStats();
    const years = stats.find((stat) => stat.label === 'Years Experience');
    expect(years?.value).toBe('4+');
    vi.useRealTimers();
  });

  it('flags the unconfirmed Plugin Author stat as a placeholder', () => {
    const stats = getHeroStats();
    const pluginAuthor = stats.find((stat) => stat.label === 'Plugin Author');
    expect(pluginAuthor?.placeholder).toBe(true);
  });
});
