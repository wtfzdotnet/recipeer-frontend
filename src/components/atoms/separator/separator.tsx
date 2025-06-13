import * as React from 'react';
import { Separator as ShadcnSeparator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

/**
 * Props for Separator component - Atom level
 * 
 * Separator component for visually dividing content with semantic meaning.
 * Built on top of shadcn/ui Separator with consistent API and enhanced accessibility.
 * 
 * @example
 * <Separator />
 * <Separator orientation="vertical" />
 * <Separator className="my-4" />
 */
export interface SeparatorProps {
  /** Separator orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Whether the separator is decorative or semantic */
  decorative?: boolean;
  /** Custom CSS class */
  className?: string;
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ orientation = 'horizontal', decorative = true, className, ...props }, ref) => {
    return (
      <ShadcnSeparator
        ref={ref}
        orientation={orientation}
        decorative={decorative}
        className={cn(className)}
        {...props}
      />
    );
  }
);

Separator.displayName = 'Separator';

export { Separator };