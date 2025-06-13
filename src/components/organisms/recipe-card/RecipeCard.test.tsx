import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RecipeCard } from './RecipeCard';

describe('RecipeCard - Basic Tests', () => {
  const basicProps = {
    title: 'Test Recipe',
    image: 'https://example.com/image.jpg',
    imageAlt: 'Test recipe image',
    cookTime: 30,
    prepTime: 15,
    servings: 4,
    difficulty: 'Medium' as const,
    variant: 'default' as const
  };

  it('renders the basic recipe card', () => {
    render(<RecipeCard {...basicProps} />);
    
    expect(screen.getByText('Test Recipe')).toBeInTheDocument();
    expect(screen.getByText('45min')).toBeInTheDocument();
    expect(screen.getByText('4 servings')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
  });

  it('renders compact variant', () => {
    render(<RecipeCard {...basicProps} variant="compact" />);
    
    expect(screen.getByText('Test Recipe')).toBeInTheDocument();
    expect(screen.getByText('45min')).toBeInTheDocument();
  });
});