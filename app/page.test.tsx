import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import HomePage from './page';

describe('HomePage', () => {
  it('renders the main heading with the profile name', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { name: /Madan G\.C/ })).toBeInTheDocument();
  });

  it('exposes a #contact anchor target', () => {
    render(<HomePage />);
    expect(document.getElementById('contact')).not.toBeNull();
  });

  it('renders distinctive content from every section', () => {
    render(<HomePage />);

    // Hero
    expect(screen.getByText('Frontend Developer & WordPress Product Builder')).toBeInTheDocument();

    // Trust
    expect(screen.getByText('Codewing Solutions')).toBeInTheDocument();

    // Featured Projects
    expect(screen.getByRole('heading', { name: 'Trailvista Theme' })).toBeInTheDocument();

    // Skills
    const skillsHeading = screen.getByRole('heading', { name: 'Frontend' });
    const skillsSection = skillsHeading.closest('section');
    expect(skillsSection).not.toBeNull();
    expect(within(skillsSection as HTMLElement).getByText('React')).toBeInTheDocument();

    // Experience
    expect(screen.getByRole('heading', { name: 'Frontend Developer' })).toBeInTheDocument();
    expect(screen.getByText('Codewing Solutions · Kathmandu, Nepal')).toBeInTheDocument();

    // Testimonials
    expect(screen.getByText('Client Name')).toBeInTheDocument();

    // Contact
    expect(
      screen.getByRole('heading', { name: /Let's build something meaningful together/ }),
    ).toBeInTheDocument();
  });
});
