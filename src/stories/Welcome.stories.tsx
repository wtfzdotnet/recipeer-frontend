import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = {
  title: 'Design System/Welcome',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Frontend Recipeer Design System

Welcome to the Frontend Recipeer Design System - a comprehensive collection of reusable components, design tokens, and patterns built with modern web technologies.

## Philosophy

Our design system is built around creating warm, inviting experiences for recipe sharing and cooking. Every component is designed with:

- **Accessibility First**: WCAG 2.1 AA compliance across all components
- **Recipe-Focused**: Tailored for food content and cooking workflows  
- **Consistent**: Unified visual language and interaction patterns
- **Scalable**: Built to grow with your application needs

## Technology Stack

- **React 19.1.0** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Tailwind CSS 4.1.10** - Utility-first styling
- **shadcn/ui 0.0.4** - High-quality component primitives
- **Storybook 9.0.8** - Component documentation and testing
- **Vite 6.3.5** - Fast development and build tooling

## Getting Started

1. **Browse Components** - Explore our component library organized by Atomic Design principles
2. **Review Foundation** - Understand our design tokens (colors, typography, spacing)
3. **See Patterns** - Check out common UI patterns and templates
4. **Read Documentation** - Each component includes usage guidelines and examples

## Atomic Design Architecture

Our components are organized using **Atomic Design methodology** for maximum reusability and consistency:

### Atoms
Basic building blocks that cannot be broken down further:
- **Form Elements** - Button, Input, Label, Checkbox, Switch
- **Text Display** - Typography, badges, avatars
- **Basic UI** - Icons, separators, skeleton loaders

### Molecules  
Simple combinations of atoms that function together as a unit:
- **Form Fields** - Search fields, quantity adjusters, toggles
- **Interactive Elements** - Rating displays, difficulty indicators
- **Control Groups** - Radio groups, select dropdowns, sliders

### Organisms
Complex components that form distinct sections of an interface:
- **Recipe Components** - Recipe cards, ingredient checklists, nutrition facts
- **Navigation** - Headers, menus, collection savers
- **Content Sections** - Complex data displays and interactive components

### Templates
Page-level layouts that define content structure (coming soon):
- **Recipe Layouts** - Recipe detail pages, listing pages
- **Dashboard Layouts** - User profile, collection management

### Patterns
Common UI patterns and page templates combining multiple components.

## Contributing

This design system follows Component-Driven Development principles. When adding new components:

1. Start with design tokens from Foundation
2. Build accessible, reusable components
3. Create comprehensive Storybook documentation
4. Write tests for all component variants
5. Follow existing naming and structure conventions

## Support

For questions, feedback, or contributions, please refer to the project documentation or contact the development team.
        `
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;

export const WelcomePage = {
  render: () => (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          Frontend Recipeer Design System
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A comprehensive design system for creating delightful recipe and cooking experiences
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <div className="text-center p-6 border rounded-lg">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎨</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Foundation</h3>
          <p className="text-sm text-muted-foreground">
            Design tokens for colors, typography, spacing, and visual style
          </p>
        </div>

        <div className="text-center p-6 border rounded-lg">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🧩</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Components</h3>
          <p className="text-sm text-muted-foreground">
            Reusable UI components organized by function and purpose
          </p>
        </div>

        <div className="text-center p-6 border rounded-lg">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📐</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Patterns</h3>
          <p className="text-sm text-muted-foreground">
            Common layouts and templates for consistent user experiences
          </p>
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold mb-3 text-orange-900">🍳 Recipe-Focused Design</h3>
        <p className="text-orange-800 mb-3">
          Every component is designed with cooking and recipe sharing in mind:
        </p>
        <ul className="list-disc list-inside text-orange-800 space-y-1 text-sm">
          <li>Warm, inviting color palettes inspired by food</li>
          <li>Typography combinations that enhance readability of recipe content</li>
          <li>Components optimized for ingredient lists and cooking instructions</li>
          <li>Accessibility features for kitchen environments</li>
        </ul>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Start</h3>
          <div className="space-y-2 text-sm">
            <div className="p-3 bg-gray-50 rounded border-l-4 border-blue-500">
              <strong>1. Foundation</strong> - Start with design tokens and typography
            </div>
            <div className="p-3 bg-gray-50 rounded border-l-4 border-green-500">
              <strong>2. Components</strong> - Explore individual components by category
            </div>
            <div className="p-3 bg-gray-50 rounded border-l-4 border-purple-500">
              <strong>3. Patterns</strong> - See how components work together
            </div>
            <div className="p-3 bg-gray-50 rounded border-l-4 border-orange-500">
              <strong>4. Implementation</strong> - Use in your React application
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Key Features</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>WCAG 2.1 AA accessibility compliance</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Comprehensive TypeScript support</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Interactive Storybook documentation</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Consistent design tokens</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Responsive and mobile-first</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Recipe and cooking optimized</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      disable: true // Hide docs tab for the welcome page
    }
  }
};