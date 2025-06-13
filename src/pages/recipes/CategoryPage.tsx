import React from 'react';
import { useParams } from 'react-router-dom';

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-6 capitalize">
          {category} Recipes
        </h1>
        <p className="text-muted-foreground mb-8">
          Discover delicious {category} recipes from our community
        </p>
        
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🍽️</span>
          </div>
          <p className="text-muted-foreground">
            Category recipes coming soon...
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;