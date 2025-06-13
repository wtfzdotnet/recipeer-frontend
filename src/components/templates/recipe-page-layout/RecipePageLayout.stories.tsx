import type { Meta, StoryObj } from '@storybook/react-vite';
import { RecipePageLayout } from './recipe-page-layout';
import { Button } from '../../atoms/button';
import { Typography } from '../../atoms/typography';
import { Card } from '../../molecules/card';
import { RecipeCard } from '../../organisms/recipe-card';
import { IngredientChecklist } from '../../organisms/ingredient-checklist';
import { NutritionFacts } from '../../organisms/nutrition-facts';
import { ChefHat, Clock, Users, Star, Bookmark } from 'lucide-react';

const meta = {
  title: 'Templates/RecipePageLayout',
  component: RecipePageLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Page-level layout template for recipe pages. Defines structure and responsive behavior for recipe-related content.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'centered', 'full-width'],
      description: 'Layout variant',
    },
    showSidebar: {
      control: 'boolean',
      description: 'Whether to show sidebar',
    },
  },
} satisfies Meta<typeof RecipePageLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data for stories
const mockIngredients = [
  { id: '1', name: '2 cups all-purpose flour', checked: true },
  { id: '2', name: '1 tsp baking powder', checked: true },
  { id: '3', name: '1/2 tsp salt', checked: false },
  { id: '4', name: '1/4 cup sugar', checked: false },
  { id: '5', name: '2 large eggs', checked: false },
  { id: '6', name: '1 cup milk', checked: false },
];

const mockNutrition = {
  calories: 320,
  protein: 12,
  carbs: 45,
  fat: 8,
  fiber: 3,
  sugar: 6,
};

const SampleHeader = () => (
  <div className="flex items-center justify-between p-4">
    <div className="flex items-center space-x-4">
      <ChefHat className="h-8 w-8 text-primary" />
      <Typography variant="h2" className="font-bold">Recipeer</Typography>
    </div>
    <div className="flex items-center space-x-2">
      <Button variant="outline" size="sm">
        <Bookmark className="h-4 w-4 mr-2" />
        Save
      </Button>
      <Button size="sm">
        <Star className="h-4 w-4 mr-2" />
        Rate
      </Button>
    </div>
  </div>
);

const SampleRecipeContent = () => (
  <div className="space-y-8">
    {/* Recipe Header */}
    <div className="space-y-4">
      <Typography variant="h1" className="text-4xl font-bold">
        Perfect Pancakes
      </Typography>
      <Typography variant="body" className="text-lg text-muted-foreground">
        Fluffy, golden pancakes that are perfect for weekend mornings. This foolproof recipe delivers consistently delicious results every time.
      </Typography>
      
      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4" />
          <span>15 mins</span>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="h-4 w-4" />
          <span>Serves 4</span>
        </div>
        <div className="flex items-center space-x-2">
          <Star className="h-4 w-4 fill-current text-yellow-400" />
          <span>4.8 (124 reviews)</span>
        </div>
      </div>
    </div>

    {/* Recipe Image */}
    <div className="aspect-video bg-gradient-to-br from-yellow-200 to-orange-300 rounded-lg flex items-center justify-center">
      <Typography variant="body" className="text-orange-800 font-medium">
        Recipe Image Placeholder
      </Typography>
    </div>

    {/* Instructions */}
    <div className="space-y-6">
      <Typography variant="h2" className="text-2xl font-semibold">Instructions</Typography>
      <div className="space-y-4">
        {[
          'In a large bowl, whisk together flour, baking powder, salt, and sugar.',
          'In another bowl, beat eggs and then whisk in milk.',
          'Pour the wet ingredients into the dry ingredients and stir until just combined. Don\'t overmix.',
          'Heat a lightly oiled griddle or non-stick pan over medium heat.',
          'Pour 1/4 cup of batter for each pancake onto the griddle.',
          'Cook until bubbles form on surface and edges look set, about 2-3 minutes.',
          'Flip and cook until golden brown on the other side, 1-2 minutes more.',
          'Serve immediately with your favorite toppings.'
        ].map((instruction, index) => (
          <div key={index} className="flex space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
              {index + 1}
            </div>
            <Typography variant="body" className="flex-1">{instruction}</Typography>
          </div>
        ))}
      </div>
    </div>

    {/* Tips Section */}
    <Card className="p-6 bg-blue-50 border-blue-200">
      <Typography variant="h3" className="text-lg font-semibold mb-3">Chef's Tips</Typography>
      <ul className="space-y-2 text-sm">
        <li>• Don't overmix the batter - lumps are okay and will make fluffier pancakes</li>
        <li>• Let the batter rest for 5 minutes before cooking for extra fluffiness</li>
        <li>• Keep cooked pancakes warm in a 200°F oven while making the rest</li>
      </ul>
    </Card>
  </div>
);

