import React from 'react';
import { Separator as SeparatorPrimitive } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

export interface SeparatorProps {
  /** The orientation of the separator */
  orientation?: 'horizontal' | 'vertical';
  /** Whether the separator is purely decorative */
  decorative?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Semantic variant for different contexts */
  variant?: 'default' | 'subtle' | 'strong';
}

/**
 * Separator component for visual content separation
 * Used for creating clear sections in recipe layouts and content organization
 */
export const Separator: React.FC<SeparatorProps> = ({
  orientation = 'horizontal',
  decorative = true,
  className,
  variant = 'default',
  ...props
}) => {
  const variantStyles = {
    default: 'bg-border',
    subtle: 'bg-border/50',
    strong: 'bg-border bg-opacity-75',
  };

  return (
    <SeparatorPrimitive
      orientation={orientation}
      decorative={decorative}
      className={cn(
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
};

export default Separator;