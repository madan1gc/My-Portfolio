import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Tag } from './Tag';

afterEach(() => {
  cleanup();
});

describe('Tag', () => {
  it('renders its label text', () => {
    render(<Tag>React</Tag>);
    expect(screen.getByText('React')).toBeInTheDocument();
  });
});
