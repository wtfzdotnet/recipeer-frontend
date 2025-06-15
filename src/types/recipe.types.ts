/**
 * Recipe type definitions for the recipe platform
 */

export interface Recipe {
  /** Unique recipe identifier */
  id: string;
  /** Recipe title */
  name: string;
  /** Recipe description */
  description?: string;
  /** Recipe image URL */
  image?: string;
  /** Cooking time in minutes */
  cookingTime?: number;
  /** Preparation time in minutes */
  prepTime?: number;
  /** Recipe difficulty level */
  difficulty?: 'easy' | 'medium' | 'hard';
  /** Number of servings */
  servings?: number;
  /** Recipe rating (1-5) */
  rating?: number;
  /** Number of reviews */
  reviewCount?: number;
  /** Recipe author */
  author?: string;
  /** Recipe tags */
  tags?: string[];
  /** Recipe cuisine type */
  cuisine?: string;
  /** Whether recipe is featured/trending */
  featured?: boolean;
}

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