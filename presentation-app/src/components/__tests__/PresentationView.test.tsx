import { render, screen, fireEvent, waitFor } from '@/test-utils/test-utils';
import { PresentationView } from '../PresentationView';
import { mockSlides } from '@/test-utils/test-utils';

// Mock the BroadcastClient
const mockConnect = jest.fn().mockResolvedValue(undefined);
const mockDisconnect = jest.fn();
const mockIsConnected = jest.fn().mockReturnValue(true);
const mockOn = jest.fn();
const mockOff = jest.fn();
const mockSendMessage = jest.fn();
const mockRequestSync = jest.fn();
const mockTriggerSyncResponse = jest.fn();

jest.mock('@/lib/broadcast-client', () => {
  // Create mock implementation for useBroadcast
  const mockUseBroadcast = jest.fn().mockImplementation(() => ({
    connect: mockConnect,
    disconnect: mockDisconnect,
    requestSync: mockRequestSync,
  }));

  return {
    BroadcastClient: jest.fn().mockImplementation(() => ({
      connect: mockConnect,
      disconnect: mockDisconnect,
      isConnectedToBroadcast: mockIsConnected,
      on: mockOn.mockImplementation((event, callback) => {
        if (event === 'syncResponse') {
          mockTriggerSyncResponse.mockImplementation(callback);
        }
        return () => {};
      }),
      off: mockOff,
      sendMessage: mockSendMessage,
      requestSync: mockRequestSync,
    })),
    useBroadcast: mockUseBroadcast,
  };
});

// Mock next/router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    };
  },
  useSearchParams() {
    return {
      get: jest.fn().mockReturnValue('test-lecture'),
    };
  },
}));

describe('PresentationView', () => {
  const mockFetch = jest.fn();
  
  beforeEach(() => {
    global.fetch = mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ slides: mockSlides }),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading state initially', async () => {
    render(<PresentationView lectureId="test-lecture" courseId="test-course" />);
    
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });
  });

  it('should display current slide in fullscreen mode', async () => {
    render(<PresentationView lectureId="test-lecture" courseId="test-course" />);
    
    // Wait for slides to load
    const slideContent = await screen.findByText('Slide 1');
    expect(slideContent).toBeInTheDocument();
    
    // Verify it's in fullscreen mode
    expect(screen.getByRole('presentation')).toHaveClass('fullscreen');
  });

  it('should handle keyboard navigation', async () => {
    render(<PresentationView lectureId="test-lecture" courseId="test-course" />);
    
    // Wait for slides to load
    await screen.findByText('Slide 1');
    
    // Test right arrow key
    fireEvent.keyDown(document, { key: 'ArrowRight' });
    expect(await screen.findByText('Slide 2')).toBeInTheDocument();
    
    // Test left arrow key
    fireEvent.keyDown(document, { key: 'ArrowLeft' });
    expect(await screen.findByText('Slide 1')).toBeInTheDocument();
    
    // Test space key
    fireEvent.keyDown(document, { key: ' ' });
    expect(await screen.findByText('Slide 2')).toBeInTheDocument();
    
    // Test backspace key
    fireEvent.keyDown(document, { key: 'Backspace' });
    expect(await screen.findByText('Slide 1')).toBeInTheDocument();
  });

  it('should handle touch events for navigation', async () => {
    render(<PresentationView lectureId="test-lecture" courseId="test-course" />);
    
    // Wait for slides to load
    await screen.findByText('Slide 1');
    
    // Test swipe left
    const presentation = screen.getByRole('presentation');
    fireEvent.touchStart(presentation, { touches: [{ clientX: 100 }] });
    fireEvent.touchEnd(presentation, { changedTouches: [{ clientX: 0 }] });
    
    expect(await screen.findByText('Slide 2')).toBeInTheDocument();
    
    // Test swipe right
    fireEvent.touchStart(presentation, { touches: [{ clientX: 0 }] });
    fireEvent.touchEnd(presentation, { changedTouches: [{ clientX: 100 }] });
    
    expect(await screen.findByText('Slide 1')).toBeInTheDocument();
  });

  it('should sync with speaker view', async () => {
    const { container } = render(
      <PresentationView lectureId="test-lecture" courseId="test-course" />
    );
    
    // Wait for initial render
    await screen.findByText('Slide 1');
    
    // Connection status should be shown
    const connectionStatus = container.querySelector('.connection-status');
    expect(connectionStatus).toHaveTextContent('Connected');
    
    // Simulate receiving a sync response
    const syncResponse = {
      currentSlideIndex: 2,
      timestamp: Date.now()
    };
    
    // Find the sync response handler and call it
    const syncHandler = mockOn.mock.calls.find(
      (call: [string, any]) => call[0] === 'syncResponse'
    )?.[1];
    
    if (syncHandler) {
      syncHandler(syncResponse);
    }
    
    // Should have navigated to slide 3
    expect(await screen.findByText('Slide 3')).toBeInTheDocument();
  });

  it('should handle escape key to exit fullscreen', async () => {
    const mockExitFullscreen = jest.fn();
    
    // Mock document.exitFullscreen
    Object.defineProperty(document, 'exitFullscreen', {
      value: mockExitFullscreen,
      writable: true,
    });
    
    render(<PresentationView lectureId="test-lecture" courseId="test-course" />);
    
    // Wait for slides to load
    await screen.findByText('Slide 1');
    
    // Press escape key
    fireEvent.keyDown(document, { key: 'Escape' });
    
    // Should try to exit fullscreen
    expect(mockExitFullscreen).toHaveBeenCalled();
  });
});
