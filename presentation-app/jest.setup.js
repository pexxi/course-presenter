import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            push: jest.fn(),
            replace: jest.fn(),
            prefetch: jest.fn(),
            back: jest.fn(),
            forward: jest.fn(),
            refresh: jest.fn(),
        }
    },
    useSearchParams() {
        return new URLSearchParams()
    },
    usePathname() {
        return ''
    },
}))

// Mock window.matchMedia for responsive components
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
})

// Mock BroadcastChannel for tests that might use it
global.BroadcastChannel = jest.fn(() => ({
    postMessage: jest.fn(),
    close: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
}))

// Mock fetch for API tests
global.fetch = jest.fn()

// Setup basic Web API globals for Next.js API testing
const { TextEncoder, TextDecoder } = require('util')
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// Setup URL constructor
global.URL = global.URL || require('url').URL

// Don't override Next.js Request/Response - let Next.js handle them

// Suppress console.error and console.warn in tests unless explicitly needed
const originalError = console.error
const originalWarn = console.warn

beforeEach(() => {
    console.error = jest.fn()
    console.warn = jest.fn()
})

afterEach(() => {
    console.error = originalError
    console.warn = originalWarn
}) 