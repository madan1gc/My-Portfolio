import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Section } from './Section';

describe('Section', () => {
  it('renders the eyebrow, title, and children', () => {
    render(
      <Section eyebrow="Skills" title="Some descriptive title.">
        <p>Section body</p>
      </Section>,
    );
    expect(screen.getByRole('heading', { name: 'Skills' })).toBeInTheDocument();
    expect(screen.getByText('Some descriptive title.')).toBeInTheDocument();
    expect(screen.getByText('Section body')).toBeInTheDocument();
  });
});
