# Design System Audit Criteria

## Overview

This document establishes comprehensive audit criteria for evaluating design system compliance across all components in the Frontend Recipeer application. The audit framework ensures consistency, accessibility, and maintainability of our atomic design-based component system.

## Audit Scope

### Component Categories
Based on our atomic design methodology (as defined in [ADR-0001](../adr/0001-atomic-design-component-architecture.md)):

- **Atoms**: Basic building blocks (Button, Input, Typography, etc.)
- **Molecules**: Simple combinations of atoms (QuantityAdjuster, DifficultyIndicator, etc.)
- **Organisms**: Complex sections with business logic (RecipeCard, NavigationMenu, etc.)
- **Templates**: Page layout structures
- **Foundation**: Design tokens (Colors, Typography, Spacing)

### Evaluation Areas

1. **Design Token Compliance** (25 points)
2. **Visual Consistency** (25 points)
3. **Accessibility Compliance** (25 points)
4. **Theme Support** (15 points)
5. **Documentation Quality** (10 points)

**Total Score: 100 points**

## 1. Design Token Compliance (25 points)

### Colors (8 points)
- **CSS Variables Usage** (4 points)
  - Uses semantic color tokens from `--primary`, `--secondary`, etc. (2 pts)
  - No hardcoded color values in components (2 pts)
- **Theme Integration** (4 points)
  - Properly responds to light/dark theme changes (2 pts)
  - Uses `oklch()` color space as defined in tailwind.config.ts (2 pts)

### Typography (8 points)
- **Font Family Consistency** (4 points)
  - Uses defined font families (Playfair, Source Sans, etc.) (2 pts)
  - Appropriate font choice for content type (2 pts)
- **Scale Adherence** (4 points)
  - Uses standardized text sizes (text-xs to text-6xl) (2 pts)
  - Consistent line-height and letter-spacing (2 pts)

### Spacing (9 points)
- **Margin/Padding Standards** (5 points)
  - Uses Tailwind spacing scale (0.5, 1, 1.5, 2, etc.) (3 pts)
  - No arbitrary spacing values (2 pts)
- **Layout Consistency** (4 points)
  - Consistent component spacing patterns (2 pts)
  - Proper use of gap, padding, and margin (2 pts)

## 2. Visual Consistency (25 points)

### Component Variants (10 points)
- **Size Variants** (5 points)
  - Consistent sizing system across similar components (3 pts)
  - Proper variant implementation (sm, md, lg, xl) (2 pts)
- **State Variants** (5 points)
  - Consistent hover, focus, active, disabled states (3 pts)
  - Proper visual feedback for interactions (2 pts)

### Layout Patterns (8 points)
- **Grid/Flexbox Usage** (4 points)
  - Appropriate layout method selection (2 pts)
  - Consistent alignment and distribution (2 pts)
- **Responsive Design** (4 points)
  - Mobile-first approach implementation (2 pts)
  - Consistent breakpoint usage (2 pts)

### Visual Hierarchy (7 points)
- **Content Structure** (4 points)
  - Clear information hierarchy (2 pts)
  - Consistent heading levels and emphasis (2 pts)
- **Interactive Elements** (3 points)
  - Clear call-to-action styling (2 pts)
  - Consistent button/link treatments (1 pt)

## 3. Accessibility Compliance (25 points)

### WCAG 2.1 AA Requirements (15 points)
- **Color Contrast** (5 points)
  - Text contrast ratio ≥ 4.5:1 for normal text (3 pts)
  - Text contrast ratio ≥ 3:1 for large text (2 pts)
- **Keyboard Navigation** (5 points)
  - All interactive elements keyboard accessible (3 pts)
  - Logical tab order maintained (2 pts)
- **Screen Reader Support** (5 points)
  - Proper semantic HTML usage (2 pts)
  - ARIA labels and descriptions where needed (3 pts)

### Interactive Accessibility (10 points)
- **Focus Management** (5 points)
  - Visible focus indicators (2 pts)
  - Focus trap implementation in modals (3 pts)
- **Form Accessibility** (5 points)
  - Proper label associations (2 pts)
  - Error message accessibility (2 pts)
  - Required field indication (1 pt)

## 4. Theme Support (15 points)

### Light/Dark Mode (10 points)
- **Color Adaptation** (5 points)
  - All colors adapt properly to theme changes (3 pts)
  - No theme-specific hardcoded values (2 pts)
- **Visual Consistency** (5 points)
  - Maintains visual hierarchy across themes (3 pts)
  - Consistent component appearance (2 pts)

### System Theme Detection (5 points)
- **Automatic Theme Detection** (3 points)
  - Respects user's system preference (2 pts)
  - Smooth theme transitions (1 pt)
- **Theme Persistence** (2 points)
  - Remembers user's theme choice (2 pts)

## 5. Documentation Quality (10 points)

### Storybook Documentation (6 points)
- **Story Completeness** (4 points)
  - All variants documented in stories (2 pts)
  - Realistic usage examples provided (2 pts)
- **Story Organization** (2 points)
  - Proper atomic hierarchy categorization (1 pt)
  - Clear story titles and descriptions (1 pt)

### Code Documentation (4 points)
- **TypeScript Interfaces** (2 points)
  - Comprehensive prop interfaces with JSDoc (1 pt)
  - Clear prop descriptions and examples (1 pt)
- **Usage Examples** (2 points)
  - Component usage documented in stories (1 pt)
  - Best practices and patterns documented (1 pt)

## Scoring Guidelines

### Score Ranges
- **90-100**: Excellent - Design system exemplar
- **80-89**: Good - Meets all standards with minor improvements needed
- **70-79**: Acceptable - Meets basic standards, some improvements needed
- **60-69**: Needs Improvement - Several issues to address
- **Below 60**: Requires Major Work - Significant design system violations

### Priority Levels
- **Critical (90+ required)**: Atoms and foundational components
- **High (80+ required)**: Molecules and key organisms
- **Medium (70+ required)**: Complex organisms and templates
- **Low (60+ required)**: Experimental or legacy components

## Audit Process

1. **Component Selection**: Identify components for audit
2. **Evaluation**: Score each component using this criteria
3. **Documentation**: Record findings in audit tracking system
4. **Remediation**: Create action items for improvements
5. **Re-evaluation**: Re-audit after improvements implemented

## Related Documents

- [Scoring Methodology Guide](./scoring-methodology.md)
- [Accessibility Checklist](./accessibility-checklist.md)
- [Component Tracking Template](./component-audit-template.csv)
- [Audit Report Template](./audit-report-template.md)
- [ADR-0001: Atomic Design Component Architecture](../adr/0001-atomic-design-component-architecture.md)