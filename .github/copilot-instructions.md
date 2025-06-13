<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Frontend Recipeer - Copilot Instructions

This is a modern React application built with:
- **Framework**: React 19.1.0 with Vite 6.3.5
- **Styling**: Tailwind CSS 4.1.10 + shadcn/ui 0.0.4
- **Testing**: Vitest 3.2.3 + Playwright 1.53.0
- **Documentation**: Storybook 9.0.8
- **Linting**: ESLint 9.25.0

## Atomic Design + Component-Driven Development

This project follows **Atomic Design methodology** with strict component isolation. When generating components, ALWAYS consider the atomic hierarchy and ensure proper placement:

### Automatic Component Classification

When GitHub Copilot suggests components, automatically classify them by complexity:

#### Atoms (Basic Building Blocks)
- **Auto-detect**: Single-purpose UI elements that can't be broken down further
- **Examples**: Button, Input, Label, Icon, Typography, Avatar, Badge, Checkbox, Switch
- **Location**: `src/components/atoms/{component-name}/`
- **Characteristics**: Pure UI, no business logic, accepts only presentation props

#### Molecules (Simple Combinations) 
- **Auto-detect**: 2-5 atoms working together as a functional unit
- **Examples**: SearchField (Input + Button), FormField (Label + Input + Error), QuantityAdjuster, Rating
- **Location**: `src/components/molecules/{component-name}/`
- **Characteristics**: Simple interaction logic, reusable across contexts

#### Organisms (Complex Sections)
- **Auto-detect**: Complex components with business logic, multiple molecules/atoms
- **Examples**: RecipeCard, NavigationHeader, RecipeForm, IngredientChecklist, NutritionFacts
- **Location**: `src/components/organisms/{component-name}/`
- **Characteristics**: Self-contained, may connect to services/hooks

#### Templates (Page Layouts)
- **Auto-detect**: Layout components that define page structure
- **Examples**: RecipePageLayout, DashboardLayout, AuthLayout
- **Location**: `src/components/templates/{component-name}/`
- **Characteristics**: Data-agnostic, handle layout and responsive behavior

### Component Generation Rules

When generating components, GitHub Copilot should:

1. **Suggest Atomic Level**: Always indicate which atomic level the component belongs to
2. **Detect Complexity**: If a suggested component is too complex, recommend breaking it down
3. **Auto-generate Files**: Create the complete file structure:
   ```
   component-name/
   ├── component-name.tsx
   ├── ComponentName.stories.tsx  
   ├── ComponentName.test.tsx
   └── index.ts
   ```
4. **Follow Naming**: Use kebab-case folders, PascalCase components
5. **Add Dependencies**: Automatically import from appropriate atomic levels
6. **TypeScript Interfaces**: Generate comprehensive props interfaces with JSDoc
7. **Accessibility**: Include ARIA attributes and semantic HTML
8. **Internationalization**: Avoid hardcoded strings, use placeholder props

## Development Guidelines

- Use `cn()` utility from `src/lib/utils.js` for conditional className merging
- Follow **Atomic Design + Component-Driven Development (CDD)** with strict component isolation
- Create Storybook stories for all new components, co-located with the component
- Separate design tokens from component usage examples - tokens go in `src/foundation/tokens/`
- Write tests using Vitest + Playwright for browser testing
- ALWAYS run `npm run lint` before committing changes
- Use shadcn/ui components when possible, extend with custom styling as needed
- Organize UI components in atomic hierarchy with clean exports via `index.ts`
- **NEW REQUIREMENT**: Design all components with internationalization (i18n) in mind - avoid hardcoded strings, plan for text expansion, and consider RTL languages

## Copilot-Specific Instructions

### Component Suggestions
When suggesting components, Copilot should:
- **Always specify atomic level** in suggestions
- **Auto-detect overcomplexity** and suggest atomic breakdown
- **Generate complete file structure** (component, story, test, index)
- **Follow established patterns** from existing components
- **Import from correct atomic levels** (respect hierarchy)

### Code Generation Patterns
- **TypeScript First**: Always generate TypeScript interfaces
- **Accessibility First**: Include ARIA labels and semantic HTML
- **Responsive First**: Consider mobile and desktop layouts
- **Test First**: Generate test cases alongside components
- **Story First**: Create comprehensive Storybook examples

## Project Structure

