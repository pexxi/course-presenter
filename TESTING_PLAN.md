# Presentation App Testing Plan

## AI-Executable Test Suite

### Setup Instructions for AI Agent

```bash
# Clone the repository and install dependencies
gh repo clone pexxi/course-presenter
cd course-presenter/presentation-app
npm install

# Start the development server in the background
npm run dev &

# Install testing tools
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom
```

## 1. Unit Testing

### 1.1 Test Utilities

#### 1.1.1 Test Data Generator

```typescript
// tests/__mocks__/testData.ts
export const generateMockSlides = (count = 5) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `slide-${i + 1}`,
    content: `## Slide ${i + 1}\n\nContent for slide ${i + 1}`,
    notes: `Notes for slide ${i + 1}`,
    media: i % 2 === 0 ? `image-${i}.jpg` : undefined
  }));
};

export const mockLecture = {
  id: 'test-lecture',
  title: 'Test Lecture',
  description: 'A test lecture for automated testing',
  slides: generateMockSlides()
};
```

#### 1.1.2 Mock BroadcastChannel

```typescript
// tests/__mocks__/mockBroadcastChannel.ts
type MessageHandler = (event: { data: any }) => void;

class MockBroadcastChannel {
  static instances: MockBroadcastChannel[] = [];
  name: string;
  onmessage: MessageHandler | null = null;
  messages: any[] = [];

  constructor(name: string) {
    this.name = name;
    MockBroadcastChannel.instances.push(this);
  }

  postMessage(message: any) {
    this.messages.push(message);
    MockBroadcastChannel.instances
      .filter(channel => channel !== this && channel.name === this.name)
      .forEach(channel => {
        if (channel.onmessage) {
          channel.onmessage({ data: message });
        }
      });
  }

  close() {
    const index = MockBroadcastChannel.instances.indexOf(this);
    if (index > -1) {
      MockBroadcastChannel.instances.splice(index, 1);
    }
  }
}

// @ts-ignore
global.BroadcastChannel = MockBroadcastChannel;

export function clearMockChannels() {
  MockBroadcastChannel.instances = [];
}
```

### 1.2 Broadcast Client Tests

#### 1.2.1 Connection Lifecycle

```typescript
// tests/unit/broadcastClient.test.ts
import { BroadcastClient } from '@/lib/broadcast-client';
import { clearMockChannels } from '../__mocks__/mockBroadcastChannel';

describe('BroadcastClient', () => {
  let client: BroadcastClient;
  
  beforeEach(() => {
    jest.useFakeTimers();
    client = new BroadcastClient();
    clearMockChannels();
  });
  
  afterEach(() => {
    client.disconnect();
    jest.clearAllMocks();
    jest.clearAllTimers();
  });
  
  test('should connect and emit connection event', async () => {
    const onConnect = jest.fn();
    client.on('connectionChange', onConnect);
    
    await client.connect({
      lectureId: 'test-lecture',
      clientType: 'presentation',
      onConnectionChange: jest.fn()
    });
    
    expect(onConnect).toHaveBeenCalledWith(true);
    expect(client.isConnectedToBroadcast()).toBe(true);
  });
});
```

## 2. Component Testing

### 2.1 Test Setup

```typescript
// tests/test-utils.tsx
import { render as rtlRender } from '@testing-library/react';
import { SlideProvider } from '@/context/SlideContext';
import { useSlideStore } from '@/lib/store';

export function render(
  ui: React.ReactElement,
  { initialState, ...options } = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    // Reset store to initial state
    useSlideStore.setState(useSlideStore.getState(), true);
    
    // Apply any custom initial state
    if (initialState) {
      useSlideStore.setState(initialState);
    }
    
    return <SlideProvider>{children}</SlideProvider>;
  }
  
  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

export * from '@testing-library/react';
```

### 2.2 SpeakerView Tests

```typescript
// tests/components/SpeakerView.test.tsx
import { render, screen, fireEvent, waitFor } from '../../test-utils';
import { SpeakerView } from '@/components/SpeakerView';
import { generateMockSlides } from '../__mocks__/testData';

describe('SpeakerView', () => {
  const mockSlides = generateMockSlides(3);
  
  beforeEach(() => {
    // Mock the fetch implementation
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ slides: mockSlides }),
      })
    ) as jest.Mock;
  });

  test('should load and display slides', async () => {
    render(<SpeakerView lectureId="test-lecture" courseId="test-course" />);
    
    // Verify loading state
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    
    // Wait for slides to load
    await waitFor(() => {
      expect(screen.getByText('Slide 1')).toBeInTheDocument();
    });
    
    // Verify navigation controls
    const nextButton = screen.getByLabelText('Next slide');
    const prevButton = screen.getByLabelText('Previous slide');
    
    expect(prevButton).toBeDisabled();
    
    // Navigate to next slide
    fireEvent.click(nextButton);
    await waitFor(() => {
      expect(screen.getByText('Slide 2')).toBeInTheDocument();
    });
    
    // Verify previous button is now enabled
    expect(prevButton).not.toBeDisabled();
  });
});
```

## 3. End-to-End Testing

### 3.1 Test Setup

```bash
# Install Playwright
npm install -D @playwright/test

# Install browsers
npx playwright install
```

### 3.2 Basic Navigation Test

```typescript
// tests/e2e/navigation.spec.ts
import { test, expect } from '@playwright/test';

test.describe('SpeakerView Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/speaker/test-course/test-lecture');
  });

  test('should navigate between slides', async ({ page }) => {
    // Wait for slides to load
    await expect(page.locator('.slide-content')).toBeVisible();
    
    // Initial slide should be 1
    await expect(page.locator('.slide-number')).toContainText('1 / 5');
    
    // Go to next slide
    await page.click('button[aria-label="Next slide"]');
    await expect(page.locator('.slide-number')).toContainText('2 / 5');
    
    // Go to previous slide
    await page.click('button[aria-label="Previous slide"]');
    await expect(page.locator('.slide-number')).toContainText('1 / 5');
  });
});
```

## 4. Running Tests

### 4.1 Test Scripts

Add these to your `package.json`:

```json
{
  "scripts": {
    "test:unit": "jest",
    "test:integration": "jest tests/integration",
    "test:e2e": "playwright test",
    "test:coverage": "jest --coverage",
    "test:watch": "jest --watch"
  }
}
```

### 4.2 CI Configuration

Example GitHub Actions workflow:

```yaml
# .github/workflows/test.yml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      
      - name: Install dependencies
        run: npm ci
        
      - name: Run unit tests
        run: npm run test:unit
        
      - name: Run integration tests
        run: npm run test:integration
        
      - name: Run E2E tests
        run: npx playwright install && npm run test:e2e
```

## 5. Best Practices

### 5.1 Test Organization

- Keep test files next to the code they test
- Use descriptive test names
- Group related tests with `describe`
- Keep tests focused and independent
- Mock external dependencies

### 5.2 Writing Maintainable Tests

- Follow the Arrange-Act-Assert pattern
- Use test data factories for complex objects
- Prefer testing behavior over implementation details
- Keep tests DRY (Don't Repeat Yourself)
- Use TypeScript for type safety in tests
