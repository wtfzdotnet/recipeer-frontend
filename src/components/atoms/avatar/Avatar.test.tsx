import { render, screen } from '@testing-library/react';
import { Avatar } from './avatar';

describe('Avatar', () => {
  it('renders with image source', () => {
    render(<Avatar src="/test.jpg" alt="Test User" fallback="TU" />);
    const image = screen.getByRole('img', { name: 'Test User' });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test.jpg');
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

  it('supports custom className', () => {
    render(<Avatar fallback="CC" className="border-red-500" />);
    expect(screen.getByText('CC').parentElement).toHaveClass('border-red-500');
  });
});