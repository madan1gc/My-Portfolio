import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import BlogPage from './page';

describe('BlogPage', () => {
  it('renders a heading and a card for all 5 posts', () => {
    render(<BlogPage />);
    expect(screen.getByRole('heading', { name: 'Blog', level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();

    const titles = [
      'Lessons from Building WordPress Plugins',
      'What I Learned Contributing to WordCamp',
      'Elementor vs Bricks',
      'Frontend Performance Tips',
      'My Journey as a Frontend Developer',
    ];
    titles.forEach((title) => {
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
    });

    expect(screen.getAllByRole('link', { name: /^Read post:/ })).toHaveLength(5);
  });
});
