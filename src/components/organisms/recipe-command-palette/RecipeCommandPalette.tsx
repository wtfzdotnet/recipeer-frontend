import * as React from 'react';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
} from '@/components/ui/command';
import { 
  Search, 
  ChefHat, 
  Clock, 
  Star, 
  BookOpen,
  Calendar,
  ShoppingCart,
  Settings,
  History
} from 'lucide-react';

/**
 * Command action data
 */
export interface CommandAction {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  shortcut?: string;
  group: string;
  onSelect: () => void;
}

/**
 * Recipe search result data
 */
export interface RecipeSearchResult {
  id: string;
  name: string;
  cuisine: string;
  difficulty: string;
  cookTime: number;
  rating: number;
}

/**
 * Props for RecipeCommandPalette - Organism
 * 
 * A command palette for quick recipe search and platform actions,
 * supporting cultural content discovery and quick navigation.
 */
export interface RecipeCommandPaletteProps {
  /** Whether the command palette is open */
  open: boolean;
  
  /** Callback for open state change */
  onOpenChange: (open: boolean) => void;
  
  /** Search results for recipes */
  searchResults?: RecipeSearchResult[];
  
  /** Available command actions */
  actions?: CommandAction[];
  
  /** Callback for search query change */
  onSearch?: (query: string) => void;
  
  /** Loading state for search */
  searching?: boolean;
  
  /** Custom CSS class */
  className?: string;
}

/**
 * RecipeCommandPalette - Quick recipe search and actions
 * 
 * Provides comprehensive command palette functionality including:
 * - Quick recipe search with cultural filtering
 * - Platform navigation shortcuts
 * - Recent recipe access
 * - Meal planning quick actions
 */
export const RecipeCommandPalette = React.forwardRef<
  HTMLDivElement,
  RecipeCommandPaletteProps
>(({
  open,
  onOpenChange,
  searchResults = [],
  actions = [],
  onSearch,
  searching = false,
  // className - not used in this component
  // ref - not used in this component
  ...props
}, /* ref */) => {
  const [query, setQuery] = React.useState('');

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(true);
      }
    };
    
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [onOpenChange]);

  React.useEffect(() => {
    if (query) {
      onSearch?.(query);
    }
  }, [query, onSearch]);

  const defaultActions: CommandAction[] = [
    {
      id: 'search-recipes',
      label: 'Search Recipes',
      description: 'Find recipes by name, cuisine, or ingredients',
      icon: <Search className="h-4 w-4" />,
      shortcut: '⌘K',
      group: 'Recipes',
      onSelect: () => {
        setQuery('');
        // Focus will be on input automatically
      }
    },
    {
      id: 'add-recipe',
      label: 'Add New Recipe',
      description: 'Create a new recipe from scratch',
      icon: <ChefHat className="h-4 w-4" />,
      shortcut: '⌘N',
      group: 'Recipes',
      onSelect: () => {
        onOpenChange(false);
        // Navigate to add recipe
      }
    },
    {
      id: 'meal-planning',
      label: 'Meal Planning',
      description: 'Plan your weekly meals',
      icon: <Calendar className="h-4 w-4" />,
      shortcut: '⌘M',
      group: 'Planning',
      onSelect: () => {
        onOpenChange(false);
        // Navigate to meal planning
      }
    },
    {
      id: 'shopping-list',
      label: 'Shopping List',
      description: 'View and manage your shopping list',
      icon: <ShoppingCart className="h-4 w-4" />,
      shortcut: '⌘L',
      group: 'Planning',
      onSelect: () => {
        onOpenChange(false);
        // Navigate to shopping list
      }
    },
    {
      id: 'recipe-collections',
      label: 'Recipe Collections',
      description: 'Browse your saved recipe collections',
      icon: <BookOpen className="h-4 w-4" />,
      group: 'Collections',
      onSelect: () => {
        onOpenChange(false);
        // Navigate to collections
      }
    },
    {
      id: 'settings',
      label: 'Settings',
      description: 'Manage your account and preferences',
      icon: <Settings className="h-4 w-4" />,
      group: 'Settings',
      onSelect: () => {
        onOpenChange(false);
        // Navigate to settings
      }
    }
  ];

  const allActions = [...defaultActions, ...actions];
  const actionGroups = allActions.reduce((groups, action) => {
    if (!groups[action.group]) {
      groups[action.group] = [];
    }
    groups[action.group].push(action);
    return groups;
  }, {} as Record<string, CommandAction[]>);

  const hasRecipeResults = searchResults.length > 0;
  const showActions = !query || (!hasRecipeResults && !searching);

  return (
    <CommandDialog 
      open={open} 
      onOpenChange={onOpenChange}
      {...props}
    >
      <CommandInput
        placeholder="Search recipes or type a command..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>
          {searching ? (
            <div className="flex items-center justify-center py-6">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              <span className="ml-2">Searching recipes...</span>
            </div>
          ) : query ? (
            <div className="flex flex-col items-center py-6">
              <Search className="h-8 w-8 text-muted-foreground mb-2" />
              <p>No recipes found for "{query}"</p>
              <p className="text-sm text-muted-foreground mt-1">
                Try searching for ingredients, cuisine, or dish name
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center py-6">
              <ChefHat className="h-8 w-8 text-muted-foreground mb-2" />
              <p>Start typing to search recipes</p>
              <p className="text-sm text-muted-foreground mt-1">
                Or use commands below for quick actions
              </p>
            </div>
          )}
        </CommandEmpty>

        {/* Recipe Search Results */}
        {hasRecipeResults && (
          <CommandGroup heading="Recipes">
            {searchResults.map((recipe) => (
              <CommandItem
                key={recipe.id}
                onSelect={() => {
                  onOpenChange(false);
                  // Navigate to recipe detail
                }}
                className="flex items-center gap-3"
              >
                <ChefHat className="h-4 w-4" />
                <div className="flex-1">
                  <div className="font-medium">{recipe.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {recipe.cuisine} • {recipe.difficulty} • {recipe.cookTime} min
                  </div>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Star className="h-3 w-3 mr-1" />
                  {recipe.rating.toFixed(1)}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {/* Action Commands */}
        {showActions && Object.entries(actionGroups).map(([groupName, groupActions]) => (
          <CommandGroup key={groupName} heading={groupName}>
            {groupActions.map((action) => (
              <CommandItem
                key={action.id}
                onSelect={action.onSelect}
                className="flex items-center gap-3"
              >
                {action.icon}
                <div className="flex-1">
                  <div className="font-medium">{action.label}</div>
                  {action.description && (
                    <div className="text-sm text-muted-foreground">
                      {action.description}
                    </div>
                  )}
                </div>
                {action.shortcut && (
                  <CommandShortcut>{action.shortcut}</CommandShortcut>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        ))}

        {/* Recent Searches */}
        {!query && (
          <CommandGroup heading="Recent">
            <CommandItem className="flex items-center gap-3">
              <History className="h-4 w-4" />
              <span>Italian pasta recipes</span>
            </CommandItem>
            <CommandItem className="flex items-center gap-3">
              <History className="h-4 w-4" />
              <span>Quick breakfast ideas</span>
            </CommandItem>
            <CommandItem className="flex items-center gap-3">
              <History className="h-4 w-4" />
              <span>Vegetarian dinner</span>
            </CommandItem>
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
});

RecipeCommandPalette.displayName = 'RecipeCommandPalette';