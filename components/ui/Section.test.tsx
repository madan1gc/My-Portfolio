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

  it('renders the title as an h2 when as="h1" (closes the heading-order gap on route pages)', () => {
    render(
      <Section eyebrow="Work" title="Case studies." as="h1">
        <p>Body</p>
      </Section>,
    );
    expect(screen.getByRole('heading', { name: 'Case studies.', level: 2 })).toBeInTheDocument();
  });

  it('keeps the title as plain text, not a heading, for the default as="h2" case', () => {
    render(
      <Section eyebrow="Skills" title="Some descriptive title.">
        <p>Body</p>
      </Section>,
    );
    expect(screen.queryByRole('heading', { name: 'Some descriptive title.' })).toBeNull();
  });

  it('renders the eyebrow with a solid square accent marker, not a pill', () => {
    render(
      <Section eyebrow="Skills" title="Some descriptive title.">
        <p>Body</p>
      </Section>,
    );
    const eyebrow = screen.getByRole('heading', { name: 'Skills' });
    expect(eyebrow.className).not.toContain('rounded-full');
    const marker = eyebrow.querySelector('[aria-hidden="true"]');
    expect(marker).not.toBeNull();
    expect(marker?.className).toContain('bg-accent-strong');
  });

  it('applies an optional titleClassName to the title for one-off typographic treatments', () => {
    render(
      <Section eyebrow="Blog" title="Notes on frontend development." titleClassName="font-serif italic">
        <p>Body</p>
      </Section>,
    );
    expect(screen.getByText('Notes on frontend development.').className).toContain('font-serif italic');
  });
});
