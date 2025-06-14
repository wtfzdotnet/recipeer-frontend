# Automated Design System Scanning Tools

This document describes the automated tools configured to scan for design token usage, visual regression testing, and accessibility compliance in the Frontend Recipeer project.

## Overview

The design system scanning tools ensure:
- ✅ Design token compliance (no hardcoded colors/spacing)
- ✅ Visual consistency across components
- ✅ WCAG 2.1 AA accessibility compliance
- ✅ Automated monitoring in CI/CD pipeline

## Tools and Configuration

### 1. Design Token Usage Scanner

**Tools**: Custom ESLint plugin + Stylelint
**Purpose**: Detect hardcoded colors, spacing, and typography values

#### Custom ESLint Rules
Located in `tools/eslint-plugin-design-tokens/`:
- `no-hardcoded-colors`: Flags hex codes, RGB values, and hardcoded Tailwind color classes
- `no-hardcoded-spacing`: Flags arbitrary spacing values in square brackets

#### Stylelint Configuration
Located in `.stylelintrc.json`:
- Validates CSS property order
- Enforces design token patterns
- Integrates with Tailwind CSS

#### Usage
```bash
# Run design token linting
npm run lint:design-tokens

# Run style linting
npm run lint:style

# Run full design system scan
npm run scan:design-system
```

### 2. Visual Regression Testing

**Tools**: Storybook Test Runner + Playwright + reg-cli
**Purpose**: Detect visual changes in components

#### Configuration
- `.storybook/test-runner.js`: Storybook test configuration
- `.regconfig.json`: Visual regression settings
- `playwright.config.ts`: Playwright test configuration

#### Baseline Creation
```bash
# Build Storybook
npm run build-storybook

# Run visual tests (creates baseline on first run)
npm run test:visual

# Run visual regression comparison
npm run scan:visual-regression
```

#### Visual Test Reports
- Results: `./visual-regression/report.html`
- Diffs: `./visual-regression/diff/`
- Expected: `./visual-regression/expected/`

### 3. Accessibility Testing Tools

**Tools**: axe-core + @axe-core/playwright + Storybook a11y addon
**Purpose**: Automated WCAG 2.1 AA compliance testing

#### Automated Checks
- Color contrast ratios (4.5:1 for normal text, 3:1 for large text)
- Keyboard navigation and focus management
- ARIA labels and semantic HTML
- Screen reader compatibility
- Form accessibility

#### Configuration
- `tools/accessibility-test-utils.js`: Comprehensive accessibility test utilities
- `.storybook/test-runner.js`: Integrates axe-core with Storybook
- `tests/design-system-scan.spec.js`: Automated accessibility test suite

#### Usage
```bash
# Run accessibility tests through Storybook
npm run test:a11y

# Run comprehensive accessibility scan with Playwright
npx playwright test

# Run all accessibility checks
npm run scan:design-system
```

### 4. CI/CD Pipeline Integration

**Location**: `.github/workflows/ci.yml`
**Triggers**: Every push and pull request to main/develop branches

#### Pipeline Jobs

1. **Standard Tests** (test job)
   - ESLint linting
   - Stylelint checking
   - Unit tests
   - Build verification

2. **Design System Scan** (design-system-scan job)
   - Accessibility scanning
   - Design token compliance
   - Visual regression testing
   - Result artifact upload

#### Artifacts
- `design-system-scan-results`: Complete scan results and reports
- `accessibility-test-results`: Accessibility test results in JSON/XML format

## Reports and Dashboards

### 1. Accessibility Reports
- **Storybook**: Built-in a11y addon panel shows real-time violations
- **Playwright HTML Report**: Comprehensive accessibility test results at `playwright-report/index.html`
- **JSON Reports**: Machine-readable results in `test-results/design-system-results.json`

### 2. Visual Regression Reports
- **HTML Report**: Interactive diff viewer at `visual-regression/report.html`
- **Individual Diffs**: Side-by-side comparisons in `visual-regression/diff/`

### 3. Design Token Compliance
- **ESLint Output**: Command-line warnings and errors for hardcoded values
- **Stylelint Output**: CSS-specific design token violations

## Usage Guidelines

### For Developers

#### Before Committing
```bash
# Run complete design system scan
npm run scan:all

# Check specific areas
npm run lint:design-tokens  # Check for hardcoded values
npm run test:a11y          # Check accessibility
npm run test:visual        # Check visual changes
```

#### Fixing Violations

**Design Token Issues**:
```tsx
// ❌ Hardcoded colors
className="bg-red-500 text-white"

// ✅ Design tokens
className="bg-primary text-primary-foreground"
```

**Accessibility Issues**:
```tsx
// ❌ Missing labels
<button>Submit</button>

// ✅ Proper labeling
<button aria-label="Submit form">Submit</button>
```

### For CI/CD

The pipeline automatically:
1. Runs all scans on every PR
2. Uploads results as artifacts
3. Fails builds if critical issues are found
4. Provides detailed reports for debugging

### Baseline Management

#### Visual Regression Baselines
```bash
# Update baselines after intentional changes
npm run test:visual -- --update-snapshots

# Review changes before updating
npm run scan:visual-regression
```

#### Accessibility Baselines
- Configure acceptable violation levels in `tools/accessibility-test-utils.js`
- Update WCAG compliance rules in axe configuration

## Troubleshooting

### Common Issues

1. **Storybook not starting**: Ensure port 6006 is available
2. **Playwright browser issues**: Run `npx playwright install --with-deps`
3. **Visual regression false positives**: Check for font rendering differences
4. **Accessibility test failures**: Review Storybook a11y panel for specific violations

### Configuration Updates

- **ESLint rules**: Edit `tools/eslint-plugin-design-tokens/index.js`
- **Stylelint rules**: Edit `.stylelintrc.json`
- **Accessibility rules**: Edit `tools/accessibility-test-utils.js`
- **Visual thresholds**: Edit `.regconfig.json`

## Integration with Existing Workflow

The scanning tools integrate seamlessly with existing development workflow:

1. **Design System Audits**: Results complement manual audit process documented in `docs/design-system/`
2. **Component Development**: Real-time feedback during Storybook development
3. **Code Reviews**: Automated checks provide objective criteria for PR approval
4. **Continuous Monitoring**: Ongoing validation as design system evolves

## Future Enhancements

Planned improvements:
- Integration with design system versioning
- Automated issue creation for violations
- Performance budget monitoring
- Cross-browser visual regression testing
- Integration with design tools (Figma)

---

**Last Updated**: 2024-12-29  
**Version**: 1.0  
**Maintained by**: Design System Team