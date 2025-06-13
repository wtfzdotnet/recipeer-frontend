import type { Meta, StoryObj } from '@storybook/react-vite';
import { NutritionFacts } from './NutritionFacts';
import { NutritionData, AllergenInfo } from './types';

// Sample nutrition data for realistic stories
const sampleNutritionBasic: NutritionData = {
  calories: 350,
  totalFat: 12,
  saturatedFat: 3,
  transFat: 0,
  cholesterol: 25,
  sodium: 480,
  totalCarbohydrates: 45,
  dietaryFiber: 8,
  totalSugars: 12,
  addedSugars: 5,
  protein: 18,
  vitaminD: 2.5,
  calcium: 200,
  iron: 4,
  potassium: 650,
};

const highProteinNutrition: NutritionData = {
  calories: 280,
  totalFat: 8,
  saturatedFat: 2,
  transFat: 0,
  cholesterol: 85,
  sodium: 320,
  totalCarbohydrates: 15,
  dietaryFiber: 3,
  totalSugars: 8,
  addedSugars: 2,
  protein: 35,
  vitaminD: 1.2,
  calcium: 150,
  iron: 6,
  potassium: 890,
};

const ketoNutrition: NutritionData = {
  calories: 420,
  totalFat: 35,
  saturatedFat: 12,
  transFat: 0,
  cholesterol: 95,
  sodium: 280,
  totalCarbohydrates: 8,
  dietaryFiber: 5,
  totalSugars: 3,
  addedSugars: 0,
  protein: 25,
  vitaminD: 3.2,
  calcium: 180,
  iron: 3,
  potassium: 420,
};

const lowSodiumNutrition: NutritionData = {
  calories: 190,
  totalFat: 3,
  saturatedFat: 1,
  transFat: 0,
  cholesterol: 5,
  sodium: 95,
  totalCarbohydrates: 32,
  dietaryFiber: 12,
  totalSugars: 8,
  addedSugars: 0,
  protein: 8,
  vitaminD: 1.8,
  calcium: 120,
  iron: 2,
  potassium: 720,
};

const sampleAllergens: AllergenInfo = {
  contains: ['Milk', 'Eggs', 'Wheat'],
  mayContain: ['Tree nuts', 'Soy'],
  freeFrom: ['Peanuts', 'Fish', 'Shellfish'],
};

const allergenFree: AllergenInfo = {
  contains: [],
  mayContain: [],
  freeFrom: ['Gluten', 'Dairy', 'Nuts', 'Soy', 'Eggs'],
};

const meta: Meta<typeof NutritionFacts> = {
  title: 'Design System/Components/Data Display/NutritionFacts',
  component: NutritionFacts,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Nutrition Facts Component

FDA-compliant nutrition facts panel for displaying detailed nutritional information with per-serving calculations, daily value percentages, dietary compliance indicators, and allergen warnings.

## Features

- **FDA Compliance**: Standard nutrition facts panel layout following FDA guidelines
- **Daily Value Tracking**: Visual progress bars showing percentage of daily recommended values
- **Dietary Compliance**: Automatic badges for keto, low-carb, high-protein, and other dietary patterns
- **Allergen Management**: Clear visual warnings for allergen information
- **Mobile Responsive**: Compact mode for mobile displays
- **Accessibility**: Proper semantic structure and ARIA support

## Use Cases

- **Recipe Detail Pages**: Full nutrition facts panel with all nutrients
- **Recipe Cards**: Compact nutrition summary for quick reference
- **Meal Planning**: Aggregate daily nutrition tracking
- **Dietary Tracking**: Integration with user dietary goals and restrictions

## Dietary Compliance Detection

The component automatically detects and displays badges for:
- **Keto**: < 20g carbs, high fat content
- **Low-Carb**: < 50g carbs  
- **High-Protein**: > 20g protein
- **Low-Fat**: < 30% calories from fat
- **Low-Sodium**: < 140mg sodium
- **High-Fiber**: > 5g dietary fiber
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    nutrition: {
      description: 'Complete nutritional data for the food item',
      control: { type: 'object' }
    },
    servings: {
      description: 'Number of servings in the container/recipe',
      control: { type: 'number', min: 1, max: 20 }
    },
    showDailyValues: {
      description: 'Show daily value percentages and progress bars',
      control: { type: 'boolean' }
    },
    showAllergens: {
      description: 'Display allergen information panel',
      control: { type: 'boolean' }
    },
    compactMode: {
      description: 'Compact layout for mobile or card displays',
      control: { type: 'boolean' }
    },
    allergens: {
      description: 'Allergen information including contains, may contain, and free from',
      control: { type: 'object' }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic nutrition facts display
export const Default: Story = {
  args: {
    nutrition: sampleNutritionBasic,
    servings: 4,
    showDailyValues: true,
    showAllergens: true,
    allergens: sampleAllergens,
  },
};

// High protein meal example
export const HighProtein: Story = {
  args: {
    nutrition: highProteinNutrition,
    servings: 2,
    showDailyValues: true,
    showAllergens: true,
    allergens: {
      contains: ['Eggs'],
      mayContain: ['Dairy'],
      freeFrom: ['Gluten', 'Nuts', 'Soy'],
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'High-protein meal showing protein-focused nutrition profile with dietary compliance badges.'
      }
    }
  }
};

// Keto-friendly recipe
export const KetoFriendly: Story = {
  args: {
    nutrition: ketoNutrition,
    servings: 3,
    showDailyValues: true,
    showAllergens: true,
    allergens: allergenFree,
  },
  parameters: {
    docs: {
      description: {
        story: 'Keto-friendly recipe with high fat, low carb profile. Shows automatic keto compliance badge.'
      }
    }
  }
};

// Low sodium healthy option
export const LowSodium: Story = {
  args: {
    nutrition: lowSodiumNutrition,
    servings: 6,
    showDailyValues: true,
    showAllergens: true,
    allergens: {
      contains: [],
      mayContain: [],
      freeFrom: ['Sodium (< 140mg)', 'Gluten', 'Dairy'],
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Heart-healthy low-sodium recipe with high fiber content and multiple dietary compliance badges.'
      }
    }
  }
};

