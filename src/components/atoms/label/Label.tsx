import React from 'react';
import { Label as ShadcnLabel } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Whether the field is required */
  required?: boolean;
  /** Whether the field has an error */
  hasError?: boolean;
  /** Size variant */
  size?: 'sm' | 'default' | 'lg';
}

/**
 * Enhanced Label component with required indicators and error states
 * Built for the Frontend Recipeer design system for form accessibility
 */
export const Label: React.FC<LabelProps> = ({
  children,
  required,
  hasError,
  size = 'default',
  className,
  ...props
}) => {
  const sizeClasses = {
    sm: 'text-xs',
    default: 'text-sm',
    lg: 'text-base'
  };

  return (
    <ShadcnLabel
      className={cn(
        sizeClasses[size],
        {
          'text-destructive': hasError,
        },
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="text-destructive ml-1">*</span>}
    </ShadcnLabel>
  );
};

export default Label;