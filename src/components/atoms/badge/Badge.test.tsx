import { render, screen } from '@testing-library/react';
import { Badge } from './badge';

describe('Badge', () => {
  it('renders badge content', () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    render(<Badge variant="destructive">Error</Badge>);
    const badge = screen.getByText('Error');
    expect(badge).toHaveClass('bg-destructive');
  });

  it('supports custom className', () => {
    render(<Badge className="custom-class">Test</Badge>);
    const badge = screen.getByText('Test');
    expect(badge).toHaveClass('custom-class');
  });

  it('forwards aria-label', () => {
    render(<Badge aria-label="Status indicator">New</Badge>);
    const badge = screen.getByLabelText('Status indicator');
    expect(badge).toBeInTheDocument();
  });
});