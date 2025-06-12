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
- Follow Component-Driven Development principles
- Create Storybook stories for all new components
- Write tests using Vitest + Playwright for browser testing
- ALWAYS run `npm run lint` before committing changes
- Use shadcn/ui components when possible, extend with custom styling as needed

## Project Structure

```
src/
├── components/         # Reusable UI components
│   └── ui/            # shadcn/ui components
├── lib/
│   └── utils.js       # Utility functions (cn() for className merging)
├── stories/           # Storybook stories
└── App.jsx           # Main application component
```

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
- Document components with Storybook stories
