# ADR-001: Adopt Atomic Design + Component-Driven Development

## Status
**Accepted** - *2024-12-27*

## Context

As our Frontend Recipeer project grows, we were experiencing:

- Inconsistent component organization with flat structure in `src/components/`
- Difficulty finding and reusing components across the application
- Scattered Storybook structure without clear hierarchy
- AI assistants generating code that doesn't follow established patterns
- New team members struggling to understand component relationships and architecture
- Lack of clear guidelines for component complexity and composition

## Decision

We have decided to adopt **Atomic Design methodology** combined with **Component-Driven Development (CDD)** principles for organizing our React component architecture.

### Component Hierarchy

```
src/
├── components/
│   ├── atoms/          # Basic building blocks (Button, Input, Typography)
│   ├── molecules/      # Simple combinations (QuantityAdjuster, SearchField)
│   ├── organisms/      # Complex sections (RecipeCard, Navigation)
│   ├── templates/      # Page layouts (RecipeLayout, DashboardLayout)
│   └── index.ts       # Barrel exports
├── pages/             # Specific page instances with data
├── hooks/             # Custom React hooks
├── services/          # API and business logic
├── utils/             # Helper functions
├── types/             # TypeScript definitions
├── constants/         # App constants
└── styles/           # Global styles
```

### Component Rules

- **Atoms**: Pure UI components, no business logic, basic building blocks
- **Molecules**: 2-5 atoms working together, simple interaction logic
- **Organisms**: Complex components with business logic, self-contained
- **Templates**: Data-agnostic page layouts, responsive structure
- **Strict Import Hierarchy**: Components can only import from lower levels

### File Structure Standard

```
component-name/
├── component-name.tsx          # Main component
├── ComponentName.stories.tsx   # Storybook stories
├── ComponentName.test.tsx      # Unit tests (molecules+)
└── index.ts                    # Clean export
```

## Consequences

### Positive

1. **Improved Developer Experience**
   - Clear guidelines for component placement and complexity
   - Easier to find existing components
   - Consistent naming and organization patterns
   - Better onboarding for new developers

2. **Enhanced Maintainability**
   - Enforced separation of concerns
   - Prevented circular dependencies through import hierarchy
   - Easier refactoring and component evolution
   - Clear component composition patterns

3. **Better AI Integration**
   - AI assistants can follow structured guidelines
   - Consistent code generation patterns
   - Reduced need for manual corrections

4. **Scalable Architecture**
   - Clear patterns for adding new components
   - Hierarchical organization scales with project size
   - Design system foundation for future growth

### Trade-offs

1. **Migration Effort**
   - Required moving all existing components to new structure
   - Updated 25+ component imports across codebase
   - Reorganized 100+ Storybook stories

2. **Learning Curve**
   - Team needs to understand Atomic Design principles
   - New mental model for component classification
   - Requires discipline to maintain hierarchy rules

3. **Initial Overhead**
   - More directories and index files to maintain
   - Additional consideration needed for component placement
   - Barrel exports add complexity to module resolution

## Implementation

### Phase 1: Foundation ✅
- [x] Updated AI instruction files (CLAUDE.md, .github/copilot-instructions.md)
- [x] Created atomic directory structure
- [x] Established barrel export pattern

### Phase 2: Component Migration ✅
- [x] Categorized existing components by atomic level:
  - **Atoms**: Button, Input, Label, Checkbox, Switch, Textarea, Typography
  - **Molecules**: QuantityAdjuster, DifficultyIndicator, ThemeToggle, RadioGroup, Select, Slider  
  - **Organisms**: RecipeCard, IngredientChecklist, NutritionFacts, RecipeCollectionSaver
- [x] Updated all import statements (25+ files)
- [x] Moved ThemeProvider to dedicated providers directory

### Phase 3: Stories & Documentation ✅
- [x] Updated Storybook story titles to reflect atomic hierarchy
- [x] Verified all tests continue to pass (247/247 tests)
- [x] Updated Welcome story to explain atomic structure
- [x] Verified build and lint processes work correctly

## Validation

- **Build Process**: ✅ All builds passing
- **Test Suite**: ✅ 247/247 tests passing
- **Linting**: ✅ No new errors introduced
- **Storybook**: ✅ Successfully running with new organization
- **Component Exports**: ✅ All barrel exports working correctly

## Migration Guide

For existing code that imports components:

```typescript
// Before
import { Button } from '@/components/Button';
import { QuantityAdjuster } from '@/components/QuantityAdjuster';
import { RecipeCard } from '@/components/RecipeCard';

// After  
import { Button } from '@/components/atoms';
import { QuantityAdjuster } from '@/components/molecules';
import { RecipeCard } from '@/components/organisms';

// Or from the master barrel
import { Button, QuantityAdjuster, RecipeCard } from '@/components';
```

For new component development:

1. **Classify component** by complexity and dependencies
2. **Place in appropriate atomic level** directory
3. **Follow file structure standard** with stories and tests
4. **Add to barrel exports** at appropriate level
5. **Update Storybook title** to match atomic hierarchy

## Future Considerations

- **Template Development**: Create page layout templates as application grows
- **UI Library Evolution**: Consider extracting atoms/molecules to separate package
- **Performance Monitoring**: Watch for bundle size impacts from barrel exports
- **Tooling Enhancement**: Potentially add linting rules to enforce import hierarchy

## References

- [Atomic Design by Brad Frost](https://atomicdesign.bradfrost.com/)
- [Component-Driven Development](https://www.componentdriven.org/)
- [Storybook Documentation](https://storybook.js.org/docs)