// Polyfill for window.matchMedia
// This is needed for components that use react-slick or other libraries that depend on matchMedia
const mockMatchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(), // deprecated
  removeListener: jest.fn(), // deprecated
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
});

// Mock the global matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(mockMatchMedia),
});

// Mock the global IntersectionObserver
class MockIntersectionObserver {
  constructor() {
    this.observe = jest.fn();
    this.unobserve = jest.fn();
    this.disconnect = jest.fn();
  }
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

// Mock the global ResizeObserver
class MockResizeObserver {
  constructor() {
    this.observe = jest.fn();
    this.unobserve = jest.fn();
    this.disconnect = jest.fn();
  }
}

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  configurable: true,
  value: MockResizeObserver,
});

// Mock the global requestIdleCallback
Object.defineProperty(window, 'requestIdleCallback', {
  writable: true,
  value: (callback) => {
    return setTimeout(() => callback({ timeRemaining: () => 16.6 }), 0);
  },
});

// Mock the global cancelIdleCallback
Object.defineProperty(window, 'cancelIdleCallback', {
  writable: true,
  value: (id) => {
    clearTimeout(id);
  },
});
