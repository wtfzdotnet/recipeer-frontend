import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/atoms/badge';
import { cn } from '@/lib/utils';
import { TrendingUp, MapPin, Clock, Users } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/molecules/hover-card';
import { useLocale } from '@/hooks/useLocale';
import type { Category, Recipe } from '@/types';

/**
 * Props for CategoryCard component - Organism level
 * 
 * CategoryCard displays cuisine and topic categories with cultural sensitivity,
 * featuring visual navigation, trending indicators, and recipe previews.
 * Supports multiple layout variants and RTL languages.
 * 
 * @example
 * <CategoryCard 
 *   category={italianCategory}
 *   variant="grid"
 *   onCategoryClick={(id) => navigate(`/categories/${id}`)}
 * />
 */
export interface CategoryCardProps {
  /** Category data to display */
  category: Category;
  /** Card layout variant */
  variant?: 'grid' | 'hero' | 'compact';
  /** Whether to show recipe count */
  showRecipeCount?: boolean;
  /** Category click handler */
  onCategoryClick?: (categoryId: string) => void;
  /** Bookmark toggle handler */
  onBookmarkToggle?: (categoryId: string, bookmarked: boolean) => void;
  /** Whether category is bookmarked */
  isBookmarked?: boolean;
  /** Custom CSS class */
  className?: string;
  /** ARIA label for accessibility */
  'aria-label'?: string;
}

/**
 * CategoryCard component for displaying cuisine and topic categories
 * with cultural authenticity and visual navigation features.
 */
export const CategoryCard = React.forwardRef<HTMLDivElement, CategoryCardProps>(
  ({
    category,
    variant = 'grid',
    showRecipeCount = true,
    onCategoryClick,
    onBookmarkToggle,
    isBookmarked = false,
    className,
    'aria-label': ariaLabel,
    ...props
  }, ref) => {
    const { t } = useTranslation('categories');
    const { locale } = useLocale();

    const handleClick = () => {
      if (onCategoryClick) {
        onCategoryClick(category.id);
      }
    };

    const handleBookmarkClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (onBookmarkToggle) {
        onBookmarkToggle(category.id, !isBookmarked);
      }
    };

    const variantStyles = {
      grid: 'w-full max-w-sm cursor-pointer hover:shadow-lg transition-all duration-300',
      hero: 'w-full max-w-2xl cursor-pointer hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-primary/5 to-secondary/5',
      compact: 'w-full cursor-pointer hover:shadow-md transition-shadow duration-200'
    };

    const imageStyles = {
      grid: 'h-48 w-full object-cover rounded-t-lg',
      hero: 'h-64 md:h-80 w-full object-cover rounded-t-lg',
      compact: 'h-20 w-20 object-cover rounded-lg'
    };

    const RecipePreview = ({ recipes }: { recipes: Recipe[] }) => (
      <div className="space-y-2">
        <h4 className="font-medium text-sm">{t('popularRecipes')}</h4>
        {recipes.slice(0, 3).map((recipe) => (
          <div key={recipe.id} className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded bg-muted flex items-center justify-center">
              <span className="text-xs">🍽️</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm truncate">{recipe.name}</p>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                {recipe.cookingTime && (
                  <span className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{recipe.cookingTime}m</span>
                  </span>
                )}
                {recipe.rating && (
                  <span>⭐ {recipe.rating}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );

    const CategoryContent = () => (
      <>
        {/* Category Image */}
        <div className={cn(
          'relative overflow-hidden',
          variant === 'compact' ? 'flex-shrink-0' : ''
        )}>
          <img
            src={category.image}
            alt={category.name}
            className={cn(imageStyles[variant])}
            onError={(e) => {
              // Fallback to placeholder
              (e.target as HTMLImageElement).src = '/api/placeholder/400/300';
            }}
          />
          
          {/* Trending Badge */}
          {category.trending && (
            <Badge 
              className={cn(
                'absolute top-2 text-xs',
                locale.direction === 'rtl' ? 'left-2' : 'right-2'
              )}
              variant="default"
            >
              <TrendingUp className="h-3 w-3 me-1" />
              {t('trending')}
            </Badge>
          )}

          {/* Bookmark Button */}
          <button
            onClick={handleBookmarkClick}
            className={cn(
              'absolute top-2 p-1.5 rounded-full bg-background/80 hover:bg-background transition-colors',
              locale.direction === 'rtl' ? 'right-2' : 'left-2'
            )}
            aria-label={isBookmarked ? t('removeBookmark') : t('addBookmark')}
          >
            <span className={cn('text-sm', isBookmarked ? 'text-primary' : 'text-muted-foreground')}>
              {isBookmarked ? '❤️' : '🤍'}
            </span>
          </button>
        </div>

        {/* Card Content */}
        <div className={cn(
          'flex-1',
          variant === 'compact' ? 'ms-4' : ''
        )}>
          <CardHeader className={cn(variant === 'compact' ? 'p-0 pb-2' : '')}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className={cn(
                  variant === 'hero' ? 'text-2xl md:text-3xl' : 'text-lg',
                  variant === 'compact' ? 'text-base' : ''
                )}>
                  {category.name}
                </CardTitle>
                
                {category.description && (
                  <CardDescription className={cn(
                    variant === 'hero' ? 'text-base mt-2' : 'text-sm mt-1',
                    variant === 'compact' ? 'text-xs' : ''
                  )}>
                    {category.description}
                  </CardDescription>
                )}
              </div>
            </div>

            {/* Cultural Context */}
            {category.cultural && variant !== 'compact' && (
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-2">
                <MapPin className="h-4 w-4" />
                <span>{category.cultural.region}</span>
                {category.cultural.authenticity && (
                  <Badge variant="outline" className="text-xs">
                    {t(`authenticity.${category.cultural.authenticity}`)}
                  </Badge>
                )}
              </div>
            )}
          </CardHeader>

          {variant !== 'compact' && (
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                {/* Recipe Count */}
                {showRecipeCount && (
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>
                      {t('recipeCount', { count: category.recipeCount })}
                    </span>
                  </div>
                )}

                {/* Category Type Badge */}
                {category.type && (
                  <Badge variant="secondary" className="text-xs">
                    {t(`types.${category.type}`)}
                  </Badge>
                )}
              </div>
            </CardContent>
          )}
        </div>
      </>
    );

    // Compact variant has different layout
    if (variant === 'compact') {
      return (
        <Card
          ref={ref}
          className={cn(variantStyles[variant], className)}
          onClick={handleClick}
          aria-label={ariaLabel || t('cardAriaLabel', { name: category.name })}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleClick();
            }
          }}
          {...props}
        >
          <div className="flex items-center p-4">
            <CategoryContent />
          </div>
        </Card>
      );
    }

    // Grid and hero variants with hover preview
    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <Card
            ref={ref}
            className={cn(variantStyles[variant], className)}
            onClick={handleClick}
            aria-label={ariaLabel || t('cardAriaLabel', { name: category.name })}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClick();
              }
            }}
            {...props}
          >
            <CategoryContent />
          </Card>
        </HoverCardTrigger>
        
        {/* Hover Content with Recipe Preview */}
        {category.popularRecipes && category.popularRecipes.length > 0 && (
          <HoverCardContent side="right" className="w-80">
            <RecipePreview recipes={category.popularRecipes} />
          </HoverCardContent>
        )}
      </HoverCard>
    );
  }
);

CategoryCard.displayName = 'CategoryCard';