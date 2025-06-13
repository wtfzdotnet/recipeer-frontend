import * as React from 'react';
import { 
  Dialog as ShadcnDialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/atoms/button';
import { cn } from '@/lib/utils';

/**
 * Props for Dialog component - Organism level
 * 
 * Dialog component for modal interactions with complete functionality.
 * Built on top of shadcn/ui Dialog with business logic and consistent API.
 * 
 * @example
 * <Dialog 
 *   trigger={<Button>Open Dialog</Button>}
 *   title="Confirm Action"
 *   description="Are you sure you want to continue?"
 *   onConfirm={() => console.log('Confirmed')}
 * />
 */
export interface DialogProps {
  /** Trigger element that opens the dialog */
  trigger?: React.ReactNode;
  /** Dialog title */
  title?: string;
  /** Dialog description */
  description?: string;
  /** Main dialog content */
  children?: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
  /** Confirmation button text */
  confirmText?: string;
  /** Cancel button text */
  cancelText?: string;
  /** Confirmation handler */
  onConfirm?: () => void;
  /** Cancel handler */
  onCancel?: () => void;
  /** Whether dialog is open (controlled) */
  open?: boolean;
  /** Open state change handler */
  onOpenChange?: (open: boolean) => void;
  /** Whether to show default footer buttons */
  showFooter?: boolean;
  /** Custom CSS class */
  className?: string;
}

const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  ({ 
    trigger,
    title,
    description,
    children,
    footer,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    onConfirm,
    onCancel,
    open,
    onOpenChange,
    showFooter = true,
    className,
    ...props 
  }, ref) => {
    const handleConfirm = () => {
      onConfirm?.();
      onOpenChange?.(false);
    };

    const handleCancel = () => {
      onCancel?.();
      onOpenChange?.(false);
    };

    return (
      <ShadcnDialog open={open} onOpenChange={onOpenChange}>
        {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
        <DialogContent ref={ref} className={cn(className)} {...props}>
          {(title || description) && (
            <DialogHeader>
              {title && <DialogTitle>{title}</DialogTitle>}
              {description && <DialogDescription>{description}</DialogDescription>}
            </DialogHeader>
          )}
          
          {children}
          
          {(footer || (showFooter && (onConfirm || onCancel))) && (
            <DialogFooter>
              {footer || (
                <div className="flex justify-end space-x-2">
                  {onCancel && (
                    <Button variant="outline" onClick={handleCancel}>
                      {cancelText}
                    </Button>
                  )}
                  {onConfirm && (
                    <Button onClick={handleConfirm}>
                      {confirmText}
                    </Button>
                  )}
                </div>
              )}
            </DialogFooter>
          )}
        </DialogContent>
      </ShadcnDialog>
    );
  }
);

Dialog.displayName = 'Dialog';

export { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger };