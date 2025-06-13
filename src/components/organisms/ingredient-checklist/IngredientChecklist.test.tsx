import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IngredientChecklist, type Ingredient } from './IngredientChecklist';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

const sampleIngredients: Ingredient[] = [
  {
    id: '1',
    name: 'flour',
    quantity: '2',
    measurement: 'cups'
  },
  {
    id: '2',
    name: 'sugar',
    quantity: '1',
    measurement: 'cup'
  }
];

describe('IngredientChecklist', () => {
  const mockOnItemCheck = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders the component title', () => {
    render(
      <IngredientChecklist
        ingredients={sampleIngredients}
        checkedItems={[]}
        onItemCheck={mockOnItemCheck}
      />
    );

    expect(screen.getByText('Ingredients')).toBeInTheDocument();
  });

  it('renders ingredient names', () => {
    render(
      <IngredientChecklist
        ingredients={sampleIngredients}
        checkedItems={[]}
        onItemCheck={mockOnItemCheck}
      />
    );

    expect(screen.getByText('flour')).toBeInTheDocument();
    expect(screen.getByText('sugar')).toBeInTheDocument();
  });

  it('displays progress indicator when showProgress is true', () => {
    render(
      <IngredientChecklist
        ingredients={sampleIngredients}
        checkedItems={['1']}
        onItemCheck={mockOnItemCheck}
        showProgress={true}
      />
    );

    expect(screen.getByText('1 of 2 completed')).toBeInTheDocument();
  });

  it('shows checkboxes for ingredients', () => {
    render(
      <IngredientChecklist
        ingredients={sampleIngredients}
        checkedItems={[]}
        onItemCheck={mockOnItemCheck}
      />
    );

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(2);
  });

  it('handles checkbox clicks', async () => {
    const user = userEvent.setup();
    
    render(
      <IngredientChecklist
        ingredients={sampleIngredients}
        checkedItems={[]}
        onItemCheck={mockOnItemCheck}
      />
    );

    const checkbox = screen.getAllByRole('checkbox')[0];
    await user.click(checkbox);

    expect(mockOnItemCheck).toHaveBeenCalledWith('1', true);
  });

  it('shows checked state correctly', () => {
    render(
      <IngredientChecklist
        ingredients={sampleIngredients}
        checkedItems={['1']}
        onItemCheck={mockOnItemCheck}
      />
    );

    const checkedCheckboxes = screen.getAllByRole('checkbox').filter(
      checkbox => checkbox.getAttribute('aria-checked') === 'true'
    );
    expect(checkedCheckboxes).toHaveLength(1);
  });

  it('uses custom title when provided', () => {
    render(
      <IngredientChecklist
        ingredients={sampleIngredients}
        checkedItems={[]}
        onItemCheck={mockOnItemCheck}
        title="My Recipe Ingredients"
      />
    );

    expect(screen.getByText('My Recipe Ingredients')).toBeInTheDocument();
  });

  it('shows empty state when no ingredients', () => {
    render(
      <IngredientChecklist
        ingredients={[]}
        checkedItems={[]}
        onItemCheck={mockOnItemCheck}
      />
    );

    expect(screen.getByText('No ingredients to display')).toBeInTheDocument();
  });

  it('hides progress when showProgress is false', () => {
    render(
      <IngredientChecklist
        ingredients={sampleIngredients}
        checkedItems={['1']}
        onItemCheck={mockOnItemCheck}
        showProgress={false}
      />
    );

    expect(screen.queryByText('1 of 2 completed')).not.toBeInTheDocument();
  });
});