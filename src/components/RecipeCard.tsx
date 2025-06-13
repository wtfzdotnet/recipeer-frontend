import React from 'react';
import { Clock, Users, ChefHat, Star, Heart, Share2, Bookmark, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './Button';
import { Alert, AlertDescription } from './ui/alert';

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
      return 'text-green-600';
    case 'Medium':
      return 'text-yellow-600';
    case 'Hard':
      return 'text-red-600';
    default:
      return 'text-gray-600';
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

// Star rating component
const StarRating: React.FC<{
  rating?: number;
  reviewCount?: number;
  compact?: boolean;
}> = ({ rating, reviewCount, compact = false }) => {
  if (!rating) return null;
  
  return (
    <div className="flex items-center space-x-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star} 
            className={cn(
              "h-4 w-4",
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            )} 
          />
        ))}
      </div>
      {reviewCount && !compact && (
        <span className="text-sm text-muted-foreground">({reviewCount})</span>
      )}
    </div>
  );
};

// Loading skeleton component
const LoadingSkeleton: React.FC<{ variant: string }> = ({ variant }) => (
  <Card className="animate-pulse">
    {variant === 'hero' && (
      <div className="h-48 bg-gray-200 rounded-t-lg" />
    )}
    <CardHeader>
      <div className="h-6 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-full" />
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
      </div>
    </CardContent>
    <CardFooter>
      <div className="h-8 bg-gray-200 rounded w-full" />
    </CardFooter>
  </Card>
);

// Error state component
const ErrorCard: React.FC<{ title: string }> = ({ title }) => (
  <Card className="border-red-200">
    <CardContent className="p-6">
      <div className="text-center">
        <div className="h-32 bg-red-50 rounded-lg flex items-center justify-center mb-4">
          <span className="text-red-400 text-sm">Image failed to load</span>
        </div>
        <h3 className="font-semibold text-red-900">{title}</h3>
        <p className="text-sm text-red-600 mt-1">Failed to load recipe data</p>
        <Button variant="outline" size="sm" className="mt-3">
          Retry
        </Button>
      </div>
    </CardContent>
  </Card>
);

// Image component with aspect ratio support
const RecipeImage: React.FC<{
  src: string;
  alt: string;
  aspectRatio?: '4:3' | '16:9' | '1:1' | 'auto';
  className?: string;
}> = ({ src, alt, aspectRatio = '4:3', className }) => {
  const aspectRatioClasses = {
    '4:3': 'aspect-[4/3]',
    '16:9': 'aspect-video',
    '1:1': 'aspect-square',
    'auto': 'h-auto'
  };

  return (
    <div className={cn(
      'relative overflow-hidden bg-gray-200',
      aspectRatioClasses[aspectRatio],
      className
    )}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk3OTc5NyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+';
        }}
      />
    </div>
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
    small: 'w-64',
    medium: 'w-80',
    large: 'w-96'
  };

  // Base card classes
  const cardClasses = cn(
    'group transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer',
    sizeClasses[size || 'medium'],
    {
      'hover:shadow-xl': variant === 'hero',
      'shadow-none border-0': variant === 'minimal',
    },
    className
  );

  // Compact variant
  if (variant === 'compact') {
    return (
      <Card 
        className={cn(cardClasses, 'w-64')} 
        onClick={onClick}
        role="article"
        aria-labelledby={`recipe-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
        {...props}
      >
        <div className="flex items-start space-x-3 p-4">
          <RecipeImage
            src={image}
            alt={imageAlt}
            aspectRatio="1:1"
            className="w-16 h-16 rounded-md flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h3 
              id={`recipe-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
              className="font-semibold text-sm overflow-hidden text-ellipsis whitespace-nowrap"
            >
              {title}
            </h3>
            <div className="mt-1">
              <RecipeMetadata
                cookTime={cookTime}
                prepTime={prepTime}
                servings={servings}
                difficulty={difficulty}
                compact
              />
            </div>
            {rating && (
              <div className="mt-1">
                <StarRating rating={rating} reviewCount={reviewCount} compact />
              </div>
            )}
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
            className="w-32 h-24 rounded-lg flex-shrink-0"
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
                    <StarRating rating={rating} reviewCount={reviewCount} />
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
                    <Heart className={cn("h-4 w-4", isSaved && "fill-red-500 text-red-500")} />
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
            className="h-64 rounded-t-lg"
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
                    className="w-6 h-6 rounded-full"
                  />
                ) : (
                  <User className="w-6 h-6" />
                )}
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
            <StarRating rating={rating} reviewCount={reviewCount} />
          )}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {tags.slice(0, 3).map((tag, index) => (
                <span 
                  key={index}
                  className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
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
              <Heart className={cn("h-4 w-4 mr-2", isSaved && "fill-red-500 text-red-500")} />
              {isSaved ? 'Saved' : 'Save'}
            </Button>
          )}
          <Button size="sm" className="flex-1">
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
        className={cn(cardClasses, 'border-0 shadow-none bg-transparent')} 
        onClick={onClick}
        role="article"
        aria-labelledby={`recipe-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
        {...props}
      >
        <RecipeImage
          src={image}
          alt={imageAlt}
          aspectRatio={aspectRatio}
          className="rounded-lg mb-3"
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
            <StarRating rating={rating} reviewCount={reviewCount} />
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
          className="h-48 rounded-t-lg"
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
            <StarRating rating={rating} reviewCount={reviewCount} />
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
                  className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="space-x-2">
          {onSave && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onSave();
              }}
              aria-label={`${isSaved ? 'Remove' : 'Save'} ${title}`}
            >
              <Heart className={cn("h-4 w-4 mr-2", isSaved && "fill-red-500 text-red-500")} />
              {isSaved ? 'Saved' : 'Save'}
            </Button>
          )}
          {onShare && (
            <Button 
              variant="outline" 
              size="sm"
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
          <Button size="sm" className="flex-1">
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
        className="h-48 rounded-t-lg"
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
          <StarRating rating={rating} reviewCount={reviewCount} />
        )}
      </CardContent>
      <CardFooter className="space-x-2">
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
            <Heart className={cn("h-4 w-4 mr-2", isSaved && "fill-red-500 text-red-500")} />
            {isSaved ? 'Saved' : 'Save'}
          </Button>
        )}
        <Button size="sm" className="flex-1">
          View Recipe
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;