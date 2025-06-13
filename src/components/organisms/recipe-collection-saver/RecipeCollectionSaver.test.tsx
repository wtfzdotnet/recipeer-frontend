import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecipeCollectionSaver from './RecipeCollectionSaver';
import type { Collection } from './RecipeCollectionSaver';

// Mock collections data
const mockCollections: Collection[] = [
  {
    id: 'favorites',
    name: 'Favorites',
    description: 'Your favorite recipes',
    isDefault: true,
    recipeCount: 12
  },
  {
    id: 'breakfast',
    name: 'Breakfast Ideas',
    description: 'Quick and easy morning recipes',
    recipeCount: 8
  },
  {
    id: 'healthy',
    name: 'Healthy Choices',
    recipeCount: 15
  }
];

const defaultProps = {
  recipeId: 'test-recipe',
  collections: mockCollections,
  savedCollections: [],
  onSave: vi.fn(),
  onUnsave: vi.fn(),
  onCreateCollection: vi.fn(),
};

describe('RecipeCollectionSaver', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      render(<RecipeCollectionSaver {...defaultProps} />);
      
      expect(screen.getByRole('button', { name: /save to favorites/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /choose collections/i })).toBeInTheDocument();
    });

    it('renders without quick save when disabled', () => {
      render(<RecipeCollectionSaver {...defaultProps} quickSaveToFavorites={false} />);
      
      expect(screen.getByRole('button', { name: /manage collections/i })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /save to favorites/i })).not.toBeInTheDocument();
    });

    it('shows correct icon for each variant', () => {
      const { rerender } = render(<RecipeCollectionSaver {...defaultProps} variant="heart" />);
      expect(screen.getByText('Save')).toBeInTheDocument();

      rerender(<RecipeCollectionSaver {...defaultProps} variant="bookmark" />);
      expect(screen.getByText('Save')).toBeInTheDocument();

      rerender(<RecipeCollectionSaver {...defaultProps} variant="plus" />);
      expect(screen.getByText('Save')).toBeInTheDocument();
    });
  });

  describe('Save States', () => {
    it('shows saved state when recipe is saved to favorites', () => {
      render(<RecipeCollectionSaver {...defaultProps} savedCollections={['favorites']} />);
      
      expect(screen.getByText('Saved')).toBeInTheDocument();
    });

    it('shows count when saved to multiple collections without quick save', () => {
      render(
        <RecipeCollectionSaver 
          {...defaultProps} 
          savedCollections={['favorites', 'breakfast']} 
          quickSaveToFavorites={false}
        />
      );
      
      expect(screen.getByText('Saved (2)')).toBeInTheDocument();
    });

    it('shows loading state', () => {
      render(<RecipeCollectionSaver {...defaultProps} saveState="saving" />);
      
      expect(screen.getByText('Saving...')).toBeInTheDocument();
    });

    it('shows error state', () => {
      render(<RecipeCollectionSaver {...defaultProps} saveState="error" />);
      
      expect(screen.getByText('Error')).toBeInTheDocument();
    });

    it('disables buttons when disabled prop is true', () => {
      render(<RecipeCollectionSaver {...defaultProps} disabled={true} />);
      
      const saveButton = screen.getByRole('button', { name: /save to favorites/i });
      const dropdownButton = screen.getByRole('button', { name: /choose collections/i });
      
      expect(saveButton).toBeDisabled();
      expect(dropdownButton).toBeDisabled();
    });
  });

  describe('Quick Save Functionality', () => {
    it('calls onSave when quick save button is clicked and not saved', async () => {
      const user = userEvent.setup();
      render(<RecipeCollectionSaver {...defaultProps} />);
      
      const saveButton = screen.getByRole('button', { name: /save to favorites/i });
      await user.click(saveButton);
      
      expect(defaultProps.onSave).toHaveBeenCalledWith('favorites');
    });

    it('calls onUnsave when quick save button is clicked and already saved', async () => {
      const user = userEvent.setup();
      render(<RecipeCollectionSaver {...defaultProps} savedCollections={['favorites']} />);
      
      const saveButton = screen.getByRole('button', { name: /remove from favorites/i });
      await user.click(saveButton);
      
      expect(defaultProps.onUnsave).toHaveBeenCalledWith('favorites');
    });
  });

  describe('Dropdown Functionality', () => {
    it('opens dropdown when dropdown button is clicked', async () => {
      const user = userEvent.setup();
      render(<RecipeCollectionSaver {...defaultProps} />);
      
      const dropdownButton = screen.getByRole('button', { name: /choose collections/i });
      await user.click(dropdownButton);
      
      expect(screen.getByText('Save to Collections')).toBeInTheDocument();
      expect(screen.getByText('Favorites')).toBeInTheDocument();
      expect(screen.getByText('Breakfast Ideas')).toBeInTheDocument();
      expect(screen.getByText('Healthy Choices')).toBeInTheDocument();
    });

    it('closes dropdown when clicking outside', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <RecipeCollectionSaver {...defaultProps} />
          <div data-testid="outside">Outside</div>
        </div>
      );
      
      // Open dropdown
      const dropdownButton = screen.getByRole('button', { name: /choose collections/i });
      await user.click(dropdownButton);
      expect(screen.getByText('Save to Collections')).toBeInTheDocument();
      
      // Click outside
      const outside = screen.getByTestId('outside');
      await user.click(outside);
      
      await waitFor(() => {
        expect(screen.queryByText('Save to Collections')).not.toBeInTheDocument();
      });
    });

    it('shows checked state for saved collections', async () => {
      const user = userEvent.setup();
      render(<RecipeCollectionSaver {...defaultProps} savedCollections={['favorites', 'breakfast']} />);
      
      const dropdownButton = screen.getByRole('button', { name: /choose collections/i });
      await user.click(dropdownButton);
      
      // Find the collection buttons and verify styling indicates saved state
      const favoritesButton = screen.getByText('Favorites').closest('button');
      const breakfastButton = screen.getByText('Breakfast Ideas').closest('button');
      const healthyButton = screen.getByText('Healthy Choices').closest('button');
      
      // Saved collections should have blue background styling
      expect(favoritesButton).toHaveClass('bg-blue-50', 'text-blue-700');
      expect(breakfastButton).toHaveClass('bg-blue-50', 'text-blue-700');
      
      // Unsaved collection should not have blue styling
      expect(healthyButton).not.toHaveClass('bg-blue-50', 'text-blue-700');
    });

    it('toggles collection save state when collection is clicked', async () => {
      const user = userEvent.setup();
      render(<RecipeCollectionSaver {...defaultProps} />);
      
      // Open dropdown
      const dropdownButton = screen.getByRole('button', { name: /choose collections/i });
      await user.click(dropdownButton);
      
      // Click on breakfast collection
      const breakfastCollection = screen.getByText('Breakfast Ideas');
      await user.click(breakfastCollection);
      
      expect(defaultProps.onSave).toHaveBeenCalledWith('breakfast');
    });

    it('unsaves when clicking on already saved collection', async () => {
      const user = userEvent.setup();
      render(<RecipeCollectionSaver {...defaultProps} savedCollections={['breakfast']} />);
      
      // Open dropdown
      const dropdownButton = screen.getByRole('button', { name: /choose collections/i });
      await user.click(dropdownButton);
      
      // Click on breakfast collection (which is already saved)
      const breakfastCollection = screen.getByText('Breakfast Ideas');
      await user.click(breakfastCollection);
      
      expect(defaultProps.onUnsave).toHaveBeenCalledWith('breakfast');
    });
  });

  describe('Collection Creation', () => {
    it('shows create collection button in dropdown', async () => {
      const user = userEvent.setup();
      render(<RecipeCollectionSaver {...defaultProps} />);
      
      const dropdownButton = screen.getByRole('button', { name: /choose collections/i });
      await user.click(dropdownButton);
      
      expect(screen.getByText('Create new collection')).toBeInTheDocument();
    });

    it('shows input when create collection is clicked', async () => {
      const user = userEvent.setup();
      render(<RecipeCollectionSaver {...defaultProps} />);
      
      const dropdownButton = screen.getByRole('button', { name: /choose collections/i });
      await user.click(dropdownButton);
      
      const createButton = screen.getByText('Create new collection');
      await user.click(createButton);
      
      expect(screen.getByPlaceholderText('Collection name')).toBeInTheDocument();
      expect(screen.getByText('Create')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    it('creates collection when form is submitted', async () => {
      const user = userEvent.setup();
      render(<RecipeCollectionSaver {...defaultProps} />);
      
      const dropdownButton = screen.getByRole('button', { name: /choose collections/i });
      await user.click(dropdownButton);
      
      const createButton = screen.getByText('Create new collection');
      await user.click(createButton);
      
      const input = screen.getByPlaceholderText('Collection name');
      await user.type(input, 'New Collection');
      
      const submitButton = screen.getByRole('button', { name: 'Create' });
      await user.click(submitButton);
      
      expect(defaultProps.onCreateCollection).toHaveBeenCalledWith('New Collection');
    });

    it('creates collection when Enter key is pressed', async () => {
      const user = userEvent.setup();
      render(<RecipeCollectionSaver {...defaultProps} />);
      
      const dropdownButton = screen.getByRole('button', { name: /choose collections/i });
      await user.click(dropdownButton);
      
      const createButton = screen.getByText('Create new collection');
      await user.click(createButton);
      
      const input = screen.getByPlaceholderText('Collection name');
      await user.type(input, 'New Collection{enter}');
      
      expect(defaultProps.onCreateCollection).toHaveBeenCalledWith('New Collection');
    });

    it('cancels collection creation when Cancel is clicked', async () => {
      const user = userEvent.setup();
      render(<RecipeCollectionSaver {...defaultProps} />);
      
      const dropdownButton = screen.getByRole('button', { name: /choose collections/i });
      await user.click(dropdownButton);
      
      const createButton = screen.getByText('Create new collection');
      await user.click(createButton);
      
      const input = screen.getByPlaceholderText('Collection name');
      await user.type(input, 'New Collection');
      
      const cancelButton = screen.getByRole('button', { name: 'Cancel' });
      await user.click(cancelButton);
      
      expect(screen.queryByPlaceholderText('Collection name')).not.toBeInTheDocument();
      expect(screen.getByText('Create new collection')).toBeInTheDocument();
    });

    it('cancels collection creation when Escape key is pressed', async () => {
      const user = userEvent.setup();
      render(<RecipeCollectionSaver {...defaultProps} />);
      
      const dropdownButton = screen.getByRole('button', { name: /choose collections/i });
      await user.click(dropdownButton);
      
      const createButton = screen.getByText('Create new collection');
      await user.click(createButton);
      
      const input = screen.getByPlaceholderText('Collection name');
      await user.type(input, 'New Collection{escape}');
      
      expect(screen.queryByPlaceholderText('Collection name')).not.toBeInTheDocument();
      expect(screen.getByText('Create new collection')).toBeInTheDocument();
    });

    it('disables create button when input is empty', async () => {
      const user = userEvent.setup();
      render(<RecipeCollectionSaver {...defaultProps} />);
      
      const dropdownButton = screen.getByRole('button', { name: /choose collections/i });
      await user.click(dropdownButton);
      
      const createButton = screen.getByText('Create new collection');
      await user.click(createButton);
      
      const submitButton = screen.getByRole('button', { name: 'Create' });
      expect(submitButton).toBeDisabled();
      
      const input = screen.getByPlaceholderText('Collection name');
      await user.type(input, 'New Collection');
      
      expect(submitButton).not.toBeDisabled();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty collections array', () => {
      render(<RecipeCollectionSaver {...defaultProps} collections={[]} />);
      
      // Should still render but might behave differently
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('handles collections without default collection', () => {
      const collectionsWithoutDefault = mockCollections.map(c => ({ ...c, isDefault: false }));
      render(<RecipeCollectionSaver {...defaultProps} collections={collectionsWithoutDefault} />);
      
      // Should use first collection as fallback for quick save
      expect(screen.getByRole('button', { name: /save to favorites/i })).toBeInTheDocument();
    });

    it('trims whitespace from new collection names', async () => {
      const user = userEvent.setup();
      render(<RecipeCollectionSaver {...defaultProps} />);
      
      const dropdownButton = screen.getByRole('button', { name: /choose collections/i });
      await user.click(dropdownButton);
      
      const createButton = screen.getByText('Create new collection');
      await user.click(createButton);
      
      const input = screen.getByPlaceholderText('Collection name');
      await user.type(input, '   Trimmed Collection   {enter}');
      
      expect(defaultProps.onCreateCollection).toHaveBeenCalledWith('Trimmed Collection');
    });
  });
});