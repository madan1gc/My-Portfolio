import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { FadeIn } from './FadeIn';

afterEach(() => {
  cleanup();
});

describe('FadeIn', () => {
  it('renders its children', () => {
    render(
      <FadeIn>
        <p>Revealed content</p>
      </FadeIn>,
    );
    expect(screen.getByText('Revealed content')).toBeInTheDocument();
  });

  it('renders content at full opacity immediately when prefers-reduced-motion is set', async () => {
    vi.resetModules();
    vi.doMock('framer-motion', async () => {
      const actual = await vi.importActual<typeof import('framer-motion')>('framer-motion');
      return { ...actual, useReducedMotion: () => true };
    });

    const { FadeIn: FadeInWithReducedMotion } = await import('./FadeIn');
    render(
      <FadeInWithReducedMotion>
        <p>Reduced motion content</p>
      </FadeInWithReducedMotion>,
    );

    const content = screen.getByText('Reduced motion content');
    // No `opacity: 0` inline style stuck from Framer Motion's animated
    // `initial` state — the content is not hidden waiting for an
    // in-view animation that a reduced-motion user won't visually notice.
    expect(content.parentElement).not.toHaveAttribute('style');

    vi.doUnmock('framer-motion');
  });
});
