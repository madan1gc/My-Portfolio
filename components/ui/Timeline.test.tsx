import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Timeline, type TimelineItem } from './Timeline';

const items: TimelineItem[] = [
  {
    title: 'Frontend Developer',
    subtitle: 'Codewing Solutions · Kathmandu, Nepal',
    period: 'May 2022 — Present',
    description: ['Built things', 'Shipped things'],
  },
  {
    title: 'Frontend Intern',
    subtitle: 'Ekbana Solution · Kathmandu, Nepal',
    period: 'Jan 2022 — Apr 2022',
    description: ['Learned things'],
  },
];

describe('Timeline', () => {
  it('renders a heading, subtitle, and period for every item', () => {
    render(<Timeline items={items} />);
    expect(screen.getByRole('heading', { name: 'Frontend Developer' })).toBeInTheDocument();
    expect(screen.getByText('Codewing Solutions · Kathmandu, Nepal')).toBeInTheDocument();
    expect(screen.getByText('May 2022 — Present')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Frontend Intern' })).toBeInTheDocument();
  });

  it('renders every description line for every item', () => {
    render(<Timeline items={items} />);
    expect(screen.getByText('Built things')).toBeInTheDocument();
    expect(screen.getByText('Shipped things')).toBeInTheDocument();
    expect(screen.getByText('Learned things')).toBeInTheDocument();
  });
});
