import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Experience } from './Experience';

describe('Experience', () => {
  it('renders both experience entries with company and period', () => {
    render(<Experience />);
    expect(screen.getByRole('heading', { name: 'Frontend Developer' })).toBeInTheDocument();
    expect(screen.getByText('Codewing Solutions · Kathmandu, Nepal')).toBeInTheDocument();
    expect(screen.getByText('May 2022 — Present')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Frontend Intern' })).toBeInTheDocument();
    expect(screen.getByText('Ekbana Solution · Kathmandu, Nepal')).toBeInTheDocument();
  });
});
