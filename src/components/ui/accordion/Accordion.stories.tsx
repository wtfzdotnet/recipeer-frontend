import type { Meta, StoryObj } from '@storybook/react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from './accordion';
import { Badge } from '../badge';
import { Progress } from '../progress';
import { ChefHat, Clock, Users, AlertTriangle, Utensils, Info } from 'lucide-react';

const meta: Meta<typeof Accordion> = {
  title: 'Design System/Components/Data Display/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Accordion Component

A collapsible content component for organizing recipe instructions, FAQ sections, and expandable recipe information in a mobile-optimized interface.

## Features

- **Single/Multiple**: Support for single or multiple open items
- **Smooth Animations**: CSS-based expand/collapse animations
- **Keyboard Navigation**: Full keyboard accessibility support
- **Mobile Optimized**: Collapsible design perfect for mobile screens
- **Nested Content**: Support for complex content including other components

## Use Cases

- **Recipe Instructions**: "Ingredients", "Instructions", "Chef's Notes"
- **FAQ Sections**: Common cooking questions and troubleshooting
- **Recipe Details**: Expandable sections for nutritional info, variations
- **Mobile Navigation**: Collapsible content for small screens
- **Progressive Disclosure**: Show/hide detailed information on demand
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'Whether multiple items can be open at once'
    },
    collapsible: {
      control: 'boolean',
      description: 'Whether all items can be collapsed'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Accordion>;

// Default accordion
export const Default: Story = {
  render: () => (
    <div className="w-96">
      <Accordion type="single" collapsible>
        <AccordionItem value="ingredients">
          <AccordionTrigger>Ingredients</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>400g pasta (spaghetti or linguine)</li>
              <li>200g guanciale or pancetta, diced</li>
              <li>4 large eggs</li>
              <li>100g Pecorino Romano cheese, grated</li>
              <li>Freshly ground black pepper</li>
              <li>Salt for pasta water</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="instructions">
          <AccordionTrigger>Instructions</AccordionTrigger>
          <AccordionContent>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Bring a large pot of salted water to boil</li>
              <li>Cook pasta according to package directions until al dente</li>
              <li>While pasta cooks, render the guanciale in a large pan</li>
              <li>Whisk eggs with cheese and pepper in a bowl</li>
              <li>Drain pasta, reserving 1 cup pasta water</li>
              <li>Add hot pasta to pan with guanciale</li>
              <li>Remove from heat, add egg mixture, toss quickly</li>
              <li>Add pasta water as needed for creaminess</li>
            </ol>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="notes">
          <AccordionTrigger>Chef's Notes</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-sm">
              <p><strong>Tip:</strong> The key is timing - add the egg mixture off the heat to prevent scrambling.</p>
              <p><strong>Variation:</strong> Use bacon if guanciale isn't available, though it won't be traditional.</p>
              <p><strong>Storage:</strong> Best served immediately, doesn't reheat well.</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

// Recipe details accordion
export const RecipeDetails: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="overview">
          <AccordionTrigger className="text-left">
            <div className="flex items-center gap-2">
              <ChefHat className="h-4 w-4" />
              Recipe Overview
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <Clock className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                <p className="text-sm font-medium">Total Time</p>
                <p className="text-xs text-muted-foreground">35 minutes</p>
              </div>
              <div className="text-center">
                <Users className="h-6 w-6 mx-auto mb-2 text-green-500" />
                <p className="text-sm font-medium">Servings</p>
                <p className="text-xs text-muted-foreground">4 people</p>
              </div>
              <div className="text-center">
                <Utensils className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                <p className="text-sm font-medium">Difficulty</p>
                <Badge variant="warning" size="sm">Medium</Badge>
              </div>
              <div className="text-center">
                <div className="h-6 w-6 mx-auto mb-2 text-yellow-500 text-lg">⭐</div>
                <p className="text-sm font-medium">Rating</p>
                <p className="text-xs text-muted-foreground">4.8/5</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="ingredients">
          <AccordionTrigger>
            <div className="flex items-center justify-between w-full">
              <span>Ingredients</span>
              <Badge variant="secondary" size="sm">6 items</Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {[
                { name: 'Pasta (spaghetti)', amount: '400g', note: 'al dente' },
                { name: 'Guanciale', amount: '200g', note: 'diced' },
                { name: 'Large eggs', amount: '4', note: 'room temperature' },
                { name: 'Pecorino Romano', amount: '100g', note: 'freshly grated' },
                { name: 'Black pepper', amount: 'to taste', note: 'freshly ground' },
                { name: 'Salt', amount: 'for water', note: 'coarse sea salt' }
              ].map((ingredient, i) => (
                <div key={i} className="flex justify-between items-start border-b pb-2">
                  <div>
                    <p className="font-medium">{ingredient.name}</p>
                    <p className="text-xs text-muted-foreground">{ingredient.note}</p>
                  </div>
                  <span className="text-sm font-mono">{ingredient.amount}</span>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="instructions">
          <AccordionTrigger>Step-by-Step Instructions</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {[
                { step: 1, title: 'Prepare the water', desc: 'Bring a large pot of salted water to a rolling boil.', time: '5 min' },
                { step: 2, title: 'Cook the pasta', desc: 'Add pasta and cook according to package directions until al dente.', time: '8-12 min' },
                { step: 3, title: 'Render the guanciale', desc: 'Cook diced guanciale in a large pan until crispy and golden.', time: '5-7 min' },
                { step: 4, title: 'Prepare egg mixture', desc: 'Whisk eggs with grated cheese and plenty of black pepper.', time: '2 min' },
                { step: 5, title: 'Combine and finish', desc: 'Toss hot pasta with guanciale, then add egg mixture off heat.', time: '2-3 min' }
              ].map((instruction) => (
                <div key={instruction.step} className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {instruction.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-medium">{instruction.title}</h4>
                      <span className="text-xs text-muted-foreground">{instruction.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{instruction.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="nutrition">
          <AccordionTrigger>Nutritional Information</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-orange-500">425</p>
                <p className="text-xs text-muted-foreground">Calories</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-500">18g</p>
                <p className="text-xs text-muted-foreground">Fat</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-500">42g</p>
                <p className="text-xs text-muted-foreground">Carbs</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-500">18g</p>
                <p className="text-xs text-muted-foreground">Protein</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="tips">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              Chef's Tips & Variations
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Pro Tip</p>
                    <p className="text-sm text-muted-foreground">
                      Remove the pan from heat before adding the egg mixture to prevent scrambling.
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Variations</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Add frozen peas for color and sweetness</li>
                  <li>• Use bacon if guanciale isn't available</li>
                  <li>• Try half Pecorino, half Parmesan for milder flavor</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Storage</h4>
                <p className="text-sm text-muted-foreground">
                  Best served immediately. Leftovers can be stored for 1 day but don't reheat well.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Comprehensive recipe details accordion with multiple sections including overview, ingredients, instructions, nutrition, and tips.'
      }
    }
  }
};

// FAQ accordion
export const FAQ: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
      <Accordion type="single" collapsible>
        <AccordionItem value="substitutions">
          <AccordionTrigger>Can I substitute ingredients?</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-sm">
              <p><strong>Guanciale:</strong> You can use pancetta or bacon, though the flavor will be different.</p>
              <p><strong>Pecorino Romano:</strong> Parmigiano-Reggiano works as a substitute.</p>
              <p><strong>Pasta:</strong> Any long pasta like linguine, fettuccine, or bucatini works well.</p>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="vegan">
          <AccordionTrigger>Can this be made vegan?</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-sm">
              <p>Traditional carbonara cannot be made vegan while maintaining its authentic character, as eggs and cheese are essential components.</p>
              <p>However, you could create a "carbonara-style" dish using:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Cashew cream instead of eggs</li>
                <li>Nutritional yeast for cheesy flavor</li>
                <li>Smoky tempeh or mushrooms instead of guanciale</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="scrambled">
          <AccordionTrigger>My eggs scrambled! What went wrong?</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-sm">
              <p>This is the most common carbonara mistake. Here's how to prevent it:</p>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Remove from heat:</strong> Take the pan off the burner before adding eggs</li>
                <li><strong>Toss quickly:</strong> Move the pasta constantly while adding the mixture</li>
                <li><strong>Use pasta water:</strong> Add hot pasta water to help create a smooth sauce</li>
                <li><strong>Temperature matters:</strong> Let the pasta cool for 30 seconds before adding eggs</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="storage">
          <AccordionTrigger>How do I store leftovers?</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-sm">
              <p>Carbonara is best enjoyed fresh, but if you have leftovers:</p>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Refrigerate:</strong> Store in fridge for up to 1 day</li>
                <li><strong>Don't microwave:</strong> The eggs will curdle</li>
                <li><strong>Gentle reheating:</strong> Use low heat in a pan with a splash of cream</li>
                <li><strong>Consider repurposing:</strong> Use as a base for frittata or pasta salad</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="wine">
          <AccordionTrigger>What wine pairs well with carbonara?</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-sm">
              <p>Carbonara pairs beautifully with several wine styles:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <div>
                  <h4 className="font-medium">White Wines</h4>
                  <ul className="list-disc list-inside text-xs space-y-1 mt-1">
                    <li>Frascati (traditional Roman choice)</li>
                    <li>Soave</li>
                    <li>Vermentino</li>
                    <li>Pinot Grigio</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium">Light Reds</h4>
                  <ul className="list-disc list-inside text-xs space-y-1 mt-1">
                    <li>Chianti</li>
                    <li>Sangiovese</li>
                    <li>Barbera d'Alba</li>
                  </ul>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'FAQ accordion showing common cooking questions with detailed answers and troubleshooting tips.'
      }
    }
  }
};

// Mobile optimized accordion
export const MobileOptimized: Story = {
  render: () => (
    <div className="w-full max-w-sm mx-auto">
      <Accordion type="single" collapsible>
        <AccordionItem value="quick-facts">
          <AccordionTrigger>Quick Recipe Facts</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Prep Time</span>
                <span className="text-sm font-medium">10 min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Cook Time</span>
                <span className="text-sm font-medium">25 min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Difficulty</span>
                <Badge variant="warning" size="sm">Medium</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Servings</span>
                <span className="text-sm font-medium">4 people</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="ingredients-mobile">
          <AccordionTrigger>Ingredients (6)</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {[
                '400g pasta',
                '200g guanciale',
                '4 large eggs',
                '100g Pecorino Romano',
                'Black pepper',
                'Salt for water'
              ].map((ingredient, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">{ingredient}</span>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="cooking-progress">
          <AccordionTrigger>Cooking Progress</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <Progress value={60} variant="cooking" showLabel label="Step 3 of 5" showPercentage />
              <p className="text-sm text-muted-foreground">
                Currently: Rendering the guanciale until crispy
              </p>
              <div className="text-xs text-muted-foreground">
                <p>✓ Water boiling</p>
                <p>✓ Pasta cooking</p>
                <p>→ Rendering guanciale</p>
                <p>• Prepare egg mixture</p>
                <p>• Combine and finish</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Mobile-optimized accordion with compact layout and touch-friendly interactions.'
      }
    }
  }
};