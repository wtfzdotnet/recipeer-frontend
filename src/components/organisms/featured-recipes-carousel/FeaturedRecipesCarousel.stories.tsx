import type { Meta, StoryObj } from '@storybook/react-vite'
import { FeaturedRecipesCarousel } from './FeaturedRecipesCarousel'
import type { FeaturedRecipe } from './FeaturedRecipesCarousel'

const meta: Meta<typeof FeaturedRecipesCarousel> = {
  title: 'Organisms/FeaturedRecipesCarousel',
  component: FeaturedRecipesCarousel,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

// Mock featured recipe data
const mockFeaturedRecipes: FeaturedRecipe[] = [
  {
    id: '1',
    name: 'Authentic Italian Carbonara',
    description: 'A classic Roman pasta dish with eggs, cheese, and pancetta',
    image: 'https://images.unsplash.com/photo-1481070414801-51fd732d7184?w=400&h=300&fit=crop',
    cuisine: 'Italian',
    cultural: 'Roman',
    difficulty: 'Medium',
    cookTime: 20,
    servings: 4,
    rating: 4.8,
    featured: true,
    seasonal: false,
    tags: ['pasta', 'traditional', 'quick'],
  },
  {
    id: '2',
    name: 'Japanese Chicken Teriyaki',
    description: 'Tender chicken glazed with homemade teriyaki sauce',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
    cuisine: 'Japanese',
    cultural: 'Tokyo',
    difficulty: 'Easy',
    cookTime: 25,
    servings: 3,
    rating: 4.6,
    featured: true,
    seasonal: false,
    tags: ['chicken', 'glazed', 'umami'],
  },
  {
    id: '3',
    name: 'Mexican Street Tacos',
    description: 'Authentic street-style tacos with fresh toppings',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
    cuisine: 'Mexican',
    cultural: 'Oaxacan',
    difficulty: 'Easy',
    cookTime: 15,
    servings: 2,
    rating: 4.7,
    featured: false,
    seasonal: true,
    tags: ['tacos', 'street food', 'fresh'],
  },
  {
    id: '4',
    name: 'French Coq au Vin',
    description: 'Classic French braised chicken in red wine',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    cuisine: 'French',
    cultural: 'Burgundian',
    difficulty: 'Hard',
    cookTime: 90,
    servings: 6,
    rating: 4.9,
    featured: true,
    seasonal: false,
    tags: ['chicken', 'wine', 'elegant'],
  },
  {
    id: '5',
    name: 'Indian Butter Chicken',
    description: 'Creamy tomato-based curry with tender chicken',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop',
    cuisine: 'Indian',
    cultural: 'Punjabi',
    difficulty: 'Medium',
    cookTime: 40,
    servings: 4,
    rating: 4.5,
    featured: false,
    seasonal: false,
    tags: ['curry', 'creamy', 'spices'],
  },
  {
    id: '6',
    name: 'Thai Green Curry',
    description: 'Aromatic coconut curry with fresh herbs',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop',
    cuisine: 'Thai',
    cultural: 'Central Thai',
    difficulty: 'Medium',
    cookTime: 30,
    servings: 4,
    rating: 4.4,
    featured: false,
    seasonal: true,
    tags: ['curry', 'coconut', 'herbs'],
  },
]

export const Default: Story = {
  args: {
    recipes: mockFeaturedRecipes,
    title: 'Featured Recipes',
    showCultural: true,
    showSeasonal: true,
    loading: false,
    favoriteRecipes: ['2', '4'],
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

export const CulturalFocus: Story = {
  args: {
    recipes: mockFeaturedRecipes.filter(recipe => recipe.cultural),
    title: 'Cultural Heritage Recipes',
    showCultural: true,
    showSeasonal: false,
    loading: false,
  },
}

export const SeasonalCollection: Story = {
  args: {
    recipes: mockFeaturedRecipes.filter(recipe => recipe.seasonal),
    title: 'Seasonal Specialties',
    showCultural: false,
    showSeasonal: true,
    loading: false,
  },
}

export const FeaturedOnly: Story = {
  args: {
    recipes: mockFeaturedRecipes.filter(recipe => recipe.featured),
    title: 'Editor\'s Choice',
    showCultural: true,
    showSeasonal: true,
    loading: false,
    favoriteRecipes: ['1', '4'],
  },
}

export const Interactive: Story = {
  args: {
    recipes: mockFeaturedRecipes,
    loading: false,
    onRecipeSelect: (recipe) => {
      console.log('Recipe selected:', recipe)
    },
    onRecipeFavorite: (recipeId) => {
      console.log('Recipe favorited:', recipeId)
    },
  },
}