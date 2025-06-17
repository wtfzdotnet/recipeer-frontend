import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeToggle } from '../../components/molecules/theme-toggle/ThemeToggle';

const meta: Meta = {
  title: 'Design System/Foundation/Colors',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Enhanced Orange Recipe Theme System

Our sophisticated, warm orange-inspired color palette is designed specifically for modern food and recipe applications. All colors use the OKLCH color space for superior accessibility and perceptual uniformity.

## Enhanced Food Aesthetics

The enhanced theme provides:
- **Richer Orange Saturation**: Improved warm oranges that better complement food imagery
- **Fresh Green Accents**: Complementary greens that evoke freshness and natural ingredients
- **Sophisticated Neutrals**: Warm-toned grays that create an appetizing atmosphere
- **Strategic CTAs**: Enhanced accent colors for better user engagement

## Color Psychology for Food

- **Primary Orange**: Stimulates appetite and creates warmth
- **Fresh Greens**: Convey freshness, health, and natural ingredients  
- **Warm Neutrals**: Provide sophisticated backdrop without competing with food imagery
- **Earth Tones**: Ground the palette in natural, organic feelings

## OKLCH Benefits

OKLCH provides better perceptual uniformity than HSL/RGB, ensuring:
- Consistent lightness perception across colors
- Better accessibility compliance
- More predictable color relationships
- Enhanced dark mode transitions

## Theme Features

- **Food-Inspired Enhancement**: Warmer, more saturated oranges with better food appeal
- **Dark/Light Mode Support**: Full theme switching with improved contrast ratios
- **WCAG AA+ Compliance**: All color combinations exceed accessibility standards
- **Cultural Sensitivity**: Orange remains positive across cultures for food content
- **Modern Recipe Platform Aesthetics**: Aligned with industry-leading platforms
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
              <ColorSwatch 
                name="Success" 
                variable="--success" 
                description="Success states and positive actions"
              />
              <ColorSwatch 
                name="Warning" 
                variable="--warning" 
                description="Warning states and caution indicators"
              />
            </div>
          </section>

          {/* Enhanced Visual Elements Section */}
          <section className="space-y-4 mb-8">
            <h2 className="text-2xl font-semibold border-b pb-2 text-foreground">Enhanced Visual Elements</h2>
            <div className="space-y-6">
              
              {/* Enhanced Recipe Card with New Shadows */}
              <div className="p-recipe-card bg-card border rounded-lg shadow-recipe-card hover:shadow-recipe-card-hover transition-shadow duration-300">
                <h3 className="text-lg font-semibold text-card-foreground mb-3">🍝 Enhanced Recipe Card</h3>
                <div className="space-y-3">
                  <div className="h-32 bg-gradient-to-br from-orange-100 to-red-100 rounded-md shadow-food-image flex items-center justify-center">
                    <span className="text-4xl">🍅</span>
                  </div>
                  <h4 className="font-medium text-card-foreground">Rustic Tomato Basil Pasta</h4>
                  <p className="text-sm text-muted-foreground">Fresh Roma tomatoes, aromatic basil, and authentic Italian olive oil</p>
                  <div className="flex gap-ingredient-gap items-center">
                    <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">🌱 Fresh</span>
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">⏱️ 25 min</span>
                    <span className="text-xs bg-success text-success-foreground px-2 py-1 rounded">✅ Easy</span>
                  </div>
                  <button className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors font-medium">
                    View Full Recipe
                  </button>
                </div>
              </div>

              {/* Spacing Demonstration */}
              <div className="p-6 bg-muted rounded-lg">
                <h3 className="text-lg font-semibold text-foreground mb-3">📏 Enhanced Spacing System</h3>
                <div className="space-y-content-gap">
                  <div className="bg-card p-4 rounded border">
                    <h4 className="font-medium mb-2">Recipe Card Spacing (1.5rem)</h4>
                    <p className="text-sm text-muted-foreground">Optimal padding for recipe cards</p>
                  </div>
                  <div className="bg-card p-6 rounded border">
                    <h4 className="font-medium mb-ingredient-gap">Ingredient List</h4>
                    <div className="space-y-ingredient-gap text-sm">
                      <div>• 2 cups fresh basil leaves</div>
                      <div>• 4 large tomatoes, diced</div>
                      <div>• 3 tbsp extra virgin olive oil</div>
                    </div>
                  </div>
                </div>
              </div>
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