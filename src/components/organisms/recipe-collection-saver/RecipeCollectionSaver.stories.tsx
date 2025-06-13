import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
// Simple mock function for stories
const fn = () => () => {};
import RecipeCollectionSaver from './RecipeCollectionSaver';
import type { Collection } from './RecipeCollectionSaver';

// Mock collections data
const mockCollections: Collection[] = [
  {
    id: 'favorites',
    name: 'Favorites',
    description: 'Your favorite recipes',
    isDefault: true,
    recipeCount: 12
  },
  {
    id: 'breakfast',
    name: 'Breakfast Ideas',
    description: 'Quick and easy morning recipes',
    recipeCount: 8
  },
  {
    id: 'healthy',
    name: 'Healthy Choices',
    description: 'Nutritious and balanced meals',
    recipeCount: 15
  },
  {
    id: 'quick',
    name: 'Quick Meals',
    description: 'Ready in 30 minutes or less',
    recipeCount: 23
  },
  {
    id: 'desserts',
    name: 'Sweet Treats',
    description: 'Delicious desserts and baked goods',
    recipeCount: 6
  }
];

const meta = {
  title: 'Components/RecipeCollectionSaver',
  component: RecipeCollectionSaver,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A sophisticated component for saving recipes to collections with support for quick save, collection selection, and inline collection creation.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['heart', 'bookmark', 'plus'],
      description: 'Visual style variant of the save button'
    },
    size: {
      control: 'select', 
      options: ['sm', 'md', 'lg'],
      description: 'Size of the component'
    },
    saveState: {
      control: 'select',
      options: ['idle', 'saving', 'saved', 'error'],
      description: 'Current save state of the component'
    },
    quickSaveToFavorites: {
      control: 'boolean',
      description: 'Enable quick save button for favorites collection'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the component is disabled'
    }
  },
  args: {
    recipeId: 'recipe-123',
    collections: mockCollections,
    onSave: fn(),
    onUnsave: fn(),
    onCreateCollection: fn(),
  },
} satisfies Meta<typeof RecipeCollectionSaver>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default state - not saved to any collections
export const Default: Story = {
  args: {
    savedCollections: [],
    variant: 'heart',
    size: 'md',
    quickSaveToFavorites: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default state with heart variant and quick save to favorites enabled. Recipe is not saved to any collections.'
      }
    }
  }
};

// Saved to favorites only
export const SavedToFavorites: Story = {
  args: {
    savedCollections: ['favorites'],
    variant: 'heart',
    size: 'md',
    quickSaveToFavorites: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Recipe saved to favorites collection only. Heart icon is filled and button shows "Saved" state.'
      }
    }
  }
};

// Saved to multiple collections  
export const SavedToMultiple: Story = {
  args: {
    savedCollections: ['favorites', 'breakfast', 'quick'],
    variant: 'heart',
    size: 'md',
    quickSaveToFavorites: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Recipe saved to multiple collections. Shows count of saved collections.'
      }
    }
  }
};

// Bookmark variant
export const BookmarkVariant: Story = {
  args: {
    savedCollections: ['favorites'],
    variant: 'bookmark',
    size: 'md',
    quickSaveToFavorites: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Bookmark variant with filled bookmark icon when saved.'
      }
    }
  }
};

// Plus variant
export const PlusVariant: Story = {
  args: {
    savedCollections: [],
    variant: 'plus',
    size: 'md',
    quickSaveToFavorites: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Plus variant shows plus icon when not saved, check icon when saved.'
      }
    }
  }
};

export const PlusVariantSaved: Story = {
  args: {
    savedCollections: ['favorites', 'healthy'],
    variant: 'plus',
    size: 'md',
    quickSaveToFavorites: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Plus variant in saved state shows check icon.'
      }
    }
  }
};

// Size variants
export const SmallSize: Story = {
  args: {
    savedCollections: [],
    variant: 'heart',
    size: 'sm',
    quickSaveToFavorites: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Small size variant for compact layouts.'
      }
    }
  }
};

export const LargeSize: Story = {
  args: {
    savedCollections: ['favorites'],
    variant: 'heart',
    size: 'lg', 
    quickSaveToFavorites: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Large size variant for prominent placement.'
      }
    }
  }
};

// Without quick save
export const WithoutQuickSave: Story = {
  args: {
    savedCollections: [],
    variant: 'heart',
    size: 'md',
    quickSaveToFavorites: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Component without quick save functionality. Single button opens collection dropdown.'
      }
    }
  }
};

export const WithoutQuickSaveSaved: Story = {
  args: {
    savedCollections: ['favorites', 'breakfast'],
    variant: 'heart',
    size: 'md',
    quickSaveToFavorites: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Without quick save, showing count of saved collections.'
      }
    }
  }
};

// Save states
export const SavingState: Story = {
  args: {
    savedCollections: [],
    variant: 'heart',
    size: 'md',
    saveState: 'saving',
    quickSaveToFavorites: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading state while saving is in progress. Shows spinner and "Saving..." text.'
      }
    }
  }
};

export const ErrorState: Story = {
  args: {
    savedCollections: [],
    variant: 'heart',
    size: 'md',
    saveState: 'error',
    quickSaveToFavorites: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Error state when save operation fails. Button styling indicates error.'
      }
    }
  }
};

// Disabled state
export const Disabled: Story = {
  args: {
    savedCollections: [],
    variant: 'heart',
    size: 'md',
    disabled: true,
    quickSaveToFavorites: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled state prevents all interactions.'
      }
    }
  }
};

