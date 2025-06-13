import React, { useState } from 'react';
import { Slider as ShadcnSlider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

export interface SliderProps {
  /** Label for the slider */
  label?: string;
  /** Error message to display */
  error?: string;
  /** Helper text to display below the slider */
  helperText?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Current value(s) */
  value?: number[];
  /** Default value(s) */
  defaultValue?: number[];
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Whether the slider is disabled */
  disabled?: boolean;
  /** Callback when value changes */
  onValueChange?: (value: number[]) => void;
  /** Custom className */
  className?: string;
  /** ID for the slider */
  id?: string;
  /** Name attribute for form submission */
  name?: string;
  /** Show current value(s) */
  showValue?: boolean;
  /** Custom value formatter */
  formatValue?: (value: number) => string;
  /** Value prefix (e.g., "$", "x") */
  valuePrefix?: string;
  /** Value suffix (e.g., "min", "servings") */
  valueSuffix?: string;
  /** Range mode (multiple thumbs) */
  range?: boolean;
}

/**
 * Enhanced Slider component with label, error handling, and value formatting
 * Built for the Frontend Recipeer design system for serving sizes and time ranges
 */
export const Slider: React.FC<SliderProps> = ({
  label,
  error,
  helperText,
  required,
  value,
  defaultValue = [50],
  min = 0,
  max = 100,
  step = 1,
  disabled,
  onValueChange,
  className,
  id,
  name,
  showValue = true,
  formatValue,
  valuePrefix = '',
  valueSuffix = '',
  range = false,
}) => {
  const sliderId = id || `slider-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = !!error;
  
  const [internalValue, setInternalValue] = useState<number[]>(value || defaultValue);
  const currentValue = value || internalValue;

  const handleValueChange = (newValue: number[]) => {
    setInternalValue(newValue);
    onValueChange?.(newValue);
  };

  const formatDisplayValue = (val: number): string => {
    if (formatValue) {
      return formatValue(val);
    }
    return `${valuePrefix}${val}${valueSuffix}`;
  };

  const renderValue = () => {
    if (!showValue) return null;
    
    if (range && currentValue.length === 2) {
      return (
        <span className="text-sm font-medium">
          {formatDisplayValue(currentValue[0])} - {formatDisplayValue(currentValue[1])}
        </span>
      );
    }
    
    return (
      <span className="text-sm font-medium">
        {formatDisplayValue(currentValue[0])}
      </span>
    );
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between items-center mb-3">
        {label && (
          <label 
            htmlFor={sliderId} 
            className={cn(
              "text-sm font-medium",
              {
                'text-destructive': hasError,
              }
            )}
          >
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}
        {renderValue()}
      </div>
      
      <ShadcnSlider
        id={sliderId}
        value={currentValue}
        onValueChange={handleValueChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        name={name}
        aria-invalid={hasError}
        aria-describedby={
          error ? `${sliderId}-error` : helperText ? `${sliderId}-helper` : undefined
        }
        className={cn({
          'opacity-50': disabled,
        })}
      />
      
      <div className="flex justify-between items-start mt-2">
        <div className="flex text-xs text-muted-foreground space-x-4">
          <span>{formatDisplayValue(min)}</span>
          <span>{formatDisplayValue(max)}</span>
        </div>
      </div>
      
      {error && (
        <p id={`${sliderId}-error`} className="text-sm text-destructive mt-1">
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p id={`${sliderId}-helper`} className="text-sm text-muted-foreground mt-1">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Slider;