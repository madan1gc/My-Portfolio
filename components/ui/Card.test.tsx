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
});
