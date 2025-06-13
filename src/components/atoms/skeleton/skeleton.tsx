import * as React from 'react';
import { Skeleton as ShadcnSkeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

/**
 * Props for Skeleton component - Atom level
 * 
 * Skeleton component for loading placeholders with consistent styling.
 * Built on top of shadcn/ui Skeleton with preset sizes and enhanced accessibility.
 * 
 * @example
 * <Skeleton className="h-4 w-32" />
 * <Skeleton variant="text" />
 * <Skeleton variant="avatar" />
 */
export interface SkeletonProps {
  /** Preset skeleton variant */
  variant?: 'text' | 'avatar' | 'button' | 'card';
  /** Custom CSS class */
  className?: string;
  /** Accessibility label */
  'aria-label'?: string;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ variant, className, ...props }, ref) => {
    const variantClasses = {
      text: 'h-4 w-full',
      avatar: 'h-10 w-10 rounded-full',
      button: 'h-9 w-24 rounded-md',
      card: 'h-48 w-full rounded-lg',
    };

    const classes = variant ? variantClasses[variant] : '';

    return (
      <ShadcnSkeleton
        ref={ref}
        className={cn(classes, className)}
        aria-label="Loading content"
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

export { Skeleton };