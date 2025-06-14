import type { Meta, StoryObj } from '@storybook/react-vite'
import { IngredientCombobox } from './IngredientCombobox'
import type { Ingredient } from './IngredientCombobox'

const meta: Meta<typeof IngredientCombobox> = {
  title: 'Molecules/IngredientCombobox',
  component: IngredientCombobox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

// Mock ingredients data
const mockIngredients: Ingredient[] = [
  {
    id: '1',
    name: 'Tomatoes',
    category: 'Vegetables',
    commonNames: ['Roma tomatoes', 'Cherry tomatoes'],
    cultural: ['Italian', 'Mediterranean'],
  },
  {
    id: '2',
    name: 'Basil',
    category: 'Herbs',
    commonNames: ['Fresh basil', 'Sweet basil'],
    cultural: ['Italian', 'Thai'],
  },
  {
    id: '3',
    name: 'Mozzarella',
    category: 'Dairy',
    commonNames: ['Fresh mozzarella', 'Buffalo mozzarella'],
    cultural: ['Italian'],
  },
  {
    id: '4',
    name: 'Soy Sauce',
    category: 'Condiments',
    commonNames: ['Shoyu', 'Light soy sauce', 'Dark soy sauce'],
    cultural: ['Japanese', 'Chinese'],
  },
  {
    id: '5',
    name: 'Garam Masala',
    category: 'Spices',
    commonNames: ['Garam masala powder'],
    cultural: ['Indian'],
  },
  {
    id: '6',
    name: 'Coconut Milk',
    category: 'Dairy Alternatives',
    commonNames: ['Canned coconut milk', 'Fresh coconut milk'],
    cultural: ['Thai', 'Indian', 'Caribbean'],
  },
  {
    id: '7',
    name: 'Lime',
    category: 'Fruits',
    commonNames: ['Fresh lime', 'Lime juice'],
    cultural: ['Mexican', 'Thai', 'Vietnamese'],
  },
  {
    id: '8',
    name: 'Tortillas',
    category: 'Grains',
    commonNames: ['Corn tortillas', 'Flour tortillas'],
    cultural: ['Mexican'],
  },
]

export const Default: Story = {
  args: {
    ingredients: mockIngredients,
    selectedIngredients: [],
    placeholder: 'Search ingredients...',
    multiple: true,
  },
}

export const Loading: Story = {
  args: {
    ingredients: [],
    loading: true,
  },
}

export const SingleSelection: Story = {
  args: {
    ingredients: mockIngredients,
    selectedIngredients: [],
    multiple: false,
    placeholder: 'Choose one ingredient...',
  },
}

export const WithSelected: Story = {
  args: {
    ingredients: mockIngredients,
    selectedIngredients: ['1', '2', '3'],
    multiple: true,
  },
}

export const ItalianCuisineFilter: Story = {
  args: {
    ingredients: mockIngredients,
    selectedIngredients: [],
    culturalFilter: 'Italian',
    multiple: true,
  },
}

export const ThaiCuisineFilter: Story = {
  args: {
    ingredients: mockIngredients,
    selectedIngredients: [],
    culturalFilter: 'Thai',
    multiple: true,
  },
}

export const MexicanCuisineFilter: Story = {
  args: {
    ingredients: mockIngredients,
    selectedIngredients: [],
    culturalFilter: 'Mexican',
    multiple: true,
  },
}

export const Interactive: Story = {
  args: {
    ingredients: mockIngredients,
    selectedIngredients: ['4'],
    multiple: true,
    onIngredientsChange: (ingredients) => {
      console.log('Selected ingredients:', ingredients)
    },
  },
}