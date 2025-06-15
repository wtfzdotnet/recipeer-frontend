import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/molecules/card';
import { Badge } from '@/components/atoms/badge';
import { Button } from '@/components/atoms/button';
import { Star, Clock, Users, Heart } from 'lucide-react';

/**
 * Featured recipe data structure
 */
export interface FeaturedRecipe {
  id: string;
  name: string;
  description: string;
  image: string;
  cuisine: string;
  cultural?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  cookTime: number;
  servings: number;
  rating: number;
  featured?: boolean;
  seasonal?: boolean;
  tags: string[];
}

/**
 * Props for FeaturedRecipesCarousel - Organism
 * 
 * A carousel for displaying featured recipes and cultural content,
 * supporting seasonal collections and content discovery.
 */
export interface FeaturedRecipesCarouselProps {
  /** Array of featured recipes */
  recipes: FeaturedRecipe[];
  
  /** Carousel title */
  title?: string;
  
  /** Callback for recipe selection */
  onRecipeSelect?: (recipe: FeaturedRecipe) => void;
  
  /** Callback for recipe favoriting */
  onRecipeFavorite?: (recipeId: string) => void;
  
  /** Favorited recipe IDs */
  favoriteRecipes?: string[];
  
  /** Show cultural badges */
  showCultural?: boolean;
  
  /** Show seasonal indicator */
  showSeasonal?: boolean;
  
  /** Loading state */
  loading?: boolean;
  
  /** Custom CSS class */
  className?: string;
  
  /** ARIA label for accessibility */
  'aria-label'?: string;
}

/**
 * FeaturedRecipesCarousel - Content discovery carousel
 * 
 * Provides featured recipe discovery functionality including:
 * - Cultural content organization
 * - Seasonal recipe collections
 * - Interactive recipe cards
 * - Favorite recipe management
 */
export const FeaturedRecipesCarousel = React.forwardRef<
  HTMLDivElement,
  FeaturedRecipesCarouselProps
>(({
  recipes,
  title = "Featured Recipes",
  onRecipeSelect,
  onRecipeFavorite,
  favoriteRecipes = [],
  showCultural = true,
  showSeasonal = true,
  loading = false,
  className,
  'aria-label': ariaLabel = 'Featured recipes carousel',
  ...props
}, ref) => {
  const getDifficultyColor = (difficulty: FeaturedRecipe['difficulty']) => {
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
        <div className="text-center">Loading featured recipes...</div>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div 
        ref={ref}
        className={cn('w-full p-4', className)}
        aria-label={ariaLabel}
        {...props}
      >
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="text-center py-8">
          <p className="text-muted-foreground">No featured recipes available</p>
        </div>
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
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="text-sm text-muted-foreground">
          {recipes.length} recipe{recipes.length > 1 ? 's' : ''}
        </div>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {recipes.map((recipe) => (
            <CarouselItem key={recipe.id} className="pl-2 md:pl-4 md:basis-1/3 lg:basis-1/4">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  {/* Recipe Image */}
                  <div className="relative aspect-video bg-muted">
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="w-full h-full object-cover rounded-t-lg"
                      onError={(e) => {
                        // Fallback for broken images
                        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk0YTNiOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlPC90ZXh0Pjwvc3ZnPg==';
                      }}
                    />
                    
                    {/* Overlay badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {recipe.featured && (
                        <Badge variant="default" className="text-xs">
                          Featured
                        </Badge>
                      )}
                      {showSeasonal && recipe.seasonal && (
                        <Badge variant="secondary" className="text-xs">
                          Seasonal
                        </Badge>
                      )}
                    </div>

                    {/* Favorite button */}
                    <div className="absolute top-2 right-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 bg-black/20 hover:bg-black/40"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRecipeFavorite?.(recipe.id);
                        }}
                      >
                        <Heart 
                          className={cn(
                            "h-4 w-4",
                            favoriteRecipes.includes(recipe.id) 
                              ? "fill-destructive text-destructive" 
                              : "text-white"
                          )} 
                        />
                      </Button>
                    </div>
                  </div>

                  {/* Recipe Info */}
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 
                        className="font-semibold text-sm line-clamp-2 cursor-pointer hover:underline"
                        onClick={() => onRecipeSelect?.(recipe)}
                      >
                        {recipe.name}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                        {recipe.description}
                      </p>
                    </div>

                    {/* Recipe metadata */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
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

                    {/* Tags and cultural info */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-1">
                        <Badge variant={getDifficultyColor(recipe.difficulty)} className="text-xs">
                          {recipe.difficulty}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {recipe.cuisine}
                        </Badge>
                      </div>
                      
                      {showCultural && recipe.cultural && (
                        <Badge variant="outline" className="text-xs bg-primary/10">
                          {recipe.cultural}
                        </Badge>
                      )}
                    </div>

                    {/* Quick action button */}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full text-xs"
                      onClick={() => onRecipeSelect?.(recipe)}
                    >
                      View Recipe
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
});

FeaturedRecipesCarousel.displayName = 'FeaturedRecipesCarousel';