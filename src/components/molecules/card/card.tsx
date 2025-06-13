import * as React from 'react';
import { 
  Card as ShadcnCard, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

/**
 * Props for Card component - Molecule level
 * 
 * Card component for containing related content with semantic structure.
 * Built on top of shadcn/ui Card with consistent API and enhanced accessibility.
 * 
 * @example
 * <Card title="Recipe Card" description="Delicious pasta">
 *   <p>Card content here</p>
 * </Card>
 */
export interface CardProps {
  /** Card title */
  title?: string;
  /** Card description */
  description?: string;
  /** Main card content */
  children?: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
  /** Whether card is interactive/clickable */
  interactive?: boolean;
  /** Custom CSS class */
  className?: string;
  /** Click handler for interactive cards */
  onClick?: () => void;
  /** Accessibility label */
  'aria-label'?: string;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    title, 
    description, 
    children, 
    footer, 
    interactive = false, 
    className, 
    onClick,
    ...props 
  }, ref) => {
    return (
      <ShadcnCard
        ref={ref}
        className={cn(
          interactive && 'cursor-pointer hover:shadow-md transition-shadow',
          className
        )}
        onClick={onClick}
        {...props}
      >
        {(title || description) && (
          <CardHeader>
            {title && <CardTitle>{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
        )}
        
        {children && (
          <CardContent>
            {children}
          </CardContent>
        )}
        
        {footer && (
          <CardFooter>
            {footer}
          </CardFooter>
        )}
      </ShadcnCard>
    );
  }
);

Card.displayName = 'Card';

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };