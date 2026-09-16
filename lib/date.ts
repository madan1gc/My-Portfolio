const EXPERIENCE_START = new Date('2022-05-01');
const MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365;

export function getYearsOfExperience(referenceDate: Date = new Date()): number {
  const years = (referenceDate.getTime() - EXPERIENCE_START.getTime()) / MS_PER_YEAR;
  return Math.floor(years);
}
