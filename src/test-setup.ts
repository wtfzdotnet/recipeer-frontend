import '@testing-library/jest-dom';

// Mock matchMedia for tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// Mock ResizeObserver for components that use it (like Slider)
/* eslint-disable no-undef, @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
global.ResizeObserver = global.ResizeObserver || class ResizeObserver {
  constructor(callback: any) {}
  observe() {}
  unobserve() {}
  disconnect() {}
};
/* eslint-enable no-undef, @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
