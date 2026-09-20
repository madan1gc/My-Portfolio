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

  it('renders the eyebrow as an <h1> when as="h1" is passed', () => {
    render(
      <Section eyebrow="Work" title="Case studies." as="h1">
        <p>Body</p>
      </Section>,
    );
    expect(screen.getByRole('heading', { name: 'Work', level: 1 })).toBeInTheDocument();
  });

  it('defaults to an <h2> eyebrow when as is omitted', () => {
    render(
      <Section eyebrow="Skills" title="Some descriptive title.">
        <p>Body</p>
      </Section>,
    );
    expect(screen.getByRole('heading', { name: 'Skills', level: 2 })).toBeInTheDocument();
  });
});
