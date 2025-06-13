# Frontend Recipeer

[![CI](https://github.com/wtfzdotnet/recipeer-frontend/workflows/CI/badge.svg)](https://github.com/wtfzdotnet/recipeer-frontend/actions/workflows/ci.yml)
[![Release](https://github.com/wtfzdotnet/recipeer-frontend/workflows/Release/badge.svg)](https://github.com/wtfzdotnet/recipeer-frontend/actions/workflows/release.yml)

A modern React application built with Vite, TypeScript, Tailwind CSS, and shadcn/ui components.

## Tech Stack

- **Framework**: React 19.1.0 with Vite 6.3.5
- **Styling**: Tailwind CSS 4.1.10 + shadcn/ui 0.0.4
- **Testing**: Vitest 3.2.3 + Playwright 1.53.0
- **Documentation**: Storybook 9.0.8
- **Linting**: ESLint 9.25.0

## Architecture

This project follows **Atomic Design methodology** combined with **Component-Driven Development (CDD)** principles for maximum scalability and maintainability.

### Component Hierarchy

```
src/
├── components/                    # Atomic Design component hierarchy
│   ├── atoms/                    # Basic building blocks
│   │   ├── button/              # Button, Input, Typography
│   │   └── index.ts             # Barrel exports
│   ├── molecules/               # Simple combinations
│   │   ├── quantity-adjuster/   # QuantityAdjuster, SearchField
│   │   └── index.ts             # Barrel exports
│   ├── organisms/               # Complex sections
│   │   ├── recipe-card/         # RecipeCard, Navigation
│   │   └── index.ts             # Barrel exports
│   ├── templates/               # Page layouts
│   └── index.ts                 # Master barrel export
├── pages/                       # Specific page instances with data
├── hooks/                       # Custom React hooks
├── services/                    # API and business logic
├── utils/                       # Helper functions
├── types/                       # TypeScript definitions
├── constants/                   # App constants
└── styles/                      # Global styles
```

### Design Principles

- **Atoms**: Pure UI components, no business logic
- **Molecules**: 2-5 atoms working together with simple interactions
- **Organisms**: Complex components with business logic and data handling
- **Templates**: Data-agnostic page layouts with responsive structure
- **Strict Import Hierarchy**: Components can only import from lower levels

For detailed information, see [ADR-001: Atomic Design Architecture](docs/adr/001-atomic-design-architecture.md).

## Development

### Prerequisites

- Node.js 20+ (LTS recommended)
- npm

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test

# Run linter
npm run lint

# Start Storybook
npm run storybook
```

## Component Development

### Creating New Components

1. **Classify Your Component** by complexity:
   - **Atom**: Basic UI element (Button, Input, Icon)
   - **Molecule**: Simple combination (SearchField, FormField)
   - **Organism**: Complex section (RecipeCard, Navigation)
   - **Template**: Page layout (RecipeLayout, DashboardLayout)

2. **Create Component Structure**:
   ```bash
   # Example: Creating a new atom
   mkdir src/components/atoms/icon
   cd src/components/atoms/icon
   ```

3. **Follow File Structure**:
   ```
   component-name/
   ├── component-name.tsx          # Main component
   ├── ComponentName.stories.tsx   # Storybook stories
   ├── ComponentName.test.tsx      # Unit tests (molecules+)
   └── index.ts                    # Clean export
   ```

4. **Component Template**:
   ```typescript
   import React from 'react';
   import { cn } from '@/lib/utils';

   export interface ComponentNameProps {
     /** Component description */
     children: React.ReactNode;
     /** Optional CSS class */
     className?: string;
   }

   /**
    * ComponentName - [Atomic Level]
    * Brief description of component purpose
    */
   export const ComponentName: React.FC<ComponentNameProps> = ({
     children,
     className,
     ...props
   }) => {
     return (
       <div className={cn('base-styles', className)} {...props}>
         {children}
       </div>
     );
   };

   export default ComponentName;
   ```

5. **Update Barrel Exports**:
   ```typescript
   // In appropriate atomic level index.ts
   export { ComponentName } from './component-name';
   export type { ComponentNameProps } from './component-name';
   ```

6. **Create Storybook Story**:
   ```typescript
   import type { Meta, StoryObj } from '@storybook/react';
   import { ComponentName } from './component-name';

   const meta: Meta<typeof ComponentName> = {
     title: 'Atoms/ComponentName', // Adjust atomic level
     component: ComponentName,
     parameters: { layout: 'centered' },
   };

   export default meta;
   type Story = StoryObj<typeof meta>;

   export const Default: Story = {
     args: {
       children: 'Component content',
     },
   };
   ```

### Import Guidelines

```typescript
// ✅ Correct - Import from atomic level
import { Button } from '@/components/atoms';
import { QuantityAdjuster } from '@/components/molecules';
import { RecipeCard } from '@/components/organisms';

// ✅ Correct - Import from master barrel
import { Button, QuantityAdjuster, RecipeCard } from '@/components';

// ❌ Incorrect - Direct component imports
import { Button } from '@/components/atoms/button/Button';
```

## CI/CD Pipeline

This project uses automated CI/CD with semantic versioning:

### Continuous Integration
- **Trigger**: Every push and pull request to `main` and `develop` branches
- **Jobs**: Lint, test, and build the application
- **Artifacts**: Build files are uploaded and retained for 7 days

### Automated Releases
- **Trigger**: Push to `main` branch (after CI passes)
- **Features**:
  - Semantic versioning based on conventional commits
  - Automatic changelog generation
  - GitHub releases with tagged versions
  - Version bumping in `package.json`

### Storybook Deployment
- **Trigger**: Push to `main` branch
- **Target**: GitHub Pages
- **URL**: Available at `https://<username>.github.io/<repository>/` once deployed
- **Content**: Built Storybook documentation and component library

### Commit Message Format

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

feat: new feature
fix: bug fix
docs: documentation changes
style: formatting changes
refactor: code refactoring
test: test changes
chore: maintenance tasks
```

Examples:
- `feat(auth): add login functionality`
- `fix(button): resolve hover state issue`
- `docs(readme): update installation instructions`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint (ALWAYS run after code changes)
- `npm run test` - Run unit tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage
- `npm run storybook` - Start Storybook development server
- `npm run build-storybook` - Build Storybook for production
- `npm run semantic-release` - Run semantic release (used in CI)

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