// Empty collections
export const EmptyCollections: Story = {
  args: {
    savedCollections: [],
    collections: [],
    variant: 'heart',
    size: 'md',
    quickSaveToFavorites: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Component behavior when no collections are available. Only shows collection creation option.'
      }
    }
  }
};

// Single collection (no dropdown needed)
export const SingleCollection: Story = {
  args: {
    savedCollections: [],
    collections: [mockCollections[0]], // Only favorites
    variant: 'heart',
    size: 'md',
    quickSaveToFavorites: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'With only one collection available, component still supports dropdown for creating new collections.'
      }
    }
  }
};

// Interactive demo
export const InteractiveDemo: Story = {
  args: {
    savedCollections: ['favorites'],
    variant: 'heart',
    size: 'md',
    quickSaveToFavorites: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo - try clicking the buttons to save/unsave and create new collections. Open dropdown to see all collections.'
      }
    }
  }
};

// Collection variations
export const VariedCollections: Story = {
  args: {
    savedCollections: ['breakfast'],
    collections: [
      {
        id: 'favorites',
        name: 'Favorites',
        isDefault: true,
        recipeCount: 25
      },
      {
        id: 'breakfast', 
        name: 'Breakfast',
        description: 'Morning meals',
        recipeCount: 8
      },
      {
        id: 'no-desc',
        name: 'Collection Without Description',
        recipeCount: 3
      },
      {
        id: 'no-count',
        name: 'Collection Without Count',
        description: 'Some description here'
      },
      {
        id: 'minimal',
        name: 'Minimal Collection'
      }
    ],
    variant: 'bookmark',
    size: 'md',
    quickSaveToFavorites: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates collections with varying amounts of metadata (description, recipe count, etc.)'
      }
    }
  }
};

// Integration with RecipeCard example
export const RecipeCardIntegration: Story = {
  render: () => {
    // Example of how to integrate with RecipeCard
    const collections = mockCollections;
    const [savedCollections, setSavedCollections] = React.useState<string[]>(['favorites']);
    
    const handleSave = (collectionId: string) => {
      setSavedCollections(prev => [...prev, collectionId]);
    };
    
    const handleUnsave = (collectionId: string) => {
      setSavedCollections(prev => prev.filter(id => id !== collectionId));
    };
    
    const handleCreateCollection = (name: string) => {
      console.log('Creating collection:', name);
      // In real implementation, this would create the collection
    };

    return (
      <div className="max-w-sm">
        {/* Recipe Card with integrated collection saver */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
            <span className="text-white text-lg font-semibold">Recipe Image</span>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Mediterranean Pasta Salad</h3>
            <p className="text-gray-600 text-sm mb-3">
              A fresh and flavorful pasta salad with olives, tomatoes, and feta cheese. 
              Perfect for summer gatherings.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1">
                <span>⏱️</span> 20 min
              </span>
              <span className="flex items-center gap-1">
                <span>👥</span> 4 servings
              </span>
              <span className="flex items-center gap-1">
                <span>👨‍🍳</span> Easy
              </span>
            </div>
            <div className="flex gap-2">
              <RecipeCollectionSaver
                recipeId="mediterranean-pasta-salad"
                collections={collections}
                savedCollections={savedCollections}
                onSave={handleSave}
                onUnsave={handleUnsave}
                onCreateCollection={handleCreateCollection}
                variant="heart"
                size="sm"
                quickSaveToFavorites={true}
                className="flex-1"
              />
              <button className="flex-1 px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors">
                View Recipe
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Example of integrating RecipeCollectionSaver with a recipe card. The component replaces the simple save button with full collection management functionality.'
      }
    }
  }
};

// Layout examples - Multiple components
export const LayoutExamples: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Recipe Card Integration</h3>
        <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gradient-to-br from-orange-400 to-red-500"></div>
          <div className="p-4">
            <h4 className="font-semibold text-lg mb-2">Delicious Pasta Recipe</h4>
            <p className="text-gray-600 text-sm mb-4">A wonderful Italian dish perfect for dinner</p>
            <div className="flex gap-2">
              <RecipeCollectionSaver
                recipeId="pasta-123"
                collections={mockCollections}
                savedCollections={['favorites']}
                onSave={fn()}
                onUnsave={fn()}
                onCreateCollection={fn()}
                variant="heart"
                size="sm"
                quickSaveToFavorites={true}
                className="flex-1"
              />
              <button className="flex-1 px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600">
                View Recipe
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Different Variants Side by Side</h3>
        <div className="flex gap-4">
          <RecipeCollectionSaver
            recipeId="recipe-1"
            collections={mockCollections}
            savedCollections={[]}
            onSave={fn()}
            onUnsave={fn()}
            onCreateCollection={fn()}
            variant="heart"
            size="md"
            quickSaveToFavorites={true}
          />
          <RecipeCollectionSaver
            recipeId="recipe-2"
            collections={mockCollections}
            savedCollections={['favorites']}
            onSave={fn()}
            onUnsave={fn()}
            onCreateCollection={fn()}
            variant="bookmark"
            size="md"
            quickSaveToFavorites={true}
          />
          <RecipeCollectionSaver
            recipeId="recipe-3"
            collections={mockCollections}
            savedCollections={['favorites', 'healthy']}
            onSave={fn()}
            onUnsave={fn()}
            onCreateCollection={fn()}
            variant="plus"
            size="md"
            quickSaveToFavorites={true}
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Examples of how the component integrates with recipe cards and different layout scenarios.'
      }
    }
  }
};