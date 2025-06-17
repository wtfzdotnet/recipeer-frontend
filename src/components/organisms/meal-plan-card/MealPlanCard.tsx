import React from 'react';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/hooks/useLocale';
import { cn } from '@/lib/utils';
import { 
  Calendar, 
  Clock, 
  Users, 
  MoreHorizontal, 
  Edit2, 
  Check, 
  X, 
  GripVertical,
  StickyNote
} from 'lucide-react';

import { Card, CardContent, CardHeader } from '@/components/molecules/card';
import { Badge } from '@/components/atoms/badge';
import { Button } from '@/components/atoms/button';

/**
 * Recipe interface for meal plan card
 */
export interface Recipe {
  id: string;
  title: string;
  image?: string;
  prepTime: number; // minutes
  cookTime: number; // minutes
  difficulty: 'easy' | 'medium' | 'hard';
  nutrition: {
    calories: number;
    protein: number; // grams
    carbs: number; // grams  
    fat: number; // grams
  };
}

/**
 * Meal plan item interface
 */
export interface MealPlan {
  id: string;
  date: Date;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  recipe: Recipe;
  servings: number;
  prepStatus: 'planned' | 'prepped' | 'completed';
  notes?: string;
}

/**
 * Props for MealPlanCard component - Organism level
 * 
 * A comprehensive meal planning card that displays scheduled meals with recipe information,
 * nutritional data, and interactive editing capabilities. Supports different view variants
 * and includes drag-and-drop functionality for meal organization.
 * 
 * @example
 * <MealPlanCard 
 *   mealPlan={mealPlan}
 *   variant="daily"
 *   allowEditing={true}
 *   onEdit={handleEdit}
 *   onComplete={handleComplete}
 * />
 */
export interface MealPlanCardProps {
  /** Meal plan data */
  mealPlan: MealPlan;
  /** Display variant for different planning views */
  variant?: 'daily' | 'weekly' | 'calendar';
  /** Whether editing actions are allowed */
  allowEditing?: boolean;
  /** Whether drag and drop is enabled */
  draggable?: boolean;
  /** Callback when editing meal plan */
  onEdit?: (mealPlanId: string) => void;
  /** Callback when marking meal as complete */
  onComplete?: (mealPlanId: string) => void;
  /** Callback when removing meal from plan */
  onRemove?: (mealPlanId: string) => void;
  /** Callback when adding or editing notes */
  onNotesEdit?: (mealPlanId: string, notes: string) => void;
  /** Custom CSS class */
  className?: string;
  /** Accessibility label */
  'aria-label'?: string;
}

