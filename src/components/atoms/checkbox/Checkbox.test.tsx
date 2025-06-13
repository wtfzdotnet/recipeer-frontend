import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Checkbox } from './Checkbox';

describe('Checkbox Component', () => {
  it('renders with label', () => {
    render(<Checkbox label="Test Checkbox" />);
    
    expect(screen.getByText('Test Checkbox')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('shows required indicator when required', () => {
    render(<Checkbox label="Required Checkbox" required />);
    
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(
      <Checkbox
        label="Error Checkbox"
        error="This field is required"
      />
    );
    
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('displays helper text', () => {
    render(
      <Checkbox
        label="Helper Checkbox"
        helperText="Check this option if applicable"
      />
    );
    
    expect(screen.getByText('Check this option if applicable')).toBeInTheDocument();
  });

  it('can be checked by default', () => {
    render(<Checkbox label="Checked Checkbox" defaultChecked />);
    
    const checkbox = screen.getByRole('checkbox');
    // Radix Checkbox uses data-state attribute instead of checked property
    expect(checkbox).toHaveAttribute('data-state', 'checked');
  });

  it('can be disabled', () => {
    render(<Checkbox label="Disabled Checkbox" disabled />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });
});