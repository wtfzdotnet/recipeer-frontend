# Accessibility Compliance Checklist (WCAG 2.1 AA)

## Overview

This checklist ensures components meet Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. Each component should be evaluated against these criteria during design system audits.

## Principle 1: Perceivable

### 1.1 Text Alternatives
- [ ] **1.1.1 Non-text Content (A)**: All images, icons, and non-text content have appropriate alternative text
  - [ ] Decorative images use empty alt attributes (`alt=""`)
  - [ ] Functional images have descriptive alt text
  - [ ] Icons have accessible names via aria-label or sr-only text
  - [ ] Complex images have detailed descriptions

### 1.2 Time-based Media
- [ ] **1.2.1 Audio-only and Video-only (A)**: Pre-recorded audio and video have alternatives
- [ ] **1.2.2 Captions (A)**: Live and pre-recorded video have captions
- [ ] **1.2.3 Audio Description (A)**: Pre-recorded video has audio descriptions
- [ ] **1.2.4 Captions (Live) (AA)**: Live audio content has captions
- [ ] **1.2.5 Audio Description (AA)**: Pre-recorded video has comprehensive audio descriptions

### 1.3 Adaptable
- [ ] **1.3.1 Info and Relationships (A)**: Information and relationships are programmatically determinable
  - [ ] Headings use proper heading tags (h1-h6)
  - [ ] Lists use proper list markup (ul, ol, li)
  - [ ] Tables use proper table markup with headers
  - [ ] Form labels are associated with their controls
  - [ ] Related form controls are grouped with fieldset/legend

- [ ] **1.3.2 Meaningful Sequence (A)**: Content order is logical when linearized
  - [ ] Tab order follows visual order
  - [ ] Reading order makes sense with CSS disabled
  - [ ] Focus order is logical and predictable

- [ ] **1.3.3 Sensory Characteristics (A)**: Instructions don't rely solely on sensory characteristics
  - [ ] Don't rely only on color to convey information
  - [ ] Don't rely only on shape, size, position, or sound
  - [ ] Provide text alternatives for visual cues

- [ ] **1.3.4 Orientation (AA)**: Content is not restricted to single orientation
  - [ ] Component works in both portrait and landscape
  - [ ] No orientation restrictions unless essential

- [ ] **1.3.5 Identify Input Purpose (AA)**: Input purpose can be programmatically determined
  - [ ] Form inputs use appropriate autocomplete attributes
  - [ ] Input types match their purpose (email, tel, url, etc.)

### 1.4 Distinguishable
- [ ] **1.4.1 Use of Color (A)**: Color is not the only way to convey information
  - [ ] Error states use icons or text in addition to color
  - [ ] Status indicators have textual or iconic alternatives
  - [ ] Interactive elements have non-color indicators

- [ ] **1.4.2 Audio Control (A)**: Auto-playing audio can be controlled
  - [ ] Audio that plays for >3 seconds has controls
  - [ ] Users can pause, stop, or control volume

- [ ] **1.4.3 Contrast (Minimum) (AA)**: Text has sufficient contrast
  - [ ] Normal text: 4.5:1 contrast ratio minimum
  - [ ] Large text (18pt+/14pt+ bold): 3:1 contrast ratio minimum
  - [ ] Text on images meets contrast requirements
  - [ ] Both light and dark themes meet requirements

- [ ] **1.4.4 Resize Text (AA)**: Text can be resized up to 200% without assistive technology
  - [ ] Text remains readable when zoomed to 200%
  - [ ] No horizontal scrolling at 200% zoom
  - [ ] All functionality remains available

- [ ] **1.4.5 Images of Text (AA)**: Text is used instead of images of text when possible
  - [ ] No images of text unless customizable or essential
  - [ ] CSS text styling preferred over text images

- [ ] **1.4.10 Reflow (AA)**: Content reflows at 320px width without horizontal scrolling
  - [ ] Component adapts to narrow viewports
  - [ ] No horizontal scrolling required
  - [ ] All content and functionality available

- [ ] **1.4.11 Non-text Contrast (AA)**: UI components have sufficient contrast
  - [ ] Interactive elements: 3:1 contrast ratio
  - [ ] Focus indicators: 3:1 contrast ratio
  - [ ] Graphical elements: 3:1 contrast ratio

- [ ] **1.4.12 Text Spacing (AA)**: Text spacing can be adjusted without loss of functionality
  - [ ] Line height adjustable to 1.5 times font size
  - [ ] Paragraph spacing adjustable to 2 times font size
  - [ ] Letter spacing adjustable to 0.12 times font size
  - [ ] Word spacing adjustable to 0.16 times font size

- [ ] **1.4.13 Content on Hover or Focus (AA)**: Additional content on hover/focus is controllable
  - [ ] Hoverable: Additional content can be hovered
  - [ ] Dismissible: Content can be dismissed without moving pointer
  - [ ] Persistent: Content remains visible until dismissed or no longer valid

