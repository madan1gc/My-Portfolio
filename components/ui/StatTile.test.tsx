import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StatTile } from './StatTile';

describe('StatTile', () => {
  it('renders the value and label', () => {
    render(<StatTile label="Years Experience" value="4+" />);
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('Years Experience')).toBeInTheDocument();
  });

  it('renders a trailing "+" in its own accent-colored span', () => {
    render(<StatTile label="Major Projects" value="7+" />);
    const plus = screen.getByText('+');
    expect(plus.tagName).toBe('SPAN');
    expect(plus.className).toContain('text-accent-text');
    expect(screen.getByText('7')).toBeInTheDocument();
  });

  it('renders a value without a trailing "+" unchanged, with no extra span', () => {
    render(<StatTile label="Community Role" value="WordCamp Organizer" />);
    expect(screen.getByText('WordCamp Organizer')).toBeInTheDocument();
    expect(screen.queryByText('+')).toBeNull();
  });
});
