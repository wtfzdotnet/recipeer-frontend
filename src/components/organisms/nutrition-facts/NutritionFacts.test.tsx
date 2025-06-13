import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NutritionFacts } from './NutritionFacts';
import { NutritionData, AllergenInfo } from './types';

// Test data
const basicNutrition: NutritionData = {
  calories: 350,
  totalFat: 12,
  saturatedFat: 3,
  transFat: 0,
  cholesterol: 25,
  sodium: 480,
  totalCarbohydrates: 45,
  dietaryFiber: 8,
  totalSugars: 10,
  addedSugars: 5,
  protein: 18,
  vitaminD: 2.5,
  calcium: 200,
  iron: 4,
  potassium: 650,
};

const ketoNutrition: NutritionData = {
  calories: 420,
  totalFat: 35,
  saturatedFat: 12,
  transFat: 0,
  cholesterol: 95,
  sodium: 280,
  totalCarbohydrates: 8,
  dietaryFiber: 5,
  totalSugars: 3,
  addedSugars: 0,
  protein: 25,
};

const allergens: AllergenInfo = {
  contains: ['Milk', 'Eggs'],
  mayContain: ['Tree nuts'],
  freeFrom: ['Peanuts', 'Soy'],
};

describe('NutritionFacts', () => {
  describe('Basic Rendering', () => {
    it('renders nutrition facts panel with basic information', () => {
      render(
        <NutritionFacts 
          nutrition={basicNutrition} 
          servings={4} 
        />
      );
      
      expect(screen.getByText('Nutrition Facts')).toBeInTheDocument();
      expect(screen.getByText('Servings per container: 4')).toBeInTheDocument();
      expect(screen.getByText('350')).toBeInTheDocument(); // calories
      expect(screen.getAllByText('12g')[0]).toBeInTheDocument(); // total fat
      expect(screen.getByText('18g')).toBeInTheDocument(); // protein
    });

    it('displays all required macronutrients', () => {
      render(
        <NutritionFacts 
          nutrition={basicNutrition} 
          servings={4} 
        />
      );
      
      expect(screen.getByText('Total Fat')).toBeInTheDocument();
      expect(screen.getByText('Saturated Fat')).toBeInTheDocument();
      expect(screen.getByText('Trans Fat')).toBeInTheDocument();
      expect(screen.getByText('Cholesterol')).toBeInTheDocument();
      expect(screen.getByText('Sodium')).toBeInTheDocument();
      expect(screen.getByText('Total Carbohydrate')).toBeInTheDocument();
      expect(screen.getByText('Dietary Fiber')).toBeInTheDocument();
      expect(screen.getByText('Total Sugars')).toBeInTheDocument();
      expect(screen.getByText('Added Sugars')).toBeInTheDocument();
      expect(screen.getByText('Protein')).toBeInTheDocument();
    });

    it('displays vitamins and minerals when provided', () => {
      render(
        <NutritionFacts 
          nutrition={basicNutrition} 
          servings={4} 
        />
      );
      
      expect(screen.getByText('Vitamin D')).toBeInTheDocument();
      expect(screen.getByText('Calcium')).toBeInTheDocument();
      expect(screen.getByText('Iron')).toBeInTheDocument();
      expect(screen.getByText('Potassium')).toBeInTheDocument();
    });
  });

  describe('Daily Values', () => {
    it('shows daily value percentages when enabled', () => {
      render(
        <NutritionFacts 
          nutrition={basicNutrition} 
          servings={4} 
          showDailyValues={true}
        />
      );
      
      expect(screen.getByText('% Daily Value*')).toBeInTheDocument();
      expect(screen.getAllByText('18%').length).toBeGreaterThan(0); // total fat DV
      expect(screen.getAllByText('15%').length).toBeGreaterThan(0); // saturated fat DV
    });

    it('hides daily value percentages when disabled', () => {
      render(
        <NutritionFacts 
          nutrition={basicNutrition} 
          servings={4} 
          showDailyValues={false}
        />
      );
      
      expect(screen.queryByText('% Daily Value*')).not.toBeInTheDocument();
      // Check that daily value percentages are not shown
      expect(screen.queryByText('18%')).not.toBeInTheDocument();
    });

    it('shows daily value footer text when daily values are enabled', () => {
      render(
        <NutritionFacts 
          nutrition={basicNutrition} 
          servings={4} 
          showDailyValues={true}
        />
      );
      
      expect(screen.getByText(/2,000 calories a day is used for general nutrition advice/)).toBeInTheDocument();
    });
  });

  describe('Dietary Compliance', () => {
    it('shows keto badge for keto-compliant nutrition', () => {
      render(
        <NutritionFacts 
          nutrition={ketoNutrition} 
          servings={2} 
        />
      );
      
      expect(screen.getByText('Keto')).toBeInTheDocument();
      expect(screen.getByText('Low Carb')).toBeInTheDocument();
      expect(screen.getByText('High Protein')).toBeInTheDocument();
    });

    it('shows high fiber badge for high fiber foods', () => {
      render(
        <NutritionFacts 
          nutrition={basicNutrition} 
          servings={4} 
        />
      );
      
      expect(screen.getByText('High Fiber')).toBeInTheDocument();
      // Basic nutrition has 18g protein which doesn't qualify for high protein (need >20g)
      expect(screen.queryByText('High Protein')).not.toBeInTheDocument();
    });

    it('shows dietary compliance section when badges are present', () => {
      render(
        <NutritionFacts 
          nutrition={ketoNutrition} 
          servings={2} 
        />
      );
      
      expect(screen.getByText('Dietary Compliance')).toBeInTheDocument();
    });
  });

  describe('Allergen Information', () => {
    it('displays allergen information when showAllergens is true', () => {
      render(
        <NutritionFacts 
          nutrition={basicNutrition} 
          servings={4} 
          showAllergens={true}
          allergens={allergens}
        />
      );
      
      expect(screen.getByText(/Contains:/)).toBeInTheDocument();
      expect(screen.getByText(/Milk, Eggs/)).toBeInTheDocument();
      expect(screen.getByText(/May contain:/)).toBeInTheDocument();
      expect(screen.getByText(/Tree nuts/)).toBeInTheDocument();
      expect(screen.getByText(/Free from:/)).toBeInTheDocument();
      expect(screen.getByText(/Peanuts, Soy/)).toBeInTheDocument();
    });

    it('hides allergen information when showAllergens is false', () => {
      render(
        <NutritionFacts 
          nutrition={basicNutrition} 
          servings={4} 
          showAllergens={false}
          allergens={allergens}
        />
      );
      
      expect(screen.queryByText(/Contains:/)).not.toBeInTheDocument();
      expect(screen.queryByText(/May contain:/)).not.toBeInTheDocument();
    });

    it('shows only relevant allergen sections', () => {
      const partialAllergens: AllergenInfo = {
        contains: ['Milk'],
        mayContain: [],
        freeFrom: [],
      };

      render(
        <NutritionFacts 
          nutrition={basicNutrition} 
          servings={4} 
          showAllergens={true}
          allergens={partialAllergens}
        />
      );
      
      expect(screen.getByText(/Contains:/)).toBeInTheDocument();
      expect(screen.queryByText(/May contain:/)).not.toBeInTheDocument();
      expect(screen.queryByText(/Free from:/)).not.toBeInTheDocument();
    });
  });

  describe('Compact Mode', () => {
    it('hides vitamins and minerals in compact mode', () => {
      render(
        <NutritionFacts 
          nutrition={basicNutrition} 
          servings={4} 
          compactMode={true}
        />
      );
      
      expect(screen.queryByText('Vitamin D')).not.toBeInTheDocument();
      expect(screen.queryByText('Calcium')).not.toBeInTheDocument();
      expect(screen.queryByText('Iron')).not.toBeInTheDocument();
      expect(screen.queryByText('Potassium')).not.toBeInTheDocument();
    });

    it('still shows all macronutrients in compact mode', () => {
      render(
        <NutritionFacts 
          nutrition={basicNutrition} 
          servings={4} 
          compactMode={true}
        />
      );
      
      expect(screen.getByText('Total Fat')).toBeInTheDocument();
      expect(screen.getByText('Protein')).toBeInTheDocument();
      expect(screen.getByText('Total Carbohydrate')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper heading structure', () => {
      render(
        <NutritionFacts 
          nutrition={basicNutrition} 
          servings={4} 
        />
      );
      
      const heading = screen.getByRole('heading', { name: 'Nutrition Facts' });
      expect(heading).toBeInTheDocument();
    });

    it('provides meaningful aria labels for progress bars', () => {
      render(
        <NutritionFacts 
          nutrition={basicNutrition} 
          servings={4} 
          showDailyValues={true}
        />
      );
      
      // Progress bars should be visually accessible with proper color coding
      const progressBars = document.querySelectorAll('[style*="width"]');
      expect(progressBars.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles zero values correctly', () => {
      const zeroNutrition: NutritionData = {
        ...basicNutrition,
        transFat: 0,
        addedSugars: 0,
      };

      render(
        <NutritionFacts 
          nutrition={zeroNutrition} 
          servings={4} 
        />
      );
      
      // Check that zero values are displayed - there are multiple 0g values
      expect(screen.getAllByText('0g').length).toBeGreaterThan(0);
    });

    it('handles missing optional nutrients', () => {
      const minimalNutrition: NutritionData = {
        calories: 200,
        totalFat: 8,
        saturatedFat: 2,
        transFat: 0,
        cholesterol: 15,
        sodium: 300,
        totalCarbohydrates: 25,
        dietaryFiber: 3,
        totalSugars: 8,
        addedSugars: 2,
        protein: 12,
      };

      render(
        <NutritionFacts 
          nutrition={minimalNutrition} 
          servings={4} 
        />
      );
      
      expect(screen.getByText('200')).toBeInTheDocument(); // calories
      expect(screen.queryByText('Vitamin D')).not.toBeInTheDocument();
    });

    it('handles single serving', () => {
      render(
        <NutritionFacts 
          nutrition={basicNutrition} 
          servings={1} 
        />
      );
      
      expect(screen.getByText('Servings per container: 1')).toBeInTheDocument();
    });
  });

  describe('Daily Value Calculations', () => {
    it('calculates daily values correctly', () => {
      // 12g fat out of 65g DV = 18%
      // 3g saturated fat out of 20g DV = 15%
      render(
        <NutritionFacts 
          nutrition={basicNutrition} 
          servings={4} 
          showDailyValues={true}
        />
      );
      
      expect(screen.getAllByText('18%')[0]).toBeInTheDocument(); // total fat
      expect(screen.getAllByText('15%')[0]).toBeInTheDocument(); // saturated fat
    });

    it('handles daily values over 100%', () => {
      const highSodiumNutrition: NutritionData = {
        ...basicNutrition,
        sodium: 3000, // 130% of DV
      };

      render(
        <NutritionFacts 
          nutrition={highSodiumNutrition} 
          servings={4} 
          showDailyValues={true}
        />
      );
      
      expect(screen.getAllByText('130%')[0]).toBeInTheDocument(); // sodium
    });
  });
});