const designTokensPlugin = {
  rules: {
    'no-hardcoded-colors': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Enforce use of design token colors instead of hardcoded values',
          category: 'Best Practices',
          recommended: true,
        },
        fixable: null,
        schema: [],
      },
      create(context) {
        const hardcodedColorPattern = /(bg-|text-|border-)(red|blue|green|yellow|purple|pink|indigo|gray|slate|zinc|neutral|stone|orange|amber|lime|emerald|teal|cyan|sky|violet|fuchsia|rose)-\d+/;
        const hexColorPattern = /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/;
        const rgbColorPattern = /rgba?\([^)]+\)/;

        return {
          Literal(node) {
            if (typeof node.value === 'string') {
              const value = node.value;
              
              // Check for hardcoded Tailwind color classes
              if (hardcodedColorPattern.test(value)) {
                context.report({
                  node,
                  message: 'Use design token colors (primary, secondary, accent, etc.) instead of hardcoded Tailwind color classes',
                });
              }
              
              // Check for hex colors
              if (hexColorPattern.test(value)) {
                context.report({
                  node,
                  message: 'Use design token colors instead of hex color codes',
                });
              }
              
              // Check for RGB colors
              if (rgbColorPattern.test(value)) {
                context.report({
                  node,
                  message: 'Use design token colors instead of RGB color values',
                });
              }
            }
          },
          Property(node) {
            if (node.key && node.key.name && ['backgroundColor', 'color', 'borderColor'].includes(node.key.name)) {
              if (node.value.type === 'Literal' && typeof node.value.value === 'string') {
                const value = node.value.value;
                if (hexColorPattern.test(value) || rgbColorPattern.test(value)) {
                  context.report({
                    node: node.value,
                    message: 'Use design token colors instead of hardcoded color values in style objects',
                  });
                }
              }
            }
          },
        };
      },
    },
    'no-hardcoded-spacing': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Enforce use of design token spacing instead of hardcoded values',
          category: 'Best Practices',
          recommended: true,
        },
        fixable: null,
        schema: [],
      },
      create(context) {
        // Pattern specifically for spacing-related arbitrary values (padding, margin, gap)
        const arbitrarySpacingPattern = /(^|\s)(p|m|gap|space)-(\w*-?)?\[([^\]]+)\]/;
        const hardcodedSpacingPattern = /(p-|m-|gap-|space-)(x|y|t|r|b|l)-\[([^\]]+)\]/;

        return {
          Literal(node) {
            if (typeof node.value === 'string') {
              const value = node.value;
              
              // Check for arbitrary spacing values in square brackets
              if (arbitrarySpacingPattern.test(value)) {
                context.report({
                  node,
                  message: 'Use design token spacing (p-1, p-2, p-4, etc.) instead of arbitrary spacing values',
                });
              }
              
              // Check for hardcoded spacing in Tailwind classes
              if (hardcodedSpacingPattern.test(value)) {
                context.report({
                  node,
                  message: 'Use standard spacing scale instead of arbitrary spacing values',
                });
              }
            }
          },
        };
      },
    },
  },
};

export default designTokensPlugin;