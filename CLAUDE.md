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
- Follow **Atomic Design + Component-Driven Development (CDD)** principles with strict component isolation
- Create Storybook stories for all new components, co-located with the component
- Separate design tokens from component usage examples - tokens go in `src/foundation/tokens/`
- Write tests using Vitest + Playwright for browser testing
- ALWAYS run `npm run lint` before committing changes
- Use shadcn/ui components when possible, extend with custom styling as needed
- Organize UI components in atomic hierarchy with clean exports via `index.ts`
- **NEW REQUIREMENT**: Design all components with internationalization (i18n) in mind - avoid hardcoded strings, plan for text expansion, and consider RTL languages

## Atomic Design Architecture

This project follows **Atomic Design methodology** with strict component isolation and single responsibility principles:

### Component Hierarchy (Bottom-Up)

#### 1. Atoms (`src/components/atoms/`)
- **Purpose**: Basic building blocks that cannot be broken down further
- **Examples**: Button, Input, Label, Icon, Typography, Avatar, Badge
- **Rules**: 
  - Must be pure UI components with no business logic
  - Should accept only presentation props
  - Cannot import from molecules, organisms, templates, or pages
  - Must have comprehensive TypeScript interfaces
  - Require extensive prop variations in Storybook

#### 2. Molecules (`src/components/molecules/`)
- **Purpose**: Simple combinations of atoms that function together as a unit
- **Examples**: SearchField (Input + Button), QuantityAdjuster (Button + Input + Button), FormField (Label + Input + Error)
- **Rules**:
  - Combine 2-5 atoms to create simple functional units
  - May contain simple interaction logic
  - Cannot import from organisms, templates, or pages
  - Can import atoms and other molecules
  - Should be reusable across different contexts

#### 3. Organisms (`src/components/organisms/`)
- **Purpose**: Complex components that form distinct sections of an interface
- **Examples**: RecipeCard, NavigationHeader, RecipeForm, IngredientChecklist
- **Rules**:
  - Combine molecules and atoms to create complex functionality
  - May contain business logic and state management
  - Can connect to services/hooks for data
  - Cannot import from templates or pages
  - Should be self-contained and reusable

#### 4. Templates (`src/components/templates/`)
- **Purpose**: Page-level layouts that define content structure
- **Examples**: RecipePageLayout, DashboardLayout, AuthLayout
- **Rules**:
  - Define page structure using organisms, molecules, and atoms
  - Handle layout, spacing, and responsive behavior
  - Should be data-agnostic (accept content via props/children)
  - Cannot import from pages

#### 5. Pages (`src/pages/`)
- **Purpose**: Specific instances that inject data into templates
- **Examples**: RecipeDetailPage, SearchResultsPage, UserProfilePage
- **Rules**:
  - Combine templates with real data and business logic
  - Handle routing, data fetching, and global state
  - Can import from all lower levels

### Component Isolation Rules

- **Unidirectional Dependencies**: Components can only import from lower levels in the hierarchy
- **Single Responsibility**: Each component should have one clear purpose
- **Prop Interface Design**: All components must have comprehensive TypeScript interfaces with JSDoc comments
- **Story Requirements**: Every component must have Storybook stories demonstrating all states and variations
- **Test Coverage**: Components must have unit tests covering all props and interactions

## Project Structure

