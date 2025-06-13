import React from 'react';
import { Textarea as ShadcnTextarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Label for the textarea field */
  label?: string;
  /** Error message to display */
  error?: string;
  /** Helper text to display below the textarea */
  helperText?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Character count display */
  showCharacterCount?: boolean;
  /** Maximum character limit */
  maxLength?: number;
  /** Minimum number of rows */
  minRows?: number;
  /** Whether the textarea should auto-resize */
  autoResize?: boolean;
}

/**
 * Enhanced Textarea component with label, error handling, and character counting
 * Built for the Frontend Recipeer design system for recipe reviews and cooking notes
 */
export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  required,
  showCharacterCount = false,
  maxLength,
  minRows = 3,
  autoResize = false,
  className,
  id,
  value,
  onChange,
  ...props
}) => {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = !!error;
  const characterCount = typeof value === 'string' ? value.length : 0;

  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={textareaId} 
          className="block text-sm font-medium mb-2"
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      
      <ShadcnTextarea
        id={textareaId}
        className={cn(
          {
            'border-destructive focus-visible:ring-destructive': hasError,
            'resize-none': autoResize,
          },
          className
        )}
        style={{
          minHeight: autoResize ? `${minRows * 1.5}rem` : undefined,
        }}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        aria-invalid={hasError}
        aria-describedby={
          error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined
        }
        {...props}
      />
      
      <div className="flex justify-between items-start mt-1">
        <div className="flex-1">
          {error && (
            <p id={`${textareaId}-error`} className="text-sm text-destructive">
              {error}
            </p>
          )}
          
          {helperText && !error && (
            <p id={`${textareaId}-helper`} className="text-sm text-muted-foreground">
              {helperText}
            </p>
          )}
        </div>
        
        {showCharacterCount && (
          <div className="text-xs text-muted-foreground ml-2">
            {maxLength ? (
              <span className={cn(
                characterCount > maxLength * 0.9 && 'text-warning',
                characterCount >= maxLength && 'text-destructive'
              )}>
                {characterCount}/{maxLength}
              </span>
            ) : (
              <span>{characterCount}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Textarea;