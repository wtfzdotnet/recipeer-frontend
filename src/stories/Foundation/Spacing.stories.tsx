import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = {
  title: 'Design System/Foundation/Spacing',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Spacing System

Our spacing system is based on a 4px grid system that ensures consistent spacing throughout the application.

## Spacing Scale

All spacing values are based on rem units for accessibility and scalability.
        `
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;

const SpacingSwatch = ({ 
  name, 
  value, 
  pixels,
  className 
}: { 
  name: string; 
  value: string; 
  pixels: string;
  className: string;
}) => (
  <div className="flex items-center space-x-4 p-4 border rounded-lg">
    <div className="flex items-center justify-center w-24 h-16 bg-gray-100 rounded border">
      <div className={`bg-blue-500 ${className}`}></div>
    </div>
    <div className="flex-1">
      <h3 className="font-semibold text-lg">{name}</h3>
      <p className="text-sm text-gray-600 font-mono">{className}</p>
      <p className="text-sm text-gray-500">{value} ({pixels})</p>
    </div>
  </div>
);

export const AllSpacing = {
  render: () => (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-6">Design System Spacing</h1>
        
        <section className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold border-b pb-2">Spacing Scale</h2>
          <div className="space-y-4">
            <SpacingSwatch 
              name="0" 
              value="0rem" 
              pixels="0px"
              className="w-0 h-4"
            />
            <SpacingSwatch 
              name="0.5" 
              value="0.125rem" 
              pixels="2px"
              className="w-0.5 h-4"
            />
            <SpacingSwatch 
              name="1" 
              value="0.25rem" 
              pixels="4px"
              className="w-1 h-4"
            />
            <SpacingSwatch 
              name="1.5" 
              value="0.375rem" 
              pixels="6px"
              className="w-1.5 h-4"
            />
            <SpacingSwatch 
              name="2" 
              value="0.5rem" 
              pixels="8px"
              className="w-2 h-4"
            />
            <SpacingSwatch 
              name="2.5" 
              value="0.625rem" 
              pixels="10px"
              className="w-2.5 h-4"
            />
            <SpacingSwatch 
              name="3" 
              value="0.75rem" 
              pixels="12px"
              className="w-3 h-4"
            />
            <SpacingSwatch 
              name="3.5" 
              value="0.875rem" 
              pixels="14px"
              className="w-3.5 h-4"
            />
            <SpacingSwatch 
              name="4" 
              value="1rem" 
              pixels="16px"
              className="w-4 h-4"
            />
            <SpacingSwatch 
              name="5" 
              value="1.25rem" 
              pixels="20px"
              className="w-5 h-4"
            />
            <SpacingSwatch 
              name="6" 
              value="1.5rem" 
              pixels="24px"
              className="w-6 h-4"
            />
            <SpacingSwatch 
              name="8" 
              value="2rem" 
              pixels="32px"
              className="w-8 h-4"
            />
            <SpacingSwatch 
              name="10" 
              value="2.5rem" 
              pixels="40px"
              className="w-10 h-4"
            />
            <SpacingSwatch 
              name="12" 
              value="3rem" 
              pixels="48px"
              className="w-12 h-4"
            />
            <SpacingSwatch 
              name="16" 
              value="4rem" 
              pixels="64px"
              className="w-16 h-4"
            />
            <SpacingSwatch 
              name="20" 
              value="5rem" 
              pixels="80px"
              className="w-20 h-4"
            />
            <SpacingSwatch 
              name="24" 
              value="6rem" 
              pixels="96px"
              className="w-24 h-4"
            />
          </div>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold border-b pb-2">Usage Guidelines</h2>
          <div className="prose prose-sm max-w-none">
            <h3>Component Spacing</h3>
            <ul>
              <li><strong>Small components:</strong> Use 2-4 (8-16px) for internal padding</li>
              <li><strong>Medium components:</strong> Use 4-6 (16-24px) for internal padding</li>
              <li><strong>Large components:</strong> Use 6-8 (24-32px) for internal padding</li>
            </ul>
            
            <h3>Layout Spacing</h3>
            <ul>
              <li><strong>Related elements:</strong> Use 2-4 (8-16px) between items</li>
              <li><strong>Section separation:</strong> Use 6-8 (24-32px) between sections</li>
              <li><strong>Page margins:</strong> Use 8-12 (32-48px) for page-level spacing</li>
            </ul>

            <h3>Text Spacing</h3>
            <ul>
              <li><strong>Line height:</strong> 1.5-1.8 for body text</li>
              <li><strong>Paragraph spacing:</strong> Use 4-6 (16-24px) between paragraphs</li>
              <li><strong>Letter spacing:</strong> 0.02em for warmth in recipe content</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  }
};