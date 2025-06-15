<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Frontend Recipeer - Copilot Instructions

This is a modern React application built with:
- **Framework**: React 19.1.0 with Vite 6.3.5
- **Styling**: Tailwind CSS 4.1.10 + shadcn/ui 0.0.4
- **Testing**: Vitest 3.2.3 + Playwright 1.53.0
- **Documentation**: Storybook 9.0.8
- **Linting**: ESLint 9.25.0
- **Internationalization**: React i18next with locale-based measurement units and currency

## Internationalization (i18n) & Localization (l10n) - MANDATORY

This project implements comprehensive internationalization. **ALL component suggestions must include i18n support.**

### Core i18n Rules for Copilot

#### 1. NEVER Suggest Hardcoded Strings
```typescript
// ❌ NEVER suggest this
<button>Save Recipe</button>
<p>Cooking time: 30 minutes</p>

// ✅ ALWAYS suggest this  
const { t } = useTranslation();
<button>{t('buttons.save')}</button>
<p>{t('recipe.cookingTime', { minutes: 30 })}</p>
```

#### 2. ALWAYS Include Translation Hooks
```typescript
// ✅ Required pattern for ALL components
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/providers/LocaleProvider';

export const MyComponent = () => {
  const { t } = useTranslation('namespace');
  const { locale, formatCurrency } = useLocale();
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <span>{formatCurrency(price)}</span>
    </div>
  );
};
```

#### 3. Locale-Aware Measurement Units
```typescript
// ✅ Auto-detect and convert units based on locale
const { locale, convert } = useLocale();

const displayTemp = locale.measurementSystem === 'metric' 
  ? `${temp}°C`
  : `${convert.temperature.celsiusToFahrenheit(temp)}°F`;

const displayWeight = locale.measurementSystem === 'metric'
  ? `${weight}g` 
  : `${convert.weight.gramsToOunces(weight)}oz`;
```

#### 4. RTL (Right-to-Left) Compatibility - MANDATORY

**ALL components must support RTL languages (Arabic, Hebrew):**

```typescript
// ✅ ALWAYS use logical properties
className="ms-4 me-2 text-start" // NOT ml-4 mr-2 text-left

// ✅ ALWAYS include RTL-aware icons
<ChevronRight className="rtl:rotate-180" />

// ✅ ALWAYS use RTL-safe layouts
className="flex justify-start rtl:flex-row-reverse"
```

### Copilot Auto-Generation Rules

When suggesting components, GitHub Copilot MUST:

1. **Include useTranslation hook** in every component
2. **Replace ALL strings** with `t()` function calls
3. **Add locale measurement conversion** for relevant data
4. **Include RTL layout classes** in Tailwind CSS
5. **Wrap Storybook stories** with LocaleProvider
6. **Generate translation keys** in proper namespace structure

### Required Storybook Pattern
```typescript
// ✅ ALWAYS wrap stories with LocaleProvider
export default {
  decorators: [
    (Story) => (
      <LocaleProvider defaultLocale="en-US">
        <Story />
      </LocaleProvider>
    ),
  ],
};

// ✅ ALWAYS include RTL testing story
export const RTLTest: Story = {
  decorators: [
    (Story) => (
      <div dir="rtl" className="rtl">
        <LocaleProvider defaultLocale="en-US">
          <Story />
        </LocaleProvider>
      </div>
    ),
  ],
};
```

### Translation Key Structure
```typescript
// ✅ Suggested translation structure
{
  "componentName": {
    "title": "Component Title",
    "description": "Component description", 
    "actions": {
      "save": "Save",
      "cancel": "Cancel"
    },
    "validation": {
      "required": "This field is required",
      "invalid": "Invalid {{fieldType}}"
    }
  }
}
```

### Locale Support Matrix

| Locale | Language | Region | Measurement | Currency | Direction |
|--------|----------|--------|-------------|----------|-----------|
| en-US  | English  | United States | Imperial | USD | LTR |
| nl-NL  | Dutch    | Netherlands | Metric | EUR | LTR |

*Future expansion planned for Arabic (ar-SA) with RTL support*

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
9. **Mock Functions**: Use `const fn = () => () => {};` pattern instead of `@storybook/test` imports

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
- **CRITICAL**: Follow design token compliance rules - NO hardcoded colors or spacing values
- **CRITICAL**: Export only React components from component files (separate constants/functions)

## Design Token Compliance Rules

**MANDATORY**: All GitHub Copilot suggestions MUST adhere to design token compliance. The CI pipeline automatically scans for violations and will block builds.

### ❌ NEVER Suggest These Patterns:

```typescript
// ❌ Hardcoded Tailwind colors
className="bg-blue-500 text-red-600 border-gray-200"

// ❌ Arbitrary color values
className="bg-[#3b82f6] text-[rgb(239,68,68)]"

// ❌ RGB/hex in style objects
style={{ backgroundColor: '#3b82f6', color: 'rgb(239, 68, 68)' }}

// ❌ Arbitrary spacing values
className="p-[12px] m-[24px] gap-[8px]"

// ❌ Mixing components with constants
export const RECIPE_TYPES = ['breakfast', 'lunch'];
export const RecipeCard = () => { /* component */ };
```

