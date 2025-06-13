import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
import { Badge } from '../badge';
import { Progress } from '../progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../table';
import { Star, Clock, Users, ChefHat, Heart, Share2, Bookmark } from 'lucide-react';

const meta: Meta<typeof Tabs> = {
  title: 'Design System/Components/Data Display/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Tabs Component

A tabbed interface component for organizing recipe information including variations, nutritional info, reviews, and related content.

## Features

- **Keyboard Navigation**: Full keyboard accessibility support
- **Smooth Transitions**: CSS-based tab switching animations
- **Responsive Design**: Mobile-optimized tab layout
- **Flexible Content**: Support for any content type within tabs
- **Focus Management**: Proper focus handling for accessibility

## Use Cases

- **Recipe Information**: "Recipe", "Nutrition", "Reviews", "Variations"
- **Recipe Details**: Organize different aspects of recipe information
- **User Dashboards**: "My Recipes", "Saved", "Shopping Lists"
- **Recipe Comparison**: Side-by-side recipe analysis
- **Content Organization**: Group related recipe content efficiently
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: 'text',
      description: 'The default active tab'
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Tab orientation'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Tabs>;

// Default tabs
export const Default: Story = {
  render: () => (
    <div className="w-96">
      <Tabs defaultValue="recipe" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="recipe">Recipe</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="recipe" className="space-y-4">
          <h3 className="text-lg font-semibold">Pasta Carbonara Recipe</h3>
          <div className="space-y-2">
            <p className="text-sm">A classic Roman pasta dish with eggs, cheese, and pancetta.</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                35 min
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                4 servings
              </span>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="nutrition" className="space-y-4">
          <h3 className="text-lg font-semibold">Nutritional Information</h3>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">425</p>
              <p className="text-xs text-muted-foreground">Calories</p>
            </div>
            <div>
              <p className="text-2xl font-bold">18g</p>
              <p className="text-xs text-muted-foreground">Protein</p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="space-y-4">
          <h3 className="text-lg font-semibold">User Reviews</h3>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm">4.8 out of 5 (127 reviews)</span>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  ),
};

// Recipe detail tabs
export const RecipeDetails: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
          <TabsTrigger value="instructions">Instructions</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="border rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">Classic Pasta Carbonara</h2>
                <p className="text-muted-foreground">
                  A traditional Roman pasta dish made with eggs, cheese, and guanciale. 
                  Simple ingredients combined with perfect technique create this iconic comfort food.
                </p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 border rounded-lg hover:bg-muted">
                  <Heart className="h-4 w-4" />
                </button>
                <button className="p-2 border rounded-lg hover:bg-muted">
                  <Share2 className="h-4 w-4" />
                </button>
                <button className="p-2 border rounded-lg hover:bg-muted">
                  <Bookmark className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <Clock className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <p className="font-semibold">35 minutes</p>
                <p className="text-sm text-muted-foreground">Total time</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Users className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <p className="font-semibold">4 servings</p>
                <p className="text-sm text-muted-foreground">Serves</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <ChefHat className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                <p className="font-semibold">Medium</p>
                <p className="text-sm text-muted-foreground">Difficulty</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Star className="h-8 w-8 mx-auto mb-2 text-yellow-500 fill-current" />
                <p className="font-semibold">4.8/5</p>
                <p className="text-sm text-muted-foreground">Rating</p>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="font-semibold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="cuisine">Italian</Badge>
                <Badge variant="difficulty">Medium</Badge>
                <Badge variant="secondary">Comfort Food</Badge>
                <Badge variant="secondary">Pasta</Badge>
                <Badge variant="warning">Contains Eggs</Badge>
                <Badge variant="secondary">30 min or less</Badge>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="ingredients" className="space-y-4">
          <div className="border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Ingredients</h3>
              <div className="text-sm text-muted-foreground">Serves 4</div>
            </div>
            
            <div className="space-y-3">
              {[
                { name: 'Spaghetti or linguine', amount: '400g', note: 'preferably bronze-cut' },
                { name: 'Guanciale', amount: '200g', note: 'diced (or pancetta)' },
                { name: 'Large eggs', amount: '4', note: 'room temperature' },
                { name: 'Pecorino Romano cheese', amount: '100g', note: 'freshly grated' },
                { name: 'Freshly ground black pepper', amount: 'to taste', note: 'coarsely ground' },
                { name: 'Sea salt', amount: 'for pasta water', note: 'coarse' }
              ].map((ingredient, i) => (
                <div key={i} className="flex items-start justify-between p-3 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <div>
                      <p className="font-medium">{ingredient.name}</p>
                      <p className="text-sm text-muted-foreground">{ingredient.note}</p>
                    </div>
                  </div>
                  <span className="font-mono text-sm">{ingredient.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="instructions" className="space-y-4">
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Instructions</h3>
            
            <div className="space-y-4">
              {[
                { step: 1, title: 'Prepare the water', instruction: 'Bring a large pot of salted water to a rolling boil. Use plenty of water and salt generously - it should taste like the sea.', time: '5 min' },
                { step: 2, title: 'Cook the pasta', instruction: 'Add the pasta to the boiling water and cook according to package directions until al dente. Reserve 1 cup of pasta water before draining.', time: '8-12 min' },
                { step: 3, title: 'Render the guanciale', instruction: 'While pasta cooks, place diced guanciale in a large, cold pan. Cook over medium heat until fat renders and guanciale is golden and crispy.', time: '5-7 min' },
                { step: 4, title: 'Prepare the egg mixture', instruction: 'In a bowl, whisk together whole eggs, grated Pecorino Romano, and plenty of freshly ground black pepper.', time: '2 min' },
                { step: 5, title: 'Combine everything', instruction: 'Remove pan from heat. Add hot, drained pasta to the pan with guanciale. Toss to coat. Add egg mixture and toss vigorously, adding pasta water as needed to create a creamy sauce.', time: '2-3 min' }
              ].map((step) => (
                <div key={step.step} className="flex gap-4 p-4 border rounded-lg">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{step.title}</h4>
                      <span className="text-sm text-muted-foreground">{step.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{step.instruction}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="nutrition" className="space-y-4">
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Nutrition Facts</h3>
            <p className="text-sm text-muted-foreground mb-4">Per serving (1/4 of recipe)</p>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nutrient</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">% Daily Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Calories</TableCell>
                  <TableCell className="text-right">425</TableCell>
                  <TableCell className="text-right">21%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Total Fat</TableCell>
                  <TableCell className="text-right">18g</TableCell>
                  <TableCell className="text-right">23%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Saturated Fat</TableCell>
                  <TableCell className="text-right">8g</TableCell>
                  <TableCell className="text-right">40%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Cholesterol</TableCell>
                  <TableCell className="text-right">95mg</TableCell>
                  <TableCell className="text-right">32%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Sodium</TableCell>
                  <TableCell className="text-right">650mg</TableCell>
                  <TableCell className="text-right">28%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Total Carbs</TableCell>
                  <TableCell className="text-right">42g</TableCell>
                  <TableCell className="text-right">15%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Protein</TableCell>
                  <TableCell className="text-right">18g</TableCell>
                  <TableCell className="text-right">36%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Dietary Information</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="dietary">High Protein</Badge>
                <Badge variant="warning">Contains Eggs</Badge>
                <Badge variant="warning">Contains Dairy</Badge>
                <Badge variant="secondary">Gluten</Badge>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Comprehensive recipe detail tabs showing all aspects of a recipe with rich content.'
      }
    }
  }
};

// User dashboard tabs
export const UserDashboard: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <Tabs defaultValue="my-recipes" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="my-recipes">My Recipes</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
          <TabsTrigger value="shopping">Shopping Lists</TabsTrigger>
          <TabsTrigger value="meal-plans">Meal Plans</TabsTrigger>
        </TabsList>
        
        <TabsContent value="my-recipes" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">My Recipes</h3>
            <Badge variant="secondary">12 recipes</Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="border rounded-lg p-4">
                <div className="aspect-video bg-gradient-to-br from-orange-100 to-red-100 rounded-lg mb-3 flex items-center justify-center text-2xl">
                  🍝
                </div>
                <h4 className="font-medium mb-1">Pasta Recipe {i + 1}</h4>
                <p className="text-sm text-muted-foreground mb-2">Updated 2 days ago</p>
                <div className="flex gap-1">
                  <Badge variant="cuisine" size="sm">Italian</Badge>
                  <Badge variant="difficulty" size="sm">Medium</Badge>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="saved" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Saved Recipes</h3>
            <Badge variant="secondary">24 recipes</Badge>
          </div>
          
          <div className="space-y-3">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center text-xl">
                  🥗
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Saved Recipe {i + 1}</h4>
                  <p className="text-sm text-muted-foreground">By Chef Name • Saved 3 days ago</p>
                  <div className="flex gap-1 mt-1">
                    <Badge variant="dietary" size="sm">Vegetarian</Badge>
                    <Badge variant="success" size="sm">Easy</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">4.5</span>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="shopping" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Shopping Lists</h3>
            <Badge variant="secondary">3 lists</Badge>
          </div>
          
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">Weekly Meal Prep</h4>
                <Progress value={75} className="w-24" />
              </div>
              <p className="text-sm text-muted-foreground mb-3">12 items • 3 completed</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked />
                  <span className="text-sm line-through text-muted-foreground">400g pasta</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span className="text-sm">200g guanciale</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span className="text-sm">Eggs (dozen)</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="meal-plans" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Meal Plans</h3>
            <Badge variant="secondary">This week</Badge>
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="border rounded-lg p-3 text-center">
                <h5 className="font-medium text-sm mb-2">{day}</h5>
                <div className="space-y-1">
                  <div className="w-full h-8 bg-orange-100 rounded text-xs flex items-center justify-center">
                    🍝
                  </div>
                  <div className="w-full h-8 bg-green-100 rounded text-xs flex items-center justify-center">
                    🥗
                  </div>
                  <div className="w-full h-8 bg-blue-100 rounded text-xs flex items-center justify-center">
                    🍲
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'User dashboard with tabs for managing personal recipes, saved items, shopping lists, and meal planning.'
      }
    }
  }
};

// Mobile responsive tabs
export const MobileResponsive: Story = {
  render: () => (
    <div className="w-full max-w-sm mx-auto">
      <Tabs defaultValue="recipe" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="recipe" className="text-xs">Recipe</TabsTrigger>
          <TabsTrigger value="nutrition" className="text-xs">Nutrition</TabsTrigger>
          <TabsTrigger value="reviews" className="text-xs">Reviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recipe" className="space-y-3">
          <h3 className="text-lg font-semibold">Quick Recipe</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Prep Time:</span>
              <span>10 min</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Cook Time:</span>
              <span>25 min</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Servings:</span>
              <span>4 people</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1">
            <Badge variant="cuisine" size="sm">Italian</Badge>
            <Badge variant="difficulty" size="sm">Medium</Badge>
          </div>
        </TabsContent>
        
        <TabsContent value="nutrition" className="space-y-3">
          <h3 className="text-lg font-semibold">Nutrition</h3>
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="p-2 border rounded">
              <p className="text-lg font-bold">425</p>
              <p className="text-xs text-muted-foreground">Calories</p>
            </div>
            <div className="p-2 border rounded">
              <p className="text-lg font-bold">18g</p>
              <p className="text-xs text-muted-foreground">Protein</p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="reviews" className="space-y-3">
          <h3 className="text-lg font-semibold">Reviews</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm">4.8 (127)</span>
            </div>
            <div className="space-y-1">
              <div className="text-xs">
                <strong>Sarah:</strong> "Perfect recipe!"
              </div>
              <div className="text-xs">
                <strong>Mike:</strong> "Easy to follow"
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Mobile-optimized tabs with compact layout and touch-friendly interactions.'
      }
    }
  }
};