import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeToggle } from '../../components/molecules/theme-toggle/ThemeToggle';

const meta: Meta = {
  title: 'Design System/Foundation/Colors',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Orange Recipe Theme System

Our warm, orange-inspired color palette is designed specifically for food and recipe applications. All colors use the modern OKLCH color space for better accessibility and perceptual uniformity.

## OKLCH Color Space

OKLCH provides better perceptual uniformity than HSL/RGB, ensuring consistent lightness and chroma across all colors in our palette.

## Theme Features

- **Food-Inspired Colors**: Warm orange tones that complement recipe imagery
- **Dark/Light Mode Support**: Full theme switching with system preference detection
- **WCAG AA+ Compliance**: All color combinations meet accessibility standards
- **Cultural Appropriateness**: Orange is positive across most cultures for food content
        `
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;

const ColorSwatch = ({ 
  name, 
  variable, 
  description,
  showValue = true
}: { 
  name: string; 
  variable: string; 
  description: string; 
  showValue?: boolean;
}) => (
  <div className="flex items-center space-x-4 p-4 border rounded-lg bg-card">
    <div 
      className="w-16 h-16 rounded-lg border-2 border-border"
      style={{ backgroundColor: `var(${variable})` }}
    />
    <div className="flex-1">
      <h3 className="font-semibold text-lg text-card-foreground">{name}</h3>
      <p className="text-sm text-muted-foreground font-mono">{variable}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
      {showValue && (
        <p className="text-xs text-muted-foreground font-mono mt-1">
          var({variable})
        </p>
      )}
    </div>
  </div>
);

export const OrangeThemeShowcase = {
  render: () => (
    <div className="min-h-screen bg-background">
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <div className="p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-foreground">🍳 Orange Recipe Theme</h1>
          <p className="text-lg text-muted-foreground mb-6">
            A warm, food-inspired color system built with OKLCH for better accessibility.
            Toggle between light and dark modes using the button in the top-right corner.
          </p>
          
          <section className="space-y-4 mb-8">
            <h2 className="text-2xl font-semibold border-b pb-2 text-foreground">Primary Colors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ColorSwatch 
                name="Primary" 
                variable="--primary" 
                description="Main orange brand color - warm and food-friendly"
              />
              <ColorSwatch 
                name="Primary Foreground" 
                variable="--primary-foreground" 
                description="Text color on primary backgrounds"
              />
            </div>
          </section>

          <section className="space-y-4 mb-8">
            <h2 className="text-2xl font-semibold border-b pb-2 text-foreground">Background & Text</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ColorSwatch 
                name="Background" 
                variable="--background" 
                description="Main background color"
              />
              <ColorSwatch 
                name="Foreground" 
                variable="--foreground" 
                description="Main text color"
              />
              <ColorSwatch 
                name="Card" 
                variable="--card" 
                description="Card background color"
              />
              <ColorSwatch 
                name="Card Foreground" 
                variable="--card-foreground" 
                description="Text color on cards"
              />
            </div>
          </section>

          <section className="space-y-4 mb-8">
            <h2 className="text-2xl font-semibold border-b pb-2 text-foreground">Secondary & Accent</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ColorSwatch 
                name="Secondary" 
                variable="--secondary" 
                description="Secondary actions and subtle backgrounds"
              />
              <ColorSwatch 
                name="Accent" 
                variable="--accent" 
                description="Accent color for highlights"
              />
              <ColorSwatch 
                name="Muted" 
                variable="--muted" 
                description="Subtle background for less prominent content"
              />
              <ColorSwatch 
                name="Muted Foreground" 
                variable="--muted-foreground" 
                description="Text color for secondary information"
              />
            </div>
          </section>

          <section className="space-y-4 mb-8">
            <h2 className="text-2xl font-semibold border-b pb-2 text-foreground">Interactive Elements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ColorSwatch 
                name="Border" 
                variable="--border" 
                description="Default border color"
              />
              <ColorSwatch 
                name="Input" 
                variable="--input" 
                description="Input field border color"
              />
              <ColorSwatch 
                name="Ring" 
                variable="--ring" 
                description="Focus ring color"
              />
              <ColorSwatch 
                name="Destructive" 
                variable="--destructive" 
                description="Error states and destructive actions"
              />
            </div>
          </section>

          {/* Theme Demo Section */}
          <section className="space-y-4 mb-8">
            <h2 className="text-2xl font-semibold border-b pb-2 text-foreground">Theme Examples</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Recipe Card Example */}
              <div className="p-6 bg-card border rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-card-foreground mb-3">🥘 Recipe Card</h3>
                <div className="space-y-2">
                  <h4 className="font-medium text-card-foreground">Mediterranean Pasta</h4>
                  <p className="text-sm text-muted-foreground">Fresh basil, tomatoes, and olive oil</p>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">30 min</span>
                    <button className="text-primary hover:text-primary/80 text-sm font-medium">View Recipe</button>
                  </div>
                </div>
              </div>

              {/* Form Example */}
              <div className="p-6 bg-card border rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-card-foreground mb-3">📝 Form Elements</h3>
                <div className="space-y-3">
                  <input 
                    type="text" 
                    placeholder="Recipe name" 
                    className="w-full p-2 border border-input rounded bg-background text-foreground"
                  />
                  <button className="w-full bg-primary text-primary-foreground py-2 rounded hover:bg-primary/90">
                    Save Recipe
                  </button>
                  <button className="w-full bg-destructive text-destructive-foreground py-2 rounded hover:bg-destructive/90">
                    Delete Recipe
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  }
};

export const AllColors = OrangeThemeShowcase;