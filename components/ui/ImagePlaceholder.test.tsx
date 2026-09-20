import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ImagePlaceholder } from './ImagePlaceholder';

describe('ImagePlaceholder', () => {
  it('renders the label and a coming-soon note', () => {
    render(<ImagePlaceholder label="MGCora Unused Media Finder" />);
    expect(screen.getByText('MGCora Unused Media Finder')).toBeInTheDocument();
    expect(screen.getByText('Screenshot coming soon')).toBeInTheDocument();
  });
});
