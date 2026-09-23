import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Hero } from './Hero';

describe('Hero', () => {
  it('renders the name, role, and tagline', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { name: /Madan G\.C/ })).toBeInTheDocument();
    expect(screen.getByText('Frontend Developer & WordPress Product Builder')).toBeInTheDocument();
    expect(
      screen.getByText(/I build fast, scalable WordPress experiences/),
    ).toBeInTheDocument();
  });

  it('renders the three primary CTAs with correct destinations', () => {
    render(<Hero />);
    expect(screen.getByRole('link', { name: 'View Projects' })).toHaveAttribute('href', '/work');
    expect(screen.getByRole('link', { name: 'Download Resume' })).toHaveAttribute(
      'href',
      '/resume/Madan-GC-Resume.pdf',
    );
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '#contact');
  });

  it('renders a computed years-of-experience stat, not a hardcoded string', () => {
    vi.setSystemTime(new Date('2026-09-16'));
    render(<Hero />);
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('Years Experience')).toBeInTheDocument();
    vi.useRealTimers();
  });

  it('renders the profile photo with descriptive alt text', () => {
    render(<Hero />);
    expect(screen.getByAltText('Madan G.C, Frontend Developer')).toBeInTheDocument();
  });

  it('renders a decorative blinking caret after the role text', () => {
    render(<Hero />);
    const role = screen.getByText('Frontend Developer & WordPress Product Builder');
    const caret = role.querySelector('[aria-hidden="true"]');
    expect(caret).not.toBeNull();
    expect(caret?.className).toContain('motion-reduce:animate-none');
  });
});
