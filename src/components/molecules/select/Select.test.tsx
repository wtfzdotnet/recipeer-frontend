import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Select } from './Select';

describe('Select Component', () => {
  const mockOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  it('renders with label', () => {
    render(
      <Select
        label="Test Select"
        options={mockOptions}
        placeholder="Choose option"
      />
    );
    
    expect(screen.getByText('Test Select')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('shows required indicator when required', () => {
    render(
      <Select
        label="Required Select"
        required
        options={mockOptions}
      />
    );
    
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(
      <Select
        label="Error Select"
        error="This field is required"
        options={mockOptions}
      />
    );
    
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('displays helper text', () => {
    render(
      <Select
        label="Helper Select"
        helperText="Choose your preferred option"
        options={mockOptions}
      />
    );
    
    expect(screen.getByText('Choose your preferred option')).toBeInTheDocument();
  });

  it('renders grouped options', () => {
    const groups = [
      {
        label: 'Group 1',
        options: [
          { value: 'g1o1', label: 'Group 1 Option 1' },
          { value: 'g1o2', label: 'Group 1 Option 2' },
        ]
      }
    ];

    render(
      <Select
        label="Grouped Select"
        groups={groups}
      />
    );
    
    expect(screen.getByText('Grouped Select')).toBeInTheDocument();
  });
});