### ✅ ALWAYS Suggest These Patterns:

```typescript
// ✅ Design token colors
className="bg-primary text-primary-foreground border-border"
className="bg-background text-foreground"
className="bg-card text-card-foreground"
className="bg-muted text-muted-foreground"
className="bg-destructive text-destructive-foreground"
className="bg-success text-success-foreground"
className="bg-warning text-warning-foreground"

// ✅ Design token spacing
className="p-2 m-4 gap-2"           // 8px padding, 16px margin, 8px gap
className="px-4 py-2"               // 16px horizontal, 8px vertical padding
className="space-y-4"               // 16px vertical spacing between children

// ✅ Separate files for constants
// constants/recipe-constants.ts
export const RECIPE_TYPES = ['breakfast', 'lunch'];

// components/organisms/recipe-card/recipe-card.tsx  
export const RecipeCard = () => { /* component */ };
```

### Available Design Tokens for Copilot Suggestions:

#### Colors (Semantic):
- `primary`, `primary-foreground`
- `secondary`, `secondary-foreground`
- `accent`, `accent-foreground`
- `background`, `foreground`
- `card`, `card-foreground`
- `popover`, `popover-foreground`
- `muted`, `muted-foreground`
- `border`, `input`, `ring`
- `destructive`, `destructive-foreground`
- `success`, `success-foreground`
- `warning`, `warning-foreground`

#### Colors (Data Visualization):
- `chart-1`, `chart-2`, `chart-3`, `chart-4`, `chart-5`

#### Spacing (Padding/Margin):
- `p-0.5` (2px), `p-1` (4px), `p-1.5` (6px), `p-2` (8px), `p-3` (12px), `p-4` (16px), `p-5` (20px), `p-6` (24px), `p-8` (32px), `p-10` (40px), `p-12` (48px), `p-16` (64px), `p-20` (80px), `p-24` (96px), `p-32` (128px)
- `m-0.5` (2px), `m-1` (4px), `m-1.5` (6px), `m-2` (8px), `m-3` (12px), `m-4` (16px), `m-5` (20px), `m-6` (24px), `m-8` (32px), `m-10` (40px), `m-12` (48px), `m-16` (64px), `m-20` (80px), `m-24` (96px), `m-32` (128px)
- `gap-0.5` (2px), `gap-1` (4px), `gap-1.5` (6px), `gap-2` (8px), `gap-3` (12px), `gap-4` (16px), `gap-5` (20px), `gap-6` (24px), `gap-8` (32px), `gap-10` (40px), `gap-12` (48px), `gap-16` (64px)
- `space-y-0.5` (2px), `space-y-1` (4px), `space-y-1.5` (6px), `space-y-2` (8px), `space-y-3` (12px), `space-y-4` (16px), `space-y-5` (20px), `space-y-6` (24px), `space-y-8` (32px), `space-y-10` (40px), `space-y-12` (48px), `space-y-16` (64px)

### Real-World Token Usage Examples

Based on actual component implementations in this codebase:

```typescript
// ✅ Button variants (from Button component)
className="bg-primary text-primary-foreground hover:bg-primary/90"
className="bg-destructive text-white hover:bg-destructive/90"
className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
className="hover:bg-accent hover:text-accent-foreground"

// ✅ Alert variants (from Alert component)  
className="border-success text-success"
className="border-warning text-warning"
className="border-primary text-primary"

// ✅ Card styling (from Card component)
className="hover:shadow-md transition-shadow"

// ✅ Focus states (from Button component)
className="focus-visible:ring-ring/50 focus-visible:ring-1"
className="aria-invalid:ring-destructive/20"
```

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
- **Design Token First**: Use only design token colors and spacing
- **Component Separation**: Export only React components (separate constants/functions)
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

### Mock Functions and Imports

**CRITICAL**: This project does NOT use `@storybook/test` package. GitHub Copilot must use the established mock function pattern:

```typescript
// ❌ NEVER suggest importing from @storybook/test (package not available)
import { fn } from '@storybook/test'

// ✅ ALWAYS suggest simple mock function pattern
// Simple mock function for stories
const fn = () => () => {};
```

**Auto-Generate Pattern**:
When creating Storybook stories, GitHub Copilot should automatically include:
1. The mock function declaration at the top
2. Proper usage in story args
3. Consistent pattern across all story files

**Usage in Generated Stories**:
```typescript
import type { Meta, StoryObj } from '@storybook/react-vite'
// Simple mock function for stories
const fn = () => () => {};
import { ComponentName } from './ComponentName'

// ...story configuration with fn() usage...
```

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
- Use Tailwind CSS classes for styling **with design token compliance**
- **NEVER use hardcoded colors** (bg-blue-500, #3b82f6, rgb(59,130,246))
- **NEVER use arbitrary spacing** (p-[12px], gap-[8px])
- **NEVER mix component exports with constants/functions** (breaks Fast Refresh)
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
