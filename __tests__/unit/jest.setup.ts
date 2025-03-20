import '@testing-library/jest-dom';
import { server } from './mocks/server';
import React from 'react';

// Establish API mocking before all tests
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests
afterEach(() => {
  server.resetHandlers();
  // Clean up after each test case (e.g. clearing jsdom)
  jest.clearAllMocks();
});

// Clean up after the tests are finished
afterAll(() => server.close());

// Mock next/router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: {},
      asPath: '',
      push: jest.fn(),
      replace: jest.fn(),
    };
  },
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      refresh: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
    };
  },
  usePathname() {
    return '';
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: function Image(props: any) {
    // eslint-disable-next-line @next/next/no-img-element
    return React.createElement('img', { ...props, alt: props.alt });
  },
}));

// Mock next-auth
jest.mock('next-auth', () => ({
  getServerSession: jest.fn(),
  useSession: () => ({
    data: null,
    status: 'unauthenticated',
  }),
}));

// Mock Supabase client
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(),
}));

// Mock OpenAI client
jest.mock('openai', () => ({
  OpenAI: jest.fn(),
}));

// Mock environment variables
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key';
process.env.OPENAI_API_KEY = 'test-openai-key';
process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000';

// Add custom matchers
expect.extend({
  toHaveBeenCalledWithMatch(received, ...expected) {
    const pass = received.mock.calls.some((call) =>
      expected.every((arg, index) => {
        if (typeof arg === 'object') {
          return Object.entries(arg).every(([key, value]) => call[index][key] === value);
        }
        return call[index] === arg;
      })
    );

    return {
      message: () =>
        `expected ${received.getMockName()} to have been called with matching arguments`,
      pass,
    };
  },
});
