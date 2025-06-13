import type { Meta, StoryObj } from '@storybook/react-vite';
import { AspectRatio } from './aspect-ratio';
import { Badge } from '../badge';
import { Play, Volume2, Maximize } from 'lucide-react';

const meta: Meta<typeof AspectRatio> = {
  title: 'Design System/Components/Data Display/Aspect Ratio',
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
    <div className="w-[450px]">
      <AspectRatio ratio={16 / 9}>
        <div className="rounded-lg bg-gradient-to-br from-orange-100 to-red-100 h-full w-full flex items-center justify-center">
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
          <div className="bg-gradient-to-br from-pink-100 to-red-100 h-full w-full flex items-center justify-center">
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
              <Badge variant="success" className="bg-green-500 text-white border-none">
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

// Video content
export const VideoContent: Story = {
  render: () => (
    <div className="space-y-6 max-w-4xl">
      {/* Main cooking video - 16:9 */}
      <div>
        <h3 className="text-lg font-semibold mb-3">How to Make Perfect Carbonara</h3>
        <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg border">
          <div className="bg-gradient-to-br from-gray-900 to-gray-700 h-full w-full flex items-center justify-center relative">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Play className="h-8 w-8 text-white ml-1" />
              </div>
              <p className="text-white text-lg font-medium">Full Recipe Tutorial</p>
              <p className="text-white/80 text-sm">15:32</p>
            </div>
            
            {/* Video controls overlay */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-black/50 rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <Play className="h-4 w-4 text-white" />
                  <div className="flex-1 h-1 bg-white/20 rounded-full">
                    <div className="h-full w-1/3 bg-red-500 rounded-full"></div>
                  </div>
                  <span className="text-white text-xs">5:12 / 15:32</span>
                  <Volume2 className="h-4 w-4 text-white" />
                  <Maximize className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </AspectRatio>
      </div>
      
      {/* Quick tips videos - 9:16 (mobile/story format) */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Quick Cooking Tips</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: "Perfect Egg Technique", duration: "0:45", emoji: "🥚" },
            { title: "Grating Cheese Tips", duration: "0:30", emoji: "🧀" },
            { title: "Pan Temperature", duration: "1:12", emoji: "🍳" },
            { title: "Pasta Water Secret", duration: "0:52", emoji: "💧" }
          ].map((tip, i) => (
            <AspectRatio key={i} ratio={9 / 16} className="overflow-hidden rounded-lg border">
              <div className="bg-gradient-to-b from-blue-900 to-purple-900 h-full w-full flex flex-col items-center justify-center relative p-4">
                <span className="text-4xl mb-3">{tip.emoji}</span>
                <p className="text-white text-sm font-medium text-center">{tip.title}</p>
                <p className="text-white/80 text-xs">{tip.duration}</p>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Play className="h-5 w-5 text-white ml-0.5" />
                  </div>
                </div>
              </div>
            </AspectRatio>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Video content examples showing different aspect ratios for cooking tutorials and quick tips in both landscape and portrait formats.'
      }
    }
  }
};

// Recipe cards with different ratios
export const RecipeCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
      {/* Standard recipe card - 4:3 */}
      <div className="border rounded-lg overflow-hidden">
        <AspectRatio ratio={4 / 3}>
          <div className="bg-gradient-to-br from-orange-100 to-red-100 h-full w-full flex items-center justify-center">
            <span className="text-6xl">🍝</span>
          </div>
        </AspectRatio>
        <div className="p-4">
          <h4 className="font-semibold mb-2">Pasta Carbonara</h4>
          <p className="text-sm text-muted-foreground mb-3">Classic Roman pasta dish</p>
          <div className="flex gap-1">
            <Badge variant="cuisine" size="sm">Italian</Badge>
            <Badge variant="difficulty" size="sm">Medium</Badge>
          </div>
        </div>
      </div>
      
      {/* Widescreen recipe card - 16:9 */}
      <div className="border rounded-lg overflow-hidden">
        <AspectRatio ratio={16 / 9}>
          <div className="bg-gradient-to-br from-green-100 to-blue-100 h-full w-full flex items-center justify-center">
            <span className="text-6xl">🥗</span>
          </div>
        </AspectRatio>
        <div className="p-4">
          <h4 className="font-semibold mb-2">Caesar Salad</h4>
          <p className="text-sm text-muted-foreground mb-3">Fresh and crispy classic</p>
          <div className="flex gap-1">
            <Badge variant="dietary" size="sm">Vegetarian</Badge>
            <Badge variant="success" size="sm">Easy</Badge>
          </div>
        </div>
      </div>
      
      {/* Square recipe card - 1:1 */}
      <div className="border rounded-lg overflow-hidden">
        <AspectRatio ratio={1 / 1}>
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 h-full w-full flex items-center justify-center">
            <span className="text-6xl">🧁</span>
          </div>
        </AspectRatio>
        <div className="p-4">
          <h4 className="font-semibold mb-2">Vanilla Cupcakes</h4>
          <p className="text-sm text-muted-foreground mb-3">Sweet and fluffy treats</p>
          <div className="flex gap-1">
            <Badge variant="secondary" size="sm">Dessert</Badge>
            <Badge variant="success" size="sm">Easy</Badge>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Recipe cards demonstrating different aspect ratios for various types of recipe imagery and layouts.'
      }
    }
  }
};

// Mobile responsive
export const MobileResponsive: Story = {
  render: () => (
    <div className="max-w-sm mx-auto space-y-4">
      {/* Mobile hero image - 16:9 */}
      <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg">
        <div className="bg-gradient-to-br from-orange-200 to-red-200 h-full w-full flex items-center justify-center relative">
          <span className="text-6xl">🍕</span>
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" size="sm" className="bg-black/50 text-white border-none">
              4.8 ⭐
            </Badge>
          </div>
        </div>
      </AspectRatio>
      
      {/* Mobile process shots - 3:2 */}
      <div className="grid grid-cols-2 gap-2">
        <AspectRatio ratio={3 / 2} className="overflow-hidden rounded-lg">
          <div className="bg-gradient-to-br from-yellow-100 to-orange-100 h-full w-full flex items-center justify-center">
            <span className="text-3xl">🍅</span>
          </div>
        </AspectRatio>
        
        <AspectRatio ratio={3 / 2} className="overflow-hidden rounded-lg">
          <div className="bg-gradient-to-br from-green-100 to-emerald-100 h-full w-full flex items-center justify-center">
            <span className="text-3xl">🧀</span>
          </div>
        </AspectRatio>
      </div>
      
      {/* Mobile video tutorial - 16:9 */}
      <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg border">
        <div className="bg-gradient-to-br from-gray-800 to-gray-600 h-full w-full flex items-center justify-center relative">
          <div className="text-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2 mx-auto">
              <Play className="h-5 w-5 text-white ml-0.5" />
            </div>
            <p className="text-white text-sm font-medium">Pizza Tutorial</p>
            <p className="text-white/80 text-xs">8:45</p>
          </div>
        </div>
      </AspectRatio>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Mobile-optimized aspect ratios for recipe content on small screens with touch-friendly interactions.'
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
          { ratio: 1 / 1, name: "1:1", description: "Square - Perfect for social media and thumbnails", color: "from-purple-100 to-pink-100" },
          { ratio: 9 / 16, name: "9:16", description: "Portrait - Mobile stories and vertical videos", color: "from-orange-100 to-red-100" }
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