import type { Meta, StoryObj } from '@storybook/react-vite';
import { HelpCircle, Info, Clock, Scale, Thermometer, Timer } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';
import { Button } from '@/components/atoms/button';

const meta: Meta<typeof Tooltip> = {
  title: 'Molecules/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Tooltip Component

Quick help and contextual information for cooking processes and recipe details.

## Features

- **Quick reference**: Instant help without interrupting workflow
- **Measurement conversions**: Imperial to metric conversions on hover
- **Cooking guidance**: Quick tips for techniques and temperatures
- **Accessibility**: Keyboard navigable with appropriate delays
- **Mobile-friendly**: Touch-friendly with appropriate timing

## Usage

Use tooltips for:
- Measurement unit conversions
- Quick cooking temperature references
- Brief technique explanations
- Equipment identification
- Timing guidance
        `
      }
    }
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

// Measurement conversion tooltip
export const MeasurementConversion: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" className="text-blue-600 underline decoration-dotted">
          350°F
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>175°C / Gas Mark 4</p>
      </TooltipContent>
    </Tooltip>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Quick temperature conversion from Fahrenheit to Celsius and gas mark.'
      }
    }
  }
};

// Cooking technique help
export const CookingTechnique: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" className="text-green-600 gap-1">
          <HelpCircle className="h-3 w-3" />
          fold gently
        </Button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <p>Use a rubber spatula to combine ingredients with a gentle cutting and turning motion, preserving air bubbles</p>
      </TooltipContent>
    </Tooltip>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Brief cooking technique explanation accessible on hover.'
      }
    }
  }
};

// Timing guidance
export const TimingGuidance: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" className="text-orange-600 gap-1">
          <Clock className="h-3 w-3" />
          until golden brown
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Usually takes 8-12 minutes on medium heat</p>
      </TooltipContent>
    </Tooltip>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Timing guidance for visual cooking cues.'
      }
    }
  }
};

// Equipment identification
export const EquipmentHelp: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" className="text-purple-600 underline decoration-dotted">
          mandoline slicer
        </Button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <p>Kitchen tool for uniform thin slicing. Alternative: sharp knife with steady hand</p>
      </TooltipContent>
    </Tooltip>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Equipment identification with simple alternatives.'
      }
    }
  }
};

// Multiple measurement conversions
export const MeasurementGrid: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              <Scale className="h-3 w-3" />
              1 cup flour
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>120g or 4.25 oz</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              <Scale className="h-3 w-3" />
              1 stick butter
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>8 tbsp or 113g or 1/2 cup</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              <Thermometer className="h-3 w-3" />
              Medium heat
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>300-350°F (150-175°C)</p>
          </TooltipContent>
        </Tooltip>
      </div>
      
      <div className="flex flex-wrap gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              <Timer className="h-3 w-3" />
              al dente
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Firm to the bite, usually 1-2 min less than package time</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              <Info className="h-3 w-3" />
              rest the meat
            </Button>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <p>Let cooked meat sit 5-10 min before slicing to redistribute juices</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              <Scale className="h-3 w-3" />
              1 lb
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>454g or 16 oz</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple tooltips showing common cooking conversions and tips.'
      }
    }
  }
};

// Default example
export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Quick cooking tip appears here</p>
      </TooltipContent>
    </Tooltip>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic tooltip structure for recipe-related quick help.'
      }
    }
  }
};