// Compact mode for mobile/cards
export const CompactMode: Story = {
  args: {
    nutrition: sampleNutritionBasic,
    servings: 4,
    showDailyValues: true,
    showAllergens: false,
    compactMode: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact layout suitable for mobile displays or recipe cards. Hides vitamins/minerals section.'
      }
    }
  }
};

// Without daily values
export const WithoutDailyValues: Story = {
  args: {
    nutrition: sampleNutritionBasic,
    servings: 4,
    showDailyValues: false,
    showAllergens: true,
    allergens: sampleAllergens,
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic nutrition facts without daily value percentages - useful for simplified displays.'
      }
    }
  }
};

// Allergen-heavy food item
export const AllergenWarning: Story = {
  args: {
    nutrition: sampleNutritionBasic,
    servings: 8,
    showDailyValues: true,
    showAllergens: true,
    allergens: {
      contains: ['Milk', 'Eggs', 'Wheat', 'Tree nuts', 'Soy'],
      mayContain: ['Peanuts', 'Sesame'],
      freeFrom: ['Fish', 'Shellfish'],
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing comprehensive allergen warnings for foods with multiple allergens.'
      }
    }
  }
};

// Clean eating recipe
export const CleanEating: Story = {
  args: {
    nutrition: {
      calories: 220,
      totalFat: 8,
      saturatedFat: 1,
      transFat: 0,
      cholesterol: 0,
      sodium: 85,
      totalCarbohydrates: 28,
      dietaryFiber: 9,
      totalSugars: 12,
      addedSugars: 0,
      protein: 12,
      vitaminD: 0,
      calcium: 80,
      iron: 3,
      potassium: 850,
      vitaminA: 150,
      vitaminC: 45,
    },
    servings: 4,
    showDailyValues: true,
    showAllergens: true,
    allergens: allergenFree,
  },
  parameters: {
    docs: {
      description: {
        story: 'Clean eating recipe with no added sugars, low sodium, and high fiber. Shows multiple dietary compliance badges.'
      }
    }
  }
};

// Single serving dessert
export const DessertSingleServing: Story = {
  args: {
    nutrition: {
      calories: 480,
      totalFat: 22,
      saturatedFat: 14,
      transFat: 0.5,
      cholesterol: 85,
      sodium: 320,
      totalCarbohydrates: 65,
      dietaryFiber: 3,
      totalSugars: 58,
      addedSugars: 45,
      protein: 6,
      vitaminD: 0.8,
      calcium: 120,
      iron: 2,
      potassium: 180,
    },
    servings: 1,
    showDailyValues: true,
    showAllergens: true,
    allergens: {
      contains: ['Milk', 'Eggs', 'Wheat'],
      mayContain: ['Tree nuts'],
      freeFrom: ['Peanuts', 'Soy'],
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'High-calorie dessert showing single serving nutrition facts with high sugar and fat content.'
      }
    }
  }
};