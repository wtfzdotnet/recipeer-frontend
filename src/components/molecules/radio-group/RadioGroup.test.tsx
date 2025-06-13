import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RadioGroup } from './RadioGroup';

describe('RadioGroup Component', () => {
  const mockOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  it('renders with label', () => {
    render(
      <RadioGroup
        label="Test Radio Group"
        options={mockOptions}
      />
    );
    
    expect(screen.getByText('Test Radio Group')).toBeInTheDocument();
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });

  it('renders all options', () => {
    render(
      <RadioGroup
        label="Options"
        options={mockOptions}
      />
    );
    
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('shows required indicator when required', () => {
    render(
      <RadioGroup
        label="Required Radio Group"
        required
        options={mockOptions}
      />
    );
    
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(
      <RadioGroup
        label="Error Radio Group"
        error="Please select an option"
        options={mockOptions}
      />
    );
    
    expect(screen.getByText('Please select an option')).toBeInTheDocument();
  });

  it('displays helper text', () => {
    render(
      <RadioGroup
        label="Helper Radio Group"
        helperText="Choose one option"
        options={mockOptions}
      />
    );
    
    expect(screen.getByText('Choose one option')).toBeInTheDocument();
  });

  it('can be disabled', () => {
    render(
      <RadioGroup
        label="Disabled Radio Group"
        disabled
        options={mockOptions}
      />
    );
    
    const radioButtons = screen.getAllByRole('radio');
    radioButtons.forEach(radio => {
      expect(radio).toBeDisabled();
    });
  });
});