import React from 'react';

const CreateRecipePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-6">
          Create New Recipe
        </h1>
        <p className="text-muted-foreground mb-8">
          Share your favorite recipe with the community
        </p>
        
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">✏️</span>
          </div>
          <p className="text-muted-foreground">
            Recipe creation form coming soon...
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateRecipePage;