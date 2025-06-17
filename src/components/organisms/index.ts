// Atomic Design - Organisms Barrel Export
// Complex components that form distinct sections of an interface

export { IngredientChecklist } from './ingredient-checklist';
export { NutritionFacts } from './nutrition-facts';
export { ProfileCard } from './profile-card';
export { RecipeCard } from './recipe-card';
export { RecipeCollectionSaver } from './recipe-collection-saver';
export { Dialog } from './dialog';
export { RecipeForm } from './form-examples';
export { CategoryCard } from './category-card';

// Advanced Components
export { RecipeDataTable } from './recipe-data-table';
export { RecipeCommandPalette } from './recipe-command-palette';
export { FeaturedRecipesCarousel } from './featured-recipes-carousel';
export { NutritionAnalyticsChart } from './nutrition-analytics-chart';
export { RecipeCollectionsCollapsible } from './recipe-collections-collapsible';

// New organisms
export * from './navigation-menu';
export { CurrencySelector } from './currency-selector';
export { CountryLanguageSelector } from './country-language-selector';
export { MealPlanCard } from './meal-plan-card';

// Re-export types
export type { IngredientChecklistProps } from './ingredient-checklist';
export type { NutritionFactsProps } from './nutrition-facts';
export type { ProfileCardProps } from './profile-card';
export type { RecipeCardProps } from './recipe-card';
export type { RecipeCollectionSaverProps } from './recipe-collection-saver';
export type { DialogProps } from './dialog';
export type { RecipeFormProps, RecipeFormData } from './form-examples';
export type { CategoryCardProps } from './category-card';

// Advanced Component Types
export type { RecipeDataTableProps, Recipe } from './recipe-data-table';
export type { RecipeCommandPaletteProps, CommandAction, RecipeSearchResult } from './recipe-command-palette';
export type { FeaturedRecipesCarouselProps, FeaturedRecipe } from './featured-recipes-carousel';
export type { NutritionAnalyticsChartProps, NutritionData, MacroBreakdown, WeeklyNutritionSummary } from './nutrition-analytics-chart';
export type { RecipeCollectionsCollapsibleProps, RecipeCollection, CollectionRecipe } from './recipe-collections-collapsible';
export type { CurrencySelectorProps } from './currency-selector';
export type { CountryLanguageSelectorProps } from './country-language-selector';
export type { MealPlanCardProps, MealPlan, Recipe as MealPlanRecipe } from './meal-plan-card';