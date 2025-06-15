import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContextMenu } from './ContextMenu';
import { 
  Heart, 
  Share, 
  BookmarkPlus, 
  Calendar, 
  ShoppingCart, 
  Star,
  Edit,
  Trash2,
  Copy,
  Download,
  Flag,
  Eye,
  EyeOff
} from 'lucide-react';
import { useState } from 'react';

// Simple mock function for stories
const fn = () => () => {};

const meta = {
  title: 'Molecules/ContextMenu',
  component: ContextMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# ContextMenu Component

The ContextMenu component provides right-click context-sensitive actions for recipes and content. Built on Radix UI for robust accessibility and behavior.

## Features

- **Recipe Actions**: Save, share, add to meal plan, rate recipes
- **Accessibility**: Full keyboard navigation and screen reader support
- **Nested Menus**: Support for submenu structures
- **Checkboxes & Radio**: Interactive menu items with state
- **Touch Support**: Mobile-optimized touch interactions
- **Keyboard Shortcuts**: Display and handle keyboard shortcuts

## Use Cases

- Recipe card context actions
- User-generated content management  
- Community interaction features
- Advanced recipe organization
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Whether the context menu is disabled'
    }
  }
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic recipe context menu
export const RecipeActions: Story = {
  render: () => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    
    const recipeMenuItems = [
      {
        type: 'item' as const,
        label: 'View Recipe',
        icon: <Eye className="h-4 w-4" />,
        onSelect: fn(),
      },
      {
        type: 'separator' as const,
      },
      {
        type: 'checkbox' as const,
        label: 'Add to Favorites',
        icon: <Heart className="h-4 w-4" />,
        checked: isFavorite,
        onSelect: () => setIsFavorite(!isFavorite),
      },
      {
        type: 'checkbox' as const,
        label: 'Bookmark Recipe',
        icon: <BookmarkPlus className="h-4 w-4" />,
        checked: isBookmarked,
        onSelect: () => setIsBookmarked(!isBookmarked),
      },
      {
        type: 'separator' as const,
      },
      {
        type: 'item' as const,
        label: 'Add to Meal Plan',
        icon: <Calendar className="h-4 w-4" />,
        onSelect: fn(),
      },
      {
        type: 'item' as const,
        label: 'Add to Shopping List',
        icon: <ShoppingCart className="h-4 w-4" />,
        onSelect: fn(),
      },
      {
        type: 'separator' as const,
      },
      {
        type: 'submenu' as const,
        label: 'Share Recipe',
        icon: <Share className="h-4 w-4" />,
        items: [
          {
            type: 'item' as const,
            label: 'Copy Link',
            icon: <Copy className="h-4 w-4" />,
            shortcut: '⌘C',
            onSelect: fn(),
          },
          {
            type: 'item' as const,
            label: 'Share to Social',
            onSelect: fn(),
          },
          {
            type: 'item' as const,
            label: 'Send via Email',
            onSelect: fn(),
          },
        ]
      },
      {
        type: 'item' as const,
        label: 'Download PDF',
        icon: <Download className="h-4 w-4" />,
        onSelect: fn(),
      },
    ];
    
    return (
      <div className="p-8">
        <ContextMenu items={recipeMenuItems}>
          <div className="w-80 h-48 bg-card border rounded-lg p-6 cursor-pointer hover:bg-accent/10 transition-colors">
            <div className="h-32 bg-muted rounded mb-4"></div>
            <h3 className="font-semibold text-lg mb-2">Mediterranean Pasta Salad</h3>
            <p className="text-sm text-muted-foreground">Fresh vegetables with herbs and olive oil</p>
            <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
              <Star className="h-3 w-3 fill-current" />
              <span>4.8</span>
              <span>•</span>
              <span>25 min</span>
            </div>
            <p className="text-xs text-center mt-4 text-muted-foreground">
              Right-click for recipe actions
            </p>
          </div>
        </ContextMenu>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Context menu for recipe cards with common actions like save, share, and meal planning.'
      }
    }
  }
};

// Default story
export const Default: Story = {
  args: {
    items: [
      {
        type: 'item',
        label: 'New',
        shortcut: '⌘N',
        onSelect: fn(),
      },
      {
        type: 'item',
        label: 'Open',
        shortcut: '⌘O',
        onSelect: fn(),
      },
      {
        type: 'separator',
      },
      {
        type: 'item',
        label: 'Save',
        shortcut: '⌘S',
        onSelect: fn(),
      },
    ],
  },
  render: (args) => (
    <div className="p-8">
      <ContextMenu {...args}>
        <div className="w-48 h-32 bg-card border rounded-lg flex items-center justify-center cursor-pointer">
          <p className="text-sm text-muted-foreground">Right-click me</p>
        </div>
      </ContextMenu>
    </div>
  ),
};

