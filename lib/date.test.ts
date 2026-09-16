import { describe, expect, it } from 'vitest';
import { getYearsOfExperience } from './date';

describe('getYearsOfExperience', () => {
  it('returns 0 for a date less than a year after the start date', () => {
    expect(getYearsOfExperience(new Date('2022-11-01'))).toBe(0);
  });

  it('returns 4 for September 2026, given a May 2022 start date', () => {
    expect(getYearsOfExperience(new Date('2026-09-16'))).toBe(4);
  });

  it('returns 1 exactly one year after the start date', () => {
    expect(getYearsOfExperience(new Date('2023-05-01'))).toBe(1);
  });
});
