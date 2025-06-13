import React from 'react';
import { Button as ShadcnButton } from '@/components/ui/button/button';
import { cn } from '@/lib/utils';
import { VariantProps } from 'class-variance-authority';
import { buttonVariants } from '@/components/ui/button/button';

interface ButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Button contents */
  children: React.ReactNode;
  /** Loading state - shows spinner and disables button */
  loading?: boolean;
  /** Icon to display on the left */
  leftIcon?: React.ReactNode;
  /** Icon to display on the right */
  rightIcon?: React.ReactNode;
  /** Render as child component */
  asChild?: boolean;
}

/**
 * Custom Button component wrapping shadcn/ui Button with extended functionality
 * Built for the Frontend Recipeer design system
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'default',
  size = 'default',
  loading = false,
  leftIcon,
  rightIcon,
  className,
  disabled,
  ...props
}) => {
  const isDisabled = disabled || loading;

  return (
    <ShadcnButton
      variant={variant}
      size={size}
      disabled={isDisabled}
      className={cn(
        // Custom styles for loading and icons
        {
          'cursor-not-allowed opacity-50': loading,
          'gap-2': leftIcon || rightIcon,
        },
        className
      )}
      {...props}
    >
      {loading && (
        <div className="animate-spin size-4 border-2 border-current border-t-transparent rounded-full" />
      )}
      {leftIcon && !loading && leftIcon}
      {children}
      {rightIcon && !loading && rightIcon}
    </ShadcnButton>
  );
};

export default Button;