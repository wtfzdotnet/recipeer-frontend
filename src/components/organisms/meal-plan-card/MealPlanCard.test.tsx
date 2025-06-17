import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LocaleProvider } from '@/providers/LocaleProvider';
import { MealPlanCard, type MealPlan, type Recipe } from './MealPlanCard';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: { count?: number }) => {
      // Mock translation function
      if (key.includes('mealTypes')) {
        const type = key.split('.').pop();
        return type === 'breakfast' ? 'Breakfast' :
               type === 'lunch' ? 'Lunch' :
               type === 'dinner' ? 'Dinner' : 'Snack';
      }
      if (key.includes('status')) {
        const status = key.split('.').pop();
        return status === 'planned' ? 'Planned' :
               status === 'prepped' ? 'Prepped' : 'Completed';
      }
      if (key.includes('actions')) {
        const action = key.split('.').pop();
        return action === 'edit' ? 'Edit Meal' :
               action === 'complete' ? 'Mark Complete' :
               action === 'remove' ? 'Remove' : 'Add Notes';
      }
      if (key.includes('servings')) {
        const count = options?.count || 1;
        return count === 1 ? '1 serving' : `${count} servings`;
      }
      if (key.includes('calories')) {
        return `${options?.count || 0}cal`;
      }
      if (key.includes('dragToReorder')) {
        return 'Drag to reorder meals';
      }
      return key;
    }
  })
}));

// Test data
const mockRecipe: Recipe = {
  id: 'recipe-1',
  title: 'Test Recipe',
  image: 'test-image.jpg',
  prepTime: 15,
  cookTime: 20,
  difficulty: 'easy',
  nutrition: {
    calories: 300,
    protein: 20,
    carbs: 30,
    fat: 10,
  }
};

const baseMealPlan: MealPlan = {
  id: 'meal-1',
  date: new Date('2024-01-15T12:30:00'),
  mealType: 'lunch',
  recipe: mockRecipe,
  servings: 2,
  prepStatus: 'planned',
};

const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <LocaleProvider defaultLocale="en-US">
      {component}
    </LocaleProvider>
  );
};

