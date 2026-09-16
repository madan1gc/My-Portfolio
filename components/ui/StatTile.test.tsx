import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StatTile } from './StatTile';

describe('StatTile', () => {
  it('renders the value and label', () => {
    render(<StatTile label="Years Experience" value="4+" />);
    expect(screen.getByText('4+')).toBeInTheDocument();
    expect(screen.getByText('Years Experience')).toBeInTheDocument();
  });
});
