import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Textarea } from './Textarea';

describe('Textarea Component', () => {
  it('renders with label', () => {
    render(<Textarea label="Test Textarea" />);
    
    expect(screen.getByText('Test Textarea')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('shows required indicator when required', () => {
    render(<Textarea label="Required Textarea" required />);
    
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(
      <Textarea
        label="Error Textarea"
        error="This field is required"
      />
    );
    
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('displays helper text', () => {
    render(
      <Textarea
        label="Helper Textarea"
        helperText="Enter your comments here"
      />
    );
    
    expect(screen.getByText('Enter your comments here')).toBeInTheDocument();
  });

  it('shows character count when enabled', () => {
    render(
      <Textarea
        label="Counted Textarea"
        showCharacterCount
        maxLength={100}
      />
    );
    
    // Check that character count is displayed, starting at 0
    expect(screen.getByText('0/100')).toBeInTheDocument();
  });

  it('can be disabled', () => {
    render(<Textarea label="Disabled Textarea" disabled />);
    
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeDisabled();
  });

  it('applies maxLength correctly', () => {
    render(<Textarea label="Limited Textarea" maxLength={50} />);
    
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(textarea.maxLength).toBe(50);
  });
});