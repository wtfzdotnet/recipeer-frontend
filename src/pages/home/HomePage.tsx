import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/atoms'
import { Button as ShadcnButton } from '@/components/ui/button'
import { ThemeToggle, LanguageDropdown } from '@/components/molecules'
import { NutritionFacts } from '@/components/organisms'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/providers/AuthProvider'
import { 
  ChefHat, 
  Search, 
  Users, 
  BookOpen, 
  Calendar, 
  ShoppingCart,
  Settings,
  Heart
} from 'lucide-react'

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
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {t('homepage.hero.title', 'Welcome to Recipeer')}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('homepage.hero.subtitle', 'Your Recipe Authority Platform - Discover, Create, and Share Amazing Recipes')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isAuthenticated ? (
              <>
                <Button asChild size="lg">
                  <Link to="/register">{t('actions.getStarted', 'Get Started')}</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/recipes">{t('actions.browseRecipes', 'Browse Recipes')}</Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild size="lg">
                  <Link to="/dashboard">{t('actions.goToDashboard', 'Go to Dashboard')}</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/create-recipe">{t('actions.createRecipe', 'Create Recipe')}</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Feature Navigation Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {t('homepage.features.title', 'Explore Features')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Recipe Discovery */}
            <Link to="/recipes" className="group">
              <div className="bg-card p-6 rounded-lg border hover:shadow-md transition-shadow">
                <ChefHat className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-card-foreground mb-2">
                  {t('homepage.features.recipes.title', 'Discover Recipes')}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {t('homepage.features.recipes.description', 'Browse thousands of recipes from around the world')}
                </p>
              </div>
            </Link>

            {/* Categories */}
            <Link to="/categories" className="group">
              <div className="bg-card p-6 rounded-lg border hover:shadow-md transition-shadow">
                <BookOpen className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-card-foreground mb-2">
                  {t('homepage.features.categories.title', 'Categories')}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {t('homepage.features.categories.description', 'Explore recipes by cuisine, diet, and meal type')}
                </p>
              </div>
            </Link>

            {/* Community */}
            <Link to="/community" className="group">
              <div className="bg-card p-6 rounded-lg border hover:shadow-md transition-shadow">
                <Users className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-card-foreground mb-2">
                  {t('homepage.features.community.title', 'Community')}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {t('homepage.features.community.description', 'Connect with fellow food enthusiasts')}
                </p>
              </div>
            </Link>

            {/* Search */}
            <Link to="/search" className="group">
              <div className="bg-card p-6 rounded-lg border hover:shadow-md transition-shadow">
                <Search className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-card-foreground mb-2">
                  {t('homepage.features.search.title', 'Smart Search')}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {t('homepage.features.search.description', 'Find recipes by ingredients, cuisine, or dietary needs')}
                </p>
              </div>
            </Link>
          </div>

          {/* Authenticated User Features */}
          {isAuthenticated && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Link to="/meal-plan" className="group">
                <div className="bg-card p-6 rounded-lg border hover:shadow-md transition-shadow">
                  <Calendar className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">
                    {t('homepage.features.mealPlan.title', 'Meal Planning')}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t('homepage.features.mealPlan.description', 'Plan your weekly meals efficiently')}
                  </p>
                </div>
              </Link>

              <Link to="/shopping-list" className="group">
                <div className="bg-card p-6 rounded-lg border hover:shadow-md transition-shadow">
                  <ShoppingCart className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">
                    {t('homepage.features.shopping.title', 'Shopping Lists')}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t('homepage.features.shopping.description', 'Generate smart shopping lists from recipes')}
                  </p>
                </div>
              </Link>

              <Link to="/collections" className="group">
                <div className="bg-card p-6 rounded-lg border hover:shadow-md transition-shadow">
                  <Heart className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">
                    {t('homepage.features.collections.title', 'Collections')}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t('homepage.features.collections.description', 'Organize your favorite recipes')}
                  </p>
                </div>
              </Link>

              <Link to="/settings" className="group">
                <div className="bg-card p-6 rounded-lg border hover:shadow-md transition-shadow">
                  <Settings className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">
                    {t('homepage.features.settings.title', 'Settings')}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t('homepage.features.settings.description', 'Customize your cooking experience')}
                  </p>
                </div>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {t('homepage.demo.title', 'Design System Demo')}
          </h2>
          
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Button Testing Section */}
            <div className="bg-card p-8 rounded-lg shadow-lg space-y-4 border">
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
            <div className="bg-card p-8 rounded-lg shadow-lg space-y-4 border">
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
      </section>
    </div>
  )
}