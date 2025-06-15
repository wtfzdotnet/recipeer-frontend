import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { List, Check, Plus, ChefHat, Clock, AlertTriangle, Filter } from 'lucide-react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './drawer';
import { Button } from '../../atoms/button';
import { Badge } from '../../atoms/badge';
import { Checkbox } from '../../atoms/checkbox';
import { Progress } from '../../atoms/progress';

const meta: Meta<typeof Drawer> = {
  title: 'Molecules/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Drawer Component

Slide-out panels for mobile navigation, ingredient lists, and cooking workflows.

## Features

- **Mobile navigation**: Optimized for touch-based menu systems
- **Ingredient management**: Interactive checklists for cooking workflows
- **Cooking progress**: Step-by-step tracking and timer management
- **Quick actions**: Accessible shortcuts for common cooking tasks
- **Kitchen-friendly**: Large touch targets and clear visual hierarchy

## Usage

Use drawers for:
- Mobile navigation menus
- Interactive ingredient checklists
- Cooking step progress tracking
- Quick action panels
- Timer and cooking tool access
        `
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Drawer>;

// I need to create a simple Progress component for the story
const SimpleProgress = ({ value, className = "" }) => (
  <div className={`w-full bg-secondary rounded-full h-2 ${className}`}>
    <div 
      className="bg-primary h-2 rounded-full transition-all duration-300"
      style={{ width: `${value}%` }}
    />
  </div>
);

// Ingredient checklist drawer
export const IngredientChecklist: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [checkedItems, setCheckedItems] = useState(new Set());
    
    const ingredients = [
      { id: 1, name: '2 cups arborio rice', category: 'Grains' },
      { id: 2, name: '6 cups chicken broth', category: 'Pantry' },
      { id: 3, name: '1 cup white wine', category: 'Pantry' },
      { id: 4, name: '1 large onion, diced', category: 'Produce' },
      { id: 5, name: '3 cloves garlic, minced', category: 'Produce' },
      { id: 6, name: '1/2 cup grated Parmesan', category: 'Dairy' },
      { id: 7, name: '2 tbsp olive oil', category: 'Pantry' },
      { id: 8, name: '1 tsp saffron threads', category: 'Spices' },
    ];
    
    const toggleItem = (id) => {
      const newChecked = new Set(checkedItems);
      if (newChecked.has(id)) {
        newChecked.delete(id);
      } else {
        newChecked.add(id);
      }
      setCheckedItems(newChecked);
    };
    
    const progress = (checkedItems.size / ingredients.length) * 100;
    
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button className="gap-2">
            <List className="h-4 w-4" />
            Ingredient List
          </Button>
        </DrawerTrigger>
        <DrawerContent side="bottom" className="h-[80vh]">
          <DrawerHeader>
            <DrawerTitle className="flex items-center gap-2">
              <ChefHat className="h-5 w-5 text-primary" />
              Risotto Ingredients
            </DrawerTitle>
            <DrawerDescription>
              Check off ingredients as you gather them
            </DrawerDescription>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{checkedItems.size} of {ingredients.length}</span>
              </div>
              <SimpleProgress value={progress} />
            </div>
          </DrawerHeader>
          
          <div className="flex-1 overflow-y-auto px-6">
            <div className="space-y-4">
              {['Produce', 'Pantry', 'Dairy', 'Grains', 'Spices'].map(category => {
                const categoryItems = ingredients.filter(item => item.category === category);
                if (categoryItems.length === 0) return null;
                
                return (
                  <div key={category} className="space-y-2">
                    <h4 className="font-medium text-sm text-muted-foreground sticky top-0 bg-background py-1">
                      {category}
                    </h4>
                    {categoryItems.map(item => (
                      <div 
                        key={item.id} 
                        className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                          checkedItems.has(item.id) ? 'bg-success/10 border-success' : 'hover:bg-muted'
                        }`}
                        onClick={() => toggleItem(item.id)}
                      >
                        <Checkbox 
                          checked={checkedItems.has(item.id)}
                          className="pointer-events-none"
                        />
                        <span className={`flex-1 ${checkedItems.has(item.id) ? 'line-through text-muted-foreground' : ''}`}>
                          {item.name}
                        </span>
                        {checkedItems.has(item.id) && (
                          <Check className="h-4 w-4 text-success" />
                        )}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
          
          <DrawerFooter>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                Add Missing Item
              </Button>
              <DrawerClose asChild>
                <Button className="flex-1 gap-2">
                  <Check className="h-4 w-4" />
                  Ready to Cook
                </Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive ingredient checklist with progress tracking and categorization.'
      }
    }
  }
};

