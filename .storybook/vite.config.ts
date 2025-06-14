import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  const isCI = process.env.CI === 'true';
  
  return {
    // Aggressive optimizations for CI builds
    build: {
      minify: isCI ? 'terser' : 'esbuild',
      sourcemap: false,
      rollupOptions: {
        output: {
          // More aggressive chunking in CI
          manualChunks: isCI ? {
            vendor: ['react', 'react-dom'],
            lucide: ['lucide-react'],
            ui: [
              '@radix-ui/react-accordion',
              '@radix-ui/react-alert-dialog',
              '@radix-ui/react-avatar',
              '@radix-ui/react-checkbox',
              '@radix-ui/react-dialog',
              '@radix-ui/react-hover-card',
              '@radix-ui/react-label',
              '@radix-ui/react-navigation-menu',
              '@radix-ui/react-popover',
              '@radix-ui/react-progress',
              '@radix-ui/react-radio-group',
              '@radix-ui/react-select',
              '@radix-ui/react-separator',
              '@radix-ui/react-slider',
              '@radix-ui/react-switch',
              '@radix-ui/react-tabs',
              '@radix-ui/react-toast',
              '@radix-ui/react-tooltip'
            ]
          } : undefined
        }
      },
      // Increase warning threshold for CI
      chunkSizeWarningLimit: isCI ? 1000 : 500,
      // Disable asset inlining in CI for better caching
      assetsInlineLimit: isCI ? 0 : 4096
    },
    
    // Optimize dependencies
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'lucide-react'
      ],
      // Exclude heavy dependencies in CI
      exclude: isCI ? [
        '@storybook/addon-docs',
        '@storybook/addon-a11y'
      ] : []
    },

    // Performance optimizations
    esbuild: {
      // Drop console logs in CI production builds
      drop: isCI ? ['console', 'debugger'] : [],
    }
  };
});
