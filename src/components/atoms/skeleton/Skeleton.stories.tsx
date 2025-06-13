import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from './skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Atoms/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  render: () => <Skeleton variant="text" />,
};

export const Avatar: Story = {
  render: () => <Skeleton variant="avatar" />,
};

export const Button: Story = {
  render: () => <Skeleton variant="button" />,
};

export const Card: Story = {
  render: () => <Skeleton variant="card" />,
};

export const Custom: Story = {
  render: () => <Skeleton className="h-20 w-40 rounded-lg" />,
};