import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Switch } from './Switch';

describe('Switch Component', () => {
  it('renders with label', () => {
    render(<Switch label="Test Switch" />);
    
    expect(screen.getByText('Test Switch')).toBeInTheDocument();
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('shows required indicator when required', () => {
    render(<Switch label="Required Switch" required />);
    
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('displays description', () => {
    render(
      <Switch
        label="Switch with Description"
        description="Toggle this setting on or off"
      />
    );
    
    expect(screen.getByText('Toggle this setting on or off')).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(
      <Switch
        label="Error Switch"
        error="This setting is required"
      />
    );
    
    expect(screen.getByText('This setting is required')).toBeInTheDocument();
  });

  it('can be checked by default', () => {
    render(<Switch label="Checked Switch" defaultChecked />);
    
    const switchElement = screen.getByRole('switch');
    // Radix Switch uses data-state attribute instead of checked property
    expect(switchElement).toHaveAttribute('data-state', 'checked');
  });

  it('can be disabled', () => {
    render(<Switch label="Disabled Switch" disabled />);
    
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeDisabled();
  });
});