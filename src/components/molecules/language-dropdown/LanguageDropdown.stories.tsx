import type { Meta, StoryObj } from '@storybook/react-vite';
import { LanguageDropdown } from './language-dropdown';

const meta: Meta<typeof LanguageDropdown> = {
  title: 'Molecules/LanguageDropdown',
  component: LanguageDropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A language selection dropdown with flag icons and native language names. Automatically persists the selected language to localStorage and updates the entire application locale.',
      },
    },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    'aria-label': {
      control: 'text',
      description: 'ARIA label for accessibility',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Default language dropdown with standard styling.',
      },
    },
  },
};

export const CustomWidth: Story = {
  args: {
    className: 'w-40',
  },
  parameters: {
    docs: {
      description: {
        story: 'Language dropdown with custom width applied.',
      },
    },
  },
};

export const WithAriaLabel: Story = {
  args: {
    'aria-label': 'Choose application language',
  },
  parameters: {
    docs: {
      description: {
        story: 'Language dropdown with custom accessibility label.',
      },
    },
  },
};

export const InToolbar: Story = {
  args: {
    className: 'bg-card border-border',
  },
  render: (args) => (
    <div className="flex items-center gap-4 p-4 bg-background border rounded-lg">
      <span className="text-sm font-medium text-foreground">Settings:</span>
      <LanguageDropdown {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Language dropdown integrated into a toolbar or settings area.',
      },
    },
  },
};