// Content management menu
export const ContentManagement: Story = {
  render: () => {
    const [visibility, setVisibility] = useState('public');
    
    const managementItems = [
      {
        type: 'item' as const,
        label: 'Edit Recipe',
        icon: <Edit className="h-4 w-4" />,
        shortcut: '⌘E',
        onSelect: fn(),
      },
      {
        type: 'item' as const,
        label: 'Duplicate Recipe',
        icon: <Copy className="h-4 w-4" />,
        onSelect: fn(),
      },
      {
        type: 'separator' as const,
      },
      {
        type: 'submenu' as const,
        label: 'Visibility',
        icon: visibility === 'public' ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />,
        items: [
          {
            type: 'radio' as const,
            label: 'Public',
            value: 'public',
            checked: visibility === 'public',
            onSelect: () => setVisibility('public'),
          },
          {
            type: 'radio' as const,
            label: 'Private',
            value: 'private',
            checked: visibility === 'private',
            onSelect: () => setVisibility('private'),
          },
          {
            type: 'radio' as const,
            label: 'Friends Only',
            value: 'friends',
            checked: visibility === 'friends',
            onSelect: () => setVisibility('friends'),
          },
        ]
      },
      {
        type: 'separator' as const,
      },
      {
        type: 'item' as const,
        label: 'Report Content',
        icon: <Flag className="h-4 w-4" />,
        onSelect: fn(),
      },
      {
        type: 'separator' as const,
      },
      {
        type: 'item' as const,
        label: 'Delete Recipe',
        icon: <Trash2 className="h-4 w-4" />,
        onSelect: fn(),
      },
    ];
    
    return (
      <div className="p-8">
        <ContextMenu items={managementItems}>
          <div className="w-64 p-4 bg-card border rounded-lg cursor-pointer">
            <h3 className="font-medium mb-2">My Chocolate Cake Recipe</h3>
            <p className="text-sm text-muted-foreground mb-3">
              A rich and moist chocolate cake recipe
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="px-2 py-1 bg-primary/10 text-primary rounded">
                {visibility}
              </span>
              <span>•</span>
              <span>Created 2 days ago</span>
            </div>
            <p className="text-xs text-center mt-4 text-muted-foreground">
              Right-click to manage
            </p>
          </div>
        </ContextMenu>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Content management menu for user-created recipes with visibility controls and moderation options.'
      }
    }
  }
};

// Complex nested menu
export const NestedActions: Story = {
  render: () => {
    const nestedItems = [
      {
        type: 'submenu' as const,
        label: 'Add to Collection',
        icon: <BookmarkPlus className="h-4 w-4" />,
        items: [
          {
            type: 'item' as const,
            label: 'Breakfast Favorites',
            onSelect: fn(),
          },
          {
            type: 'item' as const,
            label: 'Quick Meals',
            onSelect: fn(),
          },
          {
            type: 'item' as const,
            label: 'Healthy Options',
            onSelect: fn(),
          },
          {
            type: 'separator' as const,
          },
          {
            type: 'item' as const,
            label: 'Create New Collection...',
            onSelect: fn(),
          },
        ]
      },
      {
        type: 'submenu' as const,
        label: 'Rate Recipe',
        icon: <Star className="h-4 w-4" />,
        items: [
          {
            type: 'item' as const,
            label: '★★★★★ (5 stars)',
            onSelect: fn(),
          },
          {
            type: 'item' as const,
            label: '★★★★☆ (4 stars)',
            onSelect: fn(),
          },
          {
            type: 'item' as const,
            label: '★★★☆☆ (3 stars)',
            onSelect: fn(),
          },
          {
            type: 'item' as const,
            label: '★★☆☆☆ (2 stars)',
            onSelect: fn(),
          },
          {
            type: 'item' as const,
            label: '★☆☆☆☆ (1 star)',
            onSelect: fn(),
          },
        ]
      },
      {
        type: 'separator' as const,
      },
      {
        type: 'submenu' as const,
        label: 'Schedule Cooking',
        icon: <Calendar className="h-4 w-4" />,
        items: [
          {
            type: 'item' as const,
            label: 'Today',
            onSelect: fn(),
          },
          {
            type: 'item' as const,
            label: 'Tomorrow',
            onSelect: fn(),
          },
          {
            type: 'item' as const,
            label: 'This Weekend',
            onSelect: fn(),
          },
          {
            type: 'separator' as const,
          },
          {
            type: 'item' as const,
            label: 'Choose Date...',
            onSelect: fn(),
          },
        ]
      },
    ];
    
    return (
      <div className="p-8">
        <ContextMenu items={nestedItems}>
          <div className="w-72 p-6 bg-card border rounded-lg cursor-pointer">
            <h3 className="font-semibold text-lg mb-2">Asian Fusion Stir Fry</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Colorful vegetables with savory sauce
            </p>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-current" />
                <span>4.6</span>
              </span>
              <span>30 min</span>
              <span>Serves 4</span>
            </div>
            <p className="text-xs text-center mt-4 text-muted-foreground">
              Right-click for nested actions
            </p>
          </div>
        </ContextMenu>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complex nested context menu showing multi-level organization and scheduling features.'
      }
    }
  }
};

// Disabled state
export const Disabled: Story = {
  args: {
    disabled: true,
    items: [
      {
        type: 'item',
        label: 'Action 1',
        onSelect: fn(),
      },
      {
        type: 'item',
        label: 'Action 2',
        onSelect: fn(),
      },
    ],
  },
  render: (args) => (
    <div className="p-8">
      <ContextMenu {...args}>
        <div className="w-48 h-32 bg-muted border rounded-lg flex items-center justify-center cursor-not-allowed opacity-60">
          <p className="text-sm text-muted-foreground">Context menu disabled</p>
        </div>
      </ContextMenu>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Disabled context menu state for when actions are not available.'
      }
    }
  }
};