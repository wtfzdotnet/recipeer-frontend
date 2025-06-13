import React from 'react';
import { RadioGroup as ShadcnRadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
  helperText?: string;
}

export interface RadioGroupProps {
  /** Label for the radio group */
  label?: string;
  /** Error message to display */
  error?: string;
  /** Helper text to display below the radio group */
  helperText?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Current value */
  value?: string;
  /** Default value */
  defaultValue?: string;
  /** Whether the radio group is disabled */
  disabled?: boolean;
  /** Options for the radio group */
  options: RadioOption[];
  /** Callback when value changes */
  onValueChange?: (value: string) => void;
  /** Custom className */
  className?: string;
  /** ID for the radio group */
  id?: string;
  /** Name attribute for form submission */
  name?: string;
  /** Layout orientation */
  orientation?: 'vertical' | 'horizontal';
}

/**
 * Enhanced RadioGroup component with label, error handling, and flexible layouts
 * Built for the Frontend Recipeer design system for meal types and difficulty levels
 */
export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  error,
  helperText,
  required,
  value,
  defaultValue,
  disabled,
  options,
  onValueChange,
  className,
  id,
  name,
  orientation = 'vertical',
}) => {
  const radioGroupId = id || `radio-group-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = !!error;

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label 
          className="block text-sm font-medium mb-3"
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      
      <ShadcnRadioGroup
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={disabled}
        name={name}
        className={cn(
          orientation === 'horizontal' ? 'flex flex-wrap gap-6' : 'grid gap-3',
          {
            'opacity-50': disabled,
          }
        )}
        aria-invalid={hasError}
        aria-describedby={
          error ? `${radioGroupId}-error` : helperText ? `${radioGroupId}-helper` : undefined
        }
      >
        {options.map((option) => {
          const optionId = `${radioGroupId}-${option.value}`;
          return (
            <div 
              key={option.value} 
              className={cn(
                "flex items-start space-x-2",
                orientation === 'horizontal' && "flex-col space-x-0 space-y-2"
              )}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.value}
                  id={optionId}
                  disabled={option.disabled || disabled}
                  className={cn({
                    'border-destructive': hasError,
                  })}
                />
                <Label
                  htmlFor={optionId}
                  className={cn(
                    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                    {
                      'text-destructive': hasError,
                    }
                  )}
                >
                  {option.label}
                </Label>
              </div>
              {option.helperText && (
                <p className="text-xs text-muted-foreground ml-6">
                  {option.helperText}
                </p>
              )}
            </div>
          );
        })}
      </ShadcnRadioGroup>
      
      {error && (
        <p id={`${radioGroupId}-error`} className="text-sm text-destructive mt-2">
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p id={`${radioGroupId}-helper`} className="text-sm text-muted-foreground mt-2">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default RadioGroup;