import type { Meta, StoryObj } from '@storybook/react-vite';
import { CurrencySelector } from './currency-selector';
import { LocaleProvider } from '@/providers/LocaleProvider';

// Simple mock function for stories
const fn = () => () => {};

const meta: Meta<typeof CurrencySelector> = {
  title: 'Organisms/CurrencySelector',
  component: CurrencySelector,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An organism-level component for selecting currency with locale-based defaults and manual override capability.',
      },
    },
  },
  decorators: [
    (Story) => (
      <LocaleProvider>
        <Story />
      </LocaleProvider>
    ),
  ],
  argTypes: {
    onCurrencyChange: { action: 'currency-changed' },
    showSymbol: {
      control: 'boolean',
      description: 'Whether to show currency symbol',
    },
    showName: {
      control: 'boolean', 
      description: 'Whether to show currency name',
    },
    className: {
      control: 'text',
      description: 'Custom CSS class',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onCurrencyChange: fn(),
    showSymbol: true,
    showName: true,
  },
};

export const SymbolOnly: Story = {
  args: {
    onCurrencyChange: fn(),
    showSymbol: true,
    showName: false,
  },
};

export const NameOnly: Story = {
  args: {
    onCurrencyChange: fn(),
    showSymbol: false,
    showName: true,
  },
};

export const CustomWidth: Story = {
  args: {
    onCurrencyChange: fn(),
    className: 'w-64',
    showSymbol: true,
    showName: true,
  },
};

export const Interactive: Story = {
  args: {
    onCurrencyChange: (currency) => {
      console.log('Selected currency:', currency);
    },
    showSymbol: true,
    showName: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive currency selector that logs selection changes to console.',
      },
    },
  },
};