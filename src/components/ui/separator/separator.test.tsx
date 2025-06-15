import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Separator } from './separator';

describe('Separator', () => {
  it('renders a horizontal separator by default', () => {
    const { container } = render(<Separator />);
    const separator = container.firstChild as HTMLElement;
    
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveAttribute('data-orientation', 'horizontal');
  });

  it('renders a vertical separator when specified', () => {
    const { container } = render(<Separator orientation="vertical" />);
    const separator = container.firstChild as HTMLElement;
    
    expect(separator).toHaveAttribute('data-orientation', 'vertical');
  });

  it('applies custom className', () => {
    const { container } = render(<Separator className="custom-class" />);
    const separator = container.firstChild as HTMLElement;
    
    expect(separator).toHaveClass('custom-class');
  });

  it('has proper default styling', () => {
    const { container } = render(<Separator />);
    const separator = container.firstChild as HTMLElement;
    
    expect(separator).toHaveClass('shrink-0', 'bg-border');
  });

  it('applies horizontal styles by default', () => {
    const { container } = render(<Separator />);
    const separator = container.firstChild as HTMLElement;
    
    expect(separator).toHaveClass('h-px', 'w-full');
  });

  it('applies vertical styles when orientation is vertical', () => {
    const { container } = render(<Separator orientation="vertical" />);
    const separator = container.firstChild as HTMLElement;
    
    expect(separator).toHaveClass('h-full', 'w-px');
  });
});