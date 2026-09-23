import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Button } from './Button';

afterEach(() => {
  cleanup();
});

describe('Button', () => {
  it('renders its children as a link to href', () => {
    render(<Button href="/work">View Projects</Button>);
    const link = screen.getByRole('link', { name: 'View Projects' });
    expect(link).toHaveAttribute('href', '/work');
  });

  it('opens external links safely in a new tab', () => {
    render(
      <Button href="https://github.com/madan1gc" external>
        GitHub
      </Button>,
    );
    const link = screen.getByRole('link', { name: 'GitHub' });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('does not add target/rel for internal links', () => {
    render(<Button href="/work">View Projects</Button>);
    const link = screen.getByRole('link', { name: 'View Projects' });
    expect(link).not.toHaveAttribute('target');
  });

  it('uses a solid accent fill for the primary variant, no gradient', () => {
    render(<Button href="/work">View Projects</Button>);
    const link = screen.getByRole('link', { name: 'View Projects' });
    expect(link.className).toContain('bg-accent-strong');
    expect(link.className).not.toContain('bg-gradient-to-r');
  });
});
