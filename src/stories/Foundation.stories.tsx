import type { Meta, StoryObj } from '@storybook/react-vite';
import { cn } from '../lib/utils';

const meta: Meta = {
  title: 'Design System/Foundation',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Design tokens and foundational elements that power the Recipeer design system.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Color Palette Component
const ColorPalette = () => {
  const colors = [
    {
      name: 'Primary',
      description: 'Main brand color for CTAs and emphasis',
      shades: [
        { name: 'primary', class: 'bg-primary', text: 'text-primary-foreground' },
        { name: 'primary-foreground', class: 'bg-primary-foreground border', text: 'text-primary' },
      ]
    },
    {
      name: 'Secondary',
      description: 'Supporting colors for subtle actions',
      shades: [
        { name: 'secondary', class: 'bg-secondary', text: 'text-secondary-foreground' },
        { name: 'secondary-foreground', class: 'bg-secondary-foreground', text: 'text-secondary' },
      ]
    },
    {
      name: 'Background & Surface',
      description: 'Page and card backgrounds',
      shades: [
        { name: 'background', class: 'bg-background border', text: 'text-foreground' },
        { name: 'card', class: 'bg-card border', text: 'text-card-foreground' },
        { name: 'popover', class: 'bg-popover border', text: 'text-popover-foreground' },
      ]
    },
    {
      name: 'Text Colors',
      description: 'Primary and muted text colors',
      shades: [
        { name: 'foreground', class: 'bg-foreground', text: 'text-background' },
        { name: 'muted-foreground', class: 'bg-muted-foreground', text: 'text-background' },
      ]
    },
    {
      name: 'Interactive',
      description: 'Hover states and accents',
      shades: [
        { name: 'accent', class: 'bg-accent', text: 'text-accent-foreground' },
        { name: 'muted', class: 'bg-muted', text: 'text-muted-foreground' },
      ]
    },
    {
      name: 'Feedback',
      description: 'Error states and destructive actions',
      shades: [
        { name: 'destructive', class: 'bg-destructive', text: 'text-destructive-foreground' },
        { name: 'destructive-foreground', class: 'bg-destructive-foreground border', text: 'text-destructive' },
      ]
    },
    {
      name: 'Borders & Input',
      description: 'Form elements and dividers',
      shades: [
        { name: 'border', class: 'bg-border', text: 'text-foreground' },
        { name: 'input', class: 'bg-input', text: 'text-foreground' },
        { name: 'ring', class: 'bg-ring', text: 'text-background' },
      ]
    }
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Color System</h1>
        <p className="text-muted-foreground mb-8">
          Semantic color tokens built for accessibility and theming. All colors automatically adapt to light and dark modes.
        </p>
      </div>

      {colors.map((colorGroup) => (
        <div key={colorGroup.name} className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold">{colorGroup.name}</h3>
            <p className="text-sm text-muted-foreground">{colorGroup.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {colorGroup.shades.map((shade) => (
              <div key={shade.name} className="space-y-2">
                <div className={cn(
                  'h-20 rounded-lg flex items-center justify-center',
                  shade.class,
                  shade.text
                )}>
                  <span className="font-medium">{shade.name}</span>
                </div>
                <div className="text-xs space-y-1">
                  <div className="font-mono">--{shade.name}</div>
                  <div className="text-muted-foreground">{shade.class}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// Typography Scale Component
const TypographyScale = () => {
  const scales = [
    { name: 'text-xs', size: '12px', class: 'text-xs', use: 'Captions, labels' },
    { name: 'text-sm', size: '14px', class: 'text-sm', use: 'Small text, metadata' },
    { name: 'text-base', size: '16px', class: 'text-base', use: 'Body text, paragraphs' },
    { name: 'text-lg', size: '18px', class: 'text-lg', use: 'Large body text, ingredient lists' },
    { name: 'text-xl', size: '20px', class: 'text-xl', use: 'Subheadings, recipe steps' },
    { name: 'text-2xl', size: '24px', class: 'text-2xl', use: 'Section headers' },
    { name: 'text-3xl', size: '30px', class: 'text-3xl', use: 'Page titles' },
    { name: 'text-4xl', size: '36px', class: 'text-4xl', use: 'Recipe names, hero titles' },
    { name: 'text-5xl', size: '48px', class: 'text-5xl', use: 'Display headlines' },
  ];

  const weights = [
    { name: 'font-light', class: 'font-light', weight: '300' },
    { name: 'font-normal', class: 'font-normal', weight: '400' },
    { name: 'font-medium', class: 'font-medium', weight: '500' },
    { name: 'font-semibold', class: 'font-semibold', weight: '600' },
    { name: 'font-bold', class: 'font-bold', weight: '700' },
  ];

  return (
    <div className="p-8 space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Typography System</h1>
        <p className="text-muted-foreground mb-8">
          Systematic typography scale and weights designed for optimal readability in recipe content.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b pb-2">Text Sizes</h2>
        <div className="space-y-6">
          {scales.map((scale) => (
            <div key={scale.name} className="flex items-center gap-8">
              <div className="w-24 text-sm font-mono text-muted-foreground">
                {scale.name}
              </div>
              <div className="w-16 text-sm text-muted-foreground">
                {scale.size}
              </div>
              <div className={cn('flex-1', scale.class)}>
                The quick brown fox jumps over the lazy dog
              </div>
              <div className="w-48 text-sm text-muted-foreground">
                {scale.use}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b pb-2">Font Weights</h2>
        <div className="space-y-4">
          {weights.map((weight) => (
            <div key={weight.name} className="flex items-center gap-8">
              <div className="w-32 text-sm font-mono text-muted-foreground">
                {weight.name}
              </div>
              <div className="w-12 text-sm text-muted-foreground">
                {weight.weight}
              </div>
              <div className={cn('flex-1 text-xl', weight.class)}>
                Perfect Recipe Typography
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// Spacing Scale Component
const SpacingScale = () => {
  const spacings = [
    { name: 'space-px', size: '1px', class: 'h-px', rem: '0.0625rem' },
    { name: 'space-0.5', size: '2px', class: 'h-0.5', rem: '0.125rem' },
    { name: 'space-1', size: '4px', class: 'h-1', rem: '0.25rem' },
    { name: 'space-1.5', size: '6px', class: 'h-1.5', rem: '0.375rem' },
    { name: 'space-2', size: '8px', class: 'h-2', rem: '0.5rem' },
    { name: 'space-2.5', size: '10px', class: 'h-2.5', rem: '0.625rem' },
    { name: 'space-3', size: '12px', class: 'h-3', rem: '0.75rem' },
    { name: 'space-3.5', size: '14px', class: 'h-3.5', rem: '0.875rem' },
    { name: 'space-4', size: '16px', class: 'h-4', rem: '1rem' },
    { name: 'space-5', size: '20px', class: 'h-5', rem: '1.25rem' },
    { name: 'space-6', size: '24px', class: 'h-6', rem: '1.5rem' },
    { name: 'space-8', size: '32px', class: 'h-8', rem: '2rem' },
    { name: 'space-10', size: '40px', class: 'h-10', rem: '2.5rem' },
    { name: 'space-12', size: '48px', class: 'h-12', rem: '3rem' },
    { name: 'space-16', size: '64px', class: 'h-16', rem: '4rem' },
    { name: 'space-20', size: '80px', class: 'h-20', rem: '5rem' },
    { name: 'space-24', size: '96px', class: 'h-24', rem: '6rem' },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Spacing System</h1>
        <p className="text-muted-foreground mb-8">
          Consistent spacing scale based on a 4px grid system for harmonious layouts.
        </p>
      </div>

      <div className="space-y-4">
        {spacings.map((spacing) => (
          <div key={spacing.name} className="flex items-center gap-8">
            <div className="w-24 text-sm font-mono text-muted-foreground">
              {spacing.name}
            </div>
            <div className="w-16 text-sm text-muted-foreground">
              {spacing.size}
            </div>
            <div className="w-20 text-sm text-muted-foreground">
              {spacing.rem}
            </div>
            <div className={cn('bg-primary rounded', spacing.class, 'w-24')} />
          </div>
        ))}
      </div>
    </div>
  );
};

// Shadow Scale Component
const ShadowScale = () => {
  const shadows = [
    { name: 'shadow-xs', class: 'shadow-xs', use: 'Subtle borders, form inputs' },
    { name: 'shadow-sm', class: 'shadow-sm', use: 'Small cards, buttons' },
    { name: 'shadow-md', class: 'shadow-md', use: 'Cards, dropdowns' },
    { name: 'shadow-lg', class: 'shadow-lg', use: 'Modals, large cards' },
    { name: 'shadow-xl', class: 'shadow-xl', use: 'Hero sections, overlays' },
    { name: 'shadow-2xl', class: 'shadow-2xl', use: 'Popovers, tooltips' },
    { name: 'shadow-inner', class: 'shadow-inner', use: 'Inset elements, inputs' },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Shadow System</h1>
        <p className="text-muted-foreground mb-8">
          Depth and elevation through consistent shadow scales for layered interfaces.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {shadows.map((shadow) => (
          <div key={shadow.name} className="space-y-4">
            <div className={cn(
              'h-24 bg-card border rounded-lg flex items-center justify-center',
              shadow.class
            )}>
              <span className="font-medium">{shadow.name}</span>
            </div>
            <div className="text-sm text-muted-foreground text-center">
              {shadow.use}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Colors: Story = {
  render: () => <ColorPalette />,
  parameters: {
    docs: {
      description: {
        story: 'Color system with semantic tokens that automatically adapt between light and dark themes.',
      },
    },
  },
};

export const Typography: Story = {
  render: () => <TypographyScale />,
  parameters: {
    docs: {
      description: {
        story: 'Typography scale and font weights optimized for recipe content readability.',
      },
    },
  },
};

export const Spacing: Story = {
  render: () => <SpacingScale />,
  parameters: {
    docs: {
      description: {
        story: 'Spacing scale based on a 4px grid system for consistent layouts.',
      },
    },
  },
};

export const Shadows: Story = {
  render: () => <ShadowScale />,
  parameters: {
    docs: {
      description: {
        story: 'Shadow system for creating depth and visual hierarchy in interfaces.',
      },
    },
  },
};

export const AllTokens: Story = {
  render: () => (
    <div className="space-y-16">
      <ColorPalette />
      <TypographyScale />
      <SpacingScale />
      <ShadowScale />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Complete overview of all design tokens in the Recipeer design system.',
      },
    },
  },
};