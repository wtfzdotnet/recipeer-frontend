import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  SimpleBarChart,
  SimpleLineChart,
  SimplePieChart,
  type BarChartProps,
  type LineChartProps,
  type PieChartProps,
} from '@/components/ui/chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/molecules/card';
import { Button } from '@/components/atoms/button';
import { Badge } from '@/components/atoms/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  Calendar,
  Target,
  Activity
} from 'lucide-react';

/**
 * Nutrition data for analytics
 */
export interface NutritionData {
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
}

/**
 * Macronutrient breakdown data
 */
export interface MacroBreakdown {
  name: string;
  value: number;
  percentage: number;
}

/**
 * Weekly nutrition summary
 */
export interface WeeklyNutritionSummary {
  totalMeals: number;
  avgCalories: number;
  avgProtein: number;
  avgCarbs: number;
  avgFat: number;
  goals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

/**
 * Props for NutritionAnalyticsChart - Organism
 * 
 * A comprehensive nutrition analytics dashboard with multiple chart views
 * for tracking meal planning progress and nutritional goals.
 */
export interface NutritionAnalyticsChartProps {
  /** Daily nutrition data for the chart */
  dailyData: NutritionData[];
  
  /** Weekly nutrition summary */
  weeklyData?: WeeklyNutritionSummary;
  
  /** Macronutrient breakdown for pie chart */
  macroBreakdown?: MacroBreakdown[];
  
  /** Date range for the data */
  dateRange?: {
    start: Date;
    end: Date;
  };
  
  /** Loading state */
  loading?: boolean;
  
  /** Custom CSS class */
  className?: string;
  
  /** ARIA label for accessibility */
  'aria-label'?: string;
}

/**
 * NutritionAnalyticsChart - Advanced nutrition data visualization
 * 
 * Provides comprehensive nutrition analytics including:
 * - Daily calorie and macro tracking
 * - Weekly nutrition trends
 * - Goal achievement visualization
 * - Macronutrient distribution analysis
 */
export const NutritionAnalyticsChart = React.forwardRef<
  HTMLDivElement,
  NutritionAnalyticsChartProps
>(({
  dailyData,
  weeklyData,
  macroBreakdown,
  dateRange,
  loading = false,
  className,
  'aria-label': ariaLabel = 'Nutrition analytics dashboard',
  ...props
}, ref) => {
  const [activeTab, setActiveTab] = React.useState('overview');

  // Calculate goal achievement percentages
  const goalAchievement = React.useMemo(() => {
    if (!weeklyData) return null;

    return {
      calories: Math.round((weeklyData.avgCalories / weeklyData.goals.calories) * 100),
      protein: Math.round((weeklyData.avgProtein / weeklyData.goals.protein) * 100),
      carbs: Math.round((weeklyData.avgCarbs / weeklyData.goals.carbs) * 100),
      fat: Math.round((weeklyData.avgFat / weeklyData.goals.fat) * 100),
    };
  }, [weeklyData]);

  // Prepare chart data
  const calorieChartData = dailyData.map(day => ({
    date: new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    calories: day.calories,
  }));

  const macroChartData = dailyData.map(day => ({
    date: new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    protein: day.protein,
    carbs: day.carbs,
    fat: day.fat,
  }));

  const macroBreakdownData = macroBreakdown || [
    { name: 'Protein', value: 25, percentage: 25 },
    { name: 'Carbs', value: 50, percentage: 50 },
    { name: 'Fat', value: 25, percentage: 25 },
  ];

  if (loading) {
    return (
      <div 
        ref={ref}
        className={cn('w-full p-4', className)}
        aria-label={ariaLabel}
        {...props}
      >
        <div className="text-center">Loading nutrition analytics...</div>
      </div>
    );
  }

  return (
    <div 
      ref={ref}
      className={cn('w-full space-y-6', className)}
      aria-label={ariaLabel}
      {...props}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Nutrition Analytics</h2>
          {dateRange && (
            <p className="text-sm text-muted-foreground">
              {dateRange.start.toLocaleDateString()} - {dateRange.end.toLocaleDateString()}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span className="text-sm text-muted-foreground">
            {dailyData.length} days tracked
          </span>
        </div>
      </div>

      {/* Weekly Summary Cards */}
      {weeklyData && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Avg Calories</span>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold">{weeklyData.avgCalories}</div>
                {goalAchievement && (
                  <Badge 
                    variant={goalAchievement.calories >= 90 ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {goalAchievement.calories}% of goal
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Avg Protein</span>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold">{weeklyData.avgProtein}g</div>
                {goalAchievement && (
                  <Badge 
                    variant={goalAchievement.protein >= 90 ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {goalAchievement.protein}% of goal
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Avg Carbs</span>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold">{weeklyData.avgCarbs}g</div>
                {goalAchievement && (
                  <Badge 
                    variant={goalAchievement.carbs >= 90 ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {goalAchievement.carbs}% of goal
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <PieChart className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Avg Fat</span>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold">{weeklyData.avgFat}g</div>
                {goalAchievement && (
                  <Badge 
                    variant={goalAchievement.fat >= 90 ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {goalAchievement.fat}% of goal
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Chart Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Trends
          </TabsTrigger>
          <TabsTrigger value="breakdown" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            Breakdown
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Calorie Intake</CardTitle>
            </CardHeader>
            <CardContent>
              <SimpleBarChart
                data={calorieChartData}
                dataKey="calories"
                xAxisKey="date"
                height={300}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Macronutrient Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <SimpleLineChart
                data={macroChartData}
                dataKey="protein"
                xAxisKey="date"
                height={300}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="breakdown" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Macronutrient Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <SimplePieChart
                data={macroBreakdownData}
                dataKey="value"
                nameKey="name"
                height={300}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
});

NutritionAnalyticsChart.displayName = 'NutritionAnalyticsChart';