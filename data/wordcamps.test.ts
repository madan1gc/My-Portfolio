import { describe, expect, it } from 'vitest';
import { wordcamps } from './wordcamps';

describe('wordcamps', () => {
  it('has exactly one confirmed entry: WordCamp Kathmandu 2022', () => {
    expect(wordcamps).toHaveLength(1);
    expect(wordcamps[0].event).toBe('WordCamp Kathmandu');
    expect(wordcamps[0].role).toBe('Organizer');
    expect(wordcamps[0].year).toBe('2022');
  });

  it('does not include unconfirmed WordCamp Nepal or Asia entries', () => {
    const events = wordcamps.map((entry) => entry.event);
    expect(events).not.toContain('WordCamp Nepal');
    expect(events).not.toContain('WordCamp Asia');
  });
});
