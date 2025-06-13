import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Avatar } from './avatar';

describe('Avatar', () => {
  it('renders fallback when src is provided but image may not load', () => {
    render(<Avatar src="/test.jpg" alt="Test User" fallback="TU" />);
    
    // Since we can't guarantee image loading in tests, we check for fallback
    // The Avatar component should render both AvatarImage and AvatarFallback
    // The fallback will be shown if the image fails to load
    expect(screen.getByText('TU')).toBeInTheDocument();
  });

  it('shows fallback when no src provided', () => {
    render(<Avatar fallback="AB" />);
    expect(screen.getByText('AB')).toBeInTheDocument();
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<Avatar fallback="SM" size="sm" />);
    expect(screen.getByText('SM').parentElement).toHaveClass('h-8', 'w-8');

    rerender(<Avatar fallback="LG" size="lg" />);
    expect(screen.getByText('LG').parentElement).toHaveClass('h-12', 'w-12');
  });

  it('generates fallback from alt text', () => {
    render(<Avatar alt="John Doe" />);
    expect(screen.getByText('JO')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Avatar fallback="CC" className="border-red-500" />);
    expect(screen.getByText('CC').parentElement).toHaveClass('border-red-500');
  });

  it('applies custom className', () => {
    render(<Avatar fallback="CC" className="border-red-500" />);
    expect(screen.getByText('CC').parentElement).toHaveClass('border-red-500');
  });
});