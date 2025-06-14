import type { Meta, StoryObj } from '@storybook/react-vite'
import { RecipeDataTable } from './RecipeDataTable'
import type { Recipe } from './RecipeDataTable'

const meta: Meta<typeof RecipeDataTable> = {
  title: 'Organisms/RecipeDataTable',
  component: RecipeDataTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

// Mock recipe data
const mockRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Margherita Pizza',
    cuisine: 'Italian',
    difficulty: 'Medium',
    cookTime: 30,
    servings: 4,
    rating: 4.5,
    tags: ['vegetarian', 'pizza', 'classic'],
    lastModified: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Chicken Tikka Masala',
    cuisine: 'Indian',
    difficulty: 'Hard',
    cookTime: 45,
    servings: 6,
    rating: 4.8,
    tags: ['spicy', 'curry', 'chicken'],
    lastModified: new Date('2024-01-10'),
  },
  {
    id: '3',
    name: 'Caesar Salad',
    cuisine: 'American',
    difficulty: 'Easy',
    cookTime: 15,
    servings: 2,
    rating: 4.2,
    tags: ['salad', 'healthy', 'quick'],
    lastModified: new Date('2024-01-20'),
  },
  {
    id: '4',
    name: 'Sushi Rolls',
    cuisine: 'Japanese',
    difficulty: 'Hard',
    cookTime: 60,
    servings: 4,
    rating: 4.9,
    tags: ['sushi', 'fresh', 'fish'],
    lastModified: new Date('2024-01-12'),
  },
  {
    id: '5',
    name: 'Tacos al Pastor',
    cuisine: 'Mexican',
    difficulty: 'Medium',
    cookTime: 25,
    servings: 3,
    rating: 4.6,
    tags: ['tacos', 'pork', 'spicy'],
    lastModified: new Date('2024-01-18'),
  },
]

export const Default: Story = {
  args: {
    recipes: mockRecipes,
    searchQuery: '',
    loading: false,
  },
}

export const Loading: Story = {
  args: {
    recipes: [],
    loading: true,
  },
}

export const Empty: Story = {
  args: {
    recipes: [],
    loading: false,
  },
}

export const WithSearch: Story = {
  args: {
    recipes: mockRecipes,
    searchQuery: 'pizza',
    loading: false,
  },
}

export const SingleRecipe: Story = {
  args: {
    recipes: [mockRecipes[0]],
    loading: false,
  },
}

export const Interactive: Story = {
  args: {
    recipes: mockRecipes,
    loading: false,
    onRecipeSelect: (recipe) => {
      console.log('Recipe selected:', recipe)
    },
    onSearch: (query) => {
      console.log('Search query:', query)
    },
  },
}