import type { Meta, StoryObj } from '@storybook/react-vite';
import { Typography } from '../components/Typography';

const meta: Meta<typeof Typography> = {
  title: 'Design System/Typography',
  component: Typography,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Typography System for Recipe Website

A comprehensive typography system designed to create a warm, inviting feeling for recipe content. 
Features three carefully curated Google Font combinations that balance personality with functionality.

## Font Combinations

### Classic & Cozy
- **Headings:** Playfair Display (elegant serif)
- **Body text:** Source Sans Pro (clean, readable sans-serif)  
- **Accent/handwritten notes:** Caveat (casual script)

### Modern Warmth
- **Headings:** Poppins (friendly, rounded sans-serif)
- **Body text:** Open Sans (highly readable)
- **Recipe titles:** Merriweather (warm serif)

### Rustic Charm  
- **Headings:** Crimson Text (traditional serif)
- **Body text:** Lato (approachable sans-serif)
- **Special elements:** Dancing Script (elegant script)

## Typography Rules

- **Hierarchy:** 6-8 different font sizes for clear hierarchy
- **Spacing:** Generous line spacing (1.6-1.8) and ample white space
- **Readability:** High contrast ratios (4.5:1 minimum)
- **Warmth:** Slightly rounded letter spacing (0.02em) and soft drop shadows
- **Special styling:** Script fonts for personal notes, bold for ingredient names

## Usage

Import the required Google Fonts in your HTML head or CSS:

\`\`\`html
<!-- Classic & Cozy -->
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Source+Sans+Pro:wght@300;400;500;600&family=Caveat:wght@400;500;600;700&display=swap" rel="stylesheet">

<!-- Modern Warmth -->  
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;500;600&family=Merriweather:wght@300;400;700&display=swap" rel="stylesheet">

<!-- Rustic Charm -->
<link href="https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&family=Lato:wght@300;400;700&family=Dancing+Script:wght@400;500;600;700&display=swap" rel="stylesheet">
\`\`\`
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    combination: {
      control: 'select',
      options: ['classic-cozy', 'modern-warmth', 'rustic-charm'],
      description: 'The font combination to use for the typography system',
    },
    showExample: {
      control: 'boolean',
      description: 'Whether to show example recipe content or just the style guide',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Font Combination Stories
export const ClassicAndCozy: Story = {
  args: {
    combination: 'classic-cozy',
    showExample: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Elegant and sophisticated with serif headings, clean body text, and casual script accents. Perfect for traditional and upscale recipe websites.'
      }
    }
  }
};

export const ModernWarmth: Story = {
  args: {
    combination: 'modern-warmth', 
    showExample: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Friendly and approachable with rounded headings and highly readable body text. Great for modern, family-friendly recipe sites.'
      }
    }
  }
};

export const RusticCharm: Story = {
  args: {
    combination: 'rustic-charm',
    showExample: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Traditional and homey with classic serif headings and elegant script elements. Ideal for farmhouse-style and heritage recipe collections.'
      }
    }
  }
};

// Style Guide Stories
export const StyleGuideClassic: Story = {
  args: {
    combination: 'classic-cozy',
    showExample: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete typography style guide showing heading hierarchy, body text styles, and special elements for the Classic & Cozy combination.'
      }
    }
  }
};

export const StyleGuideModern: Story = {
  args: {
    combination: 'modern-warmth',
    showExample: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete typography style guide showing heading hierarchy, body text styles, and special elements for the Modern Warmth combination.'
      }
    }
  }
};

export const StyleGuideRustic: Story = {
  args: {
    combination: 'rustic-charm',
    showExample: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete typography style guide showing heading hierarchy, body text styles, and special elements for the Rustic Charm combination.'
      }
    }
  }
};

// Comparison Story
export const AllCombinations: Story = {
  render: () => (
    <div className="space-y-12">
      {/* Add Google Fonts for demonstration */}
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Source+Sans+Pro:wght@300;400;500;600&family=Caveat:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;500;600&family=Merriweather:wght@300;400;700&family=Crimson+Text:wght@400;600;700&family=Lato:wght@300;400;700&family=Dancing+Script:wght@400;500;600;700&display=swap" />
      
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold mb-4">Typography Combinations Comparison</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Compare all three font combinations side by side to see how they affect the overall feel and readability of recipe content.
        </p>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-center">Classic & Cozy</h2>
          <div className="transform scale-75 origin-top">
            <Typography combination="classic-cozy" showExample={true} />
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-center">Modern Warmth</h2>
          <div className="transform scale-75 origin-top">
            <Typography combination="modern-warmth" showExample={true} />
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-center">Rustic Charm</h2>
          <div className="transform scale-75 origin-top">
            <Typography combination="rustic-charm" showExample={true} />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Side-by-side comparison of all three typography combinations showing how different font choices affect the overall feeling and user experience of recipe content.'
      }
    }
  }
};