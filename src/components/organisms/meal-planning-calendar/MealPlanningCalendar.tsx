import * as React from 'react';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/molecules/card';
import { Button } from '@/components/atoms/button';
import { Badge } from '@/components/atoms/badge';
import { Plus, ChefHat, Clock } from 'lucide-react';

/**
 * Meal plan item data
 */
export interface MealPlan {
  id: string;
  date: Date;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  recipeName: string;
  recipeId: string;
  servings: number;
  prepTime: number;
  cultural?: string;
}

/**
 * Props for MealPlanningCalendar - Organism
 * 
 * A calendar-based meal planning interface that supports
 * cultural content organization and seasonal recipe planning.
 */
export interface MealPlanningCalendarProps {
  /** Array of planned meals */
  mealPlans: MealPlan[];
  
  /** Currently selected date */
  selectedDate?: Date;
  
  /** Callback for date selection */
  onDateSelect?: (date: Date | undefined) => void;
  
  /** Callback for adding a meal plan */
  onAddMeal?: (date: Date) => void;
  
  /** Callback for editing a meal plan */
  onEditMeal?: (mealPlan: MealPlan) => void;
  
  /** Callback for removing a meal plan */
  onRemoveMeal?: (mealPlanId: string) => void;
  
  /** Loading state */
  loading?: boolean;
  
  /** Custom CSS class */
  className?: string;
  
  /** ARIA label for accessibility */
  'aria-label'?: string;
}

/**
 * MealPlanningCalendar - Advanced meal planning interface
 * 
 * Provides comprehensive meal planning capabilities including:
 * - Weekly and monthly meal planning
 * - Cultural content organization
 * - Seasonal recipe suggestions
 * - Meal prep scheduling
 */
export const MealPlanningCalendar = React.forwardRef<
  HTMLDivElement,
  MealPlanningCalendarProps
>(({
  mealPlans,
  selectedDate,
  onDateSelect,
  onAddMeal,
  onEditMeal,
  // onRemoveMeal, - commented out as it's not used yet
  loading = false,
  className,
  'aria-label': ariaLabel = 'Meal planning calendar',
  ...props
}, ref) => {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const getMealsForDate = (date: Date) => {
    return mealPlans.filter(meal => 
      meal.date.toDateString() === date.toDateString()
    );
  };

  const getTotalMealsForDate = (date: Date) => {
    return getMealsForDate(date).length;
  };

  const getDayContent = (day: Date) => {
    const mealsCount = getTotalMealsForDate(day);
    if (mealsCount === 0) return null;

    return (
      <div className="absolute bottom-0 left-0 right-0">
        <div className="bg-primary text-primary-foreground text-xs px-1 rounded-t-sm text-center">
          {mealsCount} meal{mealsCount > 1 ? 's' : ''}
        </div>
      </div>
    );
  };

  const selectedDateMeals = selectedDate ? getMealsForDate(selectedDate) : [];

  const getMealTypeColor = (mealType: MealPlan['mealType']) => {
    switch (mealType) {
      case 'breakfast': return 'secondary';
      case 'lunch': return 'default';
      case 'dinner': return 'outline';
      case 'snack': return 'destructive';
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
        <div className="text-center">Loading meal plans...</div>
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChefHat className="h-5 w-5" />
                Meal Planning Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={onDateSelect}
                month={currentMonth}
                onMonthChange={setCurrentMonth}
                className="rounded-md border"
                components={{
                  DayContent: ({ date }) => (
                    <div className="relative w-full h-full p-2">
                      <span>{date.getDate()}</span>
                      {getDayContent(date)}
                    </div>
                  ),
                }}
              />
            </CardContent>
          </Card>
        </div>

        {/* Selected Date Details */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>
                  {selectedDate 
                    ? selectedDate.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })
                    : 'Select a date'
                  }
                </span>
                {selectedDate && (
                  <Button
                    size="sm"
                    onClick={() => onAddMeal?.(selectedDate)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!selectedDate ? (
                <p className="text-muted-foreground text-sm">
                  Click on a date to view or plan meals
                </p>
              ) : selectedDateMeals.length === 0 ? (
                <div className="text-center py-8">
                  <ChefHat className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">
                    No meals planned for this day
                  </p>
                  <Button onClick={() => onAddMeal?.(selectedDate)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Meal
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedDateMeals.map((meal) => (
                    <div
                      key={meal.id}
                      className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                      onClick={() => onEditMeal?.(meal)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant={getMealTypeColor(meal.mealType)}>
                          {meal.mealType}
                        </Badge>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {meal.prepTime} min
                        </div>
                      </div>
                      <h4 className="font-medium text-sm">{meal.recipeName}</h4>
                      <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                        <span>{meal.servings} servings</span>
                        {meal.cultural && (
                          <Badge variant="outline" className="text-xs">
                            {meal.cultural}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-sm">This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Planned Meals:</span>
                  <span className="font-medium">{mealPlans.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Prep Time:</span>
                  <span className="font-medium">
                    {mealPlans.reduce((total, meal) => total + meal.prepTime, 0)} min
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Cultural Variety:</span>
                  <span className="font-medium">
                    {new Set(mealPlans.map(m => m.cultural).filter(Boolean)).size} cuisines
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
});

MealPlanningCalendar.displayName = 'MealPlanningCalendar';