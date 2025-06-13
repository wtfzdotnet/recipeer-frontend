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
