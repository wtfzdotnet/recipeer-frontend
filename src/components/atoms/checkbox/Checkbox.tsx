import React from 'react';
import { Checkbox as ShadcnCheckbox } from '@/components/ui/checkbox';
import { Label } from '@/components/atoms/label';
import { cn } from '@/lib/utils';

export interface CheckboxProps {
  /** Label for the checkbox */
  label?: string;
  /** Error message to display */
  error?: string;
  /** Helper text to display below the checkbox */
  helperText?: string;
  /** Whether the checkbox is checked */
  checked?: boolean;
  /** Default checked state */
  defaultChecked?: boolean;
  /** Whether the checkbox is disabled */
  disabled?: boolean;
  /** Whether the field is required */
  required?: boolean;
  /** Callback when checked state changes */
  onCheckedChange?: (checked: boolean) => void;
  /** Custom className for the container */
  className?: string;
  /** ID for the checkbox */
  id?: string;
  /** Name attribute for form submission */
  name?: string;
  /** Value attribute for form submission */
  value?: string;
}

/**
 * Enhanced Checkbox component with label, error handling, and accessibility
 * Built for the Frontend Recipeer design system for dietary filters and preferences
 */
export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  error,
  helperText,
  checked,
  defaultChecked,
  disabled,
  required,
  onCheckedChange,
  className,
  id,
  name,
  value,
}) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = !!error;

  return (
    <div className={cn("flex flex-col space-y-2", className)}>
      <div className="flex items-center space-x-2">
        <ShadcnCheckbox
          id={checkboxId}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onCheckedChange={onCheckedChange}
          name={name}
          value={value}
          aria-invalid={hasError}
          aria-describedby={
            error ? `${checkboxId}-error` : helperText ? `${checkboxId}-helper` : undefined
          }
          className={cn({
            'border-destructive': hasError,
          })}
        />
        {label && (
          <Label
            htmlFor={checkboxId}
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
      </div>
      
      {error && (
        <p id={`${checkboxId}-error`} className="text-sm text-destructive">
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p id={`${checkboxId}-helper`} className="text-sm text-muted-foreground">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Checkbox;