import React from 'react';
import { Clock, Users, Share, Printer, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Button } from '@/components/atoms';
import { Avatar } from '@/components/atoms/avatar';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/molecules/card';
import { DifficultyIndicator } from '@/components/molecules/difficulty-indicator';
import { Rating } from '@/components/ui/rating';
import { Badge } from '@/components/atoms/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { RecipeCollectionSaver } from '@/components/organisms/recipe-collection-saver';
import type { Recipe, RecipeCardVariant } from '@/types';

/**
 * Props for RecipeCard - Organism level
 * 
 * Primary recipe display component for browsing, assessment, and interaction.
 * Integrates all recipe-specific components with responsive design and cultural sensitivity.
 * 
 * @example
 * <RecipeCard
 *   recipe={recipe}
 *   variant="standard"
 *   showSaveButton={true}
 *   onSave={(id) => handleSave(id)}
 *   onShare={(id) => handleShare(id)}
 * />
 */
export interface RecipeCardProps {
  recipe: Recipe;
  variant?: RecipeCardVariant;
  showSaveButton?: boolean;
  onSave?: (recipeId: string) => void;
  onShare?: (recipeId: string) => void;
  onPrint?: (recipeId: string) => void;
  onAddToMealPlan?: (recipeId: string) => void;
  onClick?: (recipeId: string) => void;
  className?: string;
  collections?: Array<{ id: string; name: string; }>;
  'aria-label'?: string;
}

