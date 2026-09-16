import '@testing-library/jest-dom/vitest';

class IntersectionObserverMock {
  observe = () => {};
  unobserve = () => {};
  disconnect = () => {};
}

// jsdom does not implement IntersectionObserver; Framer Motion's
// whileInView needs it to exist.
// @ts-expect-error - test-only global assignment
global.IntersectionObserver = IntersectionObserverMock;

if (!window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList;
}
