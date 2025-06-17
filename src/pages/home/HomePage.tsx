import React from 'react';
import { Button } from '@/components/atoms'
import { Button as ShadcnButton } from '@/components/ui/button'
import { ThemeToggle, LanguageDropdown } from '@/components/molecules'
import { NutritionFacts } from '@/components/organisms'
import { useTranslation } from 'react-i18next'

// Sample nutrition data for demonstration
const sampleNutrition = {
  calories: 350,
  totalFat: 12,
  saturatedFat: 3,
  transFat: 0,
  cholesterol: 25,
  sodium: 480,
  totalCarbohydrates: 45,
  dietaryFiber: 8,
  totalSugars: 10,
  addedSugars: 5,
  protein: 18,
  vitaminD: 2.5,
  calcium: 200,
  iron: 4,
  potassium: 650,
};

const sampleAllergens = {
  contains: ['Milk', 'Eggs', 'Wheat'],
  mayContain: ['Tree nuts', 'Soy'],
  freeFrom: ['Peanuts', 'Fish', 'Shellfish'],
};

/**
 * HomePage component - Landing page for the Recipe Authority Platform
 */
export const HomePage: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-foreground mb-8">{t('app.title')}</h1>
      
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Button Testing Section */}
        <div className="card bg-card p-8 rounded-lg shadow-lg space-y-4 border">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-card-foreground">{t('sections.buttonTest')}</h3>
            
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{t('descriptions.directShadcn')}</p>
              <ShadcnButton>
                {t('buttons.shadcn')}
              </ShadcnButton>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{t('descriptions.customButton')}</p>
              <Button>
                {t('buttons.custom')}
              </Button>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{t('descriptions.buttonVariantsShadcn')}</p>
              <div className="flex gap-2 flex-wrap">
                <ShadcnButton variant="default">{t('buttons.default')}</ShadcnButton>
                <ShadcnButton variant="destructive">{t('buttons.destructive')}</ShadcnButton>
                <ShadcnButton variant="outline">{t('buttons.outline')}</ShadcnButton>
                <ShadcnButton variant="secondary">{t('buttons.secondary')}</ShadcnButton>
                <ShadcnButton variant="ghost">{t('buttons.ghost')}</ShadcnButton>
                <ShadcnButton variant="link">{t('buttons.link')}</ShadcnButton>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{t('descriptions.buttonVariantsCustom')}</p>
              <div className="flex gap-2 flex-wrap">
                <Button variant="default">{t('buttons.default')}</Button>
                <Button variant="destructive">{t('buttons.destructive')}</Button>
                <Button variant="outline">{t('buttons.outline')}</Button>
                <Button variant="secondary">{t('buttons.secondary')}</Button>
                <Button variant="ghost">{t('buttons.ghost')}</Button>
                <Button variant="link">{t('buttons.link')}</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Nutrition Facts Demo Section */}
        <div className="card bg-card p-8 rounded-lg shadow-lg space-y-4 border">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-card-foreground">{t('sections.nutritionDemo')}</h3>
            <p className="text-sm text-muted-foreground">
              {t('descriptions.nutritionLabel')}
            </p>
            
            <div className="flex justify-center">
              <NutritionFacts 
                nutrition={sampleNutrition} 
                servings={4}
                showDailyValues={true}
                showAllergens={true}
                allergens={sampleAllergens}
              />
            </div>
          </div>

          <div className="mt-6 p-4 bg-secondary rounded-lg">
            <h4 className="font-semibold text-secondary-foreground mb-2">🍳 {t('sections.recipeColors')}</h4>
            <p className="text-secondary-foreground text-sm">
              {t('descriptions.colorTheme')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}