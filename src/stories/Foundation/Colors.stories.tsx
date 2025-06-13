import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = {
  title: 'Design System/Foundation/Colors',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Color System

Our color palette is built for accessibility and visual harmony. All color combinations meet WCAG 2.1 AA contrast requirements.

## Color Tokens

The design system uses semantic color names that describe the purpose rather than the visual appearance.
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
  value, 
  description 
}: { 
  name: string; 
  variable: string; 
  value: string; 
  description: string; 
}) => (
  <div className="flex items-center space-x-4 p-4 border rounded-lg">
    <div 
      className="w-16 h-16 rounded-lg border-2 border-gray-200"
      style={{ backgroundColor: value }}
    />
    <div className="flex-1">
      <h3 className="font-semibold text-lg">{name}</h3>
      <p className="text-sm text-gray-600 font-mono">{variable}</p>
      <p className="text-sm text-gray-500">{description}</p>
      <p className="text-xs text-gray-400 font-mono">{value}</p>
    </div>
  </div>
);

export const AllColors = {
  render: () => (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-6">Design System Colors</h1>
        
        <section className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold border-b pb-2">Primary Colors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ColorSwatch 
              name="Primary" 
              variable="--primary" 
              value="hsl(var(--primary))"
              description="Main brand color used for primary actions"
            />
            <ColorSwatch 
              name="Primary Foreground" 
              variable="--primary-foreground" 
              value="hsl(var(--primary-foreground))"
              description="Text color on primary backgrounds"
            />
          </div>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold border-b pb-2">Secondary Colors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ColorSwatch 
              name="Secondary" 
              variable="--secondary" 
              value="hsl(var(--secondary))"
              description="Secondary actions and subtle backgrounds"
            />
            <ColorSwatch 
              name="Secondary Foreground" 
              variable="--secondary-foreground" 
              value="hsl(var(--secondary-foreground))"
              description="Text color on secondary backgrounds"
            />
          </div>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold border-b pb-2">Neutral Colors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ColorSwatch 
              name="Background" 
              variable="--background" 
              value="hsl(var(--background))"
              description="Main background color"
            />
            <ColorSwatch 
              name="Foreground" 
              variable="--foreground" 
              value="hsl(var(--foreground))"
              description="Main text color"
            />
            <ColorSwatch 
              name="Muted" 
              variable="--muted" 
              value="hsl(var(--muted))"
              description="Subtle background color"
            />
            <ColorSwatch 
              name="Muted Foreground" 
              variable="--muted-foreground" 
              value="hsl(var(--muted-foreground))"
              description="Muted text color"
            />
          </div>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold border-b pb-2">Status Colors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ColorSwatch 
              name="Destructive" 
              variable="--destructive" 
              value="hsl(var(--destructive))"
              description="Error states and destructive actions"
            />
            <ColorSwatch 
              name="Destructive Foreground" 
              variable="--destructive-foreground" 
              value="hsl(var(--destructive-foreground))"
              description="Text color on destructive backgrounds"
            />
          </div>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold border-b pb-2">Interactive Colors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ColorSwatch 
              name="Border" 
              variable="--border" 
              value="hsl(var(--border))"
              description="Default border color"
            />
            <ColorSwatch 
              name="Input" 
              variable="--input" 
              value="hsl(var(--input))"
              description="Input field border color"
            />
            <ColorSwatch 
              name="Ring" 
              variable="--ring" 
              value="hsl(var(--ring))"
              description="Focus ring color"
            />
          </div>
        </section>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  }
};