import type { Meta, StoryObj } from '@storybook/react-vite'
import { NutritionAnalyticsChart } from './NutritionAnalyticsChart'
import type { NutritionData, WeeklyNutritionSummary, MacroBreakdown } from './NutritionAnalyticsChart'

const meta: Meta<typeof NutritionAnalyticsChart> = {
  title: 'Organisms/NutritionAnalyticsChart',
  component: NutritionAnalyticsChart,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

// Mock daily nutrition data
const mockDailyData: NutritionData[] = [
  {
    date: '2024-01-15',
    calories: 2100,
    protein: 120,
    carbs: 250,
    fat: 75,
    fiber: 28,
    sugar: 45,
  },
  {
    date: '2024-01-16',
    calories: 1950,
    protein: 110,
    carbs: 220,
    fat: 70,
    fiber: 25,
    sugar: 40,
  },
  {
    date: '2024-01-17',
    calories: 2200,
    protein: 130,
    carbs: 280,
    fat: 80,
    fiber: 30,
    sugar: 50,
  },
  {
    date: '2024-01-18',
    calories: 2050,
    protein: 115,
    carbs: 240,
    fat: 78,
    fiber: 26,
    sugar: 42,
  },
  {
    date: '2024-01-19',
    calories: 2150,
    protein: 125,
    carbs: 260,
    fat: 73,
    fiber: 29,
    sugar: 47,
  },
  {
    date: '2024-01-20',
    calories: 1980,
    protein: 108,
    carbs: 230,
    fat: 72,
    fiber: 24,
    sugar: 38,
  },
  {
    date: '2024-01-21',
    calories: 2250,
    protein: 135,
    carbs: 290,
    fat: 82,
    fiber: 32,
    sugar: 52,
  },
]

// Mock weekly summary
const mockWeeklyData: WeeklyNutritionSummary = {
  totalMeals: 21,
  avgCalories: 2100,
  avgProtein: 120,
  avgCarbs: 253,
  avgFat: 76,
  goals: {
    calories: 2200,
    protein: 130,
    carbs: 275,
    fat: 75,
  },
}

// Mock macro breakdown
const mockMacroBreakdown: MacroBreakdown[] = [
  { name: 'Protein', value: 480, percentage: 20 },
  { name: 'Carbs', value: 1012, percentage: 42 },
  { name: 'Fat', value: 684, percentage: 28 },
  { name: 'Fiber', value: 112, percentage: 5 },
  { name: 'Sugar', value: 188, percentage: 8 },
]

export const Default: Story = {
  args: {
    dailyData: mockDailyData,
    weeklyData: mockWeeklyData,
    macroBreakdown: mockMacroBreakdown,
    dateRange: {
      start: new Date('2024-01-15'),
      end: new Date('2024-01-21'),
    },
    loading: false,
  },
}

export const Loading: Story = {
  args: {
    dailyData: [],
    loading: true,
  },
}

export const MinimalData: Story = {
  args: {
    dailyData: mockDailyData.slice(0, 3),
    loading: false,
  },
}

export const WithoutWeeklySummary: Story = {
  args: {
    dailyData: mockDailyData,
    macroBreakdown: mockMacroBreakdown,
    loading: false,
  },
}

export const GoalAchievement: Story = {
  args: {
    dailyData: mockDailyData,
    weeklyData: {
      ...mockWeeklyData,
      avgCalories: 2250, // Over goal
      avgProtein: 140,   // Over goal
      avgCarbs: 200,     // Under goal
      avgFat: 65,        // Under goal
    },
    macroBreakdown: mockMacroBreakdown,
    loading: false,
  },
}

export const LowPerformance: Story = {
  args: {
    dailyData: mockDailyData.map(day => ({
      ...day,
      calories: day.calories * 0.7,
      protein: day.protein * 0.6,
      carbs: day.carbs * 0.8,
      fat: day.fat * 0.9,
    })),
    weeklyData: {
      ...mockWeeklyData,
      avgCalories: 1470, // Under goal
      avgProtein: 72,    // Under goal
      avgCarbs: 202,     // Under goal
      avgFat: 68,        // Under goal
    },
    macroBreakdown: mockMacroBreakdown,
    loading: false,
  },
}