<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Frontend Recipeer - Copilot Instructions

This is a modern React application built with:
- **Framework**: React 19.1.0 with Vite 6.3.5
- **Styling**: Tailwind CSS 4.1.10 + shadcn/ui 0.0.4
- **Testing**: Vitest 3.2.3 + Playwright 1.53.0
- **Documentation**: Storybook 9.0.8
- **Linting**: ESLint 9.25.0

## Development Guidelines

- Use `cn()` utility from `src/lib/utils.js` for conditional className merging
- Follow strict Component-Driven Development (CDD) principles with co-located stories
- Create Storybook stories for all new components, co-located with the component
- Separate design tokens from component usage examples - tokens go in `src/foundation/tokens/`
- Write tests using Vitest + Playwright for browser testing
- ALWAYS run `npm run lint` before committing changes
- Use shadcn/ui components when possible, extend with custom styling as needed
- Organize UI components in proper subdirectories with clean exports via `index.ts`

## Project Structure

```
src/
├── components/                    # Reusable UI components
│   ├── ui/                       # shadcn/ui components (organized in subdirectories)
│   │   ├── alert/                # alert.tsx, Alert.stories.tsx, index.ts
│   │   ├── button/               # button.tsx, index.ts
│   │   ├── card/                 # card.tsx, Card.stories.tsx, index.ts
│   │   └── input/                # input.tsx, index.ts
│   ├── Button/                   # Custom components with stories co-located
│   ├── Input/                    # Component.tsx, Component.stories.tsx
│   ├── RecipeCard/              
│   └── Typography/              
├── foundation/                   # Design system foundations
│   └── tokens/                   # Pure design tokens (NO component usage examples)
│       ├── Colors.stories.tsx    # Color palette documentation
│       ├── Spacing.stories.tsx   # Spacing scale tokens
│       └── Typography.stories.tsx # Font families, scales, weights
├── lib/
│   └── utils.js                  # Utility functions (cn() for className merging)
├── stories/                      # General Storybook configuration stories
│   ├── Configure.mdx            # Storybook setup documentation
│   └── Welcome.stories.tsx       # Welcome page
└── App.tsx                       # Main application component
```

## Storybook guidelines 
- Try to mimic real world usage of components in stories, so derive examples that 
  demonstrate how components will be used in the application. That also includes images, icons, and other assets.
- When adding icons or images, try to be consistent with the design system. Use SVGs for icons and ensure they match the design tokens. The exception to this rule is 
    when the design system does not provide an icon for a specific use case, in which case you can use any icon that fits the use case. Also think about something like lettuce icons to display a category of recipes, we don't want these colorized.

## Key Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint (ALWAYS run after code changes)
- `npm run test` - Run unit tests
- `npm run storybook` - Start Storybook development server
- `npm run build-storybook` - Build Storybook for production

## Coding Standards

- Use TypeScript/JavaScript ES6+ syntax
- Prefer functional components with hooks
- Use Tailwind CSS classes for styling
- Implement proper error boundaries
- Write comprehensive tests for all components
- Document components with Storybook stories **co-located** with components
- Maintain strict separation between design tokens and component usage examples
- Use proper component subdirectory structure with clean `index.ts` exports
- Follow Component-Driven Development principles for all new additions

## Component Organization Rules

### UI Components (shadcn/ui)
- Organize in subdirectories: `src/components/ui/{component-name}/`
- Include: `{component-name}.tsx`, `{ComponentName}.stories.tsx` (if applicable), `index.ts`
- Export component cleanly via `index.ts`

### Custom Components
- Co-locate stories with components: `Component.tsx` + `Component.stories.tsx`
- Stories should demonstrate component usage, not design tokens

### Design Tokens
- Place in `src/foundation/tokens/` directory
- Focus purely on design system foundations (colors, typography scales, spacing)
- NO component usage examples in token stories
