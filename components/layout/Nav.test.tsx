import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Nav } from './Nav';

describe('Nav', () => {
  it('renders the primary nav links', () => {
    render(<Nav />);
    expect(screen.getByRole('link', { name: 'Work' })).toHaveAttribute('href', '/work');
    expect(screen.getByRole('link', { name: 'Open Source' })).toHaveAttribute('href', '/open-source');
    expect(screen.getByRole('link', { name: 'Community' })).toHaveAttribute('href', '/community');
    expect(screen.getByRole('link', { name: 'Blog' })).toHaveAttribute('href', '/blog');
  });

  it('toggles the mobile menu open and closed', async () => {
    const user = userEvent.setup();
    render(<Nav />);
    const toggle = screen.getByRole('button', { name: 'Toggle navigation menu' });
    // The desktop nav list is always in the DOM (hidden only via a CSS
    // class, which jsdom does not apply in tests), so we assert on the
    // mobile menu's conditional render by id rather than by role/visibility.
    expect(document.getElementById('mobile-nav')).toBeNull();
    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(document.getElementById('mobile-nav')).not.toBeNull();
    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(document.getElementById('mobile-nav')).toBeNull();
  });
});
