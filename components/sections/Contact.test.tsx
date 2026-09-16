import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Contact } from './Contact';

describe('Contact', () => {
  it('exposes a #contact anchor target', () => {
    const { container } = render(<Contact />);
    expect(container.querySelector('#contact')).not.toBeNull();
  });

  it('renders the CTA heading and all contact links, with no phone number', () => {
    render(<Contact />);
    expect(
      screen.getByRole('heading', { name: /Let's build something meaningful together/ }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Email Me' })).toHaveAttribute(
      'href',
      'mailto:madan1239@gmail.com',
    );
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/madan1gc',
    );
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/madan-g-c-492b23198/',
    );
    expect(screen.getByRole('link', { name: 'WordPress.org' })).toHaveAttribute(
      'href',
      'https://profiles.wordpress.org/madan1gc/',
    );
    expect(screen.queryByText(/9843222825/)).toBeNull();
  });
});
