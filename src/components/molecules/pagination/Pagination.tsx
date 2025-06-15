import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PaginationProps {
  /** Current page number (1-based) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Number of page buttons to show around current page */
  siblingCount?: number;
  /** Whether pagination is disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Show page size and total information */
  showInfo?: boolean;
  /** Total number of items */
  totalItems?: number;
  /** Current page size */
  pageSize?: number;
  /** ARIA label for the pagination navigation */
  'aria-label'?: string;
}

/**
 * Pagination component for navigating through large datasets
 * Optimized for recipe search results and community content
 */
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  disabled = false,
  className,
  showInfo = false,
  totalItems,
  pageSize,
  'aria-label': ariaLabel = 'Pagination navigation',
}) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    
    // Always show first page
    pages.push(1);
    
    // Calculate range around current page
    const leftSibling = Math.max(currentPage - siblingCount, 2);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages - 1);
    
    // Show ellipsis before left sibling if needed
    if (leftSibling > 2) {
      pages.push('ellipsis');
    }
    
    // Add pages around current page
    for (let page = leftSibling; page <= rightSibling; page++) {
      pages.push(page);
    }
    
    // Show ellipsis after right sibling if needed
    if (rightSibling < totalPages - 1) {
      pages.push('ellipsis');
    }
    
    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;
  const pageNumbers = getPageNumbers();

  const handlePageClick = (page: number) => {
    if (page !== currentPage && !disabled) {
      onPageChange(page);
    }
  };

  const handlePrevious = () => {
    if (canGoPrevious && !disabled) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext && !disabled) {
      onPageChange(currentPage + 1);
    }
  };

  // Calculate info for current page
  const getPageInfo = () => {
    if (!showInfo || !totalItems || !pageSize) return null;
    
    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalItems);
    
    return `Showing ${startItem}-${endItem} of ${totalItems} results`;
  };

  if (totalPages <= 1) {
    return showInfo ? (
      <div className="text-sm text-muted-foreground">
        {getPageInfo()}
      </div>
    ) : null;
  }

  return (
    <div className={cn('flex flex-col space-y-4', className)}>
      {showInfo && (
        <div className="text-sm text-muted-foreground">
          {getPageInfo()}
        </div>
      )}
      
      <nav
        role="navigation"
        aria-label={ariaLabel}
        className="flex items-center justify-center space-x-2"
      >
        {/* Previous button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevious}
          disabled={disabled || !canGoPrevious}
          aria-label="Go to previous page"
          className="gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        {/* Page numbers */}
        <div className="flex items-center space-x-1">
          {pageNumbers.map((page, index) => (
            page === 'ellipsis' ? (
              <span
                key={`ellipsis-${index}`}
                className="flex items-center justify-center w-9 h-9"
                aria-hidden="true"
              >
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </span>
            ) : (
              <Button
                key={page}
                variant={page === currentPage ? 'default' : 'outline'}
                size="sm"
                onClick={() => handlePageClick(page)}
                disabled={disabled}
                aria-label={`Go to page ${page}`}
                aria-current={page === currentPage ? 'page' : undefined}
                className="w-9 h-9 p-0"
              >
                {page}
              </Button>
            )
          ))}
        </div>

        {/* Next button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleNext}
          disabled={disabled || !canGoNext}
          aria-label="Go to next page"
          className="gap-2"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </nav>
    </div>
  );
};

export default Pagination;