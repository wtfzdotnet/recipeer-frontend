import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  const mockOnPageChange = vi.fn();

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  describe('Rendering', () => {
    it('renders correctly with basic props', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      );

      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getByText('Previous')).toBeInTheDocument();
      expect(screen.getByText('Next')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('renders page info when showInfo is true', () => {
      render(
        <Pagination
          currentPage={2}
          totalPages={10}
          onPageChange={mockOnPageChange}
          showInfo={true}
          totalItems={100}
          pageSize={10}
        />
      );

      expect(screen.getByText('Showing 11-20 of 100 results')).toBeInTheDocument();
    });

    it('renders nothing when totalPages is 1 and showInfo is false', () => {
      const { container } = render(
        <Pagination
          currentPage={1}
          totalPages={1}
          onPageChange={mockOnPageChange}
          showInfo={false}
        />
      );

      expect(container.firstChild).toBeNull();
    });

    it('renders only info when totalPages is 1 and showInfo is true', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={1}
          onPageChange={mockOnPageChange}
          showInfo={true}
          totalItems={5}
          pageSize={10}
        />
      );

      expect(screen.getByText('Showing 1-5 of 5 results')).toBeInTheDocument();
      expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
    });
  });

  describe('Page Navigation', () => {
    it('calls onPageChange when page number is clicked', async () => {
      const user = userEvent.setup();
      render(
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      );

      const pageButton = screen.getByRole('button', { name: 'Go to page 3' });
      await user.click(pageButton);

      expect(mockOnPageChange).toHaveBeenCalledWith(3);
    });

    it('calls onPageChange when Previous button is clicked', async () => {
      const user = userEvent.setup();
      render(
        <Pagination
          currentPage={3}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      );

      const prevButton = screen.getByRole('button', { name: 'Go to previous page' });
      await user.click(prevButton);

      expect(mockOnPageChange).toHaveBeenCalledWith(2);
    });

    it('calls onPageChange when Next button is clicked', async () => {
      const user = userEvent.setup();
      render(
        <Pagination
          currentPage={3}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      );

      const nextButton = screen.getByRole('button', { name: 'Go to next page' });
      await user.click(nextButton);

      expect(mockOnPageChange).toHaveBeenCalledWith(4);
    });

    it('does not call onPageChange when current page is clicked', async () => {
      const user = userEvent.setup();
      render(
        <Pagination
          currentPage={3}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      );

      const currentPageButton = screen.getByRole('button', { name: 'Go to page 3' });
      await user.click(currentPageButton);

      expect(mockOnPageChange).not.toHaveBeenCalled();
    });
  });

  describe('Button States', () => {
    it('disables Previous button on first page', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      );

      const prevButton = screen.getByRole('button', { name: 'Go to previous page' });
      expect(prevButton).toBeDisabled();
    });

    it('disables Next button on last page', () => {
      render(
        <Pagination
          currentPage={5}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      );

      const nextButton = screen.getByRole('button', { name: 'Go to next page' });
      expect(nextButton).toBeDisabled();
    });

    it('disables all buttons when disabled prop is true', () => {
      render(
        <Pagination
          currentPage={3}
          totalPages={5}
          onPageChange={mockOnPageChange}
          disabled={true}
        />
      );

      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toBeDisabled();
      });
    });
  });

  describe('Ellipsis Handling', () => {
    it('shows ellipsis for large page ranges', () => {
      render(
        <Pagination
          currentPage={10}
          totalPages={20}
          onPageChange={mockOnPageChange}
          siblingCount={1}
        />
      );

      // Should show ellipsis (MoreHorizontal icons) before and after current page range
      const ellipsisElements = document.querySelectorAll('[aria-hidden="true"]');
      const ellipsisSpans = Array.from(ellipsisElements).filter(el => 
        el.tagName === 'SPAN' && el.className.includes('flex items-center justify-center')
      );
      expect(ellipsisSpans.length).toBeGreaterThan(0);
    });

    it('shows correct page numbers with siblingCount', () => {
      render(
        <Pagination
          currentPage={10}
          totalPages={20}
          onPageChange={mockOnPageChange}
          siblingCount={2}
        />
      );

      // Should show pages around current page based on siblingCount
      expect(screen.getByRole('button', { name: 'Go to page 8' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Go to page 9' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Go to page 10' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Go to page 11' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Go to page 12' })).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels', () => {
      render(
        <Pagination
          currentPage={3}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      );

      expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Pagination navigation');
      expect(screen.getByRole('button', { name: 'Go to previous page' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Go to next page' })).toBeInTheDocument();
    });

    it('supports custom aria-label', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={mockOnPageChange}
          aria-label="Recipe results pagination"
        />
      );

      expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Recipe results pagination');
    });

    it('marks current page with aria-current', () => {
      render(
        <Pagination
          currentPage={3}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      );

      const currentPageButton = screen.getByRole('button', { name: 'Go to page 3' });
      expect(currentPageButton).toHaveAttribute('aria-current', 'page');
    });

    it('marks ellipsis as aria-hidden', () => {
      render(
        <Pagination
          currentPage={10}
          totalPages={20}
          onPageChange={mockOnPageChange}
        />
      );

      // Check that ellipsis elements have aria-hidden="true"
      const ellipsisElements = document.querySelectorAll('[aria-hidden="true"]');
      const ellipsisSpans = Array.from(ellipsisElements).filter(el => 
        el.tagName === 'SPAN' && el.className.includes('flex items-center justify-center')
      );
      expect(ellipsisSpans.length).toBeGreaterThan(0);
    });
  });

  describe('Custom Styling', () => {
    it('applies custom className', () => {
      const { container } = render(
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={mockOnPageChange}
          className="custom-pagination"
        />
      );

      expect(container.firstChild).toHaveClass('custom-pagination');
    });
  });

  describe('Page Info Calculations', () => {
    it('calculates correct page info for first page', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={10}
          onPageChange={mockOnPageChange}
          showInfo={true}
          totalItems={95}
          pageSize={10}
        />
      );

      expect(screen.getByText('Showing 1-10 of 95 results')).toBeInTheDocument();
    });

    it('calculates correct page info for last page', () => {
      render(
        <Pagination
          currentPage={10}
          totalPages={10}
          onPageChange={mockOnPageChange}
          showInfo={true}
          totalItems={95}
          pageSize={10}
        />
      );

      expect(screen.getByText('Showing 91-95 of 95 results')).toBeInTheDocument();
    });

    it('calculates correct page info for middle page', () => {
      render(
        <Pagination
          currentPage={5}
          totalPages={10}
          onPageChange={mockOnPageChange}
          showInfo={true}
          totalItems={100}
          pageSize={10}
        />
      );

      expect(screen.getByText('Showing 41-50 of 100 results')).toBeInTheDocument();
    });
  });
});