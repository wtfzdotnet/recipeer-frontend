# Design System Scoring Methodology

## Overview

This guide provides detailed instructions for scoring components against our design system audit criteria. Each evaluation area has specific measurement techniques and examples to ensure consistent scoring across all auditors.

## Scoring Scale

### Point Values
- **Full Points**: Meets criteria completely with no issues
- **Partial Points**: Meets criteria with minor deviations or improvements needed
- **Half Points**: Partially meets criteria with moderate issues
- **No Points**: Does not meet criteria or has significant violations

### Evaluation Evidence
Each score must be supported by:
- **Code Review**: Direct examination of component source
- **Visual Testing**: Storybook story verification
- **Accessibility Testing**: Screen reader and keyboard testing
- **Theme Testing**: Light/dark mode validation

## 1. Design Token Compliance (25 points)

### Colors (8 points)

#### CSS Variables Usage (4 points)
**Full Points (4)**: Component exclusively uses semantic color tokens
```tsx
// ✅ Correct usage
className="bg-primary text-primary-foreground"
className="border-border hover:bg-accent"
```

**Partial Points (2-3)**: Mostly uses tokens with 1-2 minor hardcoded values
```tsx
// ⚠️ Mostly correct but has some hardcoded values
className="bg-primary text-white" // should use primary-foreground
```

**No Points (0)**: Uses hardcoded colors or non-semantic values
```tsx
// ❌ Incorrect usage
className="bg-orange-500 text-gray-900"
style={{ backgroundColor: '#ff6b35' }}
```

**Measurement Process**:
1. Search component code for color classes and inline styles
2. Verify all colors use design token variables
3. Check for any hex codes, rgb values, or arbitrary color classes
4. Review hover, focus, and active states

#### Theme Integration (4 points)
**Full Points (4)**: Perfect theme adaptation with oklch() usage
**Partial Points (2-3)**: Good theme support with minor issues
**No Points (0)**: Poor or missing theme support

**Testing Process**:
1. Toggle between light and dark themes in Storybook
2. Verify all colors adapt appropriately
3. Check for visual consistency across themes
4. Validate oklch() color space usage in generated CSS

### Typography (8 points)

#### Font Family Consistency (4 points)
**Full Points (4)**: Uses appropriate font families from design system
```tsx
// ✅ Correct usage
className="font-playfair text-2xl" // Headlines
className="font-source-sans text-base" // Body text
className="font-caveat text-lg" // Handwritten accents
```

**Measurement Process**:
1. Review component for font-family usage
2. Verify fonts match content purpose (headings, body, accents)
3. Check consistency with design system font choices
4. Validate no arbitrary font declarations

#### Scale Adherence (4 points)
**Testing Process**:
1. Verify text sizes use Tailwind scale (text-xs through text-6xl)
2. Check line-height consistency (leading classes)
3. Review letter-spacing usage (tracking classes)
4. Ensure no arbitrary text sizing

### Spacing (9 points)

#### Margin/Padding Standards (5 points)
**Full Points (5)**: Exclusive use of Tailwind spacing scale
```tsx
// ✅ Correct usage
className="p-4 m-2 gap-3 space-y-6"
```

**Partial Points (2-4)**: Mostly correct with minor arbitrary values
```tsx
// ⚠️ Mostly correct but has arbitrary value
className="p-4 m-[15px]" // should use standard scale
```

**No Points (0)**: Frequent arbitrary spacing or inconsistent patterns
```tsx
// ❌ Incorrect usage
style={{ padding: '13px', margin: '7px 15px' }}
```

**Measurement Process**:
1. Search for all padding, margin, and gap classes
2. Verify adherence to Tailwind spacing scale (0.5, 1, 1.5, 2, 2.5, 3, etc.)
3. Check for arbitrary values in square brackets
4. Review spacing consistency patterns

## 2. Visual Consistency (25 points)

### Component Variants (10 points)

#### Size Variants (5 points)
**Full Points (5)**: Comprehensive, consistent size system
```tsx
// ✅ Excellent size variant system
const sizeVariants = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-base", 
  lg: "h-12 px-6 text-lg",
  xl: "h-14 px-8 text-xl"
}
```

**Measurement Process**:
1. Review component variants in Storybook
2. Check size progression logic and consistency
3. Compare similar components for size alignment
4. Verify all documented variants render correctly

#### State Variants (5 points)
**Testing Process**:
1. Test hover states in Storybook
2. Verify focus indicators with keyboard navigation
3. Check disabled state visual feedback
4. Test active/pressed states
5. Validate loading states if applicable

### Layout Patterns (8 points)

#### Grid/Flexbox Usage (4 points)
**Full Points (4)**: Optimal layout method with proper implementation
**Measurement Process**:
1. Review layout methodology choice (grid vs flex)
2. Check alignment and distribution properties
3. Verify responsive behavior
4. Validate semantic appropriateness of layout choice

### Visual Hierarchy (7 points)

