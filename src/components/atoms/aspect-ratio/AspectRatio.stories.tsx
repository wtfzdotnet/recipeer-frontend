import type { Meta, StoryObj } from '@storybook/react-vite';
import { AspectRatio } from './aspect-ratio';
import { Badge } from '@/components/atoms/badge';
import { Play, Volume2, Maximize } from 'lucide-react';

const meta: Meta<typeof AspectRatio> = {
  title: 'Atoms/AspectRatio',
  component: AspectRatio,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Aspect Ratio Component

A component for maintaining consistent aspect ratios for recipe images, instruction videos, and other media content across different screen sizes.

## Features

- **Consistent Ratios**: Maintains proportions across all devices
- **Responsive**: Scales properly with container width
- **Media Optimized**: Perfect for images and videos
- **Accessibility**: Proper semantic structure for media content
- **Performance**: CSS-based aspect ratio maintenance

## Use Cases

- **Recipe Images**: Hero images, step photos, ingredient shots
- **Instruction Videos**: Cooking demonstrations, technique videos
- **Photo Galleries**: Recipe photo collections
- **Social Media**: Recipe posts with consistent dimensions
- **Thumbnails**: Preview images for recipe cards and lists

## Common Ratios

- **16:9** - Video content, hero images
- **4:3** - Traditional photography, detailed shots
- **1:1** - Social media, Instagram-style posts
- **3:2** - Standard photography ratio
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    ratio: {
      control: { type: 'number', min: 0.1, max: 5, step: 0.1 },
      description: 'Aspect ratio (width / height)'
    }
  }
};

export default meta;
type Story = StoryObj<typeof AspectRatio>;

// Default aspect ratio
export const Default: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <AspectRatio ratio={16 / 9}>
        <div className="rounded-lg bg-gradient-to-br from-secondary to-accent h-full w-full flex items-center justify-center">
          <span className="text-6xl">🍝</span>
        </div>
      </AspectRatio>
    </div>
  ),
};

// Recipe image gallery
export const RecipeImageGallery: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl">
      {/* Hero image - 16:9 */}
      <div className="md:col-span-2 lg:col-span-2">
        <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg">
          <div className="bg-gradient-to-br from-orange-200 to-red-200 h-full w-full flex items-center justify-center relative">
            <span className="text-8xl">🍝</span>
            <div className="absolute bottom-4 left-4">
              <Badge variant="secondary" className="bg-black/50 text-white border-none">
                Hero Image
              </Badge>
            </div>
          </div>
        </AspectRatio>
      </div>
      
      {/* Process shots - 4:3 */}
      <div className="space-y-4">
        <AspectRatio ratio={4 / 3} className="overflow-hidden rounded-lg">
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 h-full w-full flex items-center justify-center relative">
            <span className="text-4xl">🧄</span>
            <div className="absolute bottom-2 left-2">
              <Badge variant="secondary" size="sm" className="bg-black/50 text-white border-none">
                Step 1
              </Badge>
            </div>
          </div>
        </AspectRatio>
        
        <AspectRatio ratio={4 / 3} className="overflow-hidden rounded-lg">
          <div className="bg-gradient-to-br from-green-100 to-blue-100 h-full w-full flex items-center justify-center relative">
            <span className="text-4xl">🍳</span>
            <div className="absolute bottom-2 left-2">
              <Badge variant="secondary" size="sm" className="bg-black/50 text-white border-none">
                Step 2
              </Badge>
            </div>
          </div>
        </AspectRatio>
      </div>
      
      {/* Square social media format - 1:1 */}
      <div className="grid grid-cols-2 gap-2">
        <AspectRatio ratio={1 / 1} className="overflow-hidden rounded-lg">
          <div className="bg-gradient-to-br from-yellow-100 to-orange-100 h-full w-full flex items-center justify-center">
            <span className="text-2xl">🧀</span>
          </div>
        </AspectRatio>
        
        <AspectRatio ratio={1 / 1} className="overflow-hidden rounded-lg">
          <div className="bg-gradient-to-br from-muted to-accent h-full w-full flex items-center justify-center">
            <span className="text-2xl">🥓</span>
          </div>
        </AspectRatio>
        
        <AspectRatio ratio={1 / 1} className="overflow-hidden rounded-lg">
          <div className="bg-gradient-to-br from-green-100 to-emerald-100 h-full w-full flex items-center justify-center">
            <span className="text-2xl">🌿</span>
          </div>
        </AspectRatio>
        
        <AspectRatio ratio={1 / 1} className="overflow-hidden rounded-lg">
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 h-full w-full flex items-center justify-center">
            <span className="text-2xl">🍷</span>
          </div>
        </AspectRatio>
      </div>
      
      {/* Final dish - 3:2 standard photo */}
      <div className="md:col-span-2 lg:col-span-3">
        <AspectRatio ratio={3 / 2} className="overflow-hidden rounded-lg">
          <div className="bg-gradient-to-br from-amber-100 to-orange-100 h-full w-full flex items-center justify-center relative">
            <span className="text-8xl">🍽️</span>
            <div className="absolute bottom-4 right-4">
              <Badge variant="success" className="bg-success text-success-foreground border-none">
                Final Dish
              </Badge>
            </div>
          </div>
        </AspectRatio>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Recipe image gallery showing different aspect ratios for various types of food photography and social media formats.'
      }
    }
  }
};

// Comparison of all ratios
export const AspectRatioComparison: Story = {
  render: () => (
    <div className="space-y-6 max-w-4xl">
      <h3 className="text-lg font-semibold">Common Aspect Ratios</h3>
      
      <div className="space-y-4">
        {[
          { ratio: 16 / 9, name: "16:9", description: "Widescreen - Perfect for video content and hero images", color: "from-blue-100 to-cyan-100" },
          { ratio: 4 / 3, name: "4:3", description: "Traditional - Great for detailed food photography", color: "from-green-100 to-emerald-100" },
          { ratio: 3 / 2, name: "3:2", description: "Standard Photo - Classic photography ratio", color: "from-yellow-100 to-amber-100" },
          { ratio: 1 / 1, name: "1:1", description: "Square - Perfect for social media and thumbnails", color: "from-purple-100 to-pink-100" }
        ].map((item, i) => (
          <div key={i} className="border rounded-lg p-4">
            <div className="flex items-center gap-4 mb-3">
              <h4 className="font-semibold">{item.name}</h4>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
            <div className="w-64">
              <AspectRatio ratio={item.ratio} className="overflow-hidden rounded-lg">
                <div className={`bg-gradient-to-br ${item.color} h-full w-full flex items-center justify-center`}>
                  <span className="font-mono text-sm">{item.name}</span>
                </div>
              </AspectRatio>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Visual comparison of common aspect ratios used in recipe and food content with their typical use cases.'
      }
    }
  }
};