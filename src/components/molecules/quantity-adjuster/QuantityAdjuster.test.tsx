import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { QuantityAdjuster } from './QuantityAdjuster';
import { scaleQuantity } from './quantity-utils';

describe('QuantityAdjuster', () => {
  const defaultProps = {
    originalServings: 4,
    currentServings: 4,
    onServingsChange: vi.fn(),
  };

  it('renders with default props', () => {
    render(<QuantityAdjuster {...defaultProps} />);
    
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('servings')).toBeInTheDocument();
    expect(screen.getByLabelText('Decrease serving size')).toBeInTheDocument();
    expect(screen.getByLabelText('Increase serving size')).toBeInTheDocument();
  });

  it('shows singular text for 1 serving', () => {
    render(<QuantityAdjuster {...defaultProps} currentServings={1} />);
    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('serving')).toBeInTheDocument();
  });

  it('calls onServingsChange when increase button is clicked', () => {
    const onServingsChange = vi.fn();
    render(
      <QuantityAdjuster
        {...defaultProps}
        onServingsChange={onServingsChange}
        currentServings={4}
        maxServings={8}
      />
    );
    
    const increaseButton = screen.getByLabelText('Increase serving size');
    fireEvent.click(increaseButton);
    
    expect(onServingsChange).toHaveBeenCalledWith(5);
  });

  it('calls onServingsChange when decrease button is clicked', () => {
    const onServingsChange = vi.fn();
    render(
      <QuantityAdjuster
        {...defaultProps}
        onServingsChange={onServingsChange}
        currentServings={4}
        minServings={1}
      />
    );
    
    const decreaseButton = screen.getByLabelText('Decrease serving size');
    fireEvent.click(decreaseButton);
    
    expect(onServingsChange).toHaveBeenCalledWith(3);
  });

  it('disables decrease button at minimum', () => {
    render(
      <QuantityAdjuster
        {...defaultProps}
        currentServings={1}
        minServings={1}
      />
    );
    
    const decreaseButton = screen.getByLabelText('Decrease serving size');
    expect(decreaseButton).toBeDisabled();
  });

  it('disables increase button at maximum', () => {
    render(
      <QuantityAdjuster
        {...defaultProps}
        currentServings={8}
        maxServings={8}
      />
    );
    
    const increaseButton = screen.getByLabelText('Increase serving size');
    expect(increaseButton).toBeDisabled();
  });

  it('respects custom step size', () => {
    const onServingsChange = vi.fn();
    render(
      <QuantityAdjuster
        {...defaultProps}
        onServingsChange={onServingsChange}
        currentServings={4}
        step={2}
      />
    );
    
    const increaseButton = screen.getByLabelText('Increase serving size');
    fireEvent.click(increaseButton);
    
    expect(onServingsChange).toHaveBeenCalledWith(6);
  });

  it('shows scaling factor when servings are adjusted', () => {
    render(
      <QuantityAdjuster
        {...defaultProps}
        originalServings={4}
        currentServings={8}
      />
    );
    
    expect(screen.getByText('×2.0')).toBeInTheDocument();
  });

  it('does not show scaling factor when servings match original', () => {
    render(
      <QuantityAdjuster
        {...defaultProps}
        originalServings={4}
        currentServings={4}
      />
    );
    
    expect(screen.queryByText(/×/)).not.toBeInTheDocument();
  });

  it('is fully disabled when disabled prop is true', () => {
    render(
      <QuantityAdjuster
        {...defaultProps}
        disabled={true}
      />
    );
    
    const decreaseButton = screen.getByLabelText('Decrease serving size');
    const increaseButton = screen.getByLabelText('Increase serving size');
    
    expect(decreaseButton).toBeDisabled();
    expect(increaseButton).toBeDisabled();
  });

  it('applies custom className', () => {
    const { container } = render(
      <QuantityAdjuster
        {...defaultProps}
        className="custom-class"
      />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('handles fractional servings', () => {
    render(
      <QuantityAdjuster
        {...defaultProps}
        currentServings={2.5}
      />
    );
    
    expect(screen.getByText('2.5')).toBeInTheDocument();
  });
});

describe('scaleQuantity', () => {
  it('scales quantities proportionally', () => {
    expect(scaleQuantity(2, 4, 8)).toBe(4);
    expect(scaleQuantity(1, 4, 2)).toBe(0.5);
    expect(scaleQuantity(3, 6, 3)).toBe(1.5);
  });

  it('handles small quantities with precision', () => {
    const result = scaleQuantity(0.25, 4, 2);
    expect(result).toBe(0.125);
  });

  it('rounds to practical fractions for small quantities', () => {
    // Test rounding to eighths
    expect(scaleQuantity(0.33, 3, 2)).toBe(0.25); // Rounds to 1/4
    expect(scaleQuantity(0.4, 4, 3)).toBe(0.25); // 0.3 rounds to 1/4
  });

  it('rounds to quarters for medium quantities', () => {
    expect(scaleQuantity(2.1, 4, 4)).toBe(2); // Rounds to nearest quarter
    expect(scaleQuantity(2.3, 4, 4)).toBe(2.25); // Rounds to nearest quarter
  });

  it('rounds to halves for large quantities', () => {
    expect(scaleQuantity(12.2, 4, 4)).toBe(12); // Rounds to nearest half
    expect(scaleQuantity(12.7, 4, 4)).toBe(12.5); // Rounds to nearest half
  });

  it('handles zero quantities', () => {
    expect(scaleQuantity(0, 4, 8)).toBe(0);
  });

  it('handles scaling down', () => {
    expect(scaleQuantity(4, 8, 4)).toBe(2);
    expect(scaleQuantity(1.5, 6, 3)).toBe(0.75);
  });
});