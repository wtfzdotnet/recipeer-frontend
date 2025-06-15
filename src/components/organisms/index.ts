// Atomic Design - Organisms Barrel Export
// Complex components that form distinct sections of an interface

export { RecipeCard } from './recipe-card';
export { IngredientChecklist } from './ingredient-checklist';
export { NutritionFacts } from './nutrition-facts';
export { RecipeCollectionSaver } from './recipe-collection-saver';
export { Dialog } from './dialog';

// Advanced Components
export { RecipeDataTable } from './recipe-data-table';
export { MealPlanningCalendar } from './meal-planning-calendar';
export { RecipeCommandPalette } from './recipe-command-palette';
export { FeaturedRecipesCarousel } from './featured-recipes-carousel';
export { NutritionAnalyticsChart } from './nutrition-analytics-chart';
export { RecipeCollectionsCollapsible } from './recipe-collections-collapsible';

// New organisms
export * from './navigation-menu';

// Re-export types
export type { RecipeCardProps } from './recipe-card';
export type { IngredientChecklistProps } from './ingredient-checklist';
export type { NutritionFactsProps } from './nutrition-facts';
export type { RecipeCollectionSaverProps } from './recipe-collection-saver';
export type { DialogProps } from './dialog';

// Advanced Component Types
export type { RecipeDataTableProps, Recipe } from './recipe-data-table';
export type { MealPlanningCalendarProps, MealPlan } from './meal-planning-calendar';
export type { RecipeCommandPaletteProps, CommandAction, RecipeSearchResult } from './recipe-command-palette';
export type { FeaturedRecipesCarouselProps, FeaturedRecipe } from './featured-recipes-carousel';
export type { NutritionAnalyticsChartProps, NutritionData, MacroBreakdown, WeeklyNutritionSummary } from './nutrition-analytics-chart';
export type { RecipeCollectionsCollapsibleProps, RecipeCollection, CollectionRecipe } from './recipe-collections-collapsible';