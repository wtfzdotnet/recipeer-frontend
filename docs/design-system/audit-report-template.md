# Design System Audit Report Template

## Audit Information

**Component**: [Component Name]  
**Atomic Level**: [Atom/Molecule/Organism/Template]  
**Auditor**: [Auditor Name]  
**Audit Date**: [YYYY-MM-DD]  
**Priority Level**: [Critical/High/Medium/Low]  

## Overall Score

**Total Score**: [X/100]  
**Status**: [Excellent/Good/Acceptable/Needs Improvement/Requires Major Work]

### Score Breakdown
- **Design Token Compliance**: [X/25]
- **Visual Consistency**: [X/25]  
- **Accessibility Compliance**: [X/25]
- **Theme Support**: [X/15]
- **Documentation Quality**: [X/10]

## Detailed Evaluation

### 1. Design Token Compliance (X/25)

#### Colors (X/8)
**CSS Variables Usage** (X/4):
- ✅/❌ Uses semantic color tokens from design system
- ✅/❌ No hardcoded color values

**Issues Found**:
- [List specific color-related issues]

**Theme Integration** (X/4):
- ✅/❌ Properly responds to light/dark theme changes  
- ✅/❌ Uses oklch() color space

**Issues Found**:
- [List specific theme integration issues]

#### Typography (X/8)
**Font Family Consistency** (X/4):
- ✅/❌ Uses defined font families appropriately
- ✅/❌ Appropriate font choice for content type

**Scale Adherence** (X/4):
- ✅/❌ Uses standardized text sizes
- ✅/❌ Consistent line-height and letter-spacing

**Issues Found**:
- [List specific typography issues]

#### Spacing (X/9)
**Margin/Padding Standards** (X/5):
- ✅/❌ Uses Tailwind spacing scale exclusively
- ✅/❌ No arbitrary spacing values

**Layout Consistency** (X/4):
- ✅/❌ Consistent component spacing patterns
- ✅/❌ Proper use of gap, padding, and margin

**Issues Found**:
- [List specific spacing issues]

### 2. Visual Consistency (X/25)

#### Component Variants (X/10)
**Size Variants** (X/5):
- ✅/❌ Consistent sizing system
- ✅/❌ Proper variant implementation

**State Variants** (X/5):
- ✅/❌ Consistent hover, focus, active, disabled states
- ✅/❌ Proper visual feedback for interactions

**Issues Found**:
- [List specific variant issues]

#### Layout Patterns (X/8)
**Grid/Flexbox Usage** (X/4):
- ✅/❌ Appropriate layout method selection
- ✅/❌ Consistent alignment and distribution

**Responsive Design** (X/4):
- ✅/❌ Mobile-first approach implementation
- ✅/❌ Consistent breakpoint usage

**Issues Found**:
- [List specific layout issues]

#### Visual Hierarchy (X/7)
**Content Structure** (X/4):
- ✅/❌ Clear information hierarchy
- ✅/❌ Consistent heading levels and emphasis

**Interactive Elements** (X/3):
- ✅/❌ Clear call-to-action styling
- ✅/❌ Consistent button/link treatments

**Issues Found**:
- [List specific hierarchy issues]

### 3. Accessibility Compliance (X/25)

#### WCAG 2.1 AA Requirements (X/15)
**Color Contrast** (X/5):
- ✅/❌ Normal text ≥ 4.5:1 contrast ratio
- ✅/❌ Large text ≥ 3:1 contrast ratio

**Testing Results**:
- Light theme: [contrast ratios]
- Dark theme: [contrast ratios]

**Keyboard Navigation** (X/5):
- ✅/❌ All interactive elements keyboard accessible
- ✅/❌ Logical tab order maintained

**Testing Results**:
- [Describe keyboard testing results]

**Screen Reader Support** (X/5):
- ✅/❌ Proper semantic HTML usage
- ✅/❌ ARIA labels and descriptions where needed

**Testing Results**:
- [Describe screen reader testing results]

#### Interactive Accessibility (X/10)
**Focus Management** (X/5):
- ✅/❌ Visible focus indicators
- ✅/❌ Focus trap implementation (if applicable)

**Form Accessibility** (X/5):
- ✅/❌ Proper label associations
- ✅/❌ Error message accessibility
- ✅/❌ Required field indication

