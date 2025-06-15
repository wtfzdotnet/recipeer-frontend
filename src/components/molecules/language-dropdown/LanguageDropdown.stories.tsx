import type { Meta, StoryObj } from '@storybook/react-vite';
import { LocaleProvider } from '@/providers/LocaleProvider';
import { LanguageDropdown } from './language-dropdown';

const meta: Meta<typeof LanguageDropdown> = {
  title: 'Molecules/LanguageDropdown',
  component: LanguageDropdown,
  decorators: [
    (Story) => (
      <LocaleProvider defaultLocale="en-US">
        <Story />
      </LocaleProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A language selection dropdown with flag icons and native language names. Automatically persists the selected language to localStorage and updates the entire application locale. Supports English (US), Dutch (NL), and Arabic (SA) with RTL layout.',
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

export const ArabicRTL: Story = {
  args: {
    className: 'bg-card border-border',
  },
  decorators: [
    (Story) => (
      <div dir="rtl" className="rtl">
        <LocaleProvider defaultLocale="ar-SA">
          <div className="flex items-center gap-4 p-4 bg-background border rounded-lg text-start">
            <span className="text-sm font-medium text-foreground">الإعدادات:</span>
            <Story />
          </div>
        </LocaleProvider>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Language dropdown in Arabic (RTL) layout demonstrating right-to-left text direction and proper layout adaptation.',
      },
    },
  },
};