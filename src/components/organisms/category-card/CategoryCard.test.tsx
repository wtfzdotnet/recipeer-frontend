import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@/test-utils';
import { CategoryCard } from './category-card';
import type { Category } from '@/types';

// Mock category data
const mockCategory: Category = {
  id: 'test-category',
  name: 'Test Category',
  image: '/test-image.jpg',
  description: 'A test category description',
  recipeCount: 42,
  trending: false,
  type: 'cuisine'
};

const mockCategoryWithCultural: Category = {
  ...mockCategory,
  id: 'cultural-category',
  name: 'Italian Cuisine',
  trending: true,
  cultural: {
    region: 'Southern Europe',
    authenticity: 'traditional'
  },
  popularRecipes: [
    {
      id: '1',
      name: 'Pasta Carbonara',
      cookingTime: 20,
      rating: 4.8
    }
  ]
};

describe('CategoryCard', () => {
  it('renders category information correctly', () => {
    render(<CategoryCard category={mockCategory} />);
    
    expect(screen.getByText('Test Category')).toBeInTheDocument();
    expect(screen.getByText('A test category description')).toBeInTheDocument();
    expect(screen.getByText(/42 recipe/)).toBeInTheDocument();
  });

  it('displays trending badge when category is trending', () => {
    render(<CategoryCard category={mockCategoryWithCultural} />);
    
    expect(screen.getByText('Trending')).toBeInTheDocument();
  });

  it('calls onCategoryClick when card is clicked', () => {
    const handleClick = vi.fn();
    render(
      <CategoryCard 
        category={mockCategory} 
        onCategoryClick={handleClick}
      />
    );
    
    const card = screen.getByLabelText('Browse Test Category category');
    fireEvent.click(card);
    
    expect(handleClick).toHaveBeenCalledWith('test-category');
  });

  it('handles keyboard navigation', () => {
    const handleClick = vi.fn();
    render(
      <CategoryCard 
        category={mockCategory} 
        onCategoryClick={handleClick}
      />
    );
    
    const card = screen.getByLabelText('Browse Test Category category');
    fireEvent.keyDown(card, { key: 'Enter' });
    
    expect(handleClick).toHaveBeenCalledWith('test-category');
  });

  it('renders compact variant correctly', () => {
    render(<CategoryCard category={mockCategory} variant="compact" />);
    
    const card = screen.getByLabelText('Browse Test Category category');
    expect(card).toBeInTheDocument();
    expect(screen.getByText('Test Category')).toBeInTheDocument();
  });

  it('handles bookmark toggle', () => {
    const handleBookmark = vi.fn();
    render(
      <CategoryCard 
        category={mockCategory} 
        onBookmarkToggle={handleBookmark}
        isBookmarked={false}
      />
    );
    
    const bookmarkButton = screen.getByLabelText('Add to bookmarks');
    fireEvent.click(bookmarkButton);
    
    expect(handleBookmark).toHaveBeenCalledWith('test-category', true);
  });

  it('shows bookmarked state correctly', () => {
    render(
      <CategoryCard 
        category={mockCategory} 
        isBookmarked={true}
      />
    );
    
    expect(screen.getByLabelText('Remove from bookmarks')).toBeInTheDocument();
  });

  it('displays cultural information when available', () => {
    render(<CategoryCard category={mockCategoryWithCultural} />);
    
    expect(screen.getByText('Southern Europe')).toBeInTheDocument();
    expect(screen.getByText('Traditional')).toBeInTheDocument();
  });

  it('hides recipe count when showRecipeCount is false', () => {
    render(
      <CategoryCard 
        category={mockCategory} 
        showRecipeCount={false}
      />
    );
    
    expect(screen.queryByText(/42 recipe/)).not.toBeInTheDocument();
  });

  it('displays category type badge', () => {
    render(<CategoryCard category={mockCategory} />);
    
    expect(screen.getByText('Cuisine')).toBeInTheDocument();
  });

  it('handles image error gracefully', () => {
    render(<CategoryCard category={mockCategory} />);
    
    const image = screen.getByAltText('Test Category');
    fireEvent.error(image);
    
    expect(image).toHaveAttribute('src', '/api/placeholder/400/300');
  });
});