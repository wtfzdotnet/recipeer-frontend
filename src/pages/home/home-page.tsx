import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/atoms';
import { NutritionFacts } from '@/components/organisms';
import { ChefHat, Search, Clock, Users } from 'lucide-react';

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
 * Home page component - Landing page for the Recipe Authority Platform
 */
export const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-12 lg:py-24">
        <div className="container space-y-6 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-foreground lg:text-6xl">
              {t('home.hero.title', 'Discover Amazing Recipes')}
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground lg:text-xl">
              {t('home.hero.subtitle', 'Your ultimate destination for delicious recipes, cooking tips, and culinary inspiration.')}
            </p>
          </div>
          
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg">
              <Link to="/recipes" className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                {t('home.hero.exploreRecipes', 'Explore Recipes')}
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/register" className="flex items-center gap-2">
                <ChefHat className="h-5 w-5" />
                {t('home.hero.joinCommunity', 'Join Community')}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 lg:py-24">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-foreground lg:text-4xl">
              {t('home.features.title', 'Why Choose Recipeer?')}
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground lg:text-lg">
              {t('home.features.subtitle', 'Everything you need to become a better cook and discover amazing recipes.')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                {t('home.features.discover.title', 'Discover Recipes')}
              </h3>
              <p className="text-muted-foreground">
                {t('home.features.discover.description', 'Find the perfect recipe for any occasion with our advanced search and filtering.')}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                {t('home.features.plan.title', 'Meal Planning')}
              </h3>
              <p className="text-muted-foreground">
                {t('home.features.plan.description', 'Plan your meals ahead and create shopping lists automatically.')}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                {t('home.features.community.title', 'Join Community')}
              </h3>
              <p className="text-muted-foreground">
                {t('home.features.community.description', 'Connect with fellow food lovers and share your culinary creations.')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-12 lg:py-24 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground lg:text-4xl">
                {t('home.demo.title', 'Detailed Nutrition Information')}
              </h2>
              <p className="text-muted-foreground lg:text-lg">
                {t('home.demo.description', 'Get comprehensive nutrition facts and allergen information for every recipe to make informed dietary choices.')}
              </p>
              <Button asChild>
                <Link to="/recipes">
                  {t('home.demo.viewRecipes', 'View Recipes')}
                </Link>
              </Button>
            </div>
            
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
        </div>
      </section>
    </div>
  );
};