```
src/
├── components/                    # Atomic Design component hierarchy
│   ├── atoms/                    # Basic building blocks
│   │   ├── button/              # button.tsx, Button.stories.tsx, Button.test.tsx, index.ts
│   │   ├── input/               # input.tsx, Input.stories.tsx, Input.test.tsx, index.ts
│   │   ├── typography/          # typography.tsx, Typography.stories.tsx, index.ts
│   │   ├── avatar/              # avatar.tsx, Avatar.stories.tsx, index.ts
│   │   ├── badge/               # badge.tsx, Badge.stories.tsx, index.ts
│   │   └── index.ts             # Barrel exports for all atoms
│   ├── molecules/               # Simple combinations of atoms
│   │   ├── quantity-adjuster/   # QuantityAdjuster.tsx, QuantityAdjuster.stories.tsx, index.ts
│   │   ├── difficulty-indicator/ # DifficultyIndicator.tsx, DifficultyIndicator.stories.tsx, index.ts
│   │   ├── theme-toggle/        # ThemeToggle.tsx, ThemeToggle.stories.tsx, index.ts
│   │   └── index.ts             # Barrel exports for all molecules
│   ├── organisms/               # Complex sections and components
│   │   ├── recipe-card/         # RecipeCard.tsx, RecipeCard.stories.tsx, RecipeCard.test.tsx, index.ts
│   │   ├── ingredient-checklist/ # IngredientChecklist.tsx, IngredientChecklist.stories.tsx, index.ts
│   │   ├── nutrition-facts/     # NutritionFacts.tsx, NutritionFacts.stories.tsx, index.ts
│   │   └── index.ts             # Barrel exports for all organisms
│   ├── templates/               # Page layout templates
│   │   ├── recipe-layout/       # RecipeLayout.tsx, RecipeLayout.stories.tsx, index.ts
│   │   └── index.ts             # Barrel exports for all templates
│   └── index.ts                 # Master barrel export (atoms, molecules, organisms, templates)
├── pages/                       # Specific page instances with data
│   ├── recipe-detail/           # RecipeDetailPage.tsx, index.ts
│   ├── search-results/          # SearchResultsPage.tsx, index.ts
│   └── index.ts                 # Page exports
├── hooks/                       # Custom React hooks
│   ├── use-recipe-data.ts       # Custom hooks for data fetching
│   ├── use-theme.ts             # Theme management hooks
│   └── index.ts                 # Hook exports
├── services/                    # API and business logic
│   ├── recipe-api.ts            # Recipe-related API calls
│   ├── auth-service.ts          # Authentication service
│   └── index.ts                 # Service exports
├── utils/                       # Helper functions and utilities
│   ├── recipe-helpers.ts        # Recipe-specific utility functions
│   ├── format-utils.ts          # Formatting utilities
│   └── index.ts                 # Utility exports
├── types/                       # TypeScript type definitions
│   ├── recipe.types.ts          # Recipe-related types
│   ├── user.types.ts            # User-related types
│   └── index.ts                 # Type exports
├── constants/                   # Application constants
│   ├── recipe-constants.ts      # Recipe-related constants
│   ├── app-config.ts            # App configuration
│   └── index.ts                 # Constant exports
├── styles/                      # Global styles and themes
│   ├── globals.css              # Global CSS
│   ├── themes.css               # Theme definitions
│   └── components.css           # Component-specific styles
├── foundation/                  # Design system foundations
│   └── tokens/                  # Pure design tokens (NO component usage examples)
│       ├── Colors.stories.tsx   # Color palette documentation
│       ├── Spacing.stories.tsx  # Spacing scale tokens
│       └── Typography.stories.tsx # Font families, scales, weights
├── lib/
│   └── utils.js                 # Utility functions (cn() for className merging)
├── stories/                     # General Storybook configuration stories
│   ├── Configure.mdx           # Storybook setup documentation
│   └── Welcome.stories.tsx      # Welcome page
└── App.tsx                      # Main application component
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

## Component Development Guidelines

### Naming Conventions

#### Atomic Level Naming
- **Atoms**: PascalCase component names, kebab-case folder names
  - `Button` component in `atoms/button/` folder
  - Files: `button.tsx`, `Button.stories.tsx`, `Button.test.tsx`, `index.ts`
- **Molecules**: PascalCase component names, kebab-case folder names  
  - `QuantityAdjuster` component in `molecules/quantity-adjuster/` folder
- **Organisms**: PascalCase component names, kebab-case folder names
  - `RecipeCard` component in `organisms/recipe-card/` folder
- **Templates**: PascalCase component names, kebab-case folder names
  - `RecipeLayout` component in `templates/recipe-layout/` folder

#### File Structure Template
```
component-name/
├── component-name.tsx          # Main component file
├── ComponentName.stories.tsx   # Storybook stories
├── ComponentName.test.tsx      # Unit tests (optional for atoms)
├── component-name.types.ts     # Type definitions (if complex)
├── component-name.utils.ts     # Helper utilities (if needed)
└── index.ts                    # Clean export
```

### Component Creation Checklist

#### For ALL Components:
- [ ] Component implemented with proper TypeScript interfaces
- [ ] Comprehensive JSDoc comments explaining purpose and usage
- [ ] Props interface with clear descriptions and default values
- [ ] Accessibility attributes (ARIA labels, roles, etc.)
- [ ] Responsive design considerations
- [ ] Internationalization considerations (no hardcoded strings)
- [ ] Clean `index.ts` barrel export
- [ ] Storybook story with multiple variants/states
- [ ] Story demonstrates realistic usage with mock data

#### For Molecules and Above:
- [ ] Unit tests covering all props and interactions
- [ ] Error boundary handling (where appropriate)
- [ ] Loading and error states
- [ ] Integration with theme system

#### For Organisms and Above:
- [ ] Integration tests for complex interactions
- [ ] Performance considerations (memo, useMemo, useCallback)
- [ ] State management strategy documented

### Storybook Organization

#### Story Structure
- **Title**: Follow atomic hierarchy pattern
  - Atoms: `"Atoms/Button"`
  - Molecules: `"Molecules/QuantityAdjuster"`
  - Organisms: `"Organisms/RecipeCard"`
  - Templates: `"Templates/RecipeLayout"`

#### Story Requirements
- **Default**: Basic component with default props
- **Variants**: All visual variations (sizes, colors, states)
- **Interactive**: Demonstrating user interactions
- **Edge Cases**: Error states, loading states, empty states
- **Accessibility**: High contrast, screen reader testing
- **Responsive**: Different screen sizes (use Storybook viewports)

### TypeScript Interface Guidelines

```typescript
/**
 * Props interface for ComponentName
 * 
 * @example
 * <ComponentName 
 *   title="Recipe Title" 
 *   size="md" 
 *   onAction={handleAction} 
 * />
 */
