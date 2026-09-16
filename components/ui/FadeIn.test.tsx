import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FadeIn } from './FadeIn';

describe('FadeIn', () => {
  it('renders its children', () => {
    render(
      <FadeIn>
        <p>Revealed content</p>
      </FadeIn>,
    );
    expect(screen.getByText('Revealed content')).toBeInTheDocument();
  });
});
