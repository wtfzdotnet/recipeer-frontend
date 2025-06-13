import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Mail, Search } from 'lucide-react';
import { Input } from './Input';

describe('Input', () => {
  it('renders with default props', () => {
    render(<Input placeholder="Test input" />);
    
    const input = screen.getByPlaceholderText('Test input');
    expect(input).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Input label="Email Address" placeholder="Enter email" />);
    
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByText('Email Address')).toBeInTheDocument();
  });

  it('shows required asterisk when required', () => {
    render(<Input label="Required Field" required />);
    
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(<Input label="Email" error="Invalid email address" />);
    
    expect(screen.getByText('Invalid email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true');
  });

  it('displays helper text', () => {
    render(<Input label="Password" helperText="Must be 8+ characters" />);
    
    expect(screen.getByText('Must be 8+ characters')).toBeInTheDocument();
  });

  it('applies error styling when error is present', () => {
    render(<Input error="Error message" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-destructive');
  });

  it('applies disabled state correctly', () => {
    render(<Input disabled />);
    
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('renders start icon', () => {
    render(<Input startIcon={<Mail data-testid="mail-icon" />} />);
    
    expect(screen.getByTestId('mail-icon')).toBeInTheDocument();
  });

  it('renders end icon', () => {
    render(<Input endIcon={<Search data-testid="search-icon" />} />);
    
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  });

  it('applies correct padding when icons are present', () => {
    const { rerender } = render(<Input startIcon={<Mail />} />);
    
    let input = screen.getByRole('textbox');
    expect(input).toHaveClass('pl-10');

    rerender(<Input endIcon={<Search />} />);
    input = screen.getByRole('textbox');
    expect(input).toHaveClass('pr-10');
  });

  it('generates unique id when not provided', () => {
    render(<Input label="Test" />);
    
    const input = screen.getByRole('textbox');
    const label = screen.getByText('Test');
    
    expect(input).toHaveAttribute('id');
    expect(label).toHaveAttribute('for', input.getAttribute('id'));
  });

  it('uses provided id', () => {
    render(<Input label="Test" id="custom-id" />);
    
    const input = screen.getByRole('textbox');
    const label = screen.getByText('Test');
    
    expect(input).toHaveAttribute('id', 'custom-id');
    expect(label).toHaveAttribute('for', 'custom-id');
  });

  it('links error message with aria-describedby', () => {
    render(<Input label="Test" error="Error message" />);
    
    const input = screen.getByRole('textbox');
    const errorId = input.getAttribute('aria-describedby');
    
    expect(errorId).toBeTruthy();
    expect(screen.getByText('Error message')).toHaveAttribute('id', errorId);
  });

  it('links helper text with aria-describedby when no error', () => {
    render(<Input label="Test" helperText="Helper text" />);
    
    const input = screen.getByRole('textbox');
    const helperId = input.getAttribute('aria-describedby');
    
    expect(helperId).toBeTruthy();
    expect(screen.getByText('Helper text')).toHaveAttribute('id', helperId);
  });
});