import * as React from 'react';
import { Avatar as ShadcnAvatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

/**
 * Props for Avatar component - Atom level
 * 
 * Avatar component for displaying user profile images with fallback text.
 * Built on top of shadcn/ui Avatar with consistent API and enhanced accessibility.
 * 
 * @example
 * <Avatar src="/user.jpg" alt="John Doe" fallback="JD" />
 * <Avatar fallback="AB" size="lg" />
 */
export interface AvatarProps {
  /** Image source URL */
  src?: string;
  /** Alt text for the image */
  alt?: string;
  /** Fallback text when image fails to load */
  fallback?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Custom CSS class */
  className?: string;
  /** Accessibility label */
  'aria-label'?: string;
}

const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ src, alt, fallback, size = 'md', className, ...props }, ref) => {
    const sizeClasses = {
      sm: 'h-8 w-8 text-xs',
      md: 'h-10 w-10 text-sm',
      lg: 'h-12 w-12 text-base',
    };

    return (
      <ShadcnAvatar
        ref={ref}
        className={cn(sizeClasses[size], className)}
        {...props}
      >
        {src && <AvatarImage src={src} alt={alt || 'Avatar'} />}
        <AvatarFallback className="bg-muted font-medium">
          {fallback || alt?.slice(0, 2)?.toUpperCase() || '??'}
        </AvatarFallback>
      </ShadcnAvatar>
    );
  }
);

Avatar.displayName = 'Avatar';

export { Avatar };