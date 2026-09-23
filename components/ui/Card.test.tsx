import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Card } from './Card';

describe('Card', () => {
  it('renders its children', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('merges a custom className with the base styles', () => {
    render(<Card className="custom-class">Content</Card>);
    expect(screen.getByText('Content')).toHaveClass('custom-class');
  });

  it('uses a hard border-color hover state, no blur glow shadow', () => {
    render(<Card>Content</Card>);
    const card = screen.getByText('Content');
    expect(card.className).toContain('hover:border-accent');
    expect(card.className).not.toContain('shadow-[');
  });
});
