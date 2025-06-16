# Testing Guide for Presentation App

This guide covers the comprehensive test suite for the presentation app's API routes and other components.

## Test Structure

The test suite is organized as follows:

```
presentation-app/
├── jest.config.js          # Jest configuration
├── jest.setup.js           # Global test setup
├── src/
│   ├── app/api/            # API route tests
│   │   ├── lecture/[courseId]/[lectureId]/__tests__/
│   │   │   └── route.test.ts
│   │   ├── slides/[...params]/__tests__/
│   │   │   └── route.test.ts
│   │   └── images/[...params]/__tests__/
│   │       └── route.test.ts
│   ├── lib/__tests__/      # Library unit tests
│   └── components/__tests__/ # Component tests
└── tests/e2e/              # End-to-end tests
```

## Test Categories

### 1. API Route Tests

Comprehensive unit tests for all API endpoints:

#### `/api/lecture/[courseId]/[lectureId]`

- ✅ Successful lecture retrieval
- ✅ Missing parameter validation
- ✅ Lecture not found scenarios
- ✅ Error handling
- ✅ Edge cases (special characters, long IDs)

#### `/api/slides/[...params]`

- ✅ Successful slide loading
- ✅ Parameter validation (courseId/lectureId format)
- ✅ Empty slides handling
- ✅ Error handling
- ✅ Large slide sets

#### `/api/images/[...params]`

- ✅ Image serving with proper headers
- ✅ Content-Type detection
- ✅ File validation
- ✅ File system error handling
- ✅ Security (directory traversal protection)
- ✅ Cache headers
- ✅ Multiple image formats

### 2. Library Tests

Unit tests for core library functions in `src/lib/__tests__/`

### 3. Component Tests

React component tests in `src/components/__tests__/`

### 4. End-to-End Tests

Full application flow tests using Playwright

## Running Tests

### All Tests

```bash
npm test
```

### Watch Mode (for development)

```bash
npm run test:watch
```

### Coverage Report

```bash
npm run test:coverage
```

### API Tests Only

```bash
npm run test:api
```

### Unit Tests Only

```bash
npm run test:unit
```

### Component Tests Only

```bash
npm run test:components
```

### End-to-End Tests

```bash
npm run test:e2e
```

### End-to-End Tests with UI

```bash
npm run test:e2e:ui
```

## Test Configuration

### Jest Configuration (`jest.config.js`)

- Uses Next.js Jest configuration
- TypeScript support
- Path mapping for `@/` imports
- Coverage reporting
- JSDOM environment for component tests

### Global Setup (`jest.setup.js`)

- Testing Library DOM matchers
- Next.js router mocking
- Window object mocking
- BroadcastChannel mocking
- Console suppression for clean test output

## Mocking Strategy

### API Route Tests

- **File System Operations**: Mocked using `jest.mock('node:fs')`
- **Library Dependencies**: Mocked at module level
- **Next.js Request/Response**: Using actual Next.js classes for realistic testing

### Key Mocked Modules

- `@/lib/lecture-loader` - Lecture data loading
- `@/lib/slide-loader` - Slide content loading
- `@/utils/image-helpers` - Image validation utilities
- `node:fs` - File system operations

## Test Patterns

### API Route Test Structure

```typescript
describe('API Route Name', () => {
  let request: NextRequest
  let mockContext: { params: Promise<{ [key: string]: any }> }

  beforeEach(() => {
    // Reset mocks and setup default values
  })

  describe('successful requests', () => {
    // Happy path tests
  })

  describe('validation errors', () => {
    // Parameter validation tests
  })

  describe('error handling', () => {
    // Error scenarios and edge cases
  })
})
```

### Assertion Patterns

- **Status Codes**: Always verify HTTP status codes
- **Response Structure**: Validate response JSON structure
- **Mock Interactions**: Verify mocks called with correct parameters
- **Headers**: Check important headers (Content-Type, Cache-Control, etc.)

## Coverage Goals

- **API Routes**: 100% line coverage
- **Critical Path**: 95%+ branch coverage
- **Error Handling**: All error scenarios tested
- **Edge Cases**: Boundary conditions covered

## Common Issues & Solutions

### Module Not Found Errors

If you see module resolution errors:

```bash
# Clear Jest cache
npx jest --clearCache

# Reinstall dependencies
npm ci
```

### Mock Issues

If mocks aren't working correctly:

- Check mock declarations are at the top of the file
- Ensure `jest.clearAllMocks()` is called in `beforeEach`
- Verify mock module paths match actual imports

### Type Errors

For TypeScript type errors in tests:

- Use `as jest.MockedFunction<typeof functionName>` for typed mocks
- Add `as any` for complex mock objects when necessary
- Update `@types/jest` if using newer Jest features

## Writing New Tests

### For New API Routes

1. Create `__tests__` directory in the route folder
2. Follow the established test structure pattern
3. Mock all external dependencies
4. Test all status codes (200, 400, 404, 500)
5. Include edge cases and error scenarios

### For New Components

1. Place tests in `src/components/__tests__/`
2. Use Testing Library for user interactions
3. Mock external dependencies and API calls
4. Test accessibility and responsive behavior

### For New Libraries

1. Place tests in `src/lib/__tests__/`
2. Focus on pure function testing
3. Mock file system and external API calls
4. Test error conditions and edge cases

## Continuous Integration

The test suite is designed to run in CI environments:

- All tests must pass before merging
- Coverage thresholds enforced
- No console warnings or errors allowed
- Tests run on multiple Node.js versions

## Performance Considerations

- Tests run in parallel where possible
- Mocks prevent actual file system access
- Database connections avoided in unit tests
- Test isolation ensures no cross-test dependencies

## Debugging Tests

### Individual Test

```bash
npx jest --testPathPattern="route.test.ts" --verbose
```

### Debug Mode

```bash
npx jest --runInBand --detectOpenHandles --forceExit
```

### Coverage for Specific Files

```bash
npx jest --coverage --collectCoverageFrom="src/app/api/**/*.ts"
```

---

For questions or issues with tests, check the existing test files for patterns and examples.
