import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/molecules/table';
import { Button } from '@/components/atoms/button';
import { Input } from '@/components/atoms/input';
import { Badge } from '@/components/atoms/badge';
import { Search, Filter, MoreHorizontal } from 'lucide-react';

/**
 * Recipe data for the data table
 */
export interface Recipe {
  id: string;
  name: string;
  cuisine: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  cookTime: number;
  servings: number;
  rating: number;
  tags: string[];
  lastModified: Date;
}

/**
 * Props for RecipeDataTable - Organism
 * 
 * A comprehensive data table for managing recipe collections,
 * supporting search, filtering, and bulk operations.
 */
export interface RecipeDataTableProps {
  /** Array of recipes to display */
  recipes: Recipe[];
  
  /** Callback for recipe selection */
  onRecipeSelect?: (recipe: Recipe) => void;
  
  /** Callback for recipe deletion */
  onRecipeDelete?: (recipeId: string) => void;
  
  /** Callback for recipe editing */
  onRecipeEdit?: (recipeId: string) => void;
  
  /** Search query */
  searchQuery?: string;
  
  /** Callback for search */
  onSearch?: (query: string) => void;
  
  /** Loading state */
  loading?: boolean;
  
  /** Custom CSS class */
  className?: string;
  
  /** ARIA label for accessibility */
  'aria-label'?: string;
}

/**
 * RecipeDataTable - Advanced data management for recipes
 * 
 * Provides comprehensive recipe management capabilities including:
 * - Search and filtering
 * - Cultural cuisine organization
 * - Difficulty and rating sorting
 * - Bulk operations support
 */
export const RecipeDataTable = React.forwardRef<
  HTMLDivElement,
  RecipeDataTableProps
>(({
  recipes,
  onRecipeSelect,
  // onRecipeDelete, - commented out as it's not used yet
  // onRecipeEdit, - commented out as it's not used yet
  searchQuery = '',
  onSearch,
  loading = false,
  className,
  'aria-label': ariaLabel = 'Recipe management table',
  ...props
}, ref) => {
  const [selectedRecipes, setSelectedRecipes] = React.useState<Set<string>>(new Set());

  const handleSelectAll = () => {
    if (selectedRecipes.size === recipes.length) {
      setSelectedRecipes(new Set());
    } else {
      setSelectedRecipes(new Set(recipes.map(r => r.id)));
    }
  };

  const handleSelectRecipe = (recipeId: string) => {
    const newSelected = new Set(selectedRecipes);
    if (newSelected.has(recipeId)) {
      newSelected.delete(recipeId);
    } else {
      newSelected.add(recipeId);
    }
    setSelectedRecipes(newSelected);
  };

  const getDifficultyColor = (difficulty: Recipe['difficulty']) => {
    switch (difficulty) {
      case 'Easy': return 'default';
      case 'Medium': return 'secondary';
      case 'Hard': return 'destructive';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <div 
        ref={ref}
        className={cn('w-full p-4', className)}
        aria-label={ariaLabel}
        {...props}
      >
        <div className="text-center">Loading recipes...</div>
      </div>
    );
  }

  return (
    <div 
      ref={ref}
      className={cn('w-full space-y-4', className)}
      aria-label={ariaLabel}
      {...props}
    >
      {/* Search and Actions Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => onSearch?.(e.target.value)}
              className="pl-8 w-64"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
        
        {selectedRecipes.size > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              {selectedRecipes.size} selected
            </span>
            <Button variant="outline" size="sm">
              Export
            </Button>
            <Button variant="destructive" size="sm">
              Delete
            </Button>
          </div>
        )}
      </div>

      {/* Data Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <input
                  type="checkbox"
                  checked={selectedRecipes.size === recipes.length && recipes.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-border"
                />
              </TableHead>
              <TableHead>Recipe Name</TableHead>
              <TableHead>Cuisine</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Cook Time</TableHead>
              <TableHead>Servings</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Last Modified</TableHead>
              <TableHead className="w-12">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recipes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-8">
                  No recipes found. Start by adding your first recipe!
                </TableCell>
              </TableRow>
            ) : (
              recipes.map((recipe) => (
                <TableRow 
                  key={recipe.id}
                  className={selectedRecipes.has(recipe.id) ? 'bg-muted/50' : ''}
                >
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedRecipes.has(recipe.id)}
                      onChange={() => handleSelectRecipe(recipe.id)}
                      className="rounded border-border"
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <button
                      onClick={() => onRecipeSelect?.(recipe)}
                      className="text-left hover:underline"
                    >
                      {recipe.name}
                    </button>
                  </TableCell>
                  <TableCell>{recipe.cuisine}</TableCell>
                  <TableCell>
                    <Badge variant={getDifficultyColor(recipe.difficulty)}>
                      {recipe.difficulty}
                    </Badge>
                  </TableCell>
                  <TableCell>{recipe.cookTime} min</TableCell>
                  <TableCell>{recipe.servings}</TableCell>
                  <TableCell>⭐ {recipe.rating.toFixed(1)}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {recipe.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {recipe.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{recipe.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {recipe.lastModified.toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
});

RecipeDataTable.displayName = 'RecipeDataTable';