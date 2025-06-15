import React from 'react';
import { InputOTP as ShadcnInputOTP } from '@/components/ui/input-otp';
import { cn } from '@/lib/utils';

export interface InputOTPProps {
  /** Number of OTP digits */
  length?: number;
  /** Current value of the OTP */
  value?: string;
  /** Callback when OTP value changes */
  onChange?: (value: string) => void;
  /** Callback when OTP is complete */
  onComplete?: (value: string) => void;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Custom CSS class */
  className?: string;
  /** Whether to auto-focus the first input */
  autoFocus?: boolean;
  /** Placeholder character for empty slots */
  placeholder?: string;
  /** Label for the OTP input group */
  label?: string;
  /** Helper text to display below the input */
  helperText?: string;
  /** Error message to display */
  error?: string;
  /** Whether the field is required */
  required?: boolean;
  /** ID for the input group */
  id?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** ARIA description for screen readers */
  'aria-describedby'?: string;
}

/**
 * Input OTP component for secure account verification and authentication
 * Built for accessibility and cultural considerations
 */
export const InputOTP: React.FC<InputOTPProps> = ({
  length = 6,
  value = "",
  onChange,
  onComplete,
  disabled = false,
  className,
  autoFocus = false,
  placeholder = "•",
  label,
  helperText,
  error,
  required = false,
  id,
  size = 'md',
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  ...props
}) => {
  const inputId = id || `input-otp-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = !!error;
  
  // Size variants
  const sizeClasses = {
    sm: 'gap-1',
    md: 'gap-2',
    lg: 'gap-3'
  };

  // Calculate ARIA describedby
  const describedByIds = [
    ariaDescribedBy,
    helperText && !error ? `${inputId}-helper` : undefined,
    error ? `${inputId}-error` : undefined,
    `${inputId}-description`
  ].filter(Boolean).join(' ');

  return (
    <div className="w-full space-y-2">
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-foreground"
        >
          {label}
          {required && <span className="text-destructive ml-1" aria-label="required">*</span>}
        </label>
      )}
      
      {/* Screen reader description */}
      <div 
        id={`${inputId}-description`}
        className="sr-only"
      >
        Enter {length} digit verification code. Use arrow keys to navigate between digits, or paste the complete code.
      </div>
      
      <ShadcnInputOTP
        length={length}
        value={value}
        onChange={onChange}
        onComplete={onComplete}
        disabled={disabled}
        autoFocus={autoFocus}
        placeholder={placeholder}
        className={cn(
          sizeClasses[size],
          hasError && "ring-2 ring-destructive ring-offset-2",
          className
        )}
        aria-label={ariaLabel || (label ? undefined : `${length} digit verification code`)}
        aria-describedby={describedByIds || undefined}
        aria-invalid={hasError}
        {...props}
      />
      
      {helperText && !error && (
        <p 
          id={`${inputId}-helper`} 
          className="text-sm text-muted-foreground"
        >
          {helperText}
        </p>
      )}
      
      {error && (
        <p 
          id={`${inputId}-error`} 
          className="text-sm text-destructive"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default InputOTP;