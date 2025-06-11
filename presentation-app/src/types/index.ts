export interface SlideHeader {
  template: 'cover' | 'content' | 'code';
  title: string;
  image?: string; // for cover slides
}

export interface Slide {
  id: string;
  lectureId: string;
  slideNumber: number;
  template: SlideHeader['template'];
  title: string;
  content: string; // HTML content (empty for cover slides)
  rawContent: string; // Original markdown content
  speakerNotes: string; // Extracted from HTML comments
  language?: string; // Detected from code blocks
  header: SlideHeader;
}

export interface Lecture {
  id: string;
  title: string;
  slides: Slide[];
  currentSlide: number;
}

export interface SocketEvents {
  'slide-change': { slideIndex: number; lectureId: string };
  'sync-request': { clientId: string };
  'sync-response': { currentSlide: number; lectureId: string };
  'lecture-load': { lectureId: string };
  'join-lecture': { lectureId: string; clientType: 'presentation' | 'speaker' };
  'client-connected': { clientId: string; clientType: 'presentation' | 'speaker'; timestamp: number };
  'client-disconnected': { clientId: string; clientType: 'presentation' | 'speaker'; timestamp: number };
  'error': { message: string };
}

export interface PresentationState {
  currentLecture: Lecture | null;
  currentSlideIndex: number;
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface ProcessedSlide extends Slide {
  processedContent?: string;
} 