## Principle 2: Operable

### 2.1 Keyboard Accessible
- [ ] **2.1.1 Keyboard (A)**: All functionality available via keyboard
  - [ ] All interactive elements can be reached with Tab
  - [ ] All interactive elements can be activated with Enter or Space
  - [ ] Custom components support keyboard interaction
  - [ ] No keyboard traps (except modal dialogs)

- [ ] **2.1.2 No Keyboard Trap (A)**: Keyboard focus can be moved away from component
  - [ ] Focus can be moved out of component using standard navigation
  - [ ] Modal dialogs implement proper focus trapping with escape routes
  - [ ] Focus returns to appropriate element when trap is released

- [ ] **2.1.4 Character Key Shortcuts (A)**: Single character shortcuts can be disabled or remapped
  - [ ] Single key shortcuts are avoided or configurable
  - [ ] Shortcuts only active when relevant component has focus

### 2.2 Enough Time
- [ ] **2.2.1 Timing Adjustable (A)**: Time limits can be extended or disabled
  - [ ] No automatic timeouts unless essential
  - [ ] Users can extend time limits
  - [ ] Users warned before timeout expires

- [ ] **2.2.2 Pause, Stop, Hide (A)**: Moving, blinking, or auto-updating content can be controlled
  - [ ] Auto-playing content can be paused
  - [ ] Auto-updating content can be controlled
  - [ ] Blinking/moving content can be stopped

### 2.3 Seizures and Physical Reactions
- [ ] **2.3.1 Three Flashes or Below Threshold (A)**: No content flashes more than 3 times per second
  - [ ] No rapid flashing content
  - [ ] Animations respect prefers-reduced-motion
  - [ ] Flashing content below threshold or avoids red

### 2.4 Navigable
- [ ] **2.4.1 Bypass Blocks (A)**: Skip links or other bypass mechanisms provided
  - [ ] Skip navigation links where appropriate
  - [ ] Proper heading structure for navigation
  - [ ] Landmark regions defined

- [ ] **2.4.2 Page Titled (A)**: Pages have descriptive titles
  - [ ] Page titles describe content or purpose
  - [ ] Dynamic content updates page title appropriately

- [ ] **2.4.3 Focus Order (A)**: Focus order preserves meaning and operability
  - [ ] Tab order follows logical sequence
  - [ ] Focus moves predictably through interface
  - [ ] Related elements are grouped in tab order

- [ ] **2.4.4 Link Purpose (A)**: Link purpose can be determined from link text or context
  - [ ] Links have descriptive text
  - [ ] Generic text like "click here" avoided
  - [ ] Context makes link purpose clear

- [ ] **2.4.5 Multiple Ways (AA)**: Multiple ways to locate content within a site
  - [ ] Navigation menus provided
  - [ ] Search functionality available
  - [ ] Site map or other wayfinding tools

- [ ] **2.4.6 Headings and Labels (AA)**: Headings and labels describe topic or purpose
  - [ ] Form labels clearly describe required input
  - [ ] Headings accurately describe content sections
  - [ ] Button text describes action clearly

- [ ] **2.4.7 Focus Visible (AA)**: Focus indicator is visible
  - [ ] All focusable elements have visible focus indicators
  - [ ] Focus indicators have sufficient contrast
  - [ ] Focus indicators are not obscured by other content

### 2.5 Input Modalities
- [ ] **2.5.1 Pointer Gestures (A)**: Multi-point or path-based gestures have alternatives
  - [ ] Complex gestures have simple alternatives
  - [ ] Functionality doesn't require multi-point contact

- [ ] **2.5.2 Pointer Cancellation (A)**: Functions triggered by single-pointer can be cancelled
  - [ ] Down-event doesn't trigger function completion
  - [ ] Up-event completes function with option to abort
  - [ ] Essential functions clearly identified

- [ ] **2.5.3 Label in Name (A)**: Accessible name contains visible label text
  - [ ] Accessible name matches or includes visible label
  - [ ] Speech recognition users can activate controls by visible name

- [ ] **2.5.4 Motion Actuation (A)**: Functions triggered by motion can be disabled
  - [ ] Motion-triggered functions have alternatives
  - [ ] Users can disable motion activation

## Principle 3: Understandable

### 3.1 Readable
- [ ] **3.1.1 Language of Page (A)**: Primary language is programmatically determinable
  - [ ] HTML lang attribute set appropriately
  - [ ] Language changes marked with lang attribute

- [ ] **3.1.2 Language of Parts (AA)**: Language of passages or phrases can be determined
  - [ ] Foreign language content has lang attribute
  - [ ] Proper names and technical terms handled appropriately

### 3.2 Predictable
- [ ] **3.2.1 On Focus (A)**: Focus doesn't trigger unexpected context changes
  - [ ] Receiving focus doesn't automatically change context
  - [ ] Focus changes are predictable and expected

