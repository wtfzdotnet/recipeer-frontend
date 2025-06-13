import * as React from 'react';
import { Alert as ShadcnAlert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';

/**
 * Props for Alert component - Molecule level
 * 
 * Alert component for important messages and notifications.
 * Built on top of shadcn/ui Alert with semantic variants and icons.
 * 
 * @example
 * <Alert variant="success" title="Success!" description="Recipe saved successfully." />
 * <Alert variant="destructive" title="Error" description="Failed to save recipe." />
 */
export interface AlertProps {
  /** Alert variant */
  variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info';
  /** Alert title */
  title?: string;
  /** Alert description */
  description?: string;
  /** Alert content */
  children?: React.ReactNode;
  /** Whether to show icon */
  showIcon?: boolean;
  /** Custom CSS class */
  className?: string;
}

const variantIcons = {
  default: Info,
  destructive: XCircle,
  success: CheckCircle,
  warning: AlertTriangle,
  info: Info,
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = 'default', title, description, children, showIcon = true, className, ...props }, ref) => {
    const Icon = variantIcons[variant];

    return (
      <ShadcnAlert
        ref={ref}
        variant={variant === 'success' || variant === 'warning' || variant === 'info' ? 'default' : variant}
        className={cn(
          variant === 'success' && 'border-green-500 text-green-700 dark:text-green-400',
          variant === 'warning' && 'border-orange-500 text-orange-700 dark:text-orange-400',
          variant === 'info' && 'border-blue-500 text-blue-700 dark:text-blue-400',
          className
        )}
        {...props}
      >
        {showIcon && Icon && <Icon className="h-4 w-4" />}
        {title && <AlertTitle>{title}</AlertTitle>}
        {description && <AlertDescription>{description}</AlertDescription>}
        {children}
      </ShadcnAlert>
    );
  }
);

Alert.displayName = 'Alert';

export { Alert, AlertDescription, AlertTitle };