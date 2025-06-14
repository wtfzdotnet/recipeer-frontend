import type { Meta, StoryObj } from '@storybook/react-vite'
// Simple mock function for stories
const fn = () => () => {};
import { MealPlanningCalendar, type MealPlan } from './MealPlanningCalendar'
import { useState } from 'react'

const meta: Meta<typeof MealPlanningCalendar> = {
  title: 'Organisms/MealPlanningCalendar',
  component: MealPlanningCalendar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A comprehensive meal planning calendar with cultural content organization and seasonal recipe integration.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    mealPlans: { control: false },
    selectedDate: { control: false },
    onDateSelect: { action: 'dateSelected' },
    onAddMeal: { action: 'addMeal' },
    onEditMeal: { action: 'editMeal' },
    onRemoveMeal: { action: 'removeMeal' },
    loading: {
      control: 'boolean',
      description: 'Loading state for the calendar',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Mock meal plan data
const mockMealPlans: MealPlan[] = [
  {
    id: '1',
    date: new Date('2024-06-15'),
    mealType: 'breakfast',
    recipeName: 'Italian Espresso Pancakes',
    recipeId: 'recipe-1',
    servings: 2,
    prepTime: 20,
    cultural: 'Italian',
  },
  {
    id: '2',
    date: new Date('2024-06-15'),
    mealType: 'lunch',
    recipeName: 'Japanese Chirashi Bowl',
    recipeId: 'recipe-2',
    servings: 1,
    prepTime: 15,
    cultural: 'Japanese',
  },
  {
    id: '3',
    date: new Date('2024-06-15'),
    mealType: 'dinner',
    recipeName: 'Mexican Street Tacos',
    recipeId: 'recipe-3',
    servings: 4,
    prepTime: 45,
    cultural: 'Mexican',
  },
  {
    id: '4',
    date: new Date('2024-06-16'),
    mealType: 'breakfast',
    recipeName: 'French Toast',
    recipeId: 'recipe-4',
    servings: 2,
    prepTime: 15,
    cultural: 'French',
  },
  {
    id: '5',
    date: new Date('2024-06-16'),
    mealType: 'dinner',
    recipeName: 'Thai Green Curry',
    recipeId: 'recipe-5',
    servings: 3,
    prepTime: 60,
    cultural: 'Thai',
  },
  {
    id: '6',
    date: new Date('2024-06-17'),
    mealType: 'lunch',
    recipeName: 'Greek Mediterranean Salad',
    recipeId: 'recipe-6',
    servings: 2,
    prepTime: 10,
    cultural: 'Greek',
  },
  {
    id: '7',
    date: new Date('2024-06-18'),
    mealType: 'breakfast',
    recipeName: 'Indian Masala Chai Oatmeal',
    recipeId: 'recipe-7',
    servings: 1,
    prepTime: 15,
    cultural: 'Indian',
  },
  {
    id: '8',
    date: new Date('2024-06-18'),
    mealType: 'snack',
    recipeName: 'Korean Rice Cakes',
    recipeId: 'recipe-8',
    servings: 1,
    prepTime: 5,
    cultural: 'Korean',
  },
]

// Interactive wrapper for controlled state
const MealPlanningCalendarWithState = (args: typeof Default.args) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(args.selectedDate)
  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <MealPlanningCalendar
        {...args}
        selectedDate={selectedDate}
        onDateSelect={(date) => {
          setSelectedDate(date)
          args.onDateSelect?.(date)
        }}
      />
    </div>
  )
}

export const Default: Story = {
  args: {
    mealPlans: [],
    onDateSelect: fn(),
    onAddMeal: fn(),
    onEditMeal: fn(),
    onRemoveMeal: fn(),
  },
  render: MealPlanningCalendarWithState,
}

export const WithMealPlans: Story = {
  args: {
    mealPlans: mockMealPlans,
    selectedDate: new Date('2024-06-15'),
    onDateSelect: fn(),
    onAddMeal: fn(),
    onEditMeal: fn(),
    onRemoveMeal: fn(),
  },
  render: MealPlanningCalendarWithState,
}

export const Loading: Story = {
  args: {
    mealPlans: [],
    loading: true,
    onDateSelect: fn(),
    onAddMeal: fn(),
    onEditMeal: fn(),
    onRemoveMeal: fn(),
  },
  render: MealPlanningCalendarWithState,
}

export const SelectedDateWithMeals: Story = {
  args: {
    mealPlans: mockMealPlans,
    selectedDate: new Date('2024-06-15'),
    onDateSelect: fn(),
    onAddMeal: fn(),
    onEditMeal: fn(),
    onRemoveMeal: fn(),
  },
  render: MealPlanningCalendarWithState,
  parameters: {
    docs: {
      description: {
        story: 'Calendar showing a date with multiple planned meals including cultural variety.',
      },
    },
  },
}

export const SelectedDateWithoutMeals: Story = {
  args: {
    mealPlans: mockMealPlans,
    selectedDate: new Date('2024-06-20'),
    onDateSelect: fn(),
    onAddMeal: fn(),
    onEditMeal: fn(),
    onRemoveMeal: fn(),
  },
  render: MealPlanningCalendarWithState,
  parameters: {
    docs: {
      description: {
        story: 'Calendar showing a date with no planned meals, displaying the add meal interface.',
      },
    },
  },
}

export const CulturalDiversityShowcase: Story = {
  args: {
    mealPlans: mockMealPlans,
    selectedDate: new Date('2024-06-16'),
    onDateSelect: fn(),
    onAddMeal: fn(),
    onEditMeal: fn(),
    onRemoveMeal: fn(),
  },
  render: MealPlanningCalendarWithState,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the cultural content organization with recipes from multiple cuisines.',
      },
    },
  },
}

export const MealTypeVariety: Story = {
  args: {
    mealPlans: [
      ...mockMealPlans,
      {
        id: '9',
        date: new Date('2024-06-19'),
        mealType: 'snack',
        recipeName: 'Afternoon Tea Cookies',
        recipeId: 'recipe-9',
        servings: 1,
        prepTime: 30,
        cultural: 'British',
      },
    ],
    selectedDate: new Date('2024-06-19'),
    onDateSelect: fn(),
    onAddMeal: fn(),
    onEditMeal: fn(),
    onRemoveMeal: fn(),
  },
  render: MealPlanningCalendarWithState,
  parameters: {
    docs: {
      description: {
        story: 'Shows different meal types (breakfast, lunch, dinner, snack) with color-coded badges.',
      },
    },
  },
}

export const Interactive: Story = {
  args: {
    mealPlans: mockMealPlans,
    onDateSelect: (date) => {
      console.log('Selected date:', date)
    },
    onAddMeal: (date) => {
      console.log('Add meal for date:', date)
    },
    onEditMeal: (meal) => {
      console.log('Edit meal:', meal)
    },
    onRemoveMeal: (mealId) => {
      console.log('Remove meal:', mealId)
    },
  },
  render: MealPlanningCalendarWithState,
  parameters: {
    docs: {
      description: {
        story: 'Interactive calendar with console logging. Open browser console to see user interactions.',
      },
    },
  },
}