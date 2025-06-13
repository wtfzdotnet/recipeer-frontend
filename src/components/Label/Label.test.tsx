import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Label } from './Label';

describe('Label Component', () => {
  it('renders with text content', () => {
    render(<Label>Test Label</Label>);
    
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('shows required indicator when required', () => {
    render(<Label required>Required Label</Label>);
    
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('applies error styling when hasError is true', () => {
    render(<Label hasError>Error Label</Label>);
    
    const label = screen.getByText('Error Label');
    expect(label).toHaveClass('text-destructive');
  });

  it('applies different size classes', () => {
    const { rerender } = render(<Label size="sm">Small Label</Label>);
    expect(screen.getByText('Small Label')).toHaveClass('text-xs');

    rerender(<Label size="default">Default Label</Label>);
    expect(screen.getByText('Default Label')).toHaveClass('text-sm');

    rerender(<Label size="lg">Large Label</Label>);
    expect(screen.getByText('Large Label')).toHaveClass('text-base');
  });

  it('can be associated with form elements', () => {
    render(
      <div>
        <Label htmlFor="test-input">Test Label</Label>
        <input id="test-input" type="text" />
      </div>
    );
    
    const label = screen.getByText('Test Label');
    const input = screen.getByRole('textbox');
    
    expect(label).toHaveAttribute('for', 'test-input');
    expect(input).toHaveAttribute('id', 'test-input');
  });
});