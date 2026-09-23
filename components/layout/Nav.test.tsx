import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Nav } from './Nav';

const { usePathname } = vi.hoisted(() => ({ usePathname: vi.fn(() => '/') }));

vi.mock('next/navigation', () => ({
  usePathname,
}));

describe('Nav', () => {
  beforeEach(() => {
    usePathname.mockReturnValue('/');
  });

  it('renders the primary nav links', () => {
    render(<Nav />);
    expect(screen.getByRole('link', { name: 'Work' })).toHaveAttribute('href', '/work');
    expect(screen.getByRole('link', { name: 'Open Source' })).toHaveAttribute('href', '/open-source');
    expect(screen.getByRole('link', { name: 'Community' })).toHaveAttribute('href', '/community');
    expect(screen.getByRole('link', { name: 'Blog' })).toHaveAttribute('href', '/blog');
  });

  it('links "Let\'s talk" (desktop and mobile) to the home page contact anchor so it works from any route', async () => {
    const user = userEvent.setup();
    render(<Nav />);

    // Desktop button is always in the DOM.
    expect(screen.getByRole('link', { name: "Let's talk" })).toHaveAttribute('href', '/#contact');

    // Mobile button only renders once the menu is opened.
    await user.click(screen.getByRole('button', { name: 'Toggle navigation menu' }));
    const talkLinks = screen.getAllByRole('link', { name: "Let's talk" });
    expect(talkLinks).toHaveLength(2);
    talkLinks.forEach((link) => {
      expect(link).toHaveAttribute('href', '/#contact');
    });
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

  it('nests the mobile menu inside the Primary nav landmark', async () => {
    const user = userEvent.setup();
    render(<Nav />);
    await user.click(screen.getByRole('button', { name: 'Toggle navigation menu' }));
    const nav = screen.getByRole('navigation', { name: 'Primary' });
    const mobileMenu = document.getElementById('mobile-nav');
    expect(mobileMenu).not.toBeNull();
    expect(nav.contains(mobileMenu)).toBe(true);
  });

  it('closes the mobile menu when Escape is pressed', async () => {
    const user = userEvent.setup();
    render(<Nav />);
    await user.click(screen.getByRole('button', { name: 'Toggle navigation menu' }));
    expect(document.getElementById('mobile-nav')).not.toBeNull();
    await user.keyboard('{Escape}');
    expect(document.getElementById('mobile-nav')).toBeNull();
  });

  it('returns focus to the toggle button when Escape closes the mobile menu', async () => {
    const user = userEvent.setup();
    render(<Nav />);
    const toggle = screen.getByRole('button', { name: 'Toggle navigation menu' });
    await user.click(toggle);
    await user.keyboard('{Escape}');
    expect(toggle).toHaveFocus();
  });

  it("underlines the active route's link and leaves the others plain", () => {
    usePathname.mockReturnValue('/work');
    render(<Nav />);
    expect(screen.getByRole('link', { name: 'Work' }).className).toContain('border-accent');
    expect(screen.getByRole('link', { name: 'Blog' }).className).toContain('border-transparent');
  });
});