// Cooking progress tracker
export const CookingProgress: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [completedSteps, setCompletedSteps] = useState(new Set([1, 2]));
    
    const steps = [
      { id: 1, title: 'Prep ingredients', time: '5 min', description: 'Dice onion, mince garlic, measure rice' },
      { id: 2, title: 'Heat oil', time: '2 min', description: 'Heat olive oil in large pan over medium heat' },
      { id: 3, title: 'Sauté aromatics', time: '3 min', description: 'Cook onion until translucent, add garlic' },
      { id: 4, title: 'Toast rice', time: '2 min', description: 'Add rice, stir to coat with oil' },
      { id: 5, title: 'Add wine', time: '3 min', description: 'Pour wine, stir until absorbed' },
      { id: 6, title: 'Add broth gradually', time: '18 min', description: 'Add warm broth one ladle at a time' },
      { id: 7, title: 'Finish & serve', time: '2 min', description: 'Stir in cheese and saffron' }
    ];
    
    const toggleStep = (id) => {
      const newCompleted = new Set(completedSteps);
      if (newCompleted.has(id)) {
        newCompleted.delete(id);
      } else {
        newCompleted.add(id);
      }
      setCompletedSteps(newCompleted);
    };
    
    const progress = (completedSteps.size / steps.length) * 100;
    const currentStep = steps.find(step => !completedSteps.has(step.id));
    
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button className="gap-2">
            <Clock className="h-4 w-4" />
            Cooking Steps
          </Button>
        </DrawerTrigger>
        <DrawerContent side="right" className="w-full sm:max-w-md">
          <DrawerHeader>
            <DrawerTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              Cooking Progress
            </DrawerTitle>
            <DrawerDescription>
              Follow along with the recipe steps
            </DrawerDescription>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{completedSteps.size} of {steps.length} complete</span>
              </div>
              <SimpleProgress value={progress} />
            </div>
          </DrawerHeader>
          
          <div className="flex-1 overflow-y-auto px-6">
            {/* Current step highlight */}
            {currentStep && (
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-medium">
                    {currentStep.id}
                  </div>
                  <span className="font-medium">Current Step</span>
                  <Badge variant="outline">{currentStep.time}</Badge>
                </div>
                <h4 className="font-semibold text-blue-900">{currentStep.title}</h4>
                <p className="text-sm text-blue-800">{currentStep.description}</p>
              </div>
            )}
            
            {/* All steps */}
            <div className="space-y-3">
              {steps.map(step => {
                const isCompleted = completedSteps.has(step.id);
                const isCurrent = currentStep?.id === step.id;
                
                return (
                  <div 
                    key={step.id}
                    className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                      isCompleted ? 'bg-success/10 border-success' : 
                      isCurrent ? 'bg-primary/10 border-primary' : 'hover:bg-muted'
                    }`}
                    onClick={() => toggleStep(step.id)}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium mt-0.5 ${
                      isCompleted ? 'bg-success text-success-foreground' :
                      isCurrent ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}>
                      {isCompleted ? <Check className="h-3 w-3" /> : step.id}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`font-medium ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                          {step.title}
                        </span>
                        <Badge variant="outline" className="text-xs">{step.time}</Badge>
                      </div>
                      <p className={`text-sm ${isCompleted ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <DrawerFooter>
            <Button className="w-full gap-2">
              <AlertTriangle className="h-4 w-4" />
              Set Timer for Current Step
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Step-by-step cooking progress tracker with timing and completion status.'
      }
    }
  }
};

// Quick actions drawer
export const QuickActions: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Plus className="h-4 w-4" />
            Quick Actions
          </Button>
        </DrawerTrigger>
        <DrawerContent side="bottom" variant="compact" className="h-auto">
          <DrawerHeader>
            <DrawerTitle>Quick Cooking Actions</DrawerTitle>
            <DrawerDescription>
              Common tools and shortcuts for your cooking
            </DrawerDescription>
          </DrawerHeader>
          
          <div className="px-4 pb-4">
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-16 flex-col gap-1">
                <Clock className="h-5 w-5" />
                <span className="text-xs">Set Timer</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-1">
                <ChefHat className="h-5 w-5" />
                <span className="text-xs">Conversions</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-1">
                <List className="h-5 w-5" />
                <span className="text-xs">Shopping List</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-1">
                <Filter className="h-5 w-5" />
                <span className="text-xs">Find Recipe</span>
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Quick action panel with common cooking tools and shortcuts.'
      }
    }
  }
};

// Default example
export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Recipe Drawer</DrawerTitle>
          <DrawerDescription>
            This is a basic drawer for mobile recipe interfaces.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <p className="text-sm text-muted-foreground">
            Drawer content goes here. Perfect for ingredient lists,
            cooking steps, and mobile navigation.
          </p>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button>Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic drawer structure for mobile cooking interfaces.'
      }
    }
  }
};