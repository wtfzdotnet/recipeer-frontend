import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RecipeCard } from './RecipeCard';
import type { RecipeCardProps } from './RecipeCard';

// Mock data for testing
const mockRecipeData: RecipeCardProps = {
  title: 'Test Recipe',
  description: 'A delicious test recipe',
  image: 'https://example.com/image.jpg',
  imageAlt: 'Test recipe image',
  cookTime: 30,
  prepTime: 15,
  servings: 4,
  difficulty: 'Medium',
  rating: 4.5,
  reviewCount: 42,
  variant: 'default',
  tags: ['Italian', 'Quick', 'Healthy'],
  author: {
    name: 'Chef Test',
    avatar: 'https://example.com/avatar.jpg'
  },
  cuisine: 'Italian',
  dietaryRestrictions: ['Vegetarian']
};

describe('RecipeCard', () => {
  it('renders basic recipe information', () => {
    render(<RecipeCard {...mockRecipeData} />);
    
    expect(screen.getByText('Test Recipe')).toBeInTheDocument();
    expect(screen.getByText('A delicious test recipe')).toBeInTheDocument();
    expect(screen.getByAltText('Test recipe image')).toBeInTheDocument();
    expect(screen.getByText('45min')).toBeInTheDocument(); // cookTime + prepTime
    expect(screen.getByText('4 servings')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
  });

  it('renders rating and review count', () => {
    render(<RecipeCard {...mockRecipeData} />);
    
    expect(screen.getByText('(42)')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const onClickMock = vi.fn();
    const onSaveMock = vi.fn();
    
    render(
      <RecipeCard 
        {...mockRecipeData} 
        onClick={onClickMock}
        onSave={onSaveMock}
      />
    );
    
    const card = screen.getByRole('article');
    fireEvent.click(card);
    expect(onClickMock).toHaveBeenCalledTimes(1);
    
    const saveButton = screen.getByLabelText('Save Test Recipe');
    fireEvent.click(saveButton);
    expect(onSaveMock).toHaveBeenCalledTimes(1);
  });

  it('shows saved state when isSaved is true', () => {
    render(<RecipeCard {...mockRecipeData} onSave={vi.fn()} isSaved={true} />);
    
    expect(screen.getByText('Saved')).toBeInTheDocument();
  });

  it('renders loading state', () => {
    render(<RecipeCard {...mockRecipeData} isLoading={true} />);
    
    // Should show skeleton loader
    expect(screen.queryByText('Test Recipe')).not.toBeInTheDocument();
    const card = document.querySelector('.animate-pulse');
    expect(card).toBeInTheDocument();
  });

  it('renders compact variant correctly', () => {
    render(<RecipeCard {...mockRecipeData} variant="compact" />);
    
    expect(screen.getByText('Test Recipe')).toBeInTheDocument();
    expect(screen.getByText('45min')).toBeInTheDocument();
  });

  it('renders hero variant with author info', () => {
    render(<RecipeCard {...mockRecipeData} variant="hero" />);
    
    expect(screen.getByText('Test Recipe')).toBeInTheDocument();
    expect(screen.getByText('Chef Test')).toBeInTheDocument();
    expect(screen.getByText('Start Cooking')).toBeInTheDocument();
  });

  it('renders minimal variant', () => {
    render(<RecipeCard {...mockRecipeData} variant="minimal" />);
    
    expect(screen.getByText('Test Recipe')).toBeInTheDocument();
    expect(screen.getByText('A delicious test recipe')).toBeInTheDocument();
  });

  it('renders detailed variant with all information', () => {
    render(<RecipeCard {...mockRecipeData} variant="detailed" />);
    
    expect(screen.getByText('Test Recipe')).toBeInTheDocument();
    expect(screen.getByText('by Chef Test')).toBeInTheDocument();
    expect(screen.getByText('Cuisine:')).toBeInTheDocument();
    expect(screen.getByText('Italian')).toBeInTheDocument();
    expect(screen.getByText('Dietary: Vegetarian')).toBeInTheDocument();
  });

  it('renders list variant horizontally', () => {
    render(<RecipeCard {...mockRecipeData} variant="list" onSave={vi.fn()} onShare={vi.fn()} />);
    
    expect(screen.getByText('Test Recipe')).toBeInTheDocument();
    expect(screen.getByText('A delicious test recipe')).toBeInTheDocument();
    
    // Should have Share and Save buttons
    expect(screen.getByLabelText('Save Test Recipe')).toBeInTheDocument();
    expect(screen.getByLabelText('Share Test Recipe')).toBeInTheDocument();
  });

  it('handles different difficulty levels with correct styling', () => {
    const { rerender } = render(
      <RecipeCard {...mockRecipeData} difficulty="Easy" />
    );
    expect(screen.getByText('Easy')).toHaveClass('text-green-600');

    rerender(<RecipeCard {...mockRecipeData} difficulty="Hard" />);
    expect(screen.getByText('Hard')).toHaveClass('text-red-600');
  });

  it('handles time formatting correctly', () => {
    const { rerender } = render(
      <RecipeCard {...mockRecipeData} cookTime={30} prepTime={15} />
    );
    expect(screen.getByText('45min')).toBeInTheDocument();

    rerender(<RecipeCard {...mockRecipeData} cookTime={60} prepTime={30} />);
    expect(screen.getByText('1h 30m')).toBeInTheDocument();

    rerender(<RecipeCard {...mockRecipeData} cookTime={120} prepTime={0} />);
    expect(screen.getByText('2h')).toBeInTheDocument();
  });

  it('handles servings formatting correctly', () => {
    const { rerender } = render(
      <RecipeCard {...mockRecipeData} servings={1} />
    );
    expect(screen.getByText('1 serving')).toBeInTheDocument();

    rerender(<RecipeCard {...mockRecipeData} servings={4} />);
    expect(screen.getByText('4 servings')).toBeInTheDocument();
  });

  it('provides proper accessibility attributes', () => {
    render(<RecipeCard {...mockRecipeData} />);
    
    const article = screen.getByRole('article');
    expect(article).toHaveAttribute('aria-labelledby');
    
    // Save button should have proper aria-label
    const saveButton = screen.getByLabelText('Save Test Recipe');
    expect(saveButton).toBeInTheDocument();
  });

  it('handles missing optional props gracefully', () => {
    const minimalData: RecipeCardProps = {
      title: 'Simple Recipe',
      image: 'https://example.com/image.jpg',
      imageAlt: 'Simple recipe image',
      cookTime: 20,
      prepTime: 10,
      servings: 2,
      difficulty: 'Easy',
      variant: 'default'
    };

    render(<RecipeCard {...minimalData} />);
    
    expect(screen.getByText('Simple Recipe')).toBeInTheDocument();
    expect(screen.getByText('30min')).toBeInTheDocument();
    expect(screen.getByText('2 servings')).toBeInTheDocument();
    expect(screen.getByText('Easy')).toBeInTheDocument();
  });

  it('stops event propagation on action button clicks', () => {
    const onClickMock = vi.fn();
    const onSaveMock = vi.fn();
    
    render(
      <RecipeCard 
        {...mockRecipeData} 
        onClick={onClickMock}
        onSave={onSaveMock}
      />
    );
    
    const saveButton = screen.getByLabelText('Save Test Recipe');
    fireEvent.click(saveButton);
    
    // Save callback should be called but card click should not
    expect(onSaveMock).toHaveBeenCalledTimes(1);
    expect(onClickMock).not.toHaveBeenCalled();
  });
});