const MealPlanCard: React.FC<MealPlanCardProps> = ({
  mealPlan,
  variant = 'daily',
  allowEditing = true,
  draggable = false,
  onEdit,
  onComplete,
  onRemove,
  onNotesEdit,
  className,
  ...props
}) => {
  const { t } = useTranslation();
  const { locale } = useLocale();

  // Calculate total time for recipe
  const totalTime = mealPlan.recipe.prepTime + mealPlan.recipe.cookTime;
  
  // Calculate adjusted nutrition based on servings
  const adjustedNutrition = {
    calories: Math.round((mealPlan.recipe.nutrition.calories * mealPlan.servings) / 1),
    protein: Math.round((mealPlan.recipe.nutrition.protein * mealPlan.servings) / 1),
    carbs: Math.round((mealPlan.recipe.nutrition.carbs * mealPlan.servings) / 1),
    fat: Math.round((mealPlan.recipe.nutrition.fat * mealPlan.servings) / 1),
  };

  // Get meal type styling
  const getMealTypeBadgeVariant = (mealType: MealPlan['mealType']) => {
    switch (mealType) {
      case 'breakfast': return 'default';
      case 'lunch': return 'secondary'; 
      case 'dinner': return 'outline';
      case 'snack': return 'destructive';
      default: return 'default';
    }
  };

  // Get status styling
  const getStatusStyling = (status: MealPlan['prepStatus']) => {
    switch (status) {
      case 'completed':
        return { 
          variant: 'default' as const, 
          className: 'bg-success text-success-foreground' 
        };
      case 'prepped':
        return { 
          variant: 'secondary' as const, 
          className: 'bg-warning text-warning-foreground' 
        };
      case 'planned':
        return { 
          variant: 'outline' as const, 
          className: '' 
        };
      default:
        return { 
          variant: 'outline' as const, 
          className: '' 
        };
    }
  };

  const statusStyle = getStatusStyling(mealPlan.prepStatus);

  // Format date based on variant
  const formatDate = (date: Date) => {
    switch (variant) {
      case 'daily':
        return format(date, 'HH:mm', { locale: locale.dateLocale });
      case 'weekly':
        return format(date, 'EEE HH:mm', { locale: locale.dateLocale });
      case 'calendar':
        return format(date, 'MMM d', { locale: locale.dateLocale });
      default:
        return format(date, 'HH:mm', { locale: locale.dateLocale });
    }
  };

  return (
    <Card 
      className={cn(
        'group relative border transition-all duration-200',
        'hover:shadow-md hover:border-primary/20',
        mealPlan.prepStatus === 'completed' && 'opacity-75',
        draggable && 'cursor-grab active:cursor-grabbing',
        variant === 'calendar' && 'h-auto',
        className
      )}
      {...props}
    >
      {/* Drag handle */}
      {draggable && (
        <div 
          className="absolute start-2 top-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity rtl:start-auto rtl:end-2"
          aria-label={t('mealPlan.labels.dragToReorder')}
        >
          <GripVertical className="h-4 w-4" />
        </div>
      )}

      <CardHeader className={cn('pb-3', draggable && 'ps-8 rtl:ps-6 rtl:pe-8')}>
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            {/* Meal type and time */}
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant={getMealTypeBadgeVariant(mealPlan.mealType)}>
                {t(`mealPlan.mealTypes.${mealPlan.mealType}`)}
              </Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(mealPlan.date)}</span>
              </div>
              <Badge variant={statusStyle.variant} className={statusStyle.className}>
                {t(`mealPlan.status.${mealPlan.prepStatus}`)}
              </Badge>
            </div>

            {/* Recipe title */}
            <h4 className="font-semibold leading-tight text-lg text-foreground">
              {mealPlan.recipe.title}
            </h4>
          </div>

          {/* Action menu */}
          {allowEditing && (
            <div className="flex items-center gap-1">
              {mealPlan.prepStatus !== 'completed' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onComplete?.(mealPlan.id)}
                  className="h-8 w-8 p-0"
                  aria-label={t('mealPlan.actions.complete')}
                >
                  <Check className="h-4 w-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit?.(mealPlan.id)}
                className="h-8 w-8 p-0"
                aria-label={t('mealPlan.actions.edit')}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemove?.(mealPlan.id)}
                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                aria-label={t('mealPlan.actions.remove')}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className={cn('pt-0', draggable && 'ps-8 rtl:ps-6 rtl:pe-8')}>
        <div className="space-y-3">
          {/* Recipe image and quick info */}
          {variant !== 'calendar' && (
            <div className="flex items-center gap-3">
              {mealPlan.recipe.image && (
                <div className="flex-shrink-0">
                  <img
                    src={mealPlan.recipe.image}
                    alt={mealPlan.recipe.title}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                </div>
              )}
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{totalTime} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>
                      {t('mealPlan.labels.servings', { count: mealPlan.servings })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Nutrition summary */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <span className="font-medium">
                {t('mealPlan.labels.calories', { count: adjustedNutrition.calories })}
              </span>
              <span className="text-muted-foreground">
                P: {adjustedNutrition.protein}g
              </span>
              <span className="text-muted-foreground">
                C: {adjustedNutrition.carbs}g  
              </span>
              <span className="text-muted-foreground">
                F: {adjustedNutrition.fat}g
              </span>
            </div>
          </div>

          {/* Notes */}
          {mealPlan.notes && (
            <div className="flex items-start gap-2 p-2 bg-muted/30 rounded-md text-sm">
              <StickyNote className="h-3 w-3 mt-0.5 text-muted-foreground flex-shrink-0" />
              <span className="text-muted-foreground">{mealPlan.notes}</span>
            </div>
          )}

          {/* Add notes button */}
          {allowEditing && !mealPlan.notes && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNotesEdit?.(mealPlan.id, '')}
              className="h-8 w-auto px-2 text-muted-foreground hover:text-foreground"
            >
              <StickyNote className="h-3 w-3 me-1" />
              {t('mealPlan.actions.addNotes')}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

MealPlanCard.displayName = 'MealPlanCard';

export { MealPlanCard };