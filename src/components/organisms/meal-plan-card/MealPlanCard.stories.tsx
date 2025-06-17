import type { Meta, StoryObj } from '@storybook/react-vite';
import { LocaleProvider } from '@/providers/LocaleProvider';
import { MealPlanCard, type MealPlan, type Recipe } from './MealPlanCard';

// Simple mock function for stories
const mockFn = () => () => {};

const meta: Meta<typeof MealPlanCard> = {
  title: 'Organisms/MealPlanCard',
  component: MealPlanCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A comprehensive meal planning card for organizing and managing scheduled meals with recipes, nutrition info, and interactive features.'
      }
    }
  },
  decorators: [
    (Story) => (
      <LocaleProvider defaultLocale="en-US">
        <div className="w-[400px]">
          <Story />
        </div>
      </LocaleProvider>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['daily', 'weekly', 'calendar'],
      description: 'Display variant for different planning views'
    },
    allowEditing: {
      control: 'boolean',
      description: 'Whether editing actions are enabled'
    },
    draggable: {
      control: 'boolean', 
      description: 'Whether drag and drop is enabled'
    },
    onEdit: { action: 'edited' },
    onComplete: { action: 'completed' },
    onRemove: { action: 'removed' },
    onNotesEdit: { action: 'notes-edited' },
  },
  args: {
    onEdit: mockFn(),
    onComplete: mockFn(),
    onRemove: mockFn(),
    onNotesEdit: mockFn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample recipe data for stories
const sampleRecipe: Recipe = {
  id: 'recipe-1',
  title: 'Mediterranean Quinoa Bowl',
  image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop',
  prepTime: 15,
  cookTime: 20,
  difficulty: 'easy',
  nutrition: {
    calories: 420,
    protein: 18,
    carbs: 52,
    fat: 12,
  }
};

const breakfastRecipe: Recipe = {
  id: 'recipe-2', 
  title: 'Overnight Oats with Berries',
  image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=300&h=200&fit=crop',
  prepTime: 5,
  cookTime: 0,
  difficulty: 'easy',
  nutrition: {
    calories: 280,
    protein: 12,
    carbs: 45,
    fat: 8,
  }
};

const dinnerRecipe: Recipe = {
  id: 'recipe-3',
  title: 'Grilled Salmon with Roasted Vegetables',
  image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&h=200&fit=crop',
  prepTime: 20,
  cookTime: 25,
  difficulty: 'medium',
  nutrition: {
    calories: 650,
    protein: 45,
    carbs: 28,
    fat: 32,
  }
};

// Base meal plan for stories
const baseMealPlan: MealPlan = {
  id: 'meal-1',
  date: new Date('2024-01-15T12:30:00'),
  mealType: 'lunch',
  recipe: sampleRecipe,
  servings: 2,
  prepStatus: 'planned',
};

export const Default: Story = {
  args: {
    mealPlan: baseMealPlan,
    variant: 'daily',
    allowEditing: true,
    draggable: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default meal plan card showing a planned lunch with complete recipe information and editing controls.'
      }
    }
  }
};

export const Breakfast: Story = {
  args: {
    mealPlan: {
      id: 'meal-2',
      date: new Date('2024-01-15T08:00:00'),
      mealType: 'breakfast',
      recipe: breakfastRecipe,
      servings: 1,
      prepStatus: 'planned',
    },
    variant: 'daily',
    allowEditing: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Breakfast meal plan showing no-cook overnight oats with appropriate timing and nutrition.'
      }
    }
  }
};

export const Dinner: Story = {
  args: {
    mealPlan: {
      id: 'meal-3',
      date: new Date('2024-01-15T19:00:00'),
      mealType: 'dinner',
      recipe: dinnerRecipe,
      servings: 2,
      prepStatus: 'planned',
    },
    variant: 'daily',
    allowEditing: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Dinner meal plan showing more complex recipe with higher nutrition values.'
      }
    }
  }
};

export const Completed: Story = {
  args: {
    mealPlan: {
      ...baseMealPlan,
      prepStatus: 'completed',
    },
    variant: 'daily',
    allowEditing: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Completed meal showing visual feedback and reduced opacity to indicate done status.'
      }
    }
  }
};

export const Prepped: Story = {
  args: {
    mealPlan: {
      ...baseMealPlan,
      prepStatus: 'prepped',
    },
    variant: 'daily',
    allowEditing: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Meal in prepped status, indicating ingredients are ready but not yet cooked/consumed.'
      }
    }
  }
};

export const WithNotes: Story = {
  args: {
    mealPlan: {
      ...baseMealPlan,
      notes: 'Add extra feta cheese and reduce salt for better flavor balance.',
    },
    variant: 'daily',
    allowEditing: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Meal plan with personal notes for customization or preparation reminders.'
      }
    }
  }
};

