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
});