- [ ] **3.2.2 On Input (A)**: Input doesn't trigger unexpected context changes
  - [ ] Changing settings doesn't automatically submit forms
  - [ ] Context changes are initiated by explicit user action

- [ ] **3.2.3 Consistent Navigation (AA)**: Navigation is consistent across pages
  - [ ] Navigation components appear in same relative order
  - [ ] Consistent navigation patterns throughout application

- [ ] **3.2.4 Consistent Identification (AA)**: Components with same functionality identified consistently
  - [ ] Icons have consistent meaning throughout
  - [ ] Buttons with same function have same labels
  - [ ] Form elements consistently identified

### 3.3 Input Assistance
- [ ] **3.3.1 Error Identification (A)**: Errors are identified and described to user
  - [ ] Form errors clearly identified
  - [ ] Error descriptions provided in text
  - [ ] Invalid fields clearly marked

- [ ] **3.3.2 Labels or Instructions (A)**: Labels or instructions provided for user input
  - [ ] All form fields have labels
  - [ ] Required fields clearly marked
  - [ ] Input format instructions provided

- [ ] **3.3.3 Error Suggestion (AA)**: Error correction suggestions provided when possible
  - [ ] Specific error correction suggestions offered
  - [ ] Suggestions don't compromise security
  - [ ] Clear guidance for fixing errors

- [ ] **3.3.4 Error Prevention (AA)**: Errors are prevented for legal, financial, or data modification submissions
  - [ ] Submissions can be reversed, checked, or confirmed
  - [ ] Important actions require confirmation
  - [ ] Form validation prevents submission errors

## Principle 4: Robust

### 4.1 Compatible
- [ ] **4.1.1 Parsing (A)**: Markup is valid and well-formed
  - [ ] HTML validates according to specifications
  - [ ] Elements have complete start and end tags
  - [ ] No duplicate attributes or IDs
  - [ ] Elements properly nested

- [ ] **4.1.2 Name, Role, Value (A)**: Name, role, and value can be programmatically determined
  - [ ] Custom components have appropriate ARIA roles
  - [ ] All form controls have accessible names
  - [ ] State changes communicated to assistive technologies
  - [ ] Values and properties programmatically determinable

- [ ] **4.1.3 Status Messages (AA)**: Status messages can be programmatically determined
  - [ ] Success messages announced to screen readers
  - [ ] Error messages announced appropriately
  - [ ] Progress updates communicated to assistive technologies
  - [ ] Dynamic content changes announced

## Component-Specific Checks

### Forms
- [ ] All inputs have associated labels
- [ ] Required fields marked with required attribute and visual indicator
- [ ] Error messages associated with relevant fields
- [ ] Fieldsets group related inputs with descriptive legends
- [ ] Form validation provides clear, actionable feedback

### Interactive Elements
- [ ] Buttons have descriptive text or aria-label
- [ ] Links clearly indicate their purpose and destination
- [ ] Interactive elements have minimum 44x44px touch target
- [ ] State changes (expanded, selected, etc.) communicated to assistive technologies

### Dynamic Content
- [ ] Live regions announce important updates
- [ ] Loading states announced to screen readers
- [ ] Dynamic content changes don't disrupt user flow
- [ ] Focus management during content updates

### Navigation
- [ ] Skip links provided for main content areas
- [ ] Breadcrumbs use proper markup and ARIA
- [ ] Current page/section clearly indicated
- [ ] Navigation landmarks properly defined

## Testing Methods

### Manual Testing
- [ ] Keyboard-only navigation testing
- [ ] Screen reader testing (NVDA, VoiceOver, JAWS)
- [ ] High contrast mode testing
- [ ] Zoom testing up to 200%
- [ ] Mobile accessibility testing

### Automated Testing
- [ ] axe-core accessibility testing
- [ ] Lighthouse accessibility audit
- [ ] WAVE accessibility evaluation
- [ ] Color contrast analysis tools

### User Testing
- [ ] Testing with users who rely on assistive technologies
- [ ] Usability testing with diverse user groups
- [ ] Feedback collection from accessibility community

## Documentation Requirements

For each component audit, document:
- [ ] Which WCAG criteria were tested
- [ ] Testing methods used
- [ ] Any accessibility issues found
- [ ] Severity level of issues (critical, major, minor)
- [ ] Recommended remediation steps
- [ ] Re-testing requirements

## Compliance Levels

### Priority Levels
- **Critical**: WCAG Level A violations that block access
- **High**: WCAG Level AA violations affecting usability
- **Medium**: WCAG best practices and Level AAA considerations
- **Low**: Enhancement opportunities for better accessibility

### Sign-off Requirements
- [ ] Component passes all Level A criteria
- [ ] Component passes all Level AA criteria
- [ ] Manual testing completed
- [ ] Automated testing passes
- [ ] Documentation updated with accessibility notes

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Resources](https://webaim.org/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
- [Inclusive Components](https://inclusive-components.design/)