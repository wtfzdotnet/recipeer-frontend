import { render } from '@testing-library/react';

// Custom render function that can be extended with providers if needed
export function renderWithProviders(ui, options) {
  return render(ui, options);
}

// Re-export everything from testing-library/react
export * from '@testing-library/react';
export { renderWithProviders as render };