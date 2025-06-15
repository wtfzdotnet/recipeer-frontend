import { screen } from '@testing-library/react';
import { render } from '@/test-utils';
import { LanguageDropdown } from './language-dropdown';

describe('LanguageDropdown', () => {
  it('renders language dropdown with default selection', async () => {
    render(<LanguageDropdown />);
    
    // Check if the dropdown trigger is present
    const trigger = screen.getByRole('combobox');
    expect(trigger).toBeInTheDocument();
    
    // Check if it shows English (United States) as default
    expect(screen.getByText('English (United States)')).toBeInTheDocument();
    
    // Check if globe icon is present
    const globeIcon = document.querySelector('.lucide-globe');
    expect(globeIcon).toBeInTheDocument();
  });

  it('renders with flag emoji', () => {
    render(<LanguageDropdown />);
    
    // Check if US flag emoji is present for default English (United States)
    const flagElements = screen.getAllByLabelText('English (United States)');
    expect(flagElements[0]).toBeInTheDocument();
    expect(flagElements[0]).toHaveTextContent('🇺🇸');
  });

  it('applies custom className', () => {
    render(<LanguageDropdown className="custom-class" />);
    
    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveClass('custom-class');
  });

  it('has proper accessibility attributes', () => {
    render(<LanguageDropdown />);
    
    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveAttribute('aria-autocomplete', 'none');
  });
});