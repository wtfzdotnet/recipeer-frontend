

import path from 'path';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest"
  ],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  },
  async viteFinal(config) {
    // Basic alias setup
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(dirname, "../src"),
    };

    // Critical CI optimizations for faster builds
    if (process.env.CI) {
      // Disable source maps completely
      config.build = config.build || {};
      config.build.sourcemap = false;
      
      // Aggressive chunk splitting to reduce bundle size
      config.build.rollupOptions = config.build.rollupOptions || {};
      config.build.rollupOptions.output = {
        ...config.build.rollupOptions.output,
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react'],
          ui: [
            '@radix-ui/react-accordion', '@radix-ui/react-alert-dialog',
            '@radix-ui/react-avatar', '@radix-ui/react-checkbox',
            '@radix-ui/react-dialog', '@radix-ui/react-hover-card',
            '@radix-ui/react-label', '@radix-ui/react-navigation-menu',
            '@radix-ui/react-popover', '@radix-ui/react-progress',
            '@radix-ui/react-radio-group', '@radix-ui/react-select',
            '@radix-ui/react-separator', '@radix-ui/react-slider',
            '@radix-ui/react-switch', '@radix-ui/react-tabs',
            '@radix-ui/react-toast', '@radix-ui/react-tooltip'
          ]
        }
      };

      // Use faster minifier for CI speed vs size trade-off
      config.build.minify = 'esbuild'; // Much faster than terser
      config.build.chunkSizeWarningLimit = 1000;
      config.build.assetsInlineLimit = 0; // Don't inline assets for better caching
      
      // Optimize dependencies
      config.optimizeDeps = config.optimizeDeps || {};
      config.optimizeDeps.include = ['react', 'react-dom', 'lucide-react'];
      
      // Drop console logs in production builds
      config.esbuild = config.esbuild || {};
      config.esbuild.drop = ['console', 'debugger'];
    }
    
    return config;
  }
};
export default config;