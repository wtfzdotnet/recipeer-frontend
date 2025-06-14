import React from 'react';
import { Clock, Users, ChefHat, Heart, Share2, Bookmark, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/atoms';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Rating } from '@/components/ui/rating';
import { AspectRatio } from '@/components/atoms/aspect-ratio';
import { Skeleton } from '@/components/atoms/skeleton';

// Core interface as specified in the requirements
export interface RecipeCardProps {
  // Core Data
  title: string;
  description?: string;
  image: string;
  imageAlt: string;
  cookTime: number;
  prepTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  
  // Optional Data
  rating?: number;
  reviewCount?: number;
  author?: {
    name: string;
    avatar?: string;
  };
  tags?: string[];
  cuisine?: string;
  dietaryRestrictions?: ('Vegetarian' | 'Vegan' | 'Gluten-Free' | 'Keto' | 'Dairy-Free')[];
  
  // Display Options
  variant: 'default' | 'compact' | 'hero' | 'minimal' | 'detailed' | 'list';
  size?: 'small' | 'medium' | 'large';
  
  // Interaction
  onClick?: () => void;
  onSave?: () => void;
  onShare?: () => void;
  isSaved?: boolean;
  isLoading?: boolean;
  
  // Layout
  aspectRatio?: '4:3' | '16:9' | '1:1' | 'auto';
  orientation?: 'vertical' | 'horizontal';
  
  // Additional props for styling
  className?: string;
}

// Time formatting utility
const formatTime = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${remainingMinutes}m`;
};

// Difficulty styling utility
const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy':
      return 'text-primary';
    case 'Medium':
      return 'text-secondary';
    case 'Hard':
      return 'text-destructive';
    default:
      return 'text-muted-foreground';
  }
};

// Recipe metadata component
const RecipeMetadata: React.FC<{
  cookTime: number;
  prepTime: number;
  servings: number;
  difficulty: string;
  compact?: boolean;
}> = ({ cookTime, prepTime, servings, difficulty, compact = false }) => {
  const totalTime = cookTime + prepTime;
  
  return (
    <div className={cn(
      "flex items-center text-sm text-muted-foreground",
      compact ? "space-x-2" : "space-x-4"
    )}>
      <div className="flex items-center space-x-1">
        <Clock className="h-4 w-4" />
        <span>{formatTime(totalTime)}</span>
      </div>
      <div className="flex items-center space-x-1">
        <Users className="h-4 w-4" />
        <span>{servings === 1 ? '1 serving' : `${servings} servings`}</span>
      </div>
      <div className="flex items-center space-x-1">
        <ChefHat className="h-4 w-4" />
        <span className={getDifficultyColor(difficulty)}>{difficulty}</span>
      </div>
    </div>
  );
};

// Star rating component is now replaced by the reusable Rating component

// Loading skeleton component with variant-specific layouts
const LoadingSkeleton: React.FC<{ variant: string }> = ({ variant }) => {
  // Base card classes for sizing consistency - make responsive
  const baseCardClasses = "group transition-all duration-200 w-full max-w-80";

  switch (variant) {
    case 'compact':
      return (
        <Card className={cn(baseCardClasses, 'w-full max-w-72 min-w-72')}>
          <div className="flex items-start space-x-4 p-4">
            <Skeleton className="w-20 h-20 flex-shrink-0 rounded-lg animate-pulse" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-full animate-pulse" />
              <Skeleton className="h-4 w-3/4 animate-pulse" />
              <div className="flex space-x-2 mt-2">
                <Skeleton className="h-3 w-12 animate-pulse" />
                <Skeleton className="h-3 w-16 animate-pulse" />
              </div>
            </div>
          </div>
        </Card>
      );

    case 'hero':
      return (
        <Card className={cn(baseCardClasses, 'w-full max-w-96')}>
          <div className="relative">
            <Skeleton className="w-full h-64 rounded-t-lg animate-pulse" />
            <div className="absolute top-4 right-4">
              <Skeleton className="h-8 w-8 rounded-full animate-pulse" />
            </div>
          </div>
          <CardHeader className="pb-4">
            <Skeleton className="h-7 w-3/4 mb-2 animate-pulse" />
            <Skeleton className="h-4 w-full animate-pulse" />
            <Skeleton className="h-4 w-2/3 animate-pulse" />
            <div className="flex items-center space-x-1 mt-2">
              {[1,2,3,4,5].map(i => (
                <Skeleton key={i} className="h-4 w-4 rounded animate-pulse" />
              ))}
              <Skeleton className="h-4 w-16 ml-2 animate-pulse" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex justify-between items-center mb-4">
              <div className="flex space-x-4">
                <Skeleton className="h-4 w-16 animate-pulse" />
                <Skeleton className="h-4 w-20 animate-pulse" />
                <Skeleton className="h-4 w-16 animate-pulse" />
              </div>
              <Skeleton className="h-5 w-12 animate-pulse" />
            </div>
          </CardContent>
          <CardFooter className="gap-2">
            <Skeleton variant="button" className="flex-1 h-10 animate-pulse" />
            <Skeleton className="h-10 w-10 rounded-md animate-pulse" />
            <Skeleton className="h-10 w-10 rounded-md animate-pulse" />
          </CardFooter>
        </Card>
      );

    case 'detailed':
      return (
        <Card className={baseCardClasses}>
          <div className="relative">
            <Skeleton className="w-full h-48 rounded-t-lg animate-pulse" />
            <div className="absolute top-4 right-4 space-y-2">
              <Skeleton className="h-8 w-8 rounded-full animate-pulse" />
              <Skeleton className="h-8 w-8 rounded-full animate-pulse" />
            </div>
          </div>
          <CardHeader>
            <Skeleton className="h-6 w-3/4 mb-2 animate-pulse" />
            <Skeleton className="h-4 w-full animate-pulse" />
            <Skeleton className="h-4 w-2/3 animate-pulse" />
            <div className="flex items-center space-x-1 mt-2">
              {[1,2,3,4,5].map(i => (
                <Skeleton key={i} className="h-4 w-4 rounded animate-pulse" />
              ))}
              <Skeleton className="h-4 w-16 ml-2 animate-pulse" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <div className="flex space-x-4">
                  <Skeleton className="h-4 w-16 animate-pulse" />
                  <Skeleton className="h-4 w-20 animate-pulse" />
                  <Skeleton className="h-4 w-16 animate-pulse" />
                </div>
                <Skeleton className="h-5 w-12 animate-pulse" />
              </div>
              <div className="flex items-center space-x-2">
                <Skeleton className="h-6 w-6 rounded-full animate-pulse" />
                <Skeleton className="h-4 w-20 animate-pulse" />
              </div>
              <div className="flex flex-wrap gap-1">
                <Skeleton className="h-6 w-16 rounded-full animate-pulse" />
                <Skeleton className="h-6 w-20 rounded-full animate-pulse" />
                <Skeleton className="h-6 w-14 rounded-full animate-pulse" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="gap-2">
            <Skeleton variant="button" className="flex-1 animate-pulse" />
            <Skeleton className="h-9 w-9 rounded-md animate-pulse" />
            <Skeleton className="h-9 w-9 rounded-md animate-pulse" />
          </CardFooter>
        </Card>
      );

    case 'minimal':
      return (
        <Card className={cn(baseCardClasses, 'w-full max-w-64')}>
          <div className="relative">
            <Skeleton className="w-full h-32 rounded-t-lg animate-pulse" />
          </div>
          <CardContent className="p-4">
            <Skeleton className="h-5 w-3/4 mb-2 animate-pulse" />
            <div className="flex space-x-4 text-sm">
              <Skeleton className="h-3 w-12 animate-pulse" />
              <Skeleton className="h-3 w-16 animate-pulse" />
            </div>
          </CardContent>
        </Card>
      );

    case 'list':
      return (
        <Card className="w-full">
          <div className="flex items-center space-x-4 p-4">
            <Skeleton className="w-16 h-16 flex-shrink-0 rounded-lg animate-pulse" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-1/2 animate-pulse" />
              <Skeleton className="h-4 w-3/4 animate-pulse" />
              <div className="flex space-x-4">
                <Skeleton className="h-3 w-12 animate-pulse" />
                <Skeleton className="h-3 w-16 animate-pulse" />
                <Skeleton className="h-3 w-12 animate-pulse" />
              </div>
            </div>
            <div className="flex space-x-2">
              <Skeleton className="h-8 w-8 rounded-md animate-pulse" />
              <Skeleton className="h-8 w-8 rounded-md animate-pulse" />
            </div>
          </div>
        </Card>
      );

    default: // 'default' variant
      return (
        <Card className={baseCardClasses}>
          <div className="relative">
            <Skeleton className="w-full h-48 rounded-t-lg animate-pulse" />
            <div className="absolute top-4 right-4">
              <Skeleton className="h-8 w-8 rounded-full animate-pulse" />
            </div>
          </div>
          <CardHeader>
            <Skeleton className="h-6 w-3/4 mb-2 animate-pulse" />
            <Skeleton className="h-4 w-full animate-pulse" />
            <Skeleton className="h-4 w-2/3 animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex space-x-4">
                <Skeleton className="h-4 w-16 animate-pulse" />
                <Skeleton className="h-4 w-20 animate-pulse" />
                <Skeleton className="h-4 w-16 animate-pulse" />
              </div>
              <div className="flex space-x-1">
                {[1,2,3,4,5].map(i => (
                  <Skeleton key={i} className="h-4 w-4 rounded animate-pulse" />
                ))}
                <Skeleton className="h-4 w-16 ml-2 animate-pulse" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="gap-2">
            <Skeleton variant="button" className="flex-1 animate-pulse" />
            <Skeleton className="h-9 w-9 rounded-md animate-pulse" />
            <Skeleton className="h-9 w-9 rounded-md animate-pulse" />
          </CardFooter>
        </Card>
      );
  }
};

// Error state component
const ErrorCard: React.FC<{ title: string }> = ({ title }) => (
  <Card className="border-destructive">
    <CardContent className="p-6">
      <div className="text-center">
        <div className="h-32 bg-destructive/5 rounded-lg flex items-center justify-center mb-4">
          <span className="text-destructive text-sm">Image failed to load</span>
        </div>
        <h3 className="font-semibold text-destructive">{title}</h3>
        <p className="text-sm text-destructive/80 mt-1">Failed to load recipe data</p>
        <Button variant="outline" size="sm" className="mt-3">
          Retry
        </Button>
      </div>
    </CardContent>
  </Card>
);

// Image component with aspect ratio support using proper AspectRatio component
const RecipeImage: React.FC<{
  src: string;
  alt: string;
  aspectRatio?: '4:3' | '16:9' | '1:1' | 'auto';
  className?: string;
  rounded?: boolean;
}> = ({ src, alt, aspectRatio = '4:3', className, rounded = false }) => {
  const aspectRatioValues = {
    '4:3': 4/3,
    '16:9': 16/9,
    '1:1': 1,
    'auto': undefined
  };

  // Create a themed placeholder image
  const placeholderImage = `data:image/svg+xml;charset=UTF-8,%3Csvg width="400" height="300" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="100%25" height="100%25" fill="%23f9fafb"/%3E%3Crect x="20" y="20" width="360" height="260" fill="none" stroke="%23d1d5db" stroke-width="2" stroke-dasharray="8,4"/%3E%3Ctext x="50%25" y="45%25" font-family="Arial, sans-serif" font-size="16" fill="%236b7280" text-anchor="middle"%3E📖%3C/text%3E%3Ctext x="50%25" y="60%25" font-family="Arial, sans-serif" font-size="12" fill="%239ca3af" text-anchor="middle"%3ERecipe Image%3C/text%3E%3C/svg%3E`;

  const ratio = aspectRatioValues[aspectRatio];

  if (aspectRatio === 'auto') {
    return (
      <div className={cn(
        'relative overflow-hidden bg-muted w-full',
        rounded && 'rounded-lg',
        className
      )}>
        <img
          src={src}
          alt={alt}
          className="w-full h-auto object-cover transition-opacity duration-200"
          onError={(e) => {
            e.currentTarget.src = placeholderImage;
          }}
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <AspectRatio ratio={ratio} className={cn('overflow-hidden bg-muted', rounded && 'rounded-lg', className)}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-opacity duration-200"
        onError={(e) => {
          e.currentTarget.src = placeholderImage;
        }}
        loading="lazy"
      />
    </AspectRatio>
  );
};

// Main RecipeCard component
export const RecipeCard: React.FC<RecipeCardProps> = ({
  title,
  description,
  image,
  imageAlt,
  cookTime,
  prepTime,
  servings,
  difficulty,
  rating,
  reviewCount,
  author,
  tags,
  cuisine,
  dietaryRestrictions,
  variant = 'default',
  size = 'medium',
  onClick,
  onSave,
  onShare,
  isSaved = false,
  isLoading = false,
  aspectRatio = '4:3',
  orientation = 'vertical',
  className,
  ...props
}) => {
  // Handle loading state
  if (isLoading) {
    return <LoadingSkeleton variant={variant} />;
  }

  // Handle error state (could be expanded with proper error prop)
  if (!image && !title) {
    return <ErrorCard title={title || 'Recipe'} />;
  }

  // Size variants
  const sizeClasses = {
    small: 'w-full max-w-64',
    medium: 'w-full max-w-80',
    large: 'w-full max-w-96'
  };

  // Base card classes
  const cardClasses = cn(
    'group transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer',
    sizeClasses[size || 'medium'],
    {
      'hover:shadow-xl': variant === 'hero',
    },
    className
  );

  // Compact variant
  if (variant === 'compact') {
    return (
      <Card 
        className={cn(cardClasses, 'w-full max-w-72 min-w-72')} 
        onClick={onClick}
        role="article"
        aria-labelledby={`recipe-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
        {...props}
      >
        <div className="flex items-start space-x-4 p-4">
          <RecipeImage
            src={image}
            alt={imageAlt}
            aspectRatio="1:1"
            className="w-20 h-20 flex-shrink-0"
            rounded={true}
          />
          <div className="flex-1 min-w-0">
            <h3 
              id={`recipe-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
              className="font-semibold text-sm leading-tight line-clamp-2 mb-2"
            >
              {title}
            </h3>
            <div className="space-y-1">
              <div className="flex items-center text-xs text-muted-foreground flex-wrap gap-2">
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{formatTime(cookTime + prepTime)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-3 w-3" />
                  <span>{servings}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ChefHat className="h-3 w-3" />
                  <span className={getDifficultyColor(difficulty)}>{difficulty}</span>
                </div>
              </div>
              {rating && (
                <div className="flex items-center space-x-1">
                  <Rating 
                    value={rating} 
                    readonly 
                    size="sm" 
                    reviewCount={reviewCount}
                    showReviewCount={reviewCount !== undefined}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // List variant
  if (variant === 'list' || orientation === 'horizontal') {
    return (
      <Card 
        className={cn(cardClasses, 'w-full max-w-2xl')} 
        onClick={onClick}
        role="article"
        aria-labelledby={`recipe-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
        {...props}
      >
        <div className="flex items-start space-x-4 p-4">
          <RecipeImage
            src={image}
            alt={imageAlt}
            aspectRatio="4:3"
            className="w-32 h-24 flex-shrink-0"
            rounded={true}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 
                  id={`recipe-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
                  className="font-semibold text-lg overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  {title}
                </h3>
                {description && (
                  <p className="text-sm text-muted-foreground overflow-hidden" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {description}
                  </p>
                )}
                <div className="mt-2">
                  <RecipeMetadata
                    cookTime={cookTime}
                    prepTime={prepTime}
                    servings={servings}
                    difficulty={difficulty}
                  />
                </div>
                {rating && (
                  <div className="mt-2">
                    <Rating 
                      value={rating} 
                      readonly 
                      size="md" 
                      reviewCount={reviewCount}
                      showReviewCount={reviewCount !== undefined}
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-1 ml-4">
                {onSave && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSave();
                    }}
                    aria-label={`${isSaved ? 'Remove' : 'Save'} ${title}`}
                  >
                    <Heart className={cn("h-4 w-4", isSaved && "fill-destructive text-destructive")} />
                  </Button>
                )}
                {onShare && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onShare();
                    }}
                    aria-label={`Share ${title}`}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Hero variant
  if (variant === 'hero') {
    return (
      <Card 
        className={cn(cardClasses, 'overflow-hidden')} 
        onClick={onClick}
        role="article"
        aria-labelledby={`recipe-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
        {...props}
      >
        <div className="relative">
          <RecipeImage
            src={image}
            alt={imageAlt}
            aspectRatio="16:9"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 
              id={`recipe-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
              className="text-xl font-bold mb-2"
            >
              {title}
            </h3>
            {author && (
              <div className="flex items-center space-x-2 mb-2">
                {author.avatar ? (
                  <img 
                    src={author.avatar} 
                    alt={author.name}
                    className="w-6 h-6 rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <User className={cn("w-6 h-6", author.avatar && "hidden")} />
                <span className="text-sm">{author.name}</span>
              </div>
            )}
          </div>
        </div>
        <CardContent className="space-y-4 p-6">
          {description && (
            <p className="text-sm">{description}</p>
          )}
          <RecipeMetadata
            cookTime={cookTime}
            prepTime={prepTime}
            servings={servings}
            difficulty={difficulty}
          />
          {rating && (
            <Rating 
              value={rating} 
              readonly 
              size="md" 
              reviewCount={reviewCount}
              showReviewCount={reviewCount !== undefined}
            />
          )}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {tags.slice(0, 3).map((tag, index) => (
                <span 
                  key={index}
                  className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="space-x-2 p-6 pt-0">
          {onSave && (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation();
                onSave();
              }}
              aria-label={`${isSaved ? 'Remove' : 'Save'} ${title}`}
            >
              <Heart className={cn("h-4 w-4 mr-2", isSaved && "fill-destructive text-destructive")} />
              {isSaved ? 'Saved' : 'Save'}
            </Button>
          )}
          <Button size="sm" variant="default" className="flex-1" onClick={onClick}>
            Start Cooking
          </Button>
        </CardFooter>
      </Card>
    );
  }

  // Minimal variant
  if (variant === 'minimal') {
    return (
      <div 
        className={cn(
          'group transition-all duration-200 cursor-pointer border-0 shadow-none bg-transparent',
          sizeClasses[size || 'medium'],
          className
        )} 
        onClick={onClick}
        role="article"
        aria-labelledby={`recipe-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
        {...props}
      >
        <RecipeImage
          src={image}
          alt={imageAlt}
          aspectRatio={aspectRatio}
          className="mb-3"
          rounded={true}
        />
        <div className="space-y-2">
          <h3 
            id={`recipe-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
            className="font-semibold text-lg leading-tight"
          >
            {title}
          </h3>
          {description && (
            <p className="text-sm text-muted-foreground overflow-hidden" style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}>
              {description}
            </p>
          )}
          <RecipeMetadata
            cookTime={cookTime}
            prepTime={prepTime}
            servings={servings}
            difficulty={difficulty}
          />
          {rating && (
            <Rating 
              value={rating} 
              readonly 
              size="md" 
              reviewCount={reviewCount}
              showReviewCount={reviewCount !== undefined}
            />
          )}
        </div>
      </div>
    );
  }

  // Detailed variant
  if (variant === 'detailed') {
    return (
      <Card 
        className={cn(cardClasses, 'overflow-hidden')} 
        onClick={onClick}
        role="article"
        aria-labelledby={`recipe-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
        {...props}
      >
        <RecipeImage
          src={image}
          alt={imageAlt}
          aspectRatio={aspectRatio}
        />
        <CardHeader>
          <CardTitle 
            id={`recipe-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
            className="text-xl"
          >
            {title}
          </CardTitle>
          {description && (
            <CardDescription>{description}</CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {dietaryRestrictions && dietaryRestrictions.length > 0 && (
            <Alert>
              <AlertDescription>
                Dietary: {dietaryRestrictions.join(', ')}
              </AlertDescription>
            </Alert>
          )}
          
          <RecipeMetadata
            cookTime={cookTime}
            prepTime={prepTime}
            servings={servings}
            difficulty={difficulty}
          />
          
          {rating && (
            <Rating 
              value={rating} 
              readonly 
              size="md" 
              reviewCount={reviewCount}
              showReviewCount={reviewCount !== undefined}
            />
          )}
          
          {author && (
            <div className="flex items-center space-x-2">
              {author.avatar ? (
                <img 
                  src={author.avatar} 
                  alt={author.name}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <User className="w-8 h-8 text-muted-foreground" />
              )}
              <span className="text-sm text-muted-foreground">by {author.name}</span>
            </div>
          )}
          
          {cuisine && (
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">Cuisine:</span> {cuisine}
            </div>
          )}
          
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {tags.map((tag, index) => (
                <span 
                  key={index}
                  className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex gap-2 p-6 pt-0">
          {onSave && (
            <Button 
              variant="outline" 
              size="sm"
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation();
                onSave();
              }}
              aria-label={`${isSaved ? 'Remove' : 'Save'} ${title}`}
            >
              <Heart className={cn("h-4 w-4 mr-2", isSaved && "fill-destructive text-destructive")} />
              {isSaved ? 'Saved' : 'Save'}
            </Button>
          )}
          {onShare && (
            <Button 
              variant="outline" 
              size="sm"
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation();
                onShare();
              }}
              aria-label={`Share ${title}`}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          )}
          <Button size="sm" variant="default" className="flex-1" onClick={onClick}>
            View Recipe
          </Button>
        </CardFooter>
      </Card>
    );
  }

  // Default variant
  return (
    <Card 
      className={cardClasses} 
      onClick={onClick}
      role="article"
      aria-labelledby={`recipe-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
      {...props}
    >
      <RecipeImage
        src={image}
        alt={imageAlt}
        aspectRatio={aspectRatio}
      />
      <CardHeader>
        <CardTitle 
          id={`recipe-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
          className="text-lg"
        >
          {title}
        </CardTitle>
        {description && (
          <CardDescription className="line-clamp-2 overflow-hidden">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <RecipeMetadata
          cookTime={cookTime}
          prepTime={prepTime}
          servings={servings}
          difficulty={difficulty}
        />
        {rating && (
          <Rating 
            value={rating} 
            readonly 
            size="md" 
            reviewCount={reviewCount}
            showReviewCount={reviewCount !== undefined}
          />
        )}
      </CardContent>
      <CardFooter className="flex gap-2">
        {onSave && (
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              onSave();
            }}
            aria-label={`${isSaved ? 'Remove' : 'Save'} ${title}`}
          >
            <Heart className={cn("h-4 w-4 mr-2", isSaved && "fill-destructive text-destructive")} />
            {isSaved ? 'Saved' : 'Save'}
          </Button>
        )}
        <Button size="sm" variant="default" className="flex-1" onClick={onClick}>
          View Recipe
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;