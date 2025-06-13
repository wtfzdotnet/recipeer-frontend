import '@testing-library/jest-dom';

// Mock ResizeObserver for components that use it (like Slider)
global.ResizeObserver = global.ResizeObserver || class ResizeObserver {
  constructor(callback: any) {}
  observe() {}
  unobserve() {}
  disconnect() {}
};