export interface ComponentNameProps {
  /** The main title displayed in the component */
  title: string;
  
  /** Size variant of the component */
  size?: 'sm' | 'md' | 'lg';
  
  /** Optional CSS class name for custom styling */
  className?: string;
  
  /** Callback fired when user performs action */
  onAction?: (data: ActionData) => void;
  
  /** Whether the component is in loading state */
  isLoading?: boolean;
  
  /** ARIA label for accessibility (required if no visible label) */
  'aria-label'?: string;
}
```

### Component Organization Rules

#### Atomic Level Rules

**Atoms:**
- Must be presentation-only components
- Cannot contain business logic or data fetching
- Should accept styling props (className, style, size variants)
- Must have comprehensive prop variations
- Examples: Button, Input, Typography, Icon, Avatar, Badge

**Molecules:**
- Combine 2-5 atoms into functional units
- May contain simple interaction logic (form validation, toggles)
- Should be reusable across different contexts
- Can manage simple local state
- Examples: SearchField, FormField, QuantityAdjuster, Rating

**Organisms:**
- Complex components combining molecules and atoms
- May contain business logic and connect to services/hooks
- Can manage complex state and side effects
- Should be self-contained and reusable
- Examples: RecipeCard, NavigationHeader, RecipeForm

**Templates:**
- Define page layouts and structure
- Data-agnostic (accept content via props/children)
- Handle responsive layout and spacing
- Should not contain business logic
- Examples: RecipePageLayout, DashboardLayout

### Import/Export Rules

#### Import Hierarchy (Enforced)
```typescript
// ✅ Allowed - atoms can import from foundation
import { cn } from '@/lib/utils';
import { colors } from '@/foundation/tokens';

// ✅ Allowed - molecules can import atoms
import { Button } from '@/components/atoms';

// ✅ Allowed - organisms can import molecules and atoms  
import { QuantityAdjuster } from '@/components/molecules';
import { Button } from '@/components/atoms';

// ❌ Not allowed - atoms cannot import molecules
import { QuantityAdjuster } from '@/components/molecules'; // Error in atoms

// ❌ Not allowed - molecules cannot import organisms
import { RecipeCard } from '@/components/organisms'; // Error in molecules
```

#### Barrel Export Pattern
```typescript
// atoms/index.ts
export { Button } from './button';
export { Input } from './input';
export { Typography } from './typography';

// molecules/index.ts
export { QuantityAdjuster } from './quantity-adjuster';
export { DifficultyIndicator } from './difficulty-indicator';

// Root components/index.ts
export * from './atoms';
export * from './molecules';
export * from './organisms';
export * from './templates';
```

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

- **atoms**: Atomic level components (buttons, inputs, typography)
- **molecules**: Molecular level components (quantity adjusters, form fields)
- **organisms**: Organism level components (recipe cards, navigation)
- **templates**: Template level components (page layouts)
- **pages**: Page components and routing
- **hooks**: Custom React hooks
- **services**: API and business logic services
- **utils**: Helper functions and utilities
- **types**: TypeScript type definitions
- **constants**: Application constants
- **tokens**: Design tokens and foundation elements
- **stories**: Storybook stories and documentation
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
style(atoms): update button hover and focus states
fix(organisms): resolve RecipeCard image loading issue
feat(molecules): add NutritionLabel component
docs(storybook): add component usage examples
refactor(tokens): consolidate spacing scale definitions
feat(atoms): add new Typography variant
fix(molecules): resolve QuantityAdjuster accessibility issue
refactor(organisms): extract RecipeCard sub-components to molecules
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
- "Generate a conventional commit message for adding atomic-level authentication components"
- "Create a commit message following conventional commits for fixing a molecule-level styling bug"
- "Suggest a commit with breaking change notation for redesigned organism component API"
- "Generate commit message for refactoring components from flat structure to atomic design"
