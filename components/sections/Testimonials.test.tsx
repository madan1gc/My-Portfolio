import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Testimonials } from './Testimonials';

describe('Testimonials', () => {
  it('renders a quote, name, and role for every testimonial', () => {
    render(<Testimonials />);
    expect(screen.getByText('Client Name')).toBeInTheDocument();
    expect(screen.getByText('Founder, Client Company')).toBeInTheDocument();
    expect(screen.getByText('Teammate Name')).toBeInTheDocument();
    expect(screen.getByText('Community Member')).toBeInTheDocument();
  });

  it('renders the first testimonial as a large lead quote and the rest in a supporting row', () => {
    const { container } = render(<Testimonials />);
    const lead = container.querySelector('blockquote');
    expect(lead?.textContent).toContain(
      'Add a real client quote describing the outcome of working with Madan.',
    );
    expect(lead?.className).toContain('italic');

    const supportingItems = container.querySelectorAll('.grid > *');
    expect(supportingItems).toHaveLength(2);
  });
});
