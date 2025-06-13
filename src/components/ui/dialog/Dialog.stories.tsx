import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ChefHat, Users, Clock, Scale } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from './dialog';
import { Button } from '../button/button';
import { Input } from '../input/input';
import { Label } from '../label/label';

const meta: Meta<typeof Dialog> = {
  title: 'Design System/Components/Feedback/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Dialog Component

Modal dialogs for recipe modifications, ingredient substitutions, and cooking interactions.

## Features

- **Accessible**: Built with proper ARIA attributes and keyboard navigation
- **Recipe-focused**: Optimized for cooking workflows like scaling recipes and ingredient substitutions
- **Mobile-optimized**: Large touch targets and responsive design for kitchen use
- **Keyboard navigation**: Full keyboard support with focus management
- **Overlay control**: Customizable backdrop and close behavior

## Usage

Use dialogs for:
- Recipe scaling and portion adjustments
- Ingredient substitution recommendations
- Cooking instruction modifications
- Recipe information editing
        `
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Dialog>;

// Recipe scaling dialog
export const RecipeScaling: Story = {
  render: () => {
    const [servings, setServings] = useState(4);
    const [open, setOpen] = useState(false);
    
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Scale className="h-4 w-4" />
            Scale Recipe
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ChefHat className="h-5 w-5 text-orange-600" />
              Scale Recipe: Mediterranean Pasta Salad
            </DialogTitle>
            <DialogDescription>
              Adjust the recipe to serve a different number of people. Ingredient quantities will be automatically calculated.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="servings" className="text-right">
                Servings
              </Label>
              <div className="col-span-3 flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setServings(Math.max(1, servings - 1))}
                  className="h-8 w-8 p-0"
                >
                  -
                </Button>
                <Input
                  id="servings"
                  value={servings}
                  onChange={(e) => setServings(parseInt(e.target.value) || 1)}
                  className="text-center"
                  type="number"
                  min="1"
                  max="50"
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setServings(servings + 1)}
                  className="h-8 w-8 p-0"
                >
                  +
                </Button>
              </div>
            </div>
            <div className="bg-muted p-3 rounded-lg">
              <h4 className="font-medium mb-2 text-sm">Scaled Ingredients:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• {(servings * 0.75).toFixed(1)} cups pasta</li>
                <li>• {servings * 2} cups cherry tomatoes</li>
                <li>• {(servings * 0.5).toFixed(1)} cups olives</li>
                <li>• {(servings * 0.25).toFixed(1)} cups feta cheese</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)} className="gap-2">
              <Users className="h-4 w-4" />
              Apply Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Dialog for scaling recipe servings with automatic ingredient calculation.'
      }
    }
  }
};

// Ingredient substitution dialog
export const IngredientSubstitution: Story = {
  render: () => {
    const [selectedSubstitution, setSelectedSubstitution] = useState('');
    const [open, setOpen] = useState(false);
    
    const substitutions = [
      { id: 'butter', name: 'Coconut Oil', ratio: '1:1', note: 'Vegan alternative' },
      { id: 'applesauce', name: 'Unsweetened Applesauce', ratio: '1:2', note: 'Lower fat option' },
      { id: 'avocado', name: 'Mashed Avocado', ratio: '1:1', note: 'Healthy fats' },
      { id: 'yogurt', name: 'Greek Yogurt', ratio: '1:2', note: 'Protein-rich option' }
    ];
    
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="gap-2">
            <ChefHat className="h-4 w-4" />
            Substitute Butter
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Substitute: 1/2 cup Butter</DialogTitle>
            <DialogDescription>
              Choose a healthier or dietary-friendly alternative for butter in your recipe.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-4">
            {substitutions.map((sub) => (
              <div
                key={sub.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors hover:bg-muted ${
                  selectedSubstitution === sub.id ? 'border-primary bg-primary/5' : ''
                }`}
                onClick={() => setSelectedSubstitution(sub.id)}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-medium">{sub.name}</span>
                  <span className="text-sm text-muted-foreground font-mono">{sub.ratio}</span>
                </div>
                <p className="text-sm text-muted-foreground">{sub.note}</p>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={() => setOpen(false)} 
              disabled={!selectedSubstitution}
              className="gap-2"
            >
              Apply Substitution
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Dialog for selecting ingredient substitutions with dietary preferences.'
      }
    }
  }
};

// Cooking timer setup dialog
export const CookingTimer: Story = {
  render: () => {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [timerName, setTimerName] = useState('Pasta Cooking');
    const [open, setOpen] = useState(false);
    
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Clock className="h-4 w-4" />
            Set Timer
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              Set Cooking Timer
            </DialogTitle>
            <DialogDescription>
              Set a timer for this cooking step. You'll get a notification when time is up.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="timer-name">Timer Name</Label>
              <Input
                id="timer-name"
                value={timerName}
                onChange={(e) => setTimerName(e.target.value)}
                placeholder="e.g., Pasta Cooking, Sauce Simmering"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="minutes">Minutes</Label>
                <Input
                  id="minutes"
                  value={minutes}
                  onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
                  type="number"
                  min="0"
                  max="180"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="seconds">Seconds</Label>
                <Input
                  id="seconds"
                  value={seconds}
                  onChange={(e) => setSeconds(parseInt(e.target.value) || 0)}
                  type="number"
                  min="0"
                  max="59"
                />
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
              <p className="text-sm text-blue-800">
                Timer will be set for <strong>{minutes}:{seconds.toString().padStart(2, '0')}</strong>
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)} className="gap-2">
              <Clock className="h-4 w-4" />
              Start Timer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Dialog for setting cooking timers with custom durations and labels.'
      }
    }
  }
};

// Default example
export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Recipe Dialog</DialogTitle>
          <DialogDescription>
            This is a basic dialog component for recipe interactions.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className="text-sm text-muted-foreground">
            Dialog content goes here. This example shows the basic structure
            without specific recipe functionality.
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic dialog structure for general recipe-related interactions.'
      }
    }
  }
};