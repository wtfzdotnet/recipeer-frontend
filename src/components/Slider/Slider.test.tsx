import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Slider } from './Slider';

describe('Slider Component', () => {
  it('renders with label', () => {
    render(<Slider label="Test Slider" />);
    
    expect(screen.getByText('Test Slider')).toBeInTheDocument();
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('shows required indicator when required', () => {
    render(<Slider label="Required Slider" required />);
    
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(
      <Slider
        label="Error Slider"
        error="Please select a value"
      />
    );
    
    expect(screen.getByText('Please select a value')).toBeInTheDocument();
  });

  it('displays helper text', () => {
    render(
      <Slider
        label="Helper Slider"
        helperText="Adjust the value as needed"
      />
    );
    
    expect(screen.getByText('Adjust the value as needed')).toBeInTheDocument();
  });

  it('shows current value when enabled', () => {
    render(
      <Slider
        label="Value Slider"
        defaultValue={[75]}
        showValue
      />
    );
    
    expect(screen.getByText('75')).toBeInTheDocument();
  });

  it('formats value with suffix', () => {
    render(
      <Slider
        label="Suffixed Slider"
        defaultValue={[4]}
        valueSuffix=" servings"
        showValue
      />
    );
    
    expect(screen.getByText('4 servings')).toBeInTheDocument();
  });

  it('can be disabled', () => {
    render(<Slider label="Disabled Slider" disabled />);
    
    const slider = screen.getByRole('slider');
    // Radix Slider uses data-disabled attribute instead of the disabled property
    expect(slider).toHaveAttribute('data-disabled');
  });
});