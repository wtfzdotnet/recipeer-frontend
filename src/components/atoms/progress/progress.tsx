import * as React from 'react';
import { Progress as ShadcnProgress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

/**
 * Props for Progress component - Atom level
 * 
 * Progress component for showing completion status.
 * Built on top of shadcn/ui Progress with consistent API.
 * 
 * @example
 * <Progress value={60} />
 * <Progress value={80} className="w-full" />
 */
export interface ProgressProps {
  /** Progress value (0-100) */
  value?: number;
  /** Maximum value */
  max?: number;
  /** Custom CSS class */
  className?: string;
  /** Accessibility label */
  'aria-label'?: string;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ value, max = 100, className, ...props }, ref) => {
    return (
      <ShadcnProgress
        ref={ref}
        value={value}
        max={max}
        className={cn('w-full', className)}
        {...props}
      />
    );
  }
);

Progress.displayName = 'Progress';

export { Progress };