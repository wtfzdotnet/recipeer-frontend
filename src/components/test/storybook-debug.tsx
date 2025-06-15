import React from 'react';
import { isStorybook, getDialogZIndex } from '@/lib/storybook-utils';

/**
 * Debug component to verify environment detection and z-index values
 */
export const StorybookDebug: React.FC = () => {
  const isInStorybook = isStorybook();
  const zIndexValues = getDialogZIndex();
  
  React.useEffect(() => {
    console.log('🔍 Environment Detection Debug:');
    console.log('- Is Storybook:', isInStorybook);
    console.log('- Window parent !== window:', typeof window !== 'undefined' && window.parent !== window);
    console.log('- Has storybook-root:', typeof document !== 'undefined' && document.querySelector('#storybook-root') !== null);
    console.log('- Z-Index values:', zIndexValues);
  }, [isInStorybook, zIndexValues]);
  
  return (
    <div className="p-4 border rounded bg-card">
      <h3 className="font-semibold mb-2">Environment Debug</h3>
      <div className="space-y-1 text-sm">
        <p><strong>Environment:</strong> {isInStorybook ? 'Storybook' : 'Main App'}</p>
        <p><strong>Overlay Z-Index:</strong> {zIndexValues.overlay}</p>
        <p><strong>Content Z-Index:</strong> {zIndexValues.content}</p>
        <p><strong>URL:</strong> {typeof window !== 'undefined' ? window.location.href : 'N/A'}</p>
      </div>
    </div>
  );
};
