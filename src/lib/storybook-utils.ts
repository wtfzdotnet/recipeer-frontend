/**
 * Utility to detect if we're running in Storybook environment
 * and provide appropriate z-index values for dialogs
 */

export const isStorybook = (): boolean => {
  if (typeof window === 'undefined') return false;
  return (
    window.parent !== window || // Running in iframe
    window.location.hostname === 'localhost' && window.location.port === '6007' || // Storybook default port
    window.location.search.includes('storybook') ||
    document.querySelector('#storybook-root') !== null ||
    window.navigator.userAgent.includes('Storybook')
  );
};

/**
 * Get appropriate z-index values for dialog components
 * Maximum values are used in Storybook to overcome iframe stacking issues
 */
export const getDialogZIndex = () => {
  if (isStorybook()) {
    return {
      overlay: 'z-[2147483646]',
      content: 'z-[2147483647]',
    };
  }
  
  return {
    overlay: 'z-50',
    content: 'z-[51]',
  };
};

/**
 * Get CSS class names for dialog overlay with environment-appropriate z-index
 */
export const getDialogOverlayClasses = (additionalClasses?: string): string => {
  const { overlay } = getDialogZIndex();
  const baseClasses = `fixed inset-0 ${overlay} bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0`;
  return additionalClasses ? `${baseClasses} ${additionalClasses}` : baseClasses;
};

/**
 * Get CSS class names for dialog content with environment-appropriate z-index
 */
export const getDialogContentClasses = (additionalClasses?: string): string => {
  const { content } = getDialogZIndex();
  const baseClasses = `fixed left-[50%] top-[50%] ${content} grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-card p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg`;
  return additionalClasses ? `${baseClasses} ${additionalClasses}` : baseClasses;
};
