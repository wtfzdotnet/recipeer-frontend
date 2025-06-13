import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Props for RecipePageLayout template
 * 
 * Page-level layout template for recipe-related pages.
 * Defines structure using organisms, molecules, and atoms.
 * 
 * @example
 * <RecipePageLayout
 *   header={<RecipeHeader />}
 *   sidebar={<IngredientList />}
 *   main={<RecipeInstructions />}
 *   footer={<RecipeFooter />}
 * />
 */
export interface RecipePageLayoutProps {
  /** Header content (navigation, title) */
  header?: React.ReactNode;
  /** Main content area */
  main?: React.ReactNode;
  /** Sidebar content (ingredients, nutrition) */
  sidebar?: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
  /** Whether to show sidebar */
  showSidebar?: boolean;
  /** Layout variant */
  variant?: 'default' | 'centered' | 'full-width';
  /** Custom CSS class */
  className?: string;
  /** Children content (alternative to main prop) */
  children?: React.ReactNode;
}

const RecipePageLayout = React.forwardRef<HTMLDivElement, RecipePageLayoutProps>(
  ({ 
    header,
    main,
    sidebar,
    footer,
    showSidebar = true,
    variant = 'default',
    className,
    children,
    ...props 
  }, ref) => {
    const content = main || children;
    
    return (
      <div 
        ref={ref}
        className={cn(
          'min-h-screen flex flex-col',
          className
        )}
        {...props}
      >
        {/* Header */}
        {header && (
          <header className="flex-shrink-0 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            {header}
          </header>
        )}
        
        {/* Main Content Area */}
        <div className="flex-1 flex">
          <main 
            className={cn(
              'flex-1',
              variant === 'centered' && 'max-w-4xl mx-auto px-4 py-8',
              variant === 'full-width' && 'w-full px-4 py-8',
              variant === 'default' && showSidebar && 'px-4 py-8 lg:pr-0',
              variant === 'default' && !showSidebar && 'px-4 py-8'
            )}
          >
            {content}
          </main>
          
          {/* Sidebar */}
          {showSidebar && sidebar && (
            <aside className={cn(
              'hidden lg:block flex-shrink-0 w-80 border-l bg-muted/30 p-6',
              variant === 'full-width' && 'lg:w-96'
            )}>
              {sidebar}
            </aside>
          )}
        </div>
        
        {/* Footer */}
        {footer && (
          <footer className="flex-shrink-0 border-t bg-background">
            {footer}
          </footer>
        )}
      </div>
    );
  }
);

RecipePageLayout.displayName = 'RecipePageLayout';

export { RecipePageLayout };