#### Content Structure (4 points)
**Testing Process**:
1. Review heading structure (h1-h6) semantic correctness
2. Check visual weight progression
3. Verify emphasis patterns (bold, italic, color)
4. Validate information hierarchy clarity

## 3. Accessibility Compliance (25 points)

### WCAG 2.1 AA Requirements (15 points)

#### Color Contrast (5 points)
**Measurement Tools**:
- Browser DevTools Accessibility Panel
- WebAIM Contrast Checker
- Lighthouse Accessibility Audit

**Testing Process**:
1. Measure text contrast ratios in both light and dark themes
2. Check normal text (4.5:1 minimum) vs large text (3:1 minimum)
3. Test interactive element contrast ratios
4. Verify focus indicator contrast

**Full Points (5)**: All text meets or exceeds contrast requirements
**Partial Points (2-4)**: Most text meets requirements with minor issues
**No Points (0)**: Multiple contrast failures

#### Keyboard Navigation (5 points)
**Testing Process**:
1. Tab through all interactive elements
2. Verify logical tab order
3. Test Enter/Space key activation
4. Check Escape key functionality in modals
5. Validate arrow key navigation where appropriate

#### Screen Reader Support (5 points)
**Testing Tools**:
- NVDA (Windows)
- VoiceOver (macOS)
- Chrome's Screen Reader extension

**Testing Process**:
1. Navigate component with screen reader
2. Verify semantic HTML structure
3. Check ARIA labels and descriptions
4. Test dynamic content announcements
5. Validate form label associations

### Interactive Accessibility (10 points)

#### Focus Management (5 points)
**Testing Process**:
1. Verify visible focus indicators on all interactive elements
2. Test focus trap in modals and dialogs
3. Check focus restoration after modal close
4. Validate focus bypass options for complex components

#### Form Accessibility (5 points)
**Testing Process**:
1. Check label-input associations (for/id attributes)
2. Test error message announcements
3. Verify required field indication (visual and programmatic)
4. Test field validation feedback
5. Check fieldset/legend usage for grouped inputs

## 4. Theme Support (15 points)

### Light/Dark Mode (10 points)

#### Color Adaptation (5 points)
**Testing Process**:
1. Switch themes in Storybook or application
2. Verify all colors adapt appropriately
3. Check for any hardcoded theme-specific values
4. Test color accessibility in both themes

**Scoring Examples**:
- **Full Points (5)**: Perfect adaptation, maintains design intent
- **Partial Points (3-4)**: Good adaptation with minor issues
- **Half Points (2)**: Partial adaptation with some elements not changing
- **No Points (0)**: Poor or no theme adaptation

### System Theme Detection (5 points)
**Testing Process**:
1. Test system theme preference detection
2. Verify smooth theme transitions
3. Check theme persistence across sessions
4. Test programmatic theme switching

## 5. Documentation Quality (10 points)

### Storybook Documentation (6 points)

#### Story Completeness (4 points)
**Review Checklist**:
- [ ] Default/basic story exists
- [ ] All variants documented with stories
- [ ] Interactive examples provided
- [ ] Realistic mock data used
- [ ] Edge cases demonstrated

**Scoring**:
- **Full Points (4)**: All checklist items completed
- **Partial Points (2-3)**: Most items completed
- **No Points (0)**: Missing stories or poor examples

### Code Documentation (4 points)

#### TypeScript Interfaces (2 points)
**Review Checklist**:
- [ ] Props interface exists with JSDoc comments
- [ ] All props documented with descriptions
- [ ] Types are specific and accurate
- [ ] Examples provided in comments

#### Usage Examples (2 points)
**Review Checklist**:
- [ ] Basic usage example in stories
- [ ] Advanced usage patterns documented
- [ ] Best practices mentioned
- [ ] Common pitfalls addressed

## Quality Assurance

### Audit Consistency
- Multiple auditors should review high-priority components
- Scoring discrepancies should be discussed and resolved
- Regular calibration sessions to maintain scoring consistency
- Sample audits should be cross-validated

### Documentation Requirements
Each audit must include:
- Component name and atomic level
- Auditor name and date
- Detailed scoring breakdown
- Specific improvement recommendations
- Screenshots or code examples for issues found
- Priority level for remediation

### Re-audit Triggers
Components should be re-audited when:
- Major code changes occur
- Design system updates are implemented
- Accessibility requirements change
- New browser support is added
- Performance optimizations are made

## Tools and Resources

### Recommended Tools
- **Storybook**: Component documentation and testing
- **Chrome DevTools**: Accessibility and performance auditing
- **WAVE**: Web accessibility evaluation
- **axe DevTools**: Automated accessibility testing
- **Lighthouse**: Comprehensive auditing
- **Figma**: Design comparison and measurement

### Reference Materials
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Atomic Design Methodology](https://atomicdesign.bradfrost.com/)
- [Frontend Recipeer ADR-0001](../adr/0001-atomic-design-component-architecture.md)