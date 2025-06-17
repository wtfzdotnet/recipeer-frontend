import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/atoms';
import { NutritionFacts } from '@/components/organisms';
import { ArrowLeft, Clock, Users, ChefHat, Heart, Bookmark } from 'lucide-react';

// Sample recipe data
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
 * Recipe Detail page - Individual recipe view
 */
export const RecipeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  return (
    <div className="container py-8 space-y-8">
      {/* Back Navigation */}
      <Button variant="ghost" asChild className="mb-4">
        <Link to="/recipes" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          {t('recipe.detail.back', 'Back to Recipes')}
        </Link>
      </Button>

      {/* Recipe Header */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-foreground">
              {t('recipe.detail.sampleTitle', 'Delicious Recipe {{id}}', { id })}
            </h1>
            <p className="text-muted-foreground lg:text-lg">
              {t('recipe.detail.sampleDescription', 'A wonderful recipe that combines traditional flavors with modern techniques.')}
            </p>
          </div>

          {/* Recipe Meta */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{t('recipe.detail.cookTime', '30 minutes')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{t('recipe.detail.servings', '4 servings')}</span>
            </div>
            <div className="flex items-center gap-2">
              <ChefHat className="h-4 w-4 text-muted-foreground" />
              <span>{t('recipe.detail.difficulty', 'Intermediate')}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button className="flex-1">
              <Link to={`/cook-mode/${id}`} className="flex items-center gap-2">
                <ChefHat className="h-4 w-4" />
                {t('recipe.detail.startCooking', 'Start Cooking')}
              </Link>
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Recipe Image */}
        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
          <ChefHat className="h-16 w-16 text-muted-foreground" />
        </div>
      </div>

      {/* Recipe Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Ingredients */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">
              {t('recipe.detail.ingredients', 'Ingredients')}
            </h2>
            <div className="space-y-2">
              {[
                '2 cups all-purpose flour',
                '1 tsp baking powder',
                '1/2 tsp salt',
                '1/3 cup vegetable oil',
                '1 cup milk',
                '1 large egg',
              ].map((ingredient, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input type="checkbox" className="h-4 w-4" />
                  <span>{ingredient}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">
              {t('recipe.detail.instructions', 'Instructions')}
            </h2>
            <div className="space-y-4">
              {[
                'Preheat oven to 425°F (220°C).',
                'In a large bowl, whisk together flour, baking powder, and salt.',
                'In another bowl, combine oil, milk, and egg.',
                'Pour wet ingredients into dry ingredients and stir until just combined.',
                'Divide batter among muffin cups.',
                'Bake for 20-25 minutes until golden brown.',
              ].map((instruction, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <p className="text-foreground">{instruction}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Nutrition Facts */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">
            {t('recipe.detail.nutrition', 'Nutrition Facts')}
          </h2>
          <NutritionFacts 
            nutrition={sampleNutrition} 
            servings={4}
            showDailyValues={true}
            showAllergens={true}
            allergens={sampleAllergens}
          />
        </div>
      </div>
    </div>
  );
};