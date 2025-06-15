import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/molecules/card';
import { Badge } from '@/components/atoms/badge';
import { Button } from '@/components/atoms/button';
import { 
  BookOpen, 
  Star, 
  Clock, 
  Users, 
  Globe,
  Plus,
  Heart,
  Share2
} from 'lucide-react';

/**
 * Recipe collection data structure
 */
export interface RecipeCollection {
  id: string;
  name: string;
  description: string;
  cultural?: string;
  category: string;
  recipes: CollectionRecipe[];
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Recipe data within collections
 */
export interface CollectionRecipe {
  id: string;
  name: string;
  image: string;
  cookTime: number;
  servings: number;
  rating: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  cultural?: string;
}

/**
 * Props for RecipeCollectionsCollapsible - Organism
 * 
 * A collapsible interface for organizing recipe collections,
 * supporting cultural categories and content organization.
 */
export interface RecipeCollectionsCollapsibleProps {
  /** Array of recipe collections */
  collections: RecipeCollection[];
  
  /** Callback for recipe selection */
  onRecipeSelect?: (recipe: CollectionRecipe) => void;
  
  /** Callback for collection creation */
  onCreateCollection?: () => void;
  
  /** Callback for recipe favoriting */
  onRecipeFavorite?: (recipeId: string) => void;
  
  /** Callback for collection sharing */
  onShareCollection?: (collectionId: string) => void;
  
  /** Favorited recipe IDs */
  favoriteRecipes?: string[];
  
  /** Show cultural organization */
  showCultural?: boolean;
  
  /** Loading state */
  loading?: boolean;
  
  /** Custom CSS class */
  className?: string;
  
  /** ARIA label for accessibility */
  'aria-label'?: string;
}

/**
 * RecipeCollectionsCollapsible - Organized recipe collection management
 * 
 * Provides comprehensive collection organization including:
 * - Cultural content categorization
 * - Collapsible collection groups
 * - Recipe preview cards
 * - Collection sharing capabilities
 */
export const RecipeCollectionsCollapsible = React.forwardRef<
  HTMLDivElement,
  RecipeCollectionsCollapsibleProps
>(({
  collections,
  onRecipeSelect,
  onCreateCollection,
  onRecipeFavorite,
  onShareCollection,
  favoriteRecipes = [],
  showCultural = true,
  loading = false,
  className,
  'aria-label': ariaLabel = 'Recipe collections',
  ...props
}, ref) => {
  // Group collections by category or cultural cuisine
  const groupedCollections = React.useMemo(() => {
    const groups: Record<string, RecipeCollection[]> = {};
    
    collections.forEach(collection => {
      const groupKey = showCultural && collection.cultural 
        ? collection.cultural 
        : collection.category;
      
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(collection);
    });
    
    return groups;
  }, [collections, showCultural]);

  const getDifficultyColor = (difficulty: CollectionRecipe['difficulty']) => {
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
        <div className="text-center">Loading recipe collections...</div>
      </div>
    );
  }

  if (collections.length === 0) {
    return (
      <div 
        ref={ref}
        className={cn('w-full space-y-4', className)}
        aria-label={ariaLabel}
        {...props}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recipe Collections</h2>
          <Button onClick={onCreateCollection}>
            <Plus className="h-4 w-4 mr-2" />
            Create Collection
          </Button>
        </div>
        
        <Card>
          <CardContent className="p-8 text-center">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No collections yet</h3>
            <p className="text-muted-foreground mb-4">
              Start organizing your recipes by creating your first collection
            </p>
            <Button onClick={onCreateCollection}>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Collection
            </Button>
          </CardContent>
        </Card>
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Recipe Collections</h2>
          <p className="text-sm text-muted-foreground">
            {collections.length} collection{collections.length > 1 ? 's' : ''} • {
              collections.reduce((total, collection) => total + collection.recipes.length, 0)
            } recipes
          </p>
        </div>
        <Button onClick={onCreateCollection}>
          <Plus className="h-4 w-4 mr-2" />
          Create Collection
        </Button>
      </div>

      {/* Collapsible Collections */}
      <Accordion type="multiple" className="w-full space-y-4">
        {Object.entries(groupedCollections).map(([groupName, groupCollections]) => (
          <AccordionItem key={groupName} value={groupName} className="border rounded-lg">
            <AccordionTrigger className="px-4 py-3">
              <div className="flex items-center gap-3">
                {showCultural ? (
                  <Globe className="h-5 w-5" />
                ) : (
                  <BookOpen className="h-5 w-5" />
                )}
                <div className="text-left">
                  <div className="font-medium">{groupName}</div>
                  <div className="text-sm text-muted-foreground">
                    {groupCollections.length} collection{groupCollections.length > 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-4">
                {groupCollections.map((collection) => (
                  <Card key={collection.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      {/* Collection Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium">{collection.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {collection.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {collection.isPublic && (
                            <Badge variant="outline" className="text-xs">
                              <Globe className="h-3 w-3 mr-1" />
                              Public
                            </Badge>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onShareCollection?.(collection.id)}
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Collection Meta */}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                        <span>{collection.recipes.length} recipes</span>
                        <span>Updated {collection.updatedAt.toLocaleDateString()}</span>
                        {collection.cultural && (
                          <Badge variant="outline" className="text-xs">
                            {collection.cultural}
                          </Badge>
                        )}
                      </div>

                      {/* Recipe Grid */}
                      {collection.recipes.length === 0 ? (
                        <div className="text-center py-4 text-sm text-muted-foreground">
                          No recipes in this collection yet
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {collection.recipes.slice(0, 6).map((recipe) => (
                            <div
                              key={recipe.id}
                              className="border rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer"
                              onClick={() => onRecipeSelect?.(recipe)}
                            >
                              <div className="aspect-video bg-muted rounded mb-2 relative overflow-hidden">
                                <img
                                  src={recipe.image}
                                  alt={recipe.name}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEzNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzk0YTNiOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlPC90ZXh0Pjwvc3ZnPg==';
                                  }}
                                />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="absolute top-1 right-1 h-6 w-6 p-0 bg-black/20 hover:bg-black/40"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onRecipeFavorite?.(recipe.id);
                                  }}
                                >
                                  <Heart 
                                    className={
                                      favoriteRecipes.includes(recipe.id) 
                                        ? "h-3 w-3 fill-destructive text-destructive" 
                                        : "h-3 w-3 text-foreground"
                                    } 
                                  />
                                </Button>
                              </div>
                              
                              <h5 className="font-medium text-sm line-clamp-1 mb-1">
                                {recipe.name}
                              </h5>
                              
                              <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3" />
                                  {recipe.rating.toFixed(1)}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {recipe.cookTime}m
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  {recipe.servings}
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-1">
                                <Badge variant={getDifficultyColor(recipe.difficulty)} className="text-xs">
                                  {recipe.difficulty}
                                </Badge>
                                {recipe.cultural && (
                                  <Badge variant="outline" className="text-xs">
                                    {recipe.cultural}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          ))}
                          
                          {collection.recipes.length > 6 && (
                            <div className="border rounded-lg p-3 flex items-center justify-center text-sm text-muted-foreground">
                              +{collection.recipes.length - 6} more recipes
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
});

RecipeCollectionsCollapsible.displayName = 'RecipeCollectionsCollapsible';