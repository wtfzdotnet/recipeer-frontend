import React from 'react';
import { Switch as ShadcnSwitch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export interface SwitchProps {
  /** Label for the switch */
  label?: string;
  /** Description text */
  description?: string;
  /** Error message to display */
  error?: string;
  /** Whether the switch is checked */
  checked?: boolean;
  /** Default checked state */
  defaultChecked?: boolean;
  /** Whether the switch is disabled */
  disabled?: boolean;
  /** Whether the field is required */
  required?: boolean;
  /** Callback when checked state changes */
  onCheckedChange?: (checked: boolean) => void;
  /** Custom className for the container */
  className?: string;
  /** ID for the switch */
  id?: string;
  /** Name attribute for form submission */
  name?: string;
  /** Size variant */
  size?: 'sm' | 'default' | 'lg';
}

/**
 * Enhanced Switch component with label, description, and error handling
 * Built for the Frontend Recipeer design system for toggles and preferences
 */
export const Switch: React.FC<SwitchProps> = ({
  label,
  description,
  error,
  checked,
  defaultChecked,
  disabled,
  required,
  onCheckedChange,
  className,
  id,
  name,
  size = 'default',
}) => {
  const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = !!error;

  const sizeClasses = {
    sm: 'h-4 w-7',
    default: 'h-5 w-9',
    lg: 'h-6 w-11'
  };

  return (
    <div className={cn("flex flex-col space-y-2", className)}>
      <div className="flex items-center justify-between space-x-2">
        <div className="flex-1">
          {label && (
            <Label
              htmlFor={switchId}
              className={cn(
                "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                {
                  'text-destructive': hasError,
                }
              )}
            >
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </Label>
          )}
          {description && (
            <p className="text-sm text-muted-foreground mt-1">
              {description}
            </p>
          )}
        </div>
        
        <ShadcnSwitch
          id={switchId}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onCheckedChange={onCheckedChange}
          name={name}
          aria-invalid={hasError}
          aria-describedby={error ? `${switchId}-error` : undefined}
          className={cn(sizeClasses[size], {
            'border-destructive': hasError,
          })}
        />
      </div>
      
      {error && (
        <p id={`${switchId}-error`} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
};

export default Switch;