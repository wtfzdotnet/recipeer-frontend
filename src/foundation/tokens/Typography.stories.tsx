import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = {
  title: 'Design System/Foundation/Typography',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Typography Foundation

Core typography design tokens and font combinations for the Recipeer design system.

## Font Families

### Primary Combinations

#### Classic & Cozy
- **Headings:** Playfair Display (elegant serif)
- **Body:** Source Sans Pro (clean, readable sans-serif) 
- **Accent:** Caveat (casual handwritten script)

#### Modern Warmth
- **Headings:** Poppins (friendly rounded sans-serif)
- **Body:** Open Sans (highly readable, friendly)
- **Accent:** Merriweather (warm serif for emphasis)

#### Rustic Charm
- **Headings:** Crimson Text (traditional serif with character)
- **Body:** Lato (neutral, professional sans-serif)
- **Accent:** Dancing Script (playful handwritten script)

## Font Weights
- Light: 300
- Regular: 400  
- Medium: 500
- Semibold: 600
- Bold: 700

## Implementation

Add the following Google Fonts links to your document head:

\`\`\`html
<!-- Classic Cozy -->
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Source+Sans+Pro:wght@300;400;500;600&family=Caveat:wght@400;500;600;700&display=swap" rel="stylesheet">

<!-- Modern Warmth -->  
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;500;600&family=Merriweather:wght@300;400;700&display=swap" rel="stylesheet">

<!-- Rustic Charm -->
<link href="https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&family=Lato:wght@300;400;700&family=Dancing+Script:wght@400;500;600;700&display=swap" rel="stylesheet">
\`\`\`

## Usage

Use the Typography component to implement these combinations in your application.
        `
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;

export const TypographyTokens = {
  render: () => (
    <div className="space-y-8 p-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Typography Scale</h2>
        <div className="space-y-4">
          <div className="flex items-baseline space-x-4">
            <span className="text-6xl font-bold">H1</span>
            <span className="text-gray-600">text-6xl - 60px</span>
          </div>
          <div className="flex items-baseline space-x-4">
            <span className="text-5xl font-bold">H2</span>
            <span className="text-gray-600">text-5xl - 48px</span>
          </div>
          <div className="flex items-baseline space-x-4">
            <span className="text-4xl font-bold">H3</span>
            <span className="text-gray-600">text-4xl - 36px</span>
          </div>
          <div className="flex items-baseline space-x-4">
            <span className="text-3xl font-bold">H4</span>
            <span className="text-gray-600">text-3xl - 30px</span>
          </div>
          <div className="flex items-baseline space-x-4">
            <span className="text-2xl font-bold">H5</span>
            <span className="text-gray-600">text-2xl - 24px</span>
          </div>
          <div className="flex items-baseline space-x-4">
            <span className="text-xl font-bold">H6</span>
            <span className="text-gray-600">text-xl - 20px</span>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Body Text Sizes</h2>
        <div className="space-y-2">
          <div className="flex items-baseline space-x-4">
            <span className="text-lg">Large body text</span>
            <span className="text-gray-600 text-sm">text-lg - 18px</span>
          </div>
          <div className="flex items-baseline space-x-4">
            <span className="text-base">Regular body text</span>
            <span className="text-gray-600 text-sm">text-base - 16px</span>
          </div>
          <div className="flex items-baseline space-x-4">
            <span className="text-sm">Small text</span>
            <span className="text-gray-600 text-sm">text-sm - 14px</span>
          </div>
          <div className="flex items-baseline space-x-4">
            <span className="text-xs">Extra small text</span>
            <span className="text-gray-600 text-sm">text-xs - 12px</span>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Font Weights</h2>
        <div className="space-y-2">
          <div className="font-light">Light - 300</div>
          <div className="font-normal">Regular - 400</div>
          <div className="font-medium">Medium - 500</div>
          <div className="font-semibold">Semibold - 600</div>
          <div className="font-bold">Bold - 700</div>
        </div>
      </section>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic typography scale and font weight tokens used throughout the design system.'
      }
    }
  }
};