**Issues Found**:
- [List specific accessibility issues]

### 4. Theme Support (X/15)

#### Light/Dark Mode (X/10)
**Color Adaptation** (X/5):
- ✅/❌ All colors adapt properly to theme changes
- ✅/❌ No theme-specific hardcoded values

**Visual Consistency** (X/5):
- ✅/❌ Maintains visual hierarchy across themes
- ✅/❌ Consistent component appearance

**Testing Results**:
- [Describe theme switching testing]

#### System Theme Detection (X/5)
**Automatic Theme Detection** (X/3):
- ✅/❌ Respects user's system preference
- ✅/❌ Smooth theme transitions

**Theme Persistence** (X/2):
- ✅/❌ Remembers user's theme choice

**Issues Found**:
- [List specific theme support issues]

### 5. Documentation Quality (X/10)

#### Storybook Documentation (X/6)
**Story Completeness** (X/4):
- ✅/❌ All variants documented in stories
- ✅/❌ Realistic usage examples provided

**Story Organization** (X/2):
- ✅/❌ Proper atomic hierarchy categorization
- ✅/❌ Clear story titles and descriptions

**Review Notes**:
- [Comments on story quality and completeness]

#### Code Documentation (X/4)
**TypeScript Interfaces** (X/2):
- ✅/❌ Comprehensive prop interfaces with JSDoc
- ✅/❌ Clear prop descriptions and examples

**Usage Examples** (X/2):
- ✅/❌ Component usage documented in stories
- ✅/❌ Best practices and patterns documented

**Issues Found**:
- [List documentation issues]

## Issues Summary

### Critical Issues (Must Fix)
1. [Issue description with specific examples]
2. [Issue description with specific examples]

### Major Issues (Should Fix)
1. [Issue description with specific examples]
2. [Issue description with specific examples]

### Minor Issues (Nice to Fix)
1. [Issue description with specific examples]
2. [Issue description with specific examples]

## Recommendations

### Immediate Actions (Priority 1)
- [ ] [Specific action item with code examples if applicable]
- [ ] [Specific action item with code examples if applicable]

### Short-term Improvements (Priority 2)
- [ ] [Specific action item]
- [ ] [Specific action item]

### Long-term Enhancements (Priority 3)
- [ ] [Specific action item]
- [ ] [Specific action item]

## Code Examples

### Issues Found
```tsx
// ❌ Example of problematic code
className="bg-orange-500 text-white p-[15px]"
```

### Recommended Fixes
```tsx
// ✅ Corrected implementation
className="bg-primary text-primary-foreground p-4"
```

## Testing Evidence

### Screenshots
- [Include screenshots showing issues]
- [Include before/after comparisons]

### Test Results
- **Automated Testing**: [axe-core, Lighthouse results]
- **Manual Testing**: [Keyboard navigation, screen reader testing]
- **Cross-browser Testing**: [Results across different browsers]

## Follow-up Actions

### Re-audit Requirements
- [ ] Re-audit after critical issues are fixed
- [ ] Verify accessibility improvements with assistive technology users
- [ ] Test theme support across all variants
- [ ] Validate design token compliance

### Next Audit Date
**Scheduled**: [YYYY-MM-DD]  
**Reason**: [Trigger for next audit]

## Approval

### Review Status
- [ ] Technical review completed
- [ ] Accessibility review completed  
- [ ] Design review completed
- [ ] Product owner approval

### Sign-off
**Reviewed by**: [Name]  
**Date**: [YYYY-MM-DD]  
**Approved for**: [Production/Further Development/Requires Rework]

## Appendix

### Testing Tools Used
- [ ] Storybook visual testing
- [ ] Chrome DevTools accessibility panel
- [ ] axe DevTools browser extension
- [ ] WAVE accessibility evaluation
- [ ] Lighthouse audit
- [ ] Screen reader testing (specify which)
- [ ] Keyboard navigation testing
- [ ] Color contrast analyzers

### Reference Materials
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Frontend Recipeer Design System Audit Criteria](./audit-criteria.md)
- [Frontend Recipeer Scoring Methodology](./scoring-methodology.md)
- [Frontend Recipeer ADR-0001](../adr/0001-atomic-design-component-architecture.md)

---

**Template Version**: 1.0  
**Last Updated**: [YYYY-MM-DD]  
**Template Author**: [Name]