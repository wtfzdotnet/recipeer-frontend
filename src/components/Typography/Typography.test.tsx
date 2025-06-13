import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Typography } from './Typography';

describe('Typography', () => {
  it('renders with default props', () => {
    render(<Typography />);
    
    // Should render the recipe title
    expect(screen.getByText('Grandma\'s Apple Cinnamon Bread')).toBeInTheDocument();
  });

  it('renders style guide when showExample is false', () => {
    render(<Typography showExample={false} />);
    
    // Should render the typography guide sections
    expect(screen.getByText('Heading Hierarchy')).toBeInTheDocument();
    expect(screen.getByText('Body Text Styles')).toBeInTheDocument();
    expect(screen.getByText('Accent & Special Styles')).toBeInTheDocument();
  });

  it('applies correct font classes for classic-cozy combination', () => {
    const { container } = render(<Typography combination="classic-cozy" showExample={false} />);
    
    // Should contain elements with playfair font class
    const headings = container.querySelectorAll('.font-playfair');
    expect(headings.length).toBeGreaterThan(0);
  });

  it('applies correct font classes for modern-warmth combination', () => {
    const { container } = render(<Typography combination="modern-warmth" showExample={false} />);
    
    // Should contain elements with poppins font class
    const headings = container.querySelectorAll('.font-poppins');
    expect(headings.length).toBeGreaterThan(0);
  });

  it('applies correct font classes for rustic-charm combination', () => {
    const { container } = render(<Typography combination="rustic-charm" showExample={false} />);
    
    // Should contain elements with crimson font class
    const headings = container.querySelectorAll('.font-crimson');
    expect(headings.length).toBeGreaterThan(0);
  });

  it('renders all font combination information', () => {
    render(<Typography combination="classic-cozy" showExample={false} />);
    
    expect(screen.getByText('Classic & Cozy')).toBeInTheDocument();
    expect(screen.getByText(/Elegant serif headings with clean, readable body text/)).toBeInTheDocument();
  });

  it('displays recipe content when showExample is true', () => {
    render(<Typography showExample={true} />);
    
    // Should show recipe elements
    expect(screen.getByText('Ingredients')).toBeInTheDocument();
    expect(screen.getByText('Instructions')).toBeInTheDocument();
    expect(screen.getByText('Chef\'s Notes')).toBeInTheDocument();
  });
});