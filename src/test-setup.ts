import '@testing-library/jest-dom';

// Mock ResizeObserver for components that use it (like Slider)
/* eslint-disable no-undef, @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
global.ResizeObserver = global.ResizeObserver || class ResizeObserver {
  constructor(callback: any) {}
  observe() {}
  unobserve() {}
  disconnect() {}
};
/* eslint-enable no-undef, @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */