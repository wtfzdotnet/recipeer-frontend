import React from 'react';
import { Toggle as ShadcnToggle } from '@/components/ui/toggle';
import { cn } from '@/lib/utils';

export interface ToggleProps {
  /** Whether the toggle is pressed */
  pressed?: boolean;
  /** Default pressed state */
  defaultPressed?: boolean;
  /** Callback when pressed state changes */
  onPressedChange?: (pressed: boolean) => void;
  /** Whether the toggle is disabled */
  disabled?: boolean;
  /** Custom CSS class */
  className?: string;
  /** Size variant */
  size?: 'sm' | 'default' | 'lg';
  /** Visual variant */
  variant?: 'default' | 'outline';
  /** Accessible label for the toggle */
  'aria-label'?: string;
  /** ID for the toggle */
  id?: string;
  /** Children content (icon or text) */
  children?: React.ReactNode;
  /** Label text to display alongside toggle */
  label?: string;
  /** Helper text to display below toggle */
  helperText?: string;
  /** Whether to show the label */
  showLabel?: boolean;
  /** Position of the label relative to toggle */
  labelPosition?: 'left' | 'right' | 'top' | 'bottom';
}

/**
 * Toggle component for accessibility preferences and cultural features
 * Built for WCAG AA+ compliance with comprehensive keyboard and screen reader support
 */
export const Toggle: React.FC<ToggleProps> = ({
  pressed,
  defaultPressed,
  onPressedChange,
  disabled = false,
  className,
  size = 'default',
  variant = 'default',
  'aria-label': ariaLabel,
  id,
  children,
  label,
  helperText,
  showLabel = true,
  labelPosition = 'right',
  ...props
}) => {
  const toggleId = id || `toggle-${Math.random().toString(36).substr(2, 9)}`;

  // Determine layout classes based on label position
  const getLayoutClasses = () => {
    if (!label || !showLabel) return '';
    
    switch (labelPosition) {
      case 'left':
        return 'flex-row-reverse items-center gap-3';
      case 'right':
        return 'flex-row items-center gap-3';
      case 'top':
        return 'flex-col items-center gap-2';
      case 'bottom':
        return 'flex-col-reverse items-center gap-2';
      default:
        return 'flex-row items-center gap-3';
    }
  };

  const content = (
    <ShadcnToggle
      id={toggleId}
      pressed={pressed}
      defaultPressed={defaultPressed}
      onPressedChange={onPressedChange}
      disabled={disabled}
      size={size}
      variant={variant}
      className={cn(className)}
      aria-label={ariaLabel || (label ? undefined : 'Toggle button')}
      aria-describedby={helperText ? `${toggleId}-helper` : undefined}
      {...props}
    >
      {children}
    </ShadcnToggle>
  );

  if (!label || !showLabel) {
    return (
      <div className="space-y-1">
        {content}
        {helperText && (
          <p 
            id={`${toggleId}-helper`} 
            className="text-xs text-muted-foreground"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <div className={cn('inline-flex', getLayoutClasses())}>
        {content}
        <label 
          htmlFor={toggleId}
          className="text-sm font-medium cursor-pointer select-none"
        >
          {label}
        </label>
      </div>
      {helperText && (
        <p 
          id={`${toggleId}-helper`} 
          className="text-xs text-muted-foreground"
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Toggle;