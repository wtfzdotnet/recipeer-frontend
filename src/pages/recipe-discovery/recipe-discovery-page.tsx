import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/atoms';
import { Search, Filter, Clock, ChefHat } from 'lucide-react';

/**
 * Recipe Discovery page - Browse and search recipes
 */
export const RecipeDiscoveryPage = () => {
  const { t } = useTranslation();

  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-foreground">
          {t('recipes.discovery.title', 'Discover Recipes')}
        </h1>
        <p className="text-muted-foreground lg:text-lg">
          {t('recipes.discovery.subtitle', 'Find the perfect recipe for any occasion')}
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={t('recipes.discovery.searchPlaceholder', 'Search recipes...')}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          {t('recipes.discovery.filters', 'Filters')}
        </Button>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">
          {t('recipes.discovery.categories', 'Popular Categories')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {['Italian', 'Asian', 'Mexican', 'Mediterranean', 'Indian', 'American'].map((category) => (
            <Link
              key={category}
              to={`/categories/${category.toLowerCase()}`}
              className="p-4 rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors text-center"
            >
              <div className="w-8 h-8 mx-auto mb-2 bg-primary/10 rounded-full flex items-center justify-center">
                <ChefHat className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-medium">{category}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Recipes Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">
          {t('recipes.discovery.featured', 'Featured Recipes')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((id) => (
            <Link
              key={id}
              to={`/recipes/${id}`}
              className="group rounded-lg border border-border overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-video bg-muted flex items-center justify-center">
                <ChefHat className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-semibold group-hover:text-primary transition-colors">
                  {t('recipes.discovery.sampleTitle', 'Delicious Recipe {{id}}', { id })}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t('recipes.discovery.sampleDescription', 'A wonderful recipe that will delight your taste buds.')}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    30 min
                  </span>
                  <span>4 servings</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline">
          {t('recipes.discovery.loadMore', 'Load More Recipes')}
        </Button>
      </div>
    </div>
  );
};