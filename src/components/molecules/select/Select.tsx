import React from 'react';
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectOptionGroup {
  label: string;
  options: SelectOption[];
}

export interface SelectProps {
  /** Label for the select field */
  label?: string;
  /** Error message to display */
  error?: string;
  /** Helper text to display below the select */
  helperText?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Current value */
  value?: string;
  /** Default value */
  defaultValue?: string;
  /** Options for the select */
  options?: SelectOption[];
  /** Grouped options for the select */
  groups?: SelectOptionGroup[];
  /** Callback when value changes */
  onValueChange?: (value: string) => void;
  /** Custom className */
  className?: string;
  /** ID for the select */
  id?: string;
}

/**
 * Enhanced Select component with label, error handling, and grouped options support
 * Built for the Frontend Recipeer design system with recipe-specific features
 */
export const Select: React.FC<SelectProps> = ({
  label,
  error,
  helperText,
  required,
  placeholder,
  disabled,
  value,
  defaultValue,
  options = [],
  groups = [],
  onValueChange,
  className,
  id,
}) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = !!error;

  const renderOptions = () => {
    if (groups.length > 0) {
      return groups.map((group, groupIndex) => (
        <SelectGroup key={groupIndex}>
          <SelectLabel>{group.label}</SelectLabel>
          {group.options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      ));
    }

    return options.map((option) => (
      <SelectItem
        key={option.value}
        value={option.value}
        disabled={option.disabled}
      >
        {option.label}
      </SelectItem>
    ));
  };

  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={selectId} 
          className="block text-sm font-medium mb-2"
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      
      <ShadcnSelect
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <SelectTrigger
          id={selectId}
          className={cn(
            {
              'border-destructive focus-visible:ring-destructive': hasError,
            },
            className
          )}
          aria-invalid={hasError}
          aria-describedby={
            error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined
          }
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {renderOptions()}
        </SelectContent>
      </ShadcnSelect>
      
      {error && (
        <p id={`${selectId}-error`} className="text-sm text-destructive mt-1">
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p id={`${selectId}-helper`} className="text-sm text-muted-foreground mt-1">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Select;