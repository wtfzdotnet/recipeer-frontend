import React, { useState, useCallback, useMemo } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface RatingProps {
  value: number;
  onChange?: (rating: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  precision?: 0.5 | 1;
  reviewCount?: number;
  showReviewCount?: boolean;
  className?: string;
  'aria-label'?: string;
}

const sizeVariants = {
  sm: {
    star: 'h-3 w-3',
    text: 'text-xs',
    gap: 'space-x-0.5'
  },
  md: {
    star: 'h-4 w-4', 
    text: 'text-sm',
    gap: 'space-x-1'
  },
  lg: {
    star: 'h-5 w-5',
    text: 'text-base', 
    gap: 'space-x-1'
  }
};

export const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  ({ 
    value, 
    onChange, 
    readonly = false, 
    size = 'md', 
    precision = 1, 
    reviewCount, 
    showReviewCount = true, 
    className,
    'aria-label': ariaLabel,
    ...props 
  }, ref) => {
    const [hoveredValue, setHoveredValue] = useState<number | null>(null);
    
    const isInteractive = !readonly && onChange;
    const currentValue = hoveredValue ?? value;
    const variant = sizeVariants[size];

    // Generate star data for rendering
    const stars = useMemo(() => {
      return Array.from({ length: 5 }, (_, index) => {
        const starIndex = index + 1;
        const filled = currentValue >= starIndex;
        const halfFilled = precision === 0.5 && currentValue >= starIndex - 0.5 && currentValue < starIndex;
        return {
          index,
          starIndex,
          filled,
          halfFilled
        };
      });
    }, [currentValue, precision]);

    const handleStarClick = useCallback((starIndex: number, isHalf: boolean = false) => {
      if (!isInteractive) return;
      
      const newValue = isHalf && precision === 0.5 ? starIndex + 0.5 : starIndex + 1;
      onChange?.(newValue);
    }, [onChange, isInteractive, precision]);

    const handleStarHover = useCallback((starIndex: number, isHalf: boolean = false) => {
      if (!isInteractive) return;
      
      const newValue = isHalf && precision === 0.5 ? starIndex + 0.5 : starIndex + 1;
      setHoveredValue(newValue);
    }, [isInteractive, precision]);

    const handleMouseLeave = useCallback(() => {
      if (!isInteractive) return;
      setHoveredValue(null);
    }, [isInteractive]);

    const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
      if (!isInteractive) return;

      const { key } = event;
      let newValue = value;

      switch (key) {
        case 'ArrowRight':
        case 'ArrowUp':
          event.preventDefault();
          newValue = Math.min(5, value + precision);
          break;
        case 'ArrowLeft':
        case 'ArrowDown':
          event.preventDefault();
          newValue = Math.max(precision, value - precision);
          break;
        case 'Home':
          event.preventDefault();
          newValue = precision;
          break;
        case 'End':
          event.preventDefault();
          newValue = 5;
          break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
          event.preventDefault();
          newValue = parseInt(key);
          break;
        default:
          return;
      }

      onChange?.(newValue);
    }, [isInteractive, value, precision, onChange]);

    const ariaValueText = useMemo(() => {
      const formattedValue = value % 1 === 0 ? value.toString() : value.toFixed(1);
      return `${formattedValue} out of 5 stars`;
    }, [value]);

    return (
      <div 
        ref={ref}
        className={cn('flex items-center', variant.gap, className)}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <div 
          className={cn(
            'flex items-center',
            isInteractive && 'focus-within:outline-none'
          )}
          role={isInteractive ? 'radiogroup' : 'img'}
          aria-label={ariaLabel || `Rating: ${ariaValueText}`}
          aria-valuemin={isInteractive ? precision : undefined}
          aria-valuemax={isInteractive ? 5 : undefined}
          aria-valuenow={isInteractive ? value : undefined}
          aria-valuetext={isInteractive ? ariaValueText : undefined}
          tabIndex={isInteractive ? 0 : -1}
          onKeyDown={handleKeyDown}
        >
          {stars.map(({ index, filled, halfFilled }) => (
            <div
              key={index}
              className="relative"
            >
              {/* Base star (empty) */}
              <Star
                className={cn(
                  variant.star,
                  'text-gray-300 transition-colors',
                  isInteractive && 'cursor-pointer hover:text-yellow-400'
                )}
                aria-hidden="true"
              />
              
              {/* Filled portion */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  width: filled ? '100%' : halfFilled ? '50%' : '0%'
                }}
              >
                <Star
                  className={cn(
                    variant.star,
                    'fill-yellow-400 text-yellow-400 transition-colors',
                    isInteractive && 'cursor-pointer hover:fill-yellow-500 hover:text-yellow-500'
                  )}
                  aria-hidden="true"
                />
              </div>

              {/* Interactive overlay for half stars */}
              {isInteractive && precision === 0.5 && (
                <>
                  {/* Left half */}
                  <div
                    className="absolute inset-0 w-1/2 cursor-pointer"
                    onClick={() => handleStarClick(index, true)}
                    onMouseEnter={() => handleStarHover(index, true)}
                    role="radio"
                    aria-label={`${index + 0.5} stars`}
                    aria-checked={value === index + 0.5}
                    tabIndex={-1}
                  />
                  {/* Right half */}
                  <div
                    className="absolute inset-0 left-1/2 w-1/2 cursor-pointer"
                    onClick={() => handleStarClick(index, false)}
                    onMouseEnter={() => handleStarHover(index, false)}
                    role="radio"
                    aria-label={`${index + 1} stars`}
                    aria-checked={value === index + 1}
                    tabIndex={-1}
                  />
                </>
              )}

              {/* Interactive overlay for whole stars */}
              {isInteractive && precision === 1 && (
                <div
                  className="absolute inset-0 cursor-pointer"
                  onClick={() => handleStarClick(index, false)}
                  onMouseEnter={() => handleStarHover(index, false)}
                  role="radio"
                  aria-label={`${index + 1} stars`}
                  aria-checked={value === index + 1}
                  tabIndex={-1}
                />
              )}
            </div>
          ))}
        </div>

        {/* Review count display */}
        {showReviewCount && reviewCount !== undefined && (
          <span className={cn('text-muted-foreground', variant.text)}>
            ({reviewCount.toLocaleString()})
          </span>
        )}
      </div>
    );
  }
);

Rating.displayName = 'Rating';

export default Rating;