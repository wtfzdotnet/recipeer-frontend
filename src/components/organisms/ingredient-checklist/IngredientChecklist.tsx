import React, { useState, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  measurement: string;
  category?: string;
  notes?: string;
}

export interface IngredientChecklistProps {
  /** List of ingredients to display */
  ingredients: Ingredient[];
  /** Array of checked ingredient IDs */
  checkedItems: string[];
  /** Callback when an item is checked/unchecked */
  onItemCheck: (ingredientId: string, checked: boolean) => void;
  /** Whether to show progress indicator */
  showProgress?: boolean;
  /** Whether to allow notes on ingredients */
  allowNotes?: boolean;
  /** Number of servings (affects quantity display) */
  servings?: number;
  /** Title for the checklist */
  title?: string;
  /** Mode of the checklist (affects styling and behavior) */
  mode?: 'prep' | 'shopping' | 'cook';
  /** Additional CSS classes */
  className?: string;
}

/**
 * Interactive ingredient checklist component for tracking cooking progress
 * Built for the Frontend Recipeer design system
 */
export const IngredientChecklist: React.FC<IngredientChecklistProps> = ({
  ingredients,
  checkedItems,
  onItemCheck,
  showProgress = true,
  allowNotes = false,
  servings = 1,
  title = 'Ingredients',
  mode = 'prep',
  className,
}) => {
  const [notes, setNotes] = useState<Record<string, string>>({});
  
  // Calculate progress
  const completedCount = checkedItems.length;
  const totalCount = ingredients.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  // Persist state in localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem('ingredient-checklist-notes');
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (error) {
        console.warn('Failed to parse saved notes:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (allowNotes) {
      localStorage.setItem('ingredient-checklist-notes', JSON.stringify(notes));
    }
  }, [notes, allowNotes]);

  const handleNoteChange = (ingredientId: string, note: string) => {
    setNotes(prev => ({
      ...prev,
      [ingredientId]: note
    }));
  };

  const adjustQuantity = (quantity: string, servings: number): string => {
    if (servings === 1) return quantity;
    
    // Simple quantity adjustment - could be enhanced with fraction parsing
    const numberMatch = quantity.match(/^(\d+(?:\.\d+)?|\d+\/\d+)/);
    if (numberMatch) {
      const num = parseFloat(numberMatch[1]);
      if (!isNaN(num)) {
        const adjusted = num * servings;
        return quantity.replace(numberMatch[1], adjusted.toString());
      }
    }
    
    return quantity;
  };

  const getModeStyles = () => {
    switch (mode) {
      case 'shopping':
        return {
          container: 'border-primary bg-primary/10',
          header: 'text-primary-foreground',
          item: 'hover:bg-primary/20',
          checked: 'line-through text-primary'
        };
      case 'cook':
        return {
          container: 'border-success bg-success/10',
          header: 'text-success-foreground',
          item: 'hover:bg-success/20',
          checked: 'line-through text-success'
        };
      default: // prep
        return {
          container: 'border-warning bg-warning/10',
          header: 'text-warning-foreground',
          item: 'hover:bg-warning/20',
          checked: 'line-through text-warning'
        };
    }
  };

  const styles = getModeStyles();

  // Group ingredients by category if available
  const groupedIngredients = ingredients.reduce((groups, ingredient) => {
    const category = ingredient.category || 'Other';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(ingredient);
    return groups;
  }, {} as Record<string, Ingredient[]>);

  return (
    <Card className={cn(styles.container, className)}>
      <CardHeader className="pb-4">
        <CardTitle className={cn('text-xl font-semibold', styles.header)}>
          {title}
        </CardTitle>
        {showProgress && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{completedCount} of {totalCount} completed</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        {Object.entries(groupedIngredients).map(([category, categoryIngredients]) => (
          <div key={category} className="space-y-3">
            {Object.keys(groupedIngredients).length > 1 && (
              <h3 className={cn('text-lg font-medium', styles.header)}>
                {category}
              </h3>
            )}
            
            <ul className="space-y-2">
              {categoryIngredients.map((ingredient) => {
                const isChecked = checkedItems.includes(ingredient.id);
                const adjustedQuantity = adjustQuantity(ingredient.quantity, servings);
                
                return (
                  <li 
                    key={ingredient.id}
                    className={cn(
                      'flex items-start gap-3 p-3 rounded-md transition-colors',
                      styles.item,
                      isChecked && 'bg-muted'
                    )}
                  >
                    <Checkbox
                      id={`ingredient-${ingredient.id}`}
                      checked={isChecked}
                      onCheckedChange={(checked) => 
                        onItemCheck(ingredient.id, checked as boolean)
                      }
                      className="mt-1 min-w-[16px]"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <label 
                        htmlFor={`ingredient-${ingredient.id}`}
                        className={cn(
                          'block text-base leading-relaxed cursor-pointer',
                          isChecked && styles.checked
                        )}
                      >
                        <span className="font-medium">
                          {adjustedQuantity} {ingredient.measurement}
                        </span>
                        {' '}
                        <span>{ingredient.name}</span>
                      </label>
                      
                      {ingredient.notes && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {ingredient.notes}
                        </p>
                      )}
                      
                      {allowNotes && (
                        <input
                          type="text"
                          placeholder="Add a note (substitution, etc.)"
                          value={notes[ingredient.id] || ''}
                          onChange={(e) => handleNoteChange(ingredient.id, e.target.value)}
                          className="mt-2 w-full text-sm p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
        
        {ingredients.length === 0 && (
          <p className="text-muted-foreground text-center py-4">
            No ingredients to display
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default IngredientChecklist;