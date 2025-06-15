import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/atoms/button';

const meta: Meta<typeof Button> = {
  title: 'Debug/ButtonColorTest',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ColorDiagnostic: Story = {
  render: () => {
    // Get computed CSS variables
    const getCSSVariable = (name: string) => {
      if (typeof window !== 'undefined') {
        return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
      }
      return 'N/A';
    };

    return (
      <div className="p-8 space-y-6">
        <h2 className="text-xl font-bold">Button Color Diagnostic</h2>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Expected Buttons</h3>
          <div className="flex gap-4 flex-wrap">
            <Button variant="default">Default Button (Should be Orange)</Button>
            <Button variant="destructive">Destructive Button (Should be Red)</Button>
            <Button variant="secondary">Secondary Button</Button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">CSS Variable Debug</h3>
          <div className="bg-muted p-4 rounded font-mono text-sm">
            <div>--primary: {getCSSVariable('--primary')}</div>
            <div>--primary-foreground: {getCSSVariable('--primary-foreground')}</div>
            <div>--background: {getCSSVariable('--background')}</div>
            <div>--foreground: {getCSSVariable('--foreground')}</div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Raw CSS Test</h3>
          <div className="flex gap-4">
            <button 
              style={{ 
                backgroundColor: 'var(--primary)', 
                color: 'var(--primary-foreground)',
                padding: '0.5rem 1rem',
                border: 'none',
                borderRadius: '0.375rem',
                fontWeight: '500'
              }}
            >
              Raw CSS Button with var(--primary)
            </button>
            <button 
              style={{ 
                backgroundColor: '#d97706', 
                color: '#ffffff',
                padding: '0.5rem 1rem',
                border: 'none',
                borderRadius: '0.375rem',
                fontWeight: '500'
              }}
            >
              Hardcoded Orange Button (#d97706)
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Tailwind Classes Test</h3>
          <div className="flex gap-4">
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium">
              bg-primary Button
            </button>
            <div className="w-16 h-16 bg-primary rounded border-2 border-foreground"></div>
            <div className="text-xs">
              bg-primary swatch
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const ThemeToggleTest: Story = {
  render: () => (
    <div className="p-8 space-y-6">
      <h2 className="text-xl font-bold">Theme Toggle Test</h2>
      
      <div className="space-y-4">
        <Button variant="default">Button in Current Theme</Button>
        
        <div className="text-sm bg-muted p-4 rounded">
          <p>Toggle between light and dark theme using the theme toggle in the toolbar.</p>
          <p>The button color should change appropriately:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Light mode: Orange background (#d97706)</li>
            <li>Dark mode: Orange background (#f97316)</li>
          </ul>
        </div>
      </div>
    </div>
  ),
};