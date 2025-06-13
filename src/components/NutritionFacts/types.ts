export interface NutritionData {
  // Core macronutrients (per serving)
  calories: number;
  totalFat: number; // grams
  saturatedFat: number; // grams
  transFat: number; // grams
  cholesterol: number; // milligrams
  sodium: number; // milligrams
  totalCarbohydrates: number; // grams
  dietaryFiber: number; // grams
  totalSugars: number; // grams
  addedSugars: number; // grams
  protein: number; // grams

  // Vitamins and minerals (optional)
  vitaminD?: number; // micrograms
  calcium?: number; // milligrams
  iron?: number; // milligrams
  potassium?: number; // milligrams
  vitaminA?: number; // micrograms
  vitaminC?: number; // milligrams

  // Additional nutritional info
  monounsaturatedFat?: number; // grams
  polyunsaturatedFat?: number; // grams
  omega3?: number; // grams
  omega6?: number; // grams
}

export interface DailyValuePercentages {
  totalFat: number;
  saturatedFat: number;
  cholesterol: number;
  sodium: number;
  totalCarbohydrates: number;
  dietaryFiber: number;
  vitaminD?: number;
  calcium?: number;
  iron?: number;
  potassium?: number;
  vitaminA?: number;
  vitaminC?: number;
}

export interface AllergenInfo {
  contains: string[];
  mayContain: string[];
  freeFrom: string[];
}

export type DietaryCompliance = 
  | 'keto' 
  | 'low-carb' 
  | 'high-protein' 
  | 'low-fat' 
  | 'low-sodium' 
  | 'high-fiber';

export interface NutritionFactsProps {
  nutrition: NutritionData;
  servings: number;
  showDailyValues?: boolean;
  showAllergens?: boolean;
  compactMode?: boolean;
  dietaryRestrictions?: string[];
  allergens?: AllergenInfo;
  className?: string;
}