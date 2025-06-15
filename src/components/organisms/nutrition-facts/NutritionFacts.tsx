import React from 'react';
import { AlertTriangle, Check, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { NutritionFactsProps, DailyValuePercentages, DietaryCompliance, NutritionData } from './types';

// FDA daily values based on 2000 calorie diet
const DAILY_VALUES = {
  totalFat: 65, // grams
  saturatedFat: 20, // grams
  cholesterol: 300, // milligrams
  sodium: 2300, // milligrams
  totalCarbohydrates: 300, // grams
  dietaryFiber: 25, // grams
  vitaminD: 20, // micrograms
  calcium: 1300, // milligrams
  iron: 18, // milligrams
  potassium: 4700, // milligrams
  vitaminA: 900, // micrograms
  vitaminC: 90, // milligrams
};

// Calculate daily value percentages
const calculateDailyValues = (nutrition: NutritionData): DailyValuePercentages => {
  return {
    totalFat: Math.round((nutrition.totalFat / DAILY_VALUES.totalFat) * 100),
    saturatedFat: Math.round((nutrition.saturatedFat / DAILY_VALUES.saturatedFat) * 100),
    cholesterol: Math.round((nutrition.cholesterol / DAILY_VALUES.cholesterol) * 100),
    sodium: Math.round((nutrition.sodium / DAILY_VALUES.sodium) * 100),
    totalCarbohydrates: Math.round((nutrition.totalCarbohydrates / DAILY_VALUES.totalCarbohydrates) * 100),
    dietaryFiber: Math.round((nutrition.dietaryFiber / DAILY_VALUES.dietaryFiber) * 100),
    vitaminD: nutrition.vitaminD ? Math.round((nutrition.vitaminD / DAILY_VALUES.vitaminD) * 100) : undefined,
    calcium: nutrition.calcium ? Math.round((nutrition.calcium / DAILY_VALUES.calcium) * 100) : undefined,
    iron: nutrition.iron ? Math.round((nutrition.iron / DAILY_VALUES.iron) * 100) : undefined,
    potassium: nutrition.potassium ? Math.round((nutrition.potassium / DAILY_VALUES.potassium) * 100) : undefined,
    vitaminA: nutrition.vitaminA ? Math.round((nutrition.vitaminA / DAILY_VALUES.vitaminA) * 100) : undefined,
    vitaminC: nutrition.vitaminC ? Math.round((nutrition.vitaminC / DAILY_VALUES.vitaminC) * 100) : undefined,
  };
};

// Determine dietary compliance badges
const getDietaryCompliance = (nutrition: NutritionData): DietaryCompliance[] => {
  const compliance: DietaryCompliance[] = [];
  
  // Keto: < 20g carbs, high fat
  if (nutrition.totalCarbohydrates < 20 && nutrition.totalFat > 20) {
    compliance.push('keto');
  }
  
  // Low-carb: < 50g carbs
  if (nutrition.totalCarbohydrates < 50) {
    compliance.push('low-carb');
  }
  
  // High-protein: > 20g protein
  if (nutrition.protein > 20) {
    compliance.push('high-protein');
  }
  
  // Low-fat: < 10% calories from fat
  const fatCalories = nutrition.totalFat * 9;
  const fatPercentage = (fatCalories / nutrition.calories) * 100;
  if (fatPercentage < 30) {
    compliance.push('low-fat');
  }
  
  // Low-sodium: < 140mg
  if (nutrition.sodium < 140) {
    compliance.push('low-sodium');
  }
  
  // High-fiber: > 5g
  if (nutrition.dietaryFiber > 5) {
    compliance.push('high-fiber');
  }
  
  return compliance;
};

// Progress bar component for daily values
const ProgressBar: React.FC<{ percentage: number; className?: string }> = ({ 
  percentage, 
  className 
}) => {
  const clampedPercentage = Math.min(percentage, 100);
  const colorClass = percentage > 100 ? 'bg-destructive' : percentage > 75 ? 'bg-warning' : 'bg-success';
  
  return (
    <div className={cn("w-20 h-2 bg-muted rounded-full overflow-hidden", className)}>
      <div 
        className={cn("h-full transition-all duration-300", colorClass)}
        style={{ width: `${clampedPercentage}%` }}
      />
    </div>
  );
};

// Dietary compliance badge component
const ComplianceBadge: React.FC<{ compliance: DietaryCompliance }> = ({ compliance }) => {
  const { t } = useTranslation('nutrition');
  
  const badgeConfig = {
    keto: { label: t('compliance.keto'), color: 'bg-primary text-primary-foreground border-primary' },
    'low-carb': { label: t('compliance.lowCarb'), color: 'bg-accent text-accent-foreground border-accent' },
    'high-protein': { label: t('compliance.highProtein'), color: 'bg-warning text-warning-foreground border-warning' },
    'low-fat': { label: t('compliance.lowFat'), color: 'bg-success text-success-foreground border-success' },
    'low-sodium': { label: t('compliance.lowSodium'), color: 'bg-secondary text-secondary-foreground border-secondary' },
    'high-fiber': { label: t('compliance.highFiber'), color: 'bg-warning text-warning-foreground border-warning' },
  };
  
  const config = badgeConfig[compliance];
  
  return (
    <span className={cn(
      "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border",
      config.color
    )}>
      <Check className="w-3 h-3 mr-1" />
      {config.label}
    </span>
  );
};

// Nutrition fact row component
const NutritionRow: React.FC<{
  label: string;
  value: string;
  dailyValue?: number;
  showDailyValue?: boolean;
  bold?: boolean;
  indented?: boolean;
}> = ({ label, value, dailyValue, showDailyValue = true, bold = false, indented = false }) => (
  <div className={cn(
    "flex justify-between items-center py-1",
    bold && "font-bold border-t border-black",
    indented && "pl-4"
  )}>
    <span className={cn("text-sm", bold && "font-bold")}>{label}</span>
    <div className="flex items-center space-x-2">
      <span className={cn("text-sm", bold && "font-bold")}>{value}</span>
      {showDailyValue && dailyValue !== undefined && (
        <>
          <span className="text-sm text-muted-foreground">{dailyValue}%</span>
          <ProgressBar percentage={dailyValue} />
        </>
      )}
    </div>
  </div>
);

export const NutritionFacts: React.FC<NutritionFactsProps> = ({
  nutrition,
  servings,
  showDailyValues = true,
  showAllergens = true,
  compactMode = false,
  allergens,
  className,
  ...props
}) => {
  const { t } = useTranslation('nutrition');
  const dailyValues = calculateDailyValues(nutrition);
  const compliance = getDietaryCompliance(nutrition);
  
  return (
    <div className={cn("space-y-4", className)} {...props}>
      {/* Main nutrition facts panel */}
      <Card className={cn("max-w-sm", compactMode && "max-w-xs")}>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold text-center border-b-2 border-black pb-2">
            {t('title')}
          </CardTitle>
          <div className="text-sm text-center">
            <div className="font-medium">{t('servings.perContainer', { count: servings })}</div>
            <div className="text-xs text-muted-foreground">{t('servings.servingSize')}</div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-0 px-4 pb-4">
          {/* Calories */}
          <div className="border-t-8 border-black pt-2">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">{t('calories')}</span>
              <span className="text-3xl font-bold">{nutrition.calories}</span>
            </div>
          </div>
          
          <Separator className="my-2 bg-black" />
          
          {/* Daily value header */}
          {showDailyValues && (
            <div className="text-right text-xs font-bold">{t('dailyValue')}</div>
          )}
          
          {/* Macronutrients */}
          <div className="space-y-1">
            <NutritionRow
              label={t('nutrients.totalFat')}
              value={`${nutrition.totalFat}${t('units.grams')}`}
              dailyValue={dailyValues.totalFat}
              showDailyValue={showDailyValues}
              bold
            />
            <NutritionRow
              label={t('nutrients.saturatedFat')}
              value={`${nutrition.saturatedFat}${t('units.grams')}`}
              dailyValue={dailyValues.saturatedFat}
              showDailyValue={showDailyValues}
              indented
            />
            <NutritionRow
              label={t('nutrients.transFat')}
              value={`${nutrition.transFat}${t('units.grams')}`}
              showDailyValue={false}
              indented
            />
            <NutritionRow
              label={t('nutrients.cholesterol')}
              value={`${nutrition.cholesterol}${t('units.milligrams')}`}
              dailyValue={dailyValues.cholesterol}
              showDailyValue={showDailyValues}
              bold
            />
            <NutritionRow
              label={t('nutrients.sodium')}
              value={`${nutrition.sodium}${t('units.milligrams')}`}
              dailyValue={dailyValues.sodium}
              showDailyValue={showDailyValues}
              bold
            />
            <NutritionRow
              label={t('nutrients.totalCarbohydrates')}
              value={`${nutrition.totalCarbohydrates}${t('units.grams')}`}
              dailyValue={dailyValues.totalCarbohydrates}
              showDailyValue={showDailyValues}
              bold
            />
            <NutritionRow
              label={t('nutrients.dietaryFiber')}
              value={`${nutrition.dietaryFiber}${t('units.grams')}`}
              dailyValue={dailyValues.dietaryFiber}
              showDailyValue={showDailyValues}
              indented
            />
            <NutritionRow
              label={t('nutrients.totalSugars')}
              value={`${nutrition.totalSugars}${t('units.grams')}`}
              showDailyValue={false}
              indented
            />
            <NutritionRow
              label={t('nutrients.addedSugars')}
              value={`${nutrition.addedSugars}${t('units.grams')}`}
              showDailyValue={false}
              indented
            />
            <NutritionRow
              label={t('nutrients.protein')}
              value={`${nutrition.protein}${t('units.grams')}`}
              showDailyValue={false}
              bold
            />
          </div>
          
          {/* Vitamins and minerals */}
          {!compactMode && (nutrition.vitaminD || nutrition.calcium || nutrition.iron || nutrition.potassium) && (
            <>
              <Separator className="my-2 bg-black" />
              <div className="space-y-1">
                {nutrition.vitaminD && (
                  <NutritionRow
                    label={t('nutrients.vitaminD')}
                    value={`${nutrition.vitaminD}${t('units.micrograms')}`}
                    dailyValue={dailyValues.vitaminD}
                    showDailyValue={showDailyValues}
                  />
                )}
                {nutrition.calcium && (
                  <NutritionRow
                    label={t('nutrients.calcium')}
                    value={`${nutrition.calcium}${t('units.milligrams')}`}
                    dailyValue={dailyValues.calcium}
                    showDailyValue={showDailyValues}
                  />
                )}
                {nutrition.iron && (
                  <NutritionRow
                    label={t('nutrients.iron')}
                    value={`${nutrition.iron}${t('units.milligrams')}`}
                    dailyValue={dailyValues.iron}
                    showDailyValue={showDailyValues}
                  />
                )}
                {nutrition.potassium && (
                  <NutritionRow
                    label={t('nutrients.potassium')}
                    value={`${nutrition.potassium}${t('units.milligrams')}`}
                    dailyValue={dailyValues.potassium}
                    showDailyValue={showDailyValues}
                  />
                )}
              </div>
            </>
          )}
          
          {/* Daily value footer */}
          {showDailyValues && (
            <>
              <Separator className="my-2 bg-black" />
              <div className="text-xs text-muted-foreground">
                {t('dailyValueFooter')}
              </div>
            </>
          )}
        </CardContent>
      </Card>
      
      {/* Dietary compliance badges */}
      {compliance.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">{t('dietaryCompliance')}</h4>
          <div className="flex flex-wrap gap-2">
            {compliance.map((item) => (
              <ComplianceBadge key={item} compliance={item} />
            ))}
          </div>
        </div>
      )}
      
      {/* Allergen information */}
      {showAllergens && allergens && (
        <div className="space-y-2">
          {allergens.contains.length > 0 && (
            <Alert className="border-destructive bg-destructive">
              <AlertTriangle className="h-4 w-4 text-destructive-foreground" />
              <AlertDescription className="text-destructive-foreground">
                <strong>{t('allergens.contains')}</strong> {allergens.contains.join(', ')}
              </AlertDescription>
            </Alert>
          )}
          
          {allergens.mayContain.length > 0 && (
            <Alert className="border-warning bg-warning">
              <AlertTriangle className="h-4 w-4 text-warning-foreground" />
              <AlertDescription className="text-warning-foreground">
                <strong>{t('allergens.mayContain')}</strong> {allergens.mayContain.join(', ')}
              </AlertDescription>
            </Alert>
          )}
          
          {allergens.freeFrom.length > 0 && (
            <Alert className="border-success bg-success">
              <Check className="h-4 w-4 text-success-foreground" />
              <AlertDescription className="text-success-foreground">
                <strong>{t('allergens.freeFrom')}</strong> {allergens.freeFrom.join(', ')}
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}
    </div>
  );
};

NutritionFacts.displayName = 'NutritionFacts';