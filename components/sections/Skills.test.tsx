import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Skills } from './Skills';

describe('Skills', () => {
  it('renders every skill category heading', () => {
    render(<Skills />);
    expect(screen.getByRole('heading', { name: 'Frontend' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'WordPress' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Tools' })).toBeInTheDocument();
  });

  it('renders individual skills as tags', () => {
    render(<Skills />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Elementor')).toBeInTheDocument();
    expect(screen.getByText('Figma')).toBeInTheDocument();
  });
});
