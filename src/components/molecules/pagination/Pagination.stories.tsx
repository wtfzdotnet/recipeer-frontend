import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pagination } from './Pagination';
import { useState } from 'react';

// Simple mock function for stories
const fn = () => () => {};

const meta = {
  title: 'Molecules/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Pagination Component

The Pagination component provides navigation through large datasets with performance optimization for recipe search results and community content.

## Features

- **Smart Page Display**: Shows ellipsis for large page ranges
- **Keyboard Navigation**: Full ARIA support and keyboard accessibility
- **Info Display**: Optional item count and range information
- **Performance Optimized**: Designed for thousands of recipes
- **Mobile Responsive**: Touch-friendly on all devices
- **Customizable Range**: Configurable sibling page count

## Use Cases

- Recipe search results pagination
- Community content browsing
- Blog post navigation
- User-generated content lists
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    currentPage: {
      control: 'number',
      description: 'Current page number (1-based)'
    },
    totalPages: {
      control: 'number',
      description: 'Total number of pages'
    },
    siblingCount: {
      control: 'number',
      description: 'Number of page buttons to show around current page'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether pagination is disabled'
    },
    showInfo: {
      control: 'boolean',
      description: 'Show page size and total information'
    },
    totalItems: {
      control: 'number',
      description: 'Total number of items'
    },
    pageSize: {
      control: 'number',
      description: 'Current page size'
    }
  }
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive story with state management
export const Interactive: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage);
    
    return (
      <div className="space-y-6 w-full max-w-2xl">
        <div className="text-center text-sm text-muted-foreground">
          <p>Current Page: {currentPage} of {args.totalPages}</p>
        </div>
        
        <Pagination
          {...args}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    );
  },
  args: {
    currentPage: 1,
    totalPages: 10,
    siblingCount: 1,
    disabled: false,
    showInfo: true,
    totalItems: 250,
    pageSize: 25,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive pagination showing real-time page changes and info display.'
      }
    }
  }
};

// Default story
export const Default: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage);
    return (
      <Pagination
        {...args}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    );
  },
  args: {
    currentPage: 5,
    totalPages: 10,
    onPageChange: fn(),
  }
};

// Recipe search example
export const RecipeSearch: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(3);
    const totalPages = 25;
    const pageSize = 20;
    const totalItems = 487;
    
    // Mock recipe data for context
    const recipes = Array.from({ length: pageSize }, (_, i) => ({
      id: (currentPage - 1) * pageSize + i + 1,
      title: `Delicious Recipe ${(currentPage - 1) * pageSize + i + 1}`,
      cookTime: `${15 + (i % 4) * 10} min`,
      difficulty: ['Easy', 'Medium', 'Hard'][i % 3]
    }));
    
    return (
      <div className="w-full max-w-4xl space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Recipe Search Results</h3>
          <p className="text-muted-foreground">"Italian pasta recipes"</p>
        </div>
        
        {/* Mock recipe grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="p-4 border rounded-lg bg-card">
              <div className="aspect-square bg-muted rounded mb-3"></div>
              <h4 className="font-medium text-sm mb-2 line-clamp-2">{recipe.title}</h4>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{recipe.cookTime}</span>
                <span>{recipe.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          showInfo={true}
          totalItems={totalItems}
          pageSize={pageSize}
          aria-label="Recipe search results pagination"
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Complete recipe search example showing pagination with real context and info display.'
      }
    }
  }
};

// Large dataset example
export const LargeDataset: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(42);
    
    return (
      <div className="space-y-4">
        <div className="text-center text-sm text-muted-foreground">
          <p>Large Recipe Database - 10,000+ recipes</p>
        </div>
        
        <Pagination
          currentPage={currentPage}
          totalPages={500}
          onPageChange={setCurrentPage}
          siblingCount={2}
          showInfo={true}
          totalItems={10000}
          pageSize={20}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Large dataset pagination with ellipsis handling for thousands of pages.'
      }
    }
  }
};

// Different configurations
export const Configurations: Story = {
  render: () => {
    const [page1, setPage1] = useState(1);
    const [page2, setPage2] = useState(5);
    const [page3, setPage3] = useState(8);
    
    return (
      <div className="space-y-8 w-full">
        <div>
          <h4 className="font-medium mb-4">Small Dataset (5 pages)</h4>
          <Pagination
            currentPage={page1}
            totalPages={5}
            onPageChange={setPage1}
            showInfo={true}
            totalItems={48}
            pageSize={10}
          />
        </div>
        
        <div>
          <h4 className="font-medium mb-4">Medium Dataset with Siblings</h4>
          <Pagination
            currentPage={page2}
            totalPages={15}
            onPageChange={setPage2}
            siblingCount={2}
          />
        </div>
        
        <div>
          <h4 className="font-medium mb-4">Info Only (Single Page)</h4>
          <Pagination
            currentPage={page3}
            totalPages={1}
            onPageChange={setPage3}
            showInfo={true}
            totalItems={12}
            pageSize={25}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Different pagination configurations for various data sizes and use cases.'
      }
    }
  }
};

// Disabled state
export const Disabled: Story = {
  args: {
    currentPage: 3,
    totalPages: 10,
    disabled: true,
    onPageChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled state for when pagination interaction is not available.'
      }
    }
  }
};

// Edge cases
export const EdgeCases: Story = {
  render: () => {
    const [page1, setPage1] = useState(1);
    const [page2, setPage2] = useState(50);
    
    return (
      <div className="space-y-8">
        <div>
          <h4 className="font-medium mb-4">First Page</h4>
          <Pagination
            currentPage={page1}
            totalPages={50}
            onPageChange={setPage1}
            showInfo={true}
            totalItems={1000}
            pageSize={20}
          />
          <p className="text-xs text-muted-foreground mt-2">
            Previous button disabled on first page
          </p>
        </div>
        
        <div>
          <h4 className="font-medium mb-4">Last Page</h4>
          <Pagination
            currentPage={page2}
            totalPages={50}
            onPageChange={setPage2}
            showInfo={true}
            totalItems={1000}
            pageSize={20}
          />
          <p className="text-xs text-muted-foreground mt-2">
            Next button disabled on last page
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Edge cases showing behavior at first and last pages.'
      }
    }
  }
};