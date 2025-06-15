/**
 * Recipe type definitions for the recipe platform
 */

export interface Author {
  id: string;
  name: string;
  avatar?: string;
  isVerified?: boolean;
}

export interface RatingData {
  average: number;
  count: number;
  distribution?: Record<number, number>; // 1-5 star distribution
}

export interface TimingInfo {
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  totalTime: number; // in minutes
}

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface NutritionSummary {
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  fiber?: number;
}

export interface Recipe {
  /** Unique recipe identifier */
  id: string;
  /** Recipe title */
  title?: string;
  name?: string; // Legacy support
  /** Recipe description */
  description?: string;
  /** Recipe image URL */
  image?: string;
  /** Recipe author */
  author?: Author | string;
  /** Recipe rating data */
  ratings?: RatingData;
  /** Legacy rating (1-5) */
  rating?: number;
  /** Legacy review count */
  reviewCount?: number;
  /** Recipe timing information */
  timing?: TimingInfo;
  /** Legacy cooking time in minutes */
  cookingTime?: number;
  /** Legacy preparation time in minutes */
  prepTime?: number;
  /** Recipe difficulty level */
  difficulty?: DifficultyLevel | 'easy' | 'medium' | 'hard';
  /** Number of servings */
  servings?: number;
  /** Recipe tags */
  tags?: string[];
  /** Recipe cuisine type */
  cuisine?: string;
  /** Whether recipe is featured/trending */
  featured?: boolean;
  /** Nutrition summary */
  nutrition?: NutritionSummary;
  /** Whether recipe is bookmarked */
  isBookmarked?: boolean;
  /** Saved collections */
  savedCollections?: string[];
}

export type RecipeCardVariant = 'compact' | 'standard' | 'featured';

export interface CategoryCultural {
  /** Geographic region */
  region: string;
  /** Cultural authenticity level */
  authenticity: string;
  /** Historical context */
  historicalContext?: string;
  /** Traditional preparation notes */
  traditionNotes?: string;
}

export interface Category {
  /** Unique category identifier */
  id: string;
  /** Category display name */
  name: string;
  /** Category image URL */
  image: string;
  /** Category description */
  description?: string;
  /** Number of recipes in category */
  recipeCount: number;
  /** Whether category is trending */
  trending?: boolean;
  /** Cultural context information */
  cultural?: CategoryCultural;
  /** Popular recipes in this category */
  popularRecipes?: Recipe[];
  /** Category type */
  type?: 'cuisine' | 'meal' | 'dietary' | 'method' | 'seasonal';
}