const SampleSidebar = () => (
  <div className="space-y-6">
    <IngredientChecklist 
      ingredients={mockIngredients}
      title="Ingredients"
      onToggle={(id) => console.log('Toggle ingredient:', id)}
    />
    <NutritionFacts nutrition={mockNutrition} />
    
    <Card className="p-4">
      <Typography variant="h3" className="font-semibold mb-3">Related Recipes</Typography>
      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-200 to-pink-300 rounded-lg flex-shrink-0"></div>
          <div>
            <Typography variant="small" className="font-medium">Blueberry Pancakes</Typography>
            <Typography variant="small" className="text-muted-foreground">4.9 ★</Typography>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-green-200 to-emerald-300 rounded-lg flex-shrink-0"></div>
          <div>
            <Typography variant="small" className="font-medium">Chocolate Chip Pancakes</Typography>
            <Typography variant="small" className="text-muted-foreground">4.7 ★</Typography>
          </div>
        </div>
      </div>
    </Card>
  </div>
);

const SampleFooter = () => (
  <div className="p-6 text-center text-sm text-muted-foreground">
    <p>© 2024 Recipeer. Made with ❤️ for home cooks everywhere.</p>
  </div>
);

export const Default: Story = {
  args: {
    header: <SampleHeader />,
    main: <SampleRecipeContent />,
    sidebar: <SampleSidebar />,
    footer: <SampleFooter />,
  },
};

export const WithoutSidebar: Story = {
  args: {
    header: <SampleHeader />,
    main: <SampleRecipeContent />,
    footer: <SampleFooter />,
    showSidebar: false,
  },
};

export const CenteredLayout: Story = {
  args: {
    header: <SampleHeader />,
    main: <SampleRecipeContent />,
    footer: <SampleFooter />,
    variant: 'centered',
    showSidebar: false,
  },
};

export const FullWidthLayout: Story = {
  args: {
    header: <SampleHeader />,
    main: <SampleRecipeContent />,
    sidebar: <SampleSidebar />,
    footer: <SampleFooter />,
    variant: 'full-width',
  },
};

export const MinimalRecipe: Story = {
  args: {
    main: (
      <div className="max-w-2xl mx-auto space-y-6">
        <Typography variant="h1" className="text-3xl font-bold">Quick Omelette</Typography>
        <Typography variant="body">A simple 5-minute breakfast recipe.</Typography>
        <div className="space-y-2">
          <p>1. Crack 2 eggs into a bowl</p>
          <p>2. Whisk with salt and pepper</p>
          <p>3. Heat butter in a pan</p>
          <p>4. Pour in eggs and cook until set</p>
          <p>5. Fold in half and serve</p>
        </div>
      </div>
    ),
    variant: 'centered',
  },
};

export const RecipeCollection: Story = {
  args: {
    header: <SampleHeader />,
    main: (
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <Typography variant="h1" className="text-4xl font-bold">Breakfast Favorites</Typography>
          <Typography variant="body" className="text-lg text-mused-foreground">
            Start your day right with these delicious breakfast recipes
          </Typography>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Perfect Pancakes', time: '15 min', rating: 4.8, image: 'from-yellow-200 to-orange-300' },
            { title: 'Fluffy Waffles', time: '20 min', rating: 4.9, image: 'from-blue-200 to-purple-300' },
            { title: 'French Toast', time: '12 min', rating: 4.7, image: 'from-red-200 to-pink-300' },
            { title: 'Breakfast Burrito', time: '25 min', rating: 4.6, image: 'from-green-200 to-emerald-300' },
            { title: 'Avocado Toast', time: '5 min', rating: 4.5, image: 'from-emerald-200 to-teal-300' },
            { title: 'Smoothie Bowl', time: '10 min', rating: 4.4, image: 'from-purple-200 to-indigo-300' },
          ].map((recipe, index) => (
            <Card key={index} className="p-4 hover:shadow-lg transition-shadow">
              <div className={`aspect-video bg-gradient-to-br ${recipe.image} rounded-lg mb-4`}></div>
              <Typography variant="h3" className="font-semibold mb-2">{recipe.title}</Typography>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{recipe.time}</span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-current text-yellow-400" />
                  <span>{recipe.rating}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    ),
    variant: 'full-width',
    showSidebar: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Layout for recipe collection or category pages with grid layout.',
      },
    },
  },
};