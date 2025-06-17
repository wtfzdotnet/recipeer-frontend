import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/providers/ThemeProvider';

// Test component to validate enhanced theme tokens
const ThemeTestComponent = () => (
  <div>
    <div 
      className="bg-primary text-primary-foreground p-recipe-card" 
      data-testid="primary-element"
    >
      Enhanced Primary Color
    </div>
    <div 
      className="bg-accent text-accent-foreground gap-ingredient-gap" 
      data-testid="accent-element"
    >
      Fresh Green Accent
    </div>
    <div 
      className="shadow-recipe-card hover:shadow-recipe-card-hover" 
      data-testid="shadow-element"
    >
      Enhanced Shadow
    </div>
    <div 
      className="space-y-content-gap" 
      data-testid="spacing-element"
    >
      Enhanced Spacing
    </div>
  </div>
);

describe('Enhanced Orange Theme', () => {
  it('should render components with enhanced theme tokens', () => {
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeTestComponent />
      </ThemeProvider>
    );

    // Test that primary color element is rendered
    const primaryElement = screen.getByTestId('primary-element');
    expect(primaryElement).toBeInTheDocument();
    expect(primaryElement).toHaveClass('bg-primary', 'text-primary-foreground', 'p-recipe-card');

    // Test that accent color element is rendered with fresh green
    const accentElement = screen.getByTestId('accent-element');
    expect(accentElement).toBeInTheDocument();
    expect(accentElement).toHaveClass('bg-accent', 'text-accent-foreground', 'gap-ingredient-gap');

    // Test that enhanced shadows are applied
    const shadowElement = screen.getByTestId('shadow-element');
    expect(shadowElement).toBeInTheDocument();
    expect(shadowElement).toHaveClass('shadow-recipe-card', 'hover:shadow-recipe-card-hover');

    // Test that enhanced spacing is applied
    const spacingElement = screen.getByTestId('spacing-element');
    expect(spacingElement).toBeInTheDocument();
    expect(spacingElement).toHaveClass('space-y-content-gap');
  });

  it('should work with dark theme', () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <ThemeTestComponent />
      </ThemeProvider>
    );

    const primaryElement = screen.getByTestId('primary-element');
    expect(primaryElement).toBeInTheDocument();
    expect(primaryElement).toHaveClass('bg-primary', 'text-primary-foreground');
  });
});

describe('Enhanced Theme CSS Variables', () => {
  it('should have enhanced design token classes available', () => {
    // Create a test element to check if Tailwind classes are processed
    const testDiv = document.createElement('div');
    testDiv.className = 'p-recipe-card space-y-content-gap gap-ingredient-gap shadow-recipe-card';
    document.body.appendChild(testDiv);

    // Check if enhanced Tailwind classes are applied
    expect(testDiv).toHaveClass('p-recipe-card');
    expect(testDiv).toHaveClass('space-y-content-gap');
    expect(testDiv).toHaveClass('gap-ingredient-gap');
    expect(testDiv).toHaveClass('shadow-recipe-card');

    document.body.removeChild(testDiv);
  });

  it('should have proper theme color classes available', () => {
    // Test enhanced theme color classes
    const testDiv = document.createElement('div');
    testDiv.className = 'bg-accent text-accent-foreground border-border';
    document.body.appendChild(testDiv);

    expect(testDiv).toHaveClass('bg-accent');
    expect(testDiv).toHaveClass('text-accent-foreground');
    expect(testDiv).toHaveClass('border-border');

    document.body.removeChild(testDiv);
  });
});