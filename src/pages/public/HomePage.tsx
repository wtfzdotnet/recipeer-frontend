import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { usePageSEO } from '@/lib/seo';

const HomePage: React.FC = () => {
  usePageSEO(
    'Home',
    'Your ultimate recipe authority platform for discovering, creating, and sharing amazing recipes from around the world.',
    'recipes, cooking, food, ingredients, meal planning, recipe sharing'
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-6">
            Welcome to Recipeer
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Your ultimate recipe authority platform for discovering, creating, and sharing amazing recipes
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild size="lg">
              <Link to="/recipes">Discover Recipes</Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link to="/create-recipe">Create Recipe</Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🍳</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Discover</h3>
            <p className="text-muted-foreground">
              Browse thousands of recipes from around the world
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👨‍🍳</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Create</h3>
            <p className="text-muted-foreground">
              Share your own recipes with the community
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🥘</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Cook</h3>
            <p className="text-muted-foreground">
              Plan meals and organize your cooking
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;