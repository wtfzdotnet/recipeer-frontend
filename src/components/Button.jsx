import React from 'react';
import PropTypes from 'prop-types';
import { Button as ShadcnButton } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * Custom Button component wrapping shadcn/ui Button with extended functionality
 * Built for the Frontend Recipeer design system
 */
export const Button = ({
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

Button.propTypes = {
  /** Button contents */
  children: PropTypes.node.isRequired,
  /** Button variant style */
  variant: PropTypes.oneOf([
    'default',
    'destructive', 
    'outline',
    'secondary',
    'ghost',
    'link'
  ]),
  /** Button size */
  size: PropTypes.oneOf(['default', 'sm', 'lg', 'icon']),
  /** Loading state - shows spinner and disables button */
  loading: PropTypes.bool,
  /** Icon to display on the left */
  leftIcon: PropTypes.node,
  /** Icon to display on the right */
  rightIcon: PropTypes.node,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Disabled state */
  disabled: PropTypes.bool,
  /** Click handler */
  onClick: PropTypes.func,
};

export default Button;