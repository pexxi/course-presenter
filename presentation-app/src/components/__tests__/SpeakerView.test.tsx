import { render, screen, fireEvent, waitFor } from '@/test-utils/test-utils';
import { SpeakerView } from '../SpeakerView';
import { mockSlides, mockLecture } from '@/test-utils/test-utils';

// Mock the BroadcastClient
jest.mock('@/lib/broadcast-client', () => {
  const mockClient = {
    connect: jest.fn().mockResolvedValue(undefined),
    disconnect: jest.fn(),
    isConnectedToBroadcast: jest.fn().mockReturnValue(true),
    on: jest.fn(),
    off: jest.fn(),
    sendMessage: jest.fn(),
    requestSync: jest.fn(),
  };
  return { BroadcastClient: jest.fn(() => mockClient) };
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

describe('SpeakerView', () => {
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
    render(<SpeakerView lectureId="test-lecture" courseId="test-course" />);
    
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });
  });

  it('should display slides after loading', async () => {
    render(<SpeakerView lectureId="test-lecture" courseId="test-course" />);
    
    // Wait for slides to load
    const slideContent = await screen.findByText('Slide 1');
    expect(slideContent).toBeInTheDocument();
    
    // Verify navigation controls
    const nextButton = screen.getByLabelText('Next slide');
    const prevButton = screen.getByLabelText('Previous slide');
    
    expect(prevButton).toBeDisabled();
    expect(nextButton).not.toBeDisabled();
  });

  it('should navigate between slides', async () => {
    render(<SpeakerView lectureId="test-lecture" courseId="test-course" />);
    
    // Wait for slides to load
    await screen.findByText('Slide 1');
    
    const nextButton = screen.getByLabelText('Next slide');
    const prevButton = screen.getByLabelText('Previous slide');
    
    // Go to next slide
    fireEvent.click(nextButton);
    expect(await screen.findByText('Slide 2')).toBeInTheDocument();
    
    // Previous button should now be enabled
    expect(prevButton).not.toBeDisabled();
    
    // Go back to first slide
    fireEvent.click(prevButton);
    expect(await screen.findByText('Slide 1')).toBeInTheDocument();
  });

  it('should handle keyboard navigation', async () => {
    render(<SpeakerView lectureId="test-lecture" courseId="test-course" />);
    
    // Wait for slides to load
    await screen.findByText('Slide 1');
    
    // Test right arrow key
    fireEvent.keyDown(document, { key: 'ArrowRight' });
    expect(await screen.findByText('Slide 2')).toBeInTheDocument();
    
    // Test left arrow key
    fireEvent.keyDown(document, { key: 'ArrowLeft' });
    expect(await screen.findByText('Slide 1')).toBeInTheDocument();
  });

  it('should show notes when available', async () => {
    render(<SpeakerView lectureId="test-lecture" courseId="test-course" />);
    
    // Wait for slides to load
    await screen.findByText('Slide 1');
    
    // Check that notes are displayed
    expect(screen.getByText('Notes for slide 1')).toBeInTheDocument();
  });

  it('should handle connection state changes', async () => {
    const { container } = render(
      <SpeakerView lectureId="test-lecture" courseId="test-course" />
    );
    
    // Wait for initial render
    await screen.findByText('Slide 1');
    
    // Connection status should be shown
    const connectionStatus = container.querySelector('.connection-status');
    expect(connectionStatus).toHaveTextContent('Connected');
  });
});
