import type { Meta, StoryObj } from '@storybook/react-vite'
// Simple mock function for stories
const fn = () => () => {};
import { DatePicker } from './date-picker'
import { useState } from 'react'

const meta: Meta<typeof DatePicker> = {
  title: 'UI/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    date: { control: false },
    onDateChange: { action: 'dateChanged' },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no date is selected',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the date picker is disabled',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Interactive wrapper for controlled date state
const DatePickerWithState = (args: typeof Default.args) => {
  const [date, setDate] = useState<Date | undefined>(args.date)
  
  return (
    <div className="w-80">
      <DatePicker
        {...args}
        date={date}
        onDateChange={(newDate) => {
          setDate(newDate)
          args.onDateChange?.(newDate)
        }}
      />
    </div>
  )
}

export const Default: Story = {
  args: {
    placeholder: 'Pick a date',
    onDateChange: fn(),
  },
  render: DatePickerWithState,
}

export const WithSelectedDate: Story = {
  args: {
    date: new Date('2024-06-15'),
    placeholder: 'Pick a date',
    onDateChange: fn(),
  },
  render: DatePickerWithState,
}

export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'Select your birthday',
    onDateChange: fn(),
  },
  render: DatePickerWithState,
}

export const Disabled: Story = {
  args: {
    date: new Date('2024-06-15'),
    placeholder: 'Pick a date',
    disabled: true,
    onDateChange: fn(),
  },
  render: DatePickerWithState,
}

export const ForMealPlanning: Story = {
  args: {
    placeholder: 'Choose meal date',
    onDateChange: fn(),
  },
  render: DatePickerWithState,
  parameters: {
    docs: {
      description: {
        story: 'Date picker styled for meal planning workflows.',
      },
    },
  },
}

export const WithCustomStyling: Story = {
  args: {
    placeholder: 'Pick a date',
    className: 'border-primary',
    onDateChange: fn(),
  },
  render: DatePickerWithState,
  parameters: {
    docs: {
      description: {
        story: 'Date picker with custom styling applied.',
      },
    },
  },
}

export const Interactive: Story = {
  args: {
    placeholder: 'Pick a date',
    onDateChange: (date) => {
      console.log('Selected date:', date)
    },
  },
  render: DatePickerWithState,
  parameters: {
    docs: {
      description: {
        story: 'Interactive date picker with console logging. Open browser console to see date changes.',
      },
    },
  },
}