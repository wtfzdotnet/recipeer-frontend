import type { Meta, StoryObj } from '@storybook/react-vite'
import { RecipeCommandPalette } from './RecipeCommandPalette'
import type { RecipeSearchResult, CommandAction } from './RecipeCommandPalette'

const meta: Meta<typeof RecipeCommandPalette> = {
  title: 'Organisms/RecipeCommandPalette',
  component: RecipeCommandPalette,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

// Mock search results
const mockSearchResults: RecipeSearchResult[] = [
  {
    id: '1',
    name: 'Margherita Pizza',
    cuisine: 'Italian',
    difficulty: 'Medium',
    cookTime: 30,
    rating: 4.5,
  },
  {
    id: '2',
    name: 'Chicken Tikka Masala',
    cuisine: 'Indian',
    difficulty: 'Hard',
    cookTime: 45,
    rating: 4.8,
  },
  {
    id: '3',
    name: 'Caesar Salad',
    cuisine: 'American',
    difficulty: 'Easy',
    cookTime: 15,
    rating: 4.2,
  },
]

// Mock custom actions
const mockActions: CommandAction[] = [
  {
    id: 'import-recipe',
    label: 'Import Recipe from URL',
    description: 'Import a recipe from a website URL',
    group: 'Import',
    onSelect: () => console.log('Import recipe'),
  },
  {
    id: 'export-collection',
    label: 'Export Recipe Collection',
    description: 'Export your recipes to a file',
    group: 'Export',
    onSelect: () => console.log('Export collection'),
  },
]

export const Closed: Story = {
  args: {
    open: false,
    onOpenChange: () => {},
    searchResults: [],
    actions: [],
  },
}

export const Open: Story = {
  args: {
    open: true,
    onOpenChange: () => {},
    searchResults: [],
    actions: [],
  },
}

export const WithSearchResults: Story = {
  args: {
    open: true,
    onOpenChange: () => {},
    searchResults: mockSearchResults,
    actions: [],
    searching: false,
  },
}

export const Searching: Story = {
  args: {
    open: true,
    onOpenChange: () => {},
    searchResults: [],
    actions: [],
    searching: true,
  },
}

export const WithCustomActions: Story = {
  args: {
    open: true,
    onOpenChange: () => {},
    searchResults: [],
    actions: mockActions,
  },
}

export const FullyLoaded: Story = {
  args: {
    open: true,
    onOpenChange: () => {},
    searchResults: mockSearchResults,
    actions: mockActions,
    searching: false,
  },
}

export const Interactive: Story = {
  args: {
    open: true,
    onOpenChange: (open) => {
      console.log('Command palette open state changed:', open)
    },
    searchResults: mockSearchResults,
    actions: mockActions,
    onSearch: (query) => {
      console.log('Search query:', query)
    },
  },
}