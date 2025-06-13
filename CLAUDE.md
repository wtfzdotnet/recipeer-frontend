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
- **NEW REQUIREMENT**: Design all components with internationalization (i18n) in mind - avoid hardcoded strings, plan for text expansion, and consider RTL languages

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

## Commit Message Guidelines

This project follows [Conventional Commits v1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) specification for standardized commit messages.

### Commit Message Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Commit Types

- **feat**: A new feature for the user
- **fix**: A bug fix for the user
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (formatting, missing semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools and libraries

### Project-Specific Scopes

Use these scopes when relevant to the change:

- **components**: UI components (custom components)
- **ui**: shadcn/ui components and variants
- **stories**: Storybook stories and documentation
- **tokens**: Design tokens and foundation elements
- **tests**: Test files and testing utilities
- **docs**: Documentation updates
- **config**: Configuration files (eslint, vite, etc.)
- **build**: Build system and CI/CD changes
- **deps**: Dependency updates
- **theme**: Theming and styling system changes

### Examples

#### Basic Examples
```bash
# New feature
feat(components): add RecipeCard component with rating display

# Bug fix
fix(ui): resolve button hover state inconsistency

# Documentation
docs(readme): update installation instructions

# Code refactoring
refactor(components): extract common props interface

# Tests
test(components): add unit tests for QuantityAdjuster

# Maintenance
chore(deps): update React to v19.1.0
```

#### Breaking Changes

Use `!` after the type/scope or include `BREAKING CHANGE:` in the footer:

```bash
# Using !
feat(ui)!: redesign button component API

# Using footer
feat(components): add new theme system

BREAKING CHANGE: Theme provider now requires explicit color mode prop
```

#### Multi-line Commits
```bash
feat(components): add advanced recipe search functionality

- Add search filters for cuisine, difficulty, and time
- Implement autocomplete for ingredient suggestions  
- Add search result sorting and pagination
- Include nutritional information filtering

Closes #123
```

### Before/After Examples

#### ❌ Non-Conventional (Avoid)
```bash
Update button styles
Fixed a bug
Added new component
Updated docs
Refactored code
```

#### ✅ Conventional (Use)
```bash
style(ui): update button hover and focus states
fix(components): resolve RecipeCard image loading issue
feat(components): add NutritionLabel component
docs(storybook): add component usage examples
refactor(tokens): consolidate spacing scale definitions
```

### Validation Guidelines

When reviewing commit messages, ensure:

1. **Type is present and valid** (feat, fix, docs, style, refactor, test, chore)
2. **Scope is relevant** to the project structure (when used)
3. **Description is imperative mood** ("add feature" not "added feature")
4. **Description starts with lowercase** (unless proper noun)
5. **No period at end** of description
6. **Breaking changes are properly marked** with `!` or `BREAKING CHANGE:`
7. **Body and footer follow conventions** (when used)

### AI-Assisted Commit Messages

When using AI tools (like GitHub Copilot) for commit message suggestions:

- Specify the conventional commit format in your request
- Include the scope when relevant to the change
- Ask for imperative mood descriptions
- Request examples when unsure about the appropriate type
- Validate the suggestion follows the format before using

Example prompts:
- "Generate a conventional commit message for adding authentication components"
- "Create a commit message following conventional commits for fixing a button styling bug"
- "Suggest a commit with breaking change notation for redesigned component API"