describe('MealPlanCard', () => {
  describe('Rendering', () => {
    it('renders meal plan information correctly', () => {
      renderWithProvider(<MealPlanCard mealPlan={baseMealPlan} />);

      expect(screen.getByText('Test Recipe')).toBeInTheDocument();
      expect(screen.getByText('Lunch')).toBeInTheDocument();
      expect(screen.getByText('Planned')).toBeInTheDocument();
      expect(screen.getByText('2 servings')).toBeInTheDocument();
    });

    it('displays nutrition information correctly', () => {
      renderWithProvider(<MealPlanCard mealPlan={baseMealPlan} />);

      // For 2 servings: 300 * 2 = 600 calories, etc.
      expect(screen.getByText('600cal')).toBeInTheDocument();
      expect(screen.getByText('P: 40g')).toBeInTheDocument();
      expect(screen.getByText('C: 60g')).toBeInTheDocument();
      expect(screen.getByText('F: 20g')).toBeInTheDocument();
    });

    it('shows recipe image when provided', () => {
      renderWithProvider(<MealPlanCard mealPlan={baseMealPlan} />);

      const image = screen.getByAltText('Test Recipe');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', 'test-image.jpg');
    });

    it('displays total cooking time', () => {
      renderWithProvider(<MealPlanCard mealPlan={baseMealPlan} />);

      // 15 + 20 = 35 minutes
      expect(screen.getByText('35 min')).toBeInTheDocument();
    });
  });

  describe('Meal Types', () => {
    it('renders breakfast with correct badge', () => {
      const breakfastMeal = { ...baseMealPlan, mealType: 'breakfast' as const };
      renderWithProvider(<MealPlanCard mealPlan={breakfastMeal} />);

      expect(screen.getByText('Breakfast')).toBeInTheDocument();
    });

    it('renders dinner with correct badge', () => {
      const dinnerMeal = { ...baseMealPlan, mealType: 'dinner' as const };
      renderWithProvider(<MealPlanCard mealPlan={dinnerMeal} />);

      expect(screen.getByText('Dinner')).toBeInTheDocument();
    });

    it('renders snack with correct badge', () => {
      const snackMeal = { ...baseMealPlan, mealType: 'snack' as const };
      renderWithProvider(<MealPlanCard mealPlan={snackMeal} />);

      expect(screen.getByText('Snack')).toBeInTheDocument();
    });
  });

  describe('Status Variants', () => {
    it('renders planned status correctly', () => {
      renderWithProvider(<MealPlanCard mealPlan={baseMealPlan} />);

      expect(screen.getByText('Planned')).toBeInTheDocument();
    });

    it('renders prepped status correctly', () => {
      const preppedMeal = { ...baseMealPlan, prepStatus: 'prepped' as const };
      renderWithProvider(<MealPlanCard mealPlan={preppedMeal} />);

      expect(screen.getByText('Prepped')).toBeInTheDocument();
    });

    it('renders completed status with opacity styling', () => {
      const completedMeal = { ...baseMealPlan, prepStatus: 'completed' as const };
      const { container } = renderWithProvider(<MealPlanCard mealPlan={completedMeal} />);

      expect(screen.getByText('Completed')).toBeInTheDocument();
      expect(container.firstChild).toHaveClass('opacity-75');
    });
  });

  describe('Interaction', () => {
    it('calls onEdit when edit button is clicked', () => {
      const onEdit = vi.fn();
      renderWithProvider(
        <MealPlanCard mealPlan={baseMealPlan} onEdit={onEdit} allowEditing={true} />
      );

      const editButton = screen.getByLabelText('Edit Meal');
      fireEvent.click(editButton);

      expect(onEdit).toHaveBeenCalledWith('meal-1');
    });

    it('calls onComplete when complete button is clicked', () => {
      const onComplete = vi.fn();
      renderWithProvider(
        <MealPlanCard mealPlan={baseMealPlan} onComplete={onComplete} allowEditing={true} />
      );

      const completeButton = screen.getByLabelText('Mark Complete');
      fireEvent.click(completeButton);

      expect(onComplete).toHaveBeenCalledWith('meal-1');
    });

    it('calls onRemove when remove button is clicked', () => {
      const onRemove = vi.fn();
      renderWithProvider(
        <MealPlanCard mealPlan={baseMealPlan} onRemove={onRemove} allowEditing={true} />
      );

      const removeButton = screen.getByLabelText('Remove');
      fireEvent.click(removeButton);

      expect(onRemove).toHaveBeenCalledWith('meal-1');
    });

    it('does not show action buttons when allowEditing is false', () => {
      renderWithProvider(
        <MealPlanCard mealPlan={baseMealPlan} allowEditing={false} />
      );

      expect(screen.queryByLabelText('Edit Meal')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('Mark Complete')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('Remove')).not.toBeInTheDocument();
    });

    it('does not show complete button for completed meals', () => {
      const completedMeal = { ...baseMealPlan, prepStatus: 'completed' as const };
      renderWithProvider(
        <MealPlanCard mealPlan={completedMeal} allowEditing={true} />
      );

      expect(screen.queryByLabelText('Mark Complete')).not.toBeInTheDocument();
      expect(screen.getByLabelText('Edit Meal')).toBeInTheDocument();
      expect(screen.getByLabelText('Remove')).toBeInTheDocument();
    });
  });

  describe('Notes', () => {
    it('displays notes when present', () => {
      const mealWithNotes = { ...baseMealPlan, notes: 'Test note content' };
      renderWithProvider(<MealPlanCard mealPlan={mealWithNotes} />);

      expect(screen.getByText('Test note content')).toBeInTheDocument();
    });

    it('shows add notes button when no notes exist and editing is allowed', () => {
      renderWithProvider(
        <MealPlanCard mealPlan={baseMealPlan} allowEditing={true} />
      );

      expect(screen.getByText('Add Notes')).toBeInTheDocument();
    });

    it('calls onNotesEdit when add notes button is clicked', () => {
      const onNotesEdit = vi.fn();
      renderWithProvider(
        <MealPlanCard 
          mealPlan={baseMealPlan} 
          onNotesEdit={onNotesEdit} 
          allowEditing={true} 
        />
      );

      const addNotesButton = screen.getByText('Add Notes');
      fireEvent.click(addNotesButton);

      expect(onNotesEdit).toHaveBeenCalledWith('meal-1', '');
    });

    it('does not show add notes button when editing is disabled', () => {
      renderWithProvider(
        <MealPlanCard mealPlan={baseMealPlan} allowEditing={false} />
      );

      expect(screen.queryByText('Add Notes')).not.toBeInTheDocument();
    });
  });

  describe('Draggable', () => {
    it('shows drag handle when draggable is true', () => {
      renderWithProvider(
        <MealPlanCard mealPlan={baseMealPlan} draggable={true} />
      );

      const dragHandle = screen.getByLabelText('Drag to reorder meals');
      expect(dragHandle).toBeInTheDocument();
    });

    it('does not show drag handle when draggable is false', () => {
      renderWithProvider(
        <MealPlanCard mealPlan={baseMealPlan} draggable={false} />
      );

      expect(screen.queryByLabelText('Drag to reorder meals')).not.toBeInTheDocument();
    });

    it('applies cursor styling when draggable', () => {
      const { container } = renderWithProvider(
        <MealPlanCard mealPlan={baseMealPlan} draggable={true} />
      );

      expect(container.firstChild).toHaveClass('cursor-grab');
    });
  });

  describe('Variants', () => {
    it('renders daily variant with time format', () => {
      renderWithProvider(
        <MealPlanCard mealPlan={baseMealPlan} variant="daily" />
      );

      // Should show time in HH:mm format  
      expect(screen.getByText(/12:30/)).toBeInTheDocument();
    });

    it('renders weekly variant with abbreviated day', () => {
      renderWithProvider(
        <MealPlanCard mealPlan={baseMealPlan} variant="weekly" />
      );

      // Should show day abbreviation with time
      expect(screen.getByText(/Mon 12:30/)).toBeInTheDocument();
    });

    it('renders calendar variant with compact layout', () => {
      const { container } = renderWithProvider(
        <MealPlanCard mealPlan={baseMealPlan} variant="calendar" />
      );

      // Should show month and day
      expect(screen.getByText(/Jan 15/)).toBeInTheDocument();
      // Should have h-auto class for compact layout
      expect(container.firstChild).toHaveClass('h-auto');
    });

    it('hides recipe image in calendar variant', () => {
      renderWithProvider(
        <MealPlanCard mealPlan={baseMealPlan} variant="calendar" />
      );

      expect(screen.queryByAltText('Test Recipe')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels for action buttons', () => {
      renderWithProvider(
        <MealPlanCard mealPlan={baseMealPlan} allowEditing={true} />
      );

      expect(screen.getByLabelText('Edit Meal')).toBeInTheDocument();
      expect(screen.getByLabelText('Mark Complete')).toBeInTheDocument();
      expect(screen.getByLabelText('Remove')).toBeInTheDocument();
    });

    it('has ARIA label for drag handle', () => {
      renderWithProvider(
        <MealPlanCard mealPlan={baseMealPlan} draggable={true} />
      );

      expect(screen.getByLabelText('Drag to reorder meals')).toBeInTheDocument();
    });

    it('supports custom aria-label', () => {
      const { container } = renderWithProvider(
        <MealPlanCard 
          mealPlan={baseMealPlan} 
          aria-label="Custom meal plan card"
        />
      );

      expect(container.firstChild).toHaveAttribute('aria-label', 'Custom meal plan card');
    });
  });

  describe('Single Serving', () => {
    it('handles singular servings correctly', () => {
      const singleServingMeal = { ...baseMealPlan, servings: 1 };
      renderWithProvider(<MealPlanCard mealPlan={singleServingMeal} />);

      expect(screen.getByText('1 serving')).toBeInTheDocument();
      // Nutrition should be unmodified for 1 serving
      expect(screen.getByText('300cal')).toBeInTheDocument();
    });
  });
});