const RecipeCard = React.forwardRef<HTMLDivElement, RecipeCardProps>(({
  recipe,
  variant = 'standard',
  showSaveButton = true,
  onSave,
  onShare,
  onPrint,
  onAddToMealPlan,
  onClick,
  className,
  collections = [],
  'aria-label': ariaLabel,
  ...props
}, ref) => {
  const { t } = useTranslation('recipe');

  const handleCardClick = () => {
    onClick?.(recipe.id);
  };

  const handleSaveToCollection = (collectionId: string) => {
    onSave?.(recipe.id);
    // In a real implementation, this would handle collection-specific saving
    console.log('Saving to collection:', collectionId);
  };

  const handleUnsaveFromCollection = (collectionId: string) => {
    // In a real implementation, this would handle removing from collection
    console.log('Removing from collection:', collectionId);
  };

  const handleCreateCollection = (name: string) => {
    // In a real implementation, this would create a new collection
    console.log('Creating collection:', name);
  };

  const formatTime = (minutes: number): string => {
    if (minutes < 60) {
      return t('timing.minutes', { count: minutes });
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
      return t('timing.hours', { count: hours });
    }
    return t('timing.hoursAndMinutes', { hours, minutes: remainingMinutes });
  };

  // Compact variant for grid views and search results
  if (variant === 'compact') {
    return (
      <Card
        ref={ref}
        className={cn(
          'group cursor-pointer transition-all duration-200 hover:shadow-md',
          'overflow-hidden',
          className
        )}
        onClick={handleCardClick}
        aria-label={ariaLabel || t('card.viewRecipe', { title: recipe.title })}
        {...props}
      >
        <div className="relative">
          <AspectRatio ratio={4 / 3} className="overflow-hidden">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </AspectRatio>
          
          {/* Quick save button overlay */}
          {showSaveButton && (
            <div className="absolute top-2 right-2 rtl:right-auto rtl:left-2">
              <RecipeCollectionSaver
                recipeId={recipe.id}
                collections={collections}
                savedCollections={recipe.savedCollections || []}
                onSave={handleSaveToCollection}
                onUnsave={handleUnsaveFromCollection}
                onCreateCollection={handleCreateCollection}
                variant="heart"
                size="sm"
                className="bg-white/90 backdrop-blur-sm hover:bg-white"
              />
            </div>
          )}

          {/* Bottom overlay with title and rating */}
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <h3 className="font-semibold text-white text-sm mb-1 line-clamp-2">
              {recipe.title}
            </h3>
            <div className="flex items-center justify-between">
              <Rating
                value={recipe.ratings.average}
                size="sm"
                readonly
                showReviewCount={false}
                className="text-white"
              />
              <div className="flex items-center space-x-2 text-white text-xs">
                <Clock className="h-3 w-3" />
                <span>{formatTime(recipe.timing.totalTime)}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Featured variant for hero placements
  if (variant === 'featured') {
    return (
      <Card
        ref={ref}
        className={cn(
          'group cursor-pointer transition-all duration-200 hover:shadow-lg',
          'overflow-hidden',
          className
        )}
        onClick={handleCardClick}
        aria-label={ariaLabel || t('card.viewRecipe', { title: recipe.title })}
        {...props}
      >
        <div className="relative">
          <AspectRatio ratio={16 / 9} className="overflow-hidden">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </AspectRatio>

          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="mb-3">
              {recipe.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="mr-2 mb-2 bg-white/90 text-foreground">
                  {tag}
                </Badge>
              ))}
            </div>

            <h2 className="font-bold text-white text-2xl mb-2 line-clamp-2">
              {recipe.title}
            </h2>

            {recipe.description && (
              <p className="text-white/90 text-sm mb-4 line-clamp-2">
                {recipe.description}
              </p>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar src={recipe.author.avatar} alt={recipe.author.name} size="sm" />
                <div>
                  <p className="text-white font-medium text-sm">{recipe.author.name}</p>
                  <div className="flex items-center space-x-4 text-white/80 text-xs">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatTime(recipe.timing.totalTime)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-3 w-3" />
                      <span>{t('servings', { count: recipe.servings })}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Rating
                  value={recipe.ratings.average}
                  size="sm"
                  readonly
                  reviewCount={recipe.ratings.count}
                  className="text-white"
                />
                {showSaveButton && (
                  <RecipeCollectionSaver
                    recipeId={recipe.id}
                    collections={collections}
                    savedCollections={recipe.savedCollections || []}
                    onSave={handleSaveToCollection}
                    onUnsave={handleUnsaveFromCollection}
                    onCreateCollection={handleCreateCollection}
                    variant="heart"
                    size="md"
                    className="bg-white/10 backdrop-blur-sm hover:bg-white/20"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Standard variant - default for homepage browsing
  return (
    <Card
      ref={ref}
      className={cn(
        'group cursor-pointer transition-all duration-200 hover:shadow-md',
        'overflow-hidden',
        className
      )}
      onClick={handleCardClick}
      aria-label={ariaLabel || t('card.viewRecipe', { title: recipe.title })}
      {...props}
    >
      {/* Hero Image */}
      <div className="relative">
        <AspectRatio ratio={4 / 3} className="overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
          />
        </AspectRatio>
        
        {/* Save button overlay */}
        {showSaveButton && (
          <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3">
            <RecipeCollectionSaver
              recipeId={recipe.id}
              collections={collections}
              savedCollections={recipe.savedCollections || []}
              onSave={handleSaveToCollection}
              onUnsave={handleUnsaveFromCollection}
              onCreateCollection={handleCreateCollection}
              variant="heart"
              size="sm"
              className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-sm"
            />
          </div>
        )}

        {/* Difficulty indicator overlay */}
        <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3">
          <DifficultyIndicator
            level={recipe.difficulty}
            variant="icon-only"
            className="bg-white/90 backdrop-blur-sm rounded-full p-2"
          />
        </div>
      </div>

      {/* Card Header */}
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between space-x-3 rtl:space-x-reverse">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground text-lg leading-tight line-clamp-2 mb-2">
              {recipe.title}
            </h3>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-2">
              {recipe.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Author Info */}
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <Avatar 
            src={recipe.author.avatar} 
            alt={recipe.author.name} 
            size="sm"
          />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm text-foreground">{recipe.author.name}</p>
            <div className="flex items-center space-x-1">
              <Rating
                value={recipe.ratings.average}
                size="sm"
                readonly
                reviewCount={recipe.ratings.count}
                showReviewCount={true}
              />
            </div>
          </div>
        </div>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="pt-0 pb-3">
        {recipe.description && (
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {recipe.description}
          </p>
        )}

        {/* Metadata */}
        <div className="flex items-center space-x-4 rtl:space-x-reverse text-muted-foreground text-sm">
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            <Clock className="h-4 w-4" />
            <span>{formatTime(recipe.timing.totalTime)}</span>
          </div>
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            <Users className="h-4 w-4" />
            <span>{t('servings', { count: recipe.servings })}</span>
          </div>
        </div>

        {/* Difficulty */}
        <div className="mt-3">
          <DifficultyIndicator
            level={recipe.difficulty}
            variant="compact"
            className="text-sm"
          />
        </div>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="pt-0 flex items-center justify-between space-x-2 rtl:space-x-reverse">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          {onShare && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onShare(recipe.id);
              }}
              aria-label={t('actions.share')}
            >
              <Share className="h-4 w-4" />
            </Button>
          )}
          
          {onPrint && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onPrint(recipe.id);
              }}
              aria-label={t('actions.print')}
            >
              <Printer className="h-4 w-4" />
            </Button>
          )}

          {onAddToMealPlan && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onAddToMealPlan(recipe.id);
              }}
              aria-label={t('actions.addToMealPlan')}
            >
              <Calendar className="h-4 w-4" />
            </Button>
          )}
        </div>

        <Button
          variant="default"
          size="sm"
          className="flex-1"
          onClick={handleCardClick}
          aria-label={t('actions.viewRecipe')}
        >
          {t('actions.viewRecipe')}
        </Button>
      </CardFooter>
    </Card>
  );
});

RecipeCard.displayName = 'RecipeCard';

export { RecipeCard };