export const Draggable: Story = {
  args: {
    mealPlan: baseMealPlan,
    variant: 'daily',
    allowEditing: true,
    draggable: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Draggable meal plan card with grip handle for reordering meals in planning interface.'
      }
    }
  }
};

export const ReadOnly: Story = {
  args: {
    mealPlan: baseMealPlan,
    variant: 'daily',
    allowEditing: false,
    draggable: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Read-only meal plan card with no editing controls, suitable for viewing shared meal plans.'
      }
    }
  }
};

// Variant stories
export const WeeklyView: Story = {
  args: {
    mealPlan: {
      ...baseMealPlan,
      date: new Date('2024-01-15T12:30:00'),
    },
    variant: 'weekly',
    allowEditing: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Weekly view variant showing abbreviated day name with time for week-long planning.'
      }
    }
  }
};

export const CalendarView: Story = {
  args: {
    mealPlan: {
      ...baseMealPlan,
      date: new Date('2024-01-15T12:30:00'),
    },
    variant: 'calendar',
    allowEditing: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact calendar view for monthly planning overview with minimal recipe details.'
      }
    }
  }
};

// Meal type examples
export const SnackMeal: Story = {
  args: {
    mealPlan: {
      id: 'meal-4',
      date: new Date('2024-01-15T15:30:00'),
      mealType: 'snack',
      recipe: {
        id: 'recipe-4',
        title: 'Greek Yogurt with Honey',
        prepTime: 2,
        cookTime: 0,
        difficulty: 'easy',
        nutrition: {
          calories: 150,
          protein: 12,
          carbs: 18,
          fat: 3,
        }
      },
      servings: 1,
      prepStatus: 'planned',
    },
    variant: 'daily',
    allowEditing: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Snack meal plan showing quick, light option with minimal preparation time.'
      }
    }
  }
};

// RTL Testing
export const RTLTest: Story = {
  args: {
    mealPlan: baseMealPlan,
    variant: 'daily',
    allowEditing: true,
    draggable: true,
  },
  decorators: [
    (Story) => (
      <div dir="rtl" className="rtl">
        <LocaleProvider defaultLocale="ar-SA">
          <div className="w-[400px]">
            <Story />
          </div>
        </LocaleProvider>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'RTL (Right-to-Left) layout testing for Arabic and Hebrew language support.'
      }
    }
  }
};

// Multiple servings example
export const LargeServings: Story = {
  args: {
    mealPlan: {
      ...baseMealPlan,
      servings: 6,
      recipe: {
        ...sampleRecipe,
        title: 'Family-Style Pasta Bake',
      }
    },
    variant: 'daily',
    allowEditing: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Meal plan with larger servings showing how nutrition scales appropriately.'
      }
    }
  }
};

// Layout examples
export const MealPlanGrid: Story = {
  render: () => (
    <LocaleProvider defaultLocale="en-US">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-[800px]">
        <MealPlanCard
          mealPlan={{
            id: 'meal-breakfast',
            date: new Date('2024-01-15T08:00:00'),
            mealType: 'breakfast',
            recipe: breakfastRecipe,
            servings: 1,
            prepStatus: 'completed',
          }}
          variant="daily"
          allowEditing={true}
          onEdit={mockFn()}
          onComplete={mockFn()}
          onRemove={mockFn()}
        />
        <MealPlanCard
          mealPlan={{
            id: 'meal-lunch',
            date: new Date('2024-01-15T12:30:00'),
            mealType: 'lunch',
            recipe: sampleRecipe,
            servings: 2,
            prepStatus: 'prepped',
          }}
          variant="daily"
          allowEditing={true}
          onEdit={mockFn()}
          onComplete={mockFn()}
          onRemove={mockFn()}
        />
        <MealPlanCard
          mealPlan={{
            id: 'meal-dinner',
            date: new Date('2024-01-15T19:00:00'),
            mealType: 'dinner',
            recipe: dinnerRecipe,
            servings: 2,
            prepStatus: 'planned',
            notes: 'Prepare vegetables in advance'
          }}
          variant="daily"
          allowEditing={true}
          onEdit={mockFn()}
          onComplete={mockFn()}
          onRemove={mockFn()}
        />
        <MealPlanCard
          mealPlan={{
            id: 'meal-snack',
            date: new Date('2024-01-15T15:30:00'),
            mealType: 'snack',
            recipe: {
              id: 'recipe-snack',
              title: 'Mixed Nuts & Fruit',
              prepTime: 1,
              cookTime: 0,
              difficulty: 'easy',
              nutrition: {
                calories: 120,
                protein: 4,
                carbs: 8,
                fat: 9,
              }
            },
            servings: 1,
            prepStatus: 'planned',
          }}
          variant="daily"
          allowEditing={true}
          onEdit={mockFn()}
          onComplete={mockFn()}
          onRemove={mockFn()}
        />
      </div>
    </LocaleProvider>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Grid layout showing a full day of meal planning with different meal types and statuses.'
      }
    }
  }
};