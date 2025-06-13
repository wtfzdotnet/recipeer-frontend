import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChefHat, Clock, Users, Star, Calendar } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './hover-card';
import { Button } from '../button/button';
import { Badge } from '../badge/badge';
import { Avatar } from '../avatar/avatar';

const meta: Meta<typeof HoverCard> = {
  title: 'Design System/Components/Feedback/Hover Card',
  component: HoverCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Hover Card Component

Rich preview cards for recipes, chefs, and cooking content on hover or focus.

## Features

- **Rich previews**: Detailed information without navigation
- **Recipe previews**: Quick recipe overview with key details
- **Chef profiles**: Author information and cooking credentials  
- **Non-intrusive**: Appears on hover without blocking interaction
- **Mobile-friendly**: Touch-friendly with appropriate delays
- **Accessible**: Keyboard navigable with focus management

## Usage

Use hover cards for:
- Recipe previews in search results
- Chef profile information
- Ingredient source details
- Restaurant or brand information
- Cultural context previews
        `
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HoverCard>;

// Recipe preview hover card
export const RecipePreview: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className="text-blue-600">
          Mediterranean Pasta Salad
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <img
              className="h-12 w-12 rounded-lg object-cover"
              src="https://picsum.photos/seed/pasta-salad/200/200"
              alt="Mediterranean Pasta Salad"
            />
            <div className="space-y-1">
              <h4 className="font-semibold">Mediterranean Pasta Salad</h4>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1">4.8</span>
                </div>
                <span>•</span>
                <span>156 reviews</span>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Fresh pasta salad with cherry tomatoes, olives, feta cheese, and herbs. 
            Perfect for summer gatherings and meal prep.
          </p>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>25 min</span>
              </div>
              <div className="flex items-center">
                <Users className="h-3 w-3 mr-1" />
                <span>4 servings</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1">
            <Badge variant="secondary">Vegetarian</Badge>
            <Badge variant="secondary">Mediterranean</Badge>
            <Badge variant="secondary">Make-ahead</Badge>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Recipe preview with image, ratings, timing, and dietary information.'
      }
    }
  }
};

// Chef profile hover card
export const ChefProfile: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className="text-purple-600 gap-1">
          <ChefHat className="h-3 w-3" />
          Chef Maria Rossi
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <img
                src="https://picsum.photos/seed/chef-maria/200/200"
                alt="Chef Maria Rossi"
                className="h-12 w-12 rounded-full object-cover"
              />
            </Avatar>
            <div className="space-y-1">
              <h4 className="font-semibold">Chef Maria Rossi</h4>
              <p className="text-sm text-muted-foreground">Italian Cuisine Specialist</p>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Third-generation chef from Tuscany specializing in traditional Italian recipes 
            and modern Mediterranean cuisine. Featured in Food & Wine Magazine.
          </p>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-medium">Recipes</div>
              <div className="text-muted-foreground">127 published</div>
            </div>
            <div>
              <div className="font-medium">Followers</div>
              <div className="text-muted-foreground">24.5k</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>Joined March 2019</span>
          </div>
          
          <div className="flex flex-wrap gap-1">
            <Badge variant="outline">Italian</Badge>
            <Badge variant="outline">Mediterranean</Badge>
            <Badge variant="outline">Pasta Expert</Badge>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Chef profile with credentials, statistics, and specializations.'
      }
    }
  }
};

// Restaurant information
export const RestaurantInfo: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className="text-orange-600">
          Nonna's Kitchen, Rome
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <ChefHat className="h-6 w-6 text-orange-600" />
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold">Nonna's Kitchen</h4>
              <p className="text-sm text-muted-foreground">Traditional Trattoria • Rome, Italy</p>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Family-owned trattoria serving authentic Roman cuisine since 1952. 
            Featured recipe source for traditional Italian cooking methods.
          </p>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-medium">Established</div>
              <div className="text-muted-foreground">1952</div>
            </div>
            <div>
              <div className="font-medium">Recipes Shared</div>
              <div className="text-muted-foreground">23</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm">
            <div className="flex items-center">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="ml-1">4.9</span>
            </div>
            <span className="text-muted-foreground">• Michelin Guide Listed</span>
          </div>
          
          <div className="flex flex-wrap gap-1">
            <Badge variant="outline">Traditional</Badge>
            <Badge variant="outline">Roman</Badge>
            <Badge variant="outline">Family Recipe</Badge>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Restaurant information with heritage, credentials, and specialties.'
      }
    }
  }
};

// Ingredient source preview
export const IngredientSource: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className="text-green-600 underline decoration-dotted">
          San Marzano tomatoes
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <img
              className="h-12 w-12 rounded-lg object-cover"
              src="https://picsum.photos/seed/san-marzano/200/200"
              alt="San Marzano tomatoes"
            />
            <div className="space-y-1">
              <h4 className="font-semibold">San Marzano Tomatoes</h4>
              <p className="text-sm text-muted-foreground">Authentic Italian DOP</p>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Grown in volcanic soil near Mount Vesuvius, these heirloom tomatoes are 
            prized for their sweet flavor and low acidity. Protected designation of origin.
          </p>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="font-medium">Region:</span>
              <span className="text-muted-foreground">Campania, Italy</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Season:</span>
              <span className="text-muted-foreground">July - September</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Best for:</span>
              <span className="text-muted-foreground">Pasta sauce, pizza</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1">
            <Badge variant="outline">DOP Certified</Badge>
            <Badge variant="outline">Heirloom</Badge>
            <Badge variant="outline">Italian</Badge>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Ingredient source information with origin details and certifications.'
      }
    }
  }
};

// Multiple hover cards example
export const MultipleHoverCards: Story = {
  render: () => (
    <div className="space-y-4 text-center">
      <p className="text-sm text-muted-foreground mb-4">
        Hover over the links below to see different types of information cards:
      </p>
      
      <div className="space-y-2">
        <div>
          <span className="text-sm">This recipe was created by </span>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="link" className="p-0 h-auto text-purple-600">
                Chef Alessandro Volta
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-72">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <img
                      src="https://picsum.photos/seed/chef-alessandro/150/150"
                      alt="Chef Alessandro"
                      className="rounded-full"
                    />
                  </Avatar>
                  <div>
                    <div className="font-semibold text-sm">Chef Alessandro Volta</div>
                    <div className="text-xs text-muted-foreground">Northern Italian Specialist</div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Award-winning chef from Milan specializing in modern interpretations of classic Northern Italian dishes.
                </p>
                <div className="flex gap-1">
                  <Badge variant="outline" className="text-xs">Michelin Star</Badge>
                  <Badge variant="outline" className="text-xs">127 Recipes</Badge>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
          <span className="text-sm"> at </span>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="link" className="p-0 h-auto text-orange-600">
                Osteria del Borgo
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-72">
              <div className="space-y-2">
                <div className="font-semibold text-sm">Osteria del Borgo</div>
                <p className="text-xs text-muted-foreground">
                  Historic restaurant in Milan's Brera district, serving refined traditional cuisine since 1987.
                </p>
                <div className="flex items-center text-xs">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                  <span>4.7 • Milan, Italy</span>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
        
        <div>
          <span className="text-sm">Try using authentic </span>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="link" className="p-0 h-auto text-green-600">
                Parmigiano-Reggiano
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-72">
              <div className="space-y-2">
                <div className="font-semibold text-sm">Parmigiano-Reggiano DOP</div>
                <p className="text-xs text-muted-foreground">
                  Aged Italian cheese from Emilia-Romagna, aged minimum 12 months for complex nutty flavor.
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="font-medium">Origin:</span>
                    <span className="text-muted-foreground ml-1">Northern Italy</span>
                  </div>
                  <div>
                    <span className="font-medium">Aging:</span>
                    <span className="text-muted-foreground ml-1">12-36 months</span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
          <span className="text-sm"> for the best results.</span>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple hover cards showing different content types in context.'
      }
    }
  }
};

// Default example
export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="outline">Hover for preview</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="space-y-2">
          <h4 className="font-semibold">Recipe Preview</h4>
          <p className="text-sm text-muted-foreground">
            This is a basic hover card for recipe-related previews and information.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic hover card structure for recipe-related previews.'
      }
    }
  }
};