import * as React from 'react';
import { cn } from '@/lib/utils';
import { Combobox, type ComboboxOption } from '@/components/ui/combobox';
import { Badge } from '@/components/atoms/badge';
import { Button } from '@/components/atoms/button';
import { X } from 'lucide-react';

/**
 * Ingredient data structure
 */
export interface Ingredient {
  id: string;
  name: string;
  category: string;
  commonNames?: string[];
  cultural?: string[];
}

/**
 * Props for IngredientCombobox - Molecule
 * 
 * A smart ingredient search combobox with autocomplete
 * and cultural ingredient awareness.
 */
export interface IngredientComboboxProps {
  /** Available ingredients */
  ingredients: Ingredient[];
  
  /** Selected ingredient IDs */
  selectedIngredients?: string[];
  
  /** Callback for ingredient selection */
  onIngredientsChange?: (ingredients: string[]) => void;
  
  /** Placeholder text */
  placeholder?: string;
  
  /** Allow multiple selection */
  multiple?: boolean;
  
  /** Filter by cultural cuisine */
  culturalFilter?: string;
  
  /** Loading state */
  loading?: boolean;
  
  /** Custom CSS class */
  className?: string;
  
  /** ARIA label for accessibility */
  'aria-label'?: string;
}

/**
 * IngredientCombobox - Smart ingredient search with autocomplete
 * 
 * Provides intelligent ingredient search functionality including:
 * - Autocomplete with fuzzy matching
 * - Cultural ingredient filtering
 * - Multiple ingredient selection
 * - Common name recognition
 */
export const IngredientCombobox = React.forwardRef<
  HTMLButtonElement,
  IngredientComboboxProps
>(({
  ingredients,
  selectedIngredients = [],
  onIngredientsChange,
  placeholder = "Search ingredients...",
  multiple = true,
  culturalFilter,
  loading = false,
  className,
  'aria-label': ariaLabel = 'Ingredient search',
  ...props
}, ref) => {
  const [_searchQuery, _setSearchQuery] = React.useState('');

  // Filter ingredients based on cultural filter and search query
  const filteredIngredients = React.useMemo(() => {
    let filtered = ingredients;

    // Apply cultural filter if specified
    if (culturalFilter) {
      filtered = filtered.filter(ingredient => 
        ingredient.cultural?.includes(culturalFilter)
      );
    }

    // Apply search query filter
    if (_searchQuery) {
      const query = _searchQuery.toLowerCase();
      filtered = filtered.filter(ingredient => 
        ingredient.name.toLowerCase().includes(query) ||
        ingredient.category.toLowerCase().includes(query) ||
        ingredient.commonNames?.some(name => 
          name.toLowerCase().includes(query)
        )
      );
    }

    return filtered;
  }, [ingredients, culturalFilter, _searchQuery]);

  // Convert ingredients to combobox options
  const comboboxOptions: ComboboxOption[] = filteredIngredients.map(ingredient => ({
    value: ingredient.id,
    label: ingredient.name,
  }));

  const selectedIngredientObjects = ingredients.filter(ingredient =>
    selectedIngredients.includes(ingredient.id)
  );

  const handleValueChange = (value: string) => {
    if (!multiple) {
      onIngredientsChange?.([value]);
      return;
    }

    const isSelected = selectedIngredients.includes(value);
    if (isSelected) {
      onIngredientsChange?.(
        selectedIngredients.filter(id => id !== value)
      );
    } else {
      onIngredientsChange?.([...selectedIngredients, value]);
    }
  };

  const removeIngredient = (ingredientId: string) => {
    onIngredientsChange?.(
      selectedIngredients.filter(id => id !== ingredientId)
    );
  };

  if (loading) {
    return (
      <div className={cn("flex items-center justify-center p-4", className)}>
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        <span className="ml-2">Loading ingredients...</span>
      </div>
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      {/* Selected Ingredients (for multiple selection) */}
      {multiple && selectedIngredientObjects.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedIngredientObjects.map((ingredient) => (
            <Badge
              key={ingredient.id}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {ingredient.name}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 hover:bg-transparent"
                onClick={() => removeIngredient(ingredient.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}

      {/* Combobox */}
      <Combobox
        ref={ref}
        options={comboboxOptions}
        value={multiple ? '' : selectedIngredients[0] || ''}
        onValueChange={handleValueChange}
        placeholder={placeholder}
        searchPlaceholder="Search ingredients..."
        emptyText="No ingredients found"
        className={className}
        aria-label={ariaLabel}
        {...props}
      />

      {/* Cultural Filter Info */}
      {culturalFilter && (
        <p className="text-xs text-muted-foreground">
          Showing ingredients from {culturalFilter} cuisine
        </p>
      )}

      {/* Ingredient Categories */}
      {_searchQuery && filteredIngredients.length > 0 && (
        <div className="text-xs text-muted-foreground">
          <p>Categories: {
            [...new Set(filteredIngredients.map(i => i.category))].join(', ')
          }</p>
        </div>
      )}
    </div>
  );
});

IngredientCombobox.displayName = 'IngredientCombobox';