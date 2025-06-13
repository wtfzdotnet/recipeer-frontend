import * as React from 'react';
import { Badge as ShadcnBadge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { type VariantProps } from 'class-variance-authority';

/**
 * Props for Badge component - Atom level
 * 
 * Badge component for displaying status, categories, or labels with semantic meaning.
 * Built on top of shadcn/ui Badge with consistent API and enhanced accessibility.
 * 
 * @example
 * <Badge variant="default">New</Badge>
 * <Badge variant="secondary">Draft</Badge>
 * <Badge variant="destructive">Error</Badge>
 */
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ShadcnBadge> {
  /** Badge content */
  children: React.ReactNode;
  /** Custom CSS class */
  className?: string;
  /** Accessibility label */
  'aria-label'?: string;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <ShadcnBadge
        ref={ref}
        variant={variant}
        className={cn(className)}
        {...props}
      >
        {children}
      </ShadcnBadge>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };