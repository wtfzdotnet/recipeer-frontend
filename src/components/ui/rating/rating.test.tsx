import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Rating } from './rating';

describe('Rating', () => {
  describe('Display Mode (readonly)', () => {
    it('renders the correct number of filled stars', () => {
      render(<Rating value={3.5} readonly />);
      
      const container = screen.getByRole('img');
      expect(container).toHaveAttribute('aria-label', 'Rating: 3.5 out of 5 stars');
    });

    it('displays review count when provided', () => {
      render(<Rating value={4.2} readonly reviewCount={127} />);
      
      expect(screen.getByText('(127)')).toBeInTheDocument();
    });

    it('hides review count when showReviewCount is false', () => {
      render(<Rating value={4.2} readonly reviewCount={127} showReviewCount={false} />);
      
      expect(screen.queryByText('(127)')).not.toBeInTheDocument();
    });

    it('handles zero rating', () => {
      render(<Rating value={0} readonly />);
      
      const container = screen.getByRole('img');
      expect(container).toHaveAttribute('aria-label', 'Rating: 0 out of 5 stars');
    });

    it('handles maximum rating', () => {
      render(<Rating value={5} readonly />);
      
      const container = screen.getByRole('img');
      expect(container).toHaveAttribute('aria-label', 'Rating: 5 out of 5 stars');
    });

    it('formats large review counts', () => {
      render(<Rating value={4.5} readonly reviewCount={12543} />);
      
      expect(screen.getByText('(12,543)')).toBeInTheDocument();
    });
  });

  describe('Interactive Mode', () => {
    it('calls onChange when a star is clicked', async () => {
      const user = userEvent.setup();
      const mockOnChange = vi.fn();
      
      render(<Rating value={2} onChange={mockOnChange} />);
      
      const radios = screen.getAllByRole('radio');
      
      await user.click(radios[3]); // Click 4th star
      
      expect(mockOnChange).toHaveBeenCalledWith(4);
    });

    it('supports half-star precision', async () => {
      const user = userEvent.setup();
      const mockOnChange = vi.fn();
      
      render(<Rating value={2} onChange={mockOnChange} precision={0.5} />);
      
      const radios = screen.getAllByRole('radio');
      
      // Click left half of 3rd star (should be 2.5)
      await user.click(radios[4]); // Index 4 should be left half of star 3
      
      expect(mockOnChange).toHaveBeenCalledWith(2.5);
    });

    it('has proper ARIA attributes for interactive mode', () => {
      render(<Rating value={3} onChange={vi.fn()} />);
      
      const radioGroup = screen.getByRole('radiogroup');
      expect(radioGroup).toHaveAttribute('aria-valuemin', '1');
      expect(radioGroup).toHaveAttribute('aria-valuemax', '5');
      expect(radioGroup).toHaveAttribute('aria-valuenow', '3');
      expect(radioGroup).toHaveAttribute('aria-valuetext', '3 out of 5 stars');
    });

    it('supports keyboard navigation with arrow keys', async () => {
      const user = userEvent.setup();
      const mockOnChange = vi.fn();
      
      render(<Rating value={3} onChange={mockOnChange} />);
      
      const radioGroup = screen.getByRole('radiogroup');
      await user.click(radioGroup);
      
      await user.keyboard('{ArrowRight}');
      expect(mockOnChange).toHaveBeenCalledWith(4);
      
      // Reset mock to check next call in isolation
      mockOnChange.mockClear();
      
      await user.keyboard('{ArrowLeft}');
      expect(mockOnChange).toHaveBeenCalledWith(2);
    });

    it('supports keyboard navigation with number keys', async () => {
      const user = userEvent.setup();
      const mockOnChange = vi.fn();
      
      render(<Rating value={3} onChange={mockOnChange} />);
      
      const radioGroup = screen.getByRole('radiogroup');
      await user.click(radioGroup);
      
      await user.keyboard('5');
      expect(mockOnChange).toHaveBeenCalledWith(5);
      
      await user.keyboard('1');
      expect(mockOnChange).toHaveBeenCalledWith(1);
    });

    it('supports Home and End keys', async () => {
      const user = userEvent.setup();
      const mockOnChange = vi.fn();
      
      render(<Rating value={3} onChange={mockOnChange} precision={0.5} />);
      
      const radioGroup = screen.getByRole('radiogroup');
      await user.click(radioGroup);
      
      await user.keyboard('{Home}');
      expect(mockOnChange).toHaveBeenCalledWith(0.5);
      
      await user.keyboard('{End}');
      expect(mockOnChange).toHaveBeenCalledWith(5);
    });

    it('does not call onChange when readonly', async () => {
      const mockOnChange = vi.fn();
      
      render(<Rating value={3} onChange={mockOnChange} readonly />);
      
      // In readonly mode, no radio buttons should be present
      expect(screen.queryByRole('radiogroup')).not.toBeInTheDocument();
      expect(screen.queryByRole('radio')).not.toBeInTheDocument();
      expect(mockOnChange).not.toHaveBeenCalled();
    });
  });

  describe('Size Variants', () => {
    it('applies correct classes for small size', () => {
      render(<Rating value={3} readonly size="sm" />);
      
      // Check if the component renders without throwing
      const container = screen.getByRole('img');
      expect(container).toBeInTheDocument();
    });

    it('applies correct classes for medium size', () => {
      render(<Rating value={3} readonly size="md" />);
      
      const container = screen.getByRole('img');
      expect(container).toBeInTheDocument();
    });

    it('applies correct classes for large size', () => {
      render(<Rating value={3} readonly size="lg" />);
      
      const container = screen.getByRole('img');
      expect(container).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper aria-label', () => {
      render(<Rating value={4.5} readonly aria-label="Recipe rating" />);
      
      const container = screen.getByRole('img');
      expect(container).toHaveAttribute('aria-label', 'Recipe rating');
    });

    it('generates proper aria-valuetext for fractional values', () => {
      render(<Rating value={3.7} onChange={vi.fn()} />);
      
      const radioGroup = screen.getByRole('radiogroup');
      expect(radioGroup).toHaveAttribute('aria-valuetext', '3.7 out of 5 stars');
    });

    it('has tabindex for interactive mode', () => {
      render(<Rating value={3} onChange={vi.fn()} />);
      
      const radioGroup = screen.getByRole('radiogroup');
      expect(radioGroup).toHaveAttribute('tabindex', '0');
    });

    it('does not have tabindex for readonly mode', () => {
      render(<Rating value={3} readonly />);
      
      const container = screen.getByRole('img');
      expect(container).toHaveAttribute('tabindex', '-1');
    });
  });

  describe('Precision', () => {
    it('handles whole number precision', () => {
      const mockOnChange = vi.fn();
      render(<Rating value={3} onChange={mockOnChange} precision={1} />);
      
      // Component should render with whole star precision
      const radioGroup = screen.getByRole('radiogroup');
      expect(radioGroup).toBeInTheDocument();
    });

    it('handles half-star precision', () => {
      const mockOnChange = vi.fn();
      render(<Rating value={3.5} onChange={mockOnChange} precision={0.5} />);
      
      // Component should render with half-star precision
      const radioGroup = screen.getByRole('radiogroup');
      expect(radioGroup).toBeInTheDocument();
      
      // Should have twice as many interactive areas (left and right halves)
      const radios = screen.getAllByRole('radio');
      expect(radios.length).toBe(10); // 5 stars × 2 halves each
    });
  });

  describe('Custom Props', () => {
    it('accepts custom className', () => {
      render(<Rating value={3} readonly className="custom-class" />);
      
      const container = screen.getByRole('img').parentElement;
      expect(container).toHaveClass('custom-class');
    });

    it('forwards other props', () => {
      render(<Rating value={3} readonly data-testid="rating" />);
      
      expect(screen.getByTestId('rating')).toBeInTheDocument();
    });
  });
});