```
src/
├── components/                    # Atomic Design component hierarchy
│   ├── atoms/                    # Basic building blocks
│   │   ├── button/              # button.tsx, Button.stories.tsx, Button.test.tsx, index.ts
│   │   ├── input/               # input.tsx, Input.stories.tsx, Input.test.tsx, index.ts
│   │   ├── typography/          # typography.tsx, Typography.stories.tsx, index.ts
│   │   └── index.ts             # Barrel exports for all atoms
│   ├── molecules/               # Simple combinations of atoms
│   │   ├── quantity-adjuster/   # QuantityAdjuster.tsx, QuantityAdjuster.stories.tsx, index.ts
│   │   ├── difficulty-indicator/ # DifficultyIndicator.tsx, DifficultyIndicator.stories.tsx, index.ts
│   │   └── index.ts             # Barrel exports for all molecules
│   ├── organisms/               # Complex sections and components
│   │   ├── recipe-card/         # RecipeCard.tsx, RecipeCard.stories.tsx, RecipeCard.test.tsx, index.ts
│   │   ├── ingredient-checklist/ # IngredientChecklist.tsx, IngredientChecklist.stories.tsx, index.ts
│   │   └── index.ts             # Barrel exports for all organisms
│   ├── templates/               # Page layout templates
│   │   └── index.ts             # Barrel exports for all templates
│   └── index.ts                 # Master barrel export
├── pages/                       # Specific page instances with data
├── hooks/                       # Custom React hooks
├── services/                    # API and business logic
├── utils/                       # Helper functions
├── types/                       # TypeScript definitions
├── constants/                   # App constants
├── styles/                      # Global styles
├── foundation/                  # Design system foundations
│   └── tokens/                  # Pure design tokens
├── lib/
│   └── utils.js                 # Utility functions (cn() for className merging)
├── stories/                     # General Storybook configuration stories
└── App.tsx                      # Main application component
```

## Storybook Organization

### Atomic Design Story Structure
- **Atoms**: `"Atoms/Button"`, `"Atoms/Input"`, `"Atoms/Typography"`
- **Molecules**: `"Molecules/QuantityAdjuster"`, `"Molecules/SearchField"`
- **Organisms**: `"Organisms/RecipeCard"`, `"Organisms/NavigationHeader"`
- **Templates**: `"Templates/RecipeLayout"`, `"Templates/DashboardLayout"`

### Story Requirements
- Demonstrate realistic usage with mock data
- Include multiple variants and states (default, loading, error)
- Show component composition (molecules showing their atoms)
- Use consistent design system assets (icons, images)
- Consider accessibility scenarios (high contrast, screen readers)

## Key Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint (ALWAYS run after code changes)
- `npm run test` - Run unit tests
- `npm run storybook` - Start Storybook development server
- `npm run build-storybook` - Build Storybook for production

## Coding Standards

- Use TypeScript/JavaScript ES6+ syntax with comprehensive interfaces
- Prefer functional components with hooks
- Use Tailwind CSS classes for styling
- Implement proper error boundaries for organisms and above
- Write comprehensive tests for molecules and organisms
- Document all components with Storybook stories **co-located** with components
- Maintain strict atomic design hierarchy (no upward imports)
- Use proper component subdirectory structure with clean `index.ts` exports
- Follow Atomic Design + Component-Driven Development principles

## Atomic Design Component Rules

### Import Hierarchy (Strictly Enforced)
```typescript
// ✅ Atoms can import: foundation, lib, utils
import { cn } from '@/lib/utils';

// ✅ Molecules can import: atoms, foundation, lib, utils  
import { Button } from '@/components/atoms';

// ✅ Organisms can import: molecules, atoms, foundation, lib, utils
import { QuantityAdjuster } from '@/components/molecules';
import { Button } from '@/components/atoms';

// ❌ NEVER: Atoms importing molecules/organisms
import { RecipeCard } from '@/components/organisms'; // ERROR in atoms

// ❌ NEVER: Molecules importing organisms  
import { NavigationHeader } from '@/components/organisms'; // ERROR in molecules
```

### Auto-Generated Component Structure
When creating components, generate this structure:
```
component-name/
├── component-name.tsx          # Main component
├── ComponentName.stories.tsx   # Storybook stories
├── ComponentName.test.tsx      # Unit tests (molecules+)
├── component-name.types.ts     # Types (if complex)
└── index.ts                    # Clean export
```

### TypeScript Interface Pattern
```typescript
/**
 * Props for ComponentName - [Atomic Level]
 * 
 * @example
 * <ComponentName title="Example" size="md" />
 */
export interface ComponentNameProps {
  /** Main title text */
  title: string;
  
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  
  /** Custom CSS class */
  className?: string;
  
  /** ARIA label for accessibility */
  'aria-label'?: string;
}
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
