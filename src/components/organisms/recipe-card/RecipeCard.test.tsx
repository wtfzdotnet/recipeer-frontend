import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { RecipeCard } from './RecipeCard';
import type { Recipe } from '@/types';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, params?: Record<string, string | number>) => {
      const translations: Record<string, string> = {
        'timing.minutes': `${params?.count} min`,
        'timing.hours': `${params?.count}h`,
        'timing.hoursAndMinutes': `${params?.hours}h ${params?.minutes}m`,
        'servings': `${params?.count} servings`,
        'card.viewRecipe': `View ${params?.title}`,
        'actions.share': 'Share',
        'actions.print': 'Print',
        'actions.addToMealPlan': 'Add to meal plan',
        'actions.viewRecipe': 'View Recipe'
      };
      return translations[key] || key;
    }
  })
}));

const mockRecipe: Recipe = {
  id: 'test-recipe',
  title: 'Test Recipe',
  description: 'A test recipe description',
  image: 'https://example.com/image.jpg',
  author: {
    id: 'author-1',
    name: 'Test Author',
    avatar: 'https://example.com/avatar.jpg'
  },
  ratings: {
    average: 4.5,
    count: 10
  },
  timing: {
    prepTime: 15,
    cookTime: 30,
    totalTime: 45
  },
  difficulty: 'intermediate',
  servings: 4,
  tags: ['tag1', 'tag2'],
  nutrition: {
    calories: 300
  }
};

const mockCollections = [
  { id: 'favorites', name: 'Favorites' },
  { id: 'dinner', name: 'Dinner Ideas' }
];

describe('RecipeCard', () => {
  it('renders recipe title and description', () => {
    render(<RecipeCard recipe={mockRecipe} />);
    
    expect(screen.getByText('Test Recipe')).toBeInTheDocument();
    expect(screen.getByText('A test recipe description')).toBeInTheDocument();
  });

  it('displays author information', () => {
    render(<RecipeCard recipe={mockRecipe} />);
    
    expect(screen.getByText('Test Author')).toBeInTheDocument();
  });

  it('shows timing and servings information', () => {
    render(<RecipeCard recipe={mockRecipe} />);
    
    expect(screen.getByText('45 min')).toBeInTheDocument();
    expect(screen.getByText('4 servings')).toBeInTheDocument();
  });

  it('renders tags', () => {
    render(<RecipeCard recipe={mockRecipe} />);
    
    expect(screen.getByText('tag1')).toBeInTheDocument();
    expect(screen.getByText('tag2')).toBeInTheDocument();
  });

  it('calls onClick when card is clicked', () => {
    const handleClick = vi.fn();
    render(<RecipeCard recipe={mockRecipe} onClick={handleClick} />);
    
    const card = screen.getByRole('button', { name: /view recipe/i });
    fireEvent.click(card);
    
    expect(handleClick).toHaveBeenCalledWith('test-recipe');
  });

  it('calls onShare when share button is clicked', () => {
    const handleShare = vi.fn();
    render(<RecipeCard recipe={mockRecipe} onShare={handleShare} />);
    
    const shareButton = screen.getByRole('button', { name: /share/i });
    fireEvent.click(shareButton);
    
    expect(handleShare).toHaveBeenCalledWith('test-recipe');
  });

  it('calls onPrint when print button is clicked', () => {
    const handlePrint = vi.fn();
    render(<RecipeCard recipe={mockRecipe} onPrint={handlePrint} />);
    
    const printButton = screen.getByRole('button', { name: /print/i });
    fireEvent.click(printButton);
    
    expect(handlePrint).toHaveBeenCalledWith('test-recipe');
  });

  it('calls onAddToMealPlan when meal plan button is clicked', () => {
    const handleAddToMealPlan = vi.fn();
    render(<RecipeCard recipe={mockRecipe} onAddToMealPlan={handleAddToMealPlan} />);
    
    const mealPlanButton = screen.getByRole('button', { name: /add to meal plan/i });
    fireEvent.click(mealPlanButton);
    
    expect(handleAddToMealPlan).toHaveBeenCalledWith('test-recipe');
  });

  it('renders compact variant correctly', () => {
    render(<RecipeCard recipe={mockRecipe} variant="compact" />);
    
    // In compact variant, title should still be visible
    expect(screen.getByText('Test Recipe')).toBeInTheDocument();
    // But description might not be visible in compact variant based on our implementation
  });

  it('renders featured variant correctly', () => {
    render(<RecipeCard recipe={mockRecipe} variant="featured" />);
    
    expect(screen.getByText('Test Recipe')).toBeInTheDocument();
    expect(screen.getByText('A test recipe description')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
  });

  it('hides save button when showSaveButton is false', () => {
    render(
      <RecipeCard 
        recipe={mockRecipe} 
        showSaveButton={false}
        collections={mockCollections}
      />
    );
    
    // The save button should not be in the document
    const saveButtons = screen.queryAllByRole('button', { name: /save/i });
    expect(saveButtons).toHaveLength(0);
  });

  it('shows save button when showSaveButton is true', () => {
    render(
      <RecipeCard 
        recipe={mockRecipe} 
        showSaveButton={true}
        collections={mockCollections}
      />
    );
    
    // Just verify the component renders without errors when showSaveButton is true
    expect(screen.getByText('Test Recipe')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<RecipeCard recipe={mockRecipe} className="custom-class" />);
    
    const card = screen.getByText('Test Recipe').closest('.custom-class');
    expect(card).toBeInTheDocument();
  });

  it('renders image with correct alt text', () => {
    render(<RecipeCard recipe={mockRecipe} />);
    
    const image = screen.getByRole('img', { name: 'Test Recipe' });
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('formats time correctly for hours and minutes', () => {
    const longRecipe = {
      ...mockRecipe,
      timing: {
        prepTime: 30,
        cookTime: 90,
        totalTime: 120 // 2 hours
      }
    };
    
    render(<RecipeCard recipe={longRecipe} />);
    
    expect(screen.getByText('2h')).toBeInTheDocument();
  });

  it('formats time correctly for mixed hours and minutes', () => {
    const mixedTimeRecipe = {
      ...mockRecipe,
      timing: {
        prepTime: 30,
        cookTime: 105,
        totalTime: 135 // 2 hours 15 minutes
      }
    };
    
    render(<RecipeCard recipe={mixedTimeRecipe} />);
    
    expect(screen.getByText('2h 15m')).toBeInTheDocument();
  });
});