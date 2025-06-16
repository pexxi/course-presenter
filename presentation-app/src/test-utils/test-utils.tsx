import { render as rtlRender } from '@testing-library/react';
import { type ReactElement, useEffect } from 'react';
import { usePresentationStore } from '@/lib/store';
import { type Lecture, type Slide } from '@/types';

type StoreState = ReturnType<typeof usePresentationStore>;
type StoreInitialState = Partial<Omit<StoreState, 'getCurrentSlide' | 'hasNextSlide' | 'hasPreviousSlide' | 'getTotalSlides' | 'getProgress'>>;

type RenderOptions = {
  initialState?: StoreInitialState;
  [key: string]: any;
};

export function render(
  ui: ReactElement,
  { initialState, ...renderOptions }: RenderOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    // Apply any custom initial state
    useEffect(() => {
      if (initialState) {
        usePresentationStore.setState(initialState);
      }
    }, [initialState]);
    
    return <>{children}</>;
  }
  
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';


export const mockSlides = [
  {
    id: 'slide-1',
    content: '# Slide 1\n\nContent for slide 1',
    notes: 'Notes for slide 1',
    media: 'image1.jpg',
  },
  {
    id: 'slide-2',
    content: '# Slide 2\n\nContent for slide 2',
    notes: 'Notes for slide 2',
  },
  {
    id: 'slide-3',
    content: '# Slide 3\n\nContent for slide 3',
    notes: 'Notes for slide 3',
    media: 'image3.jpg',
  },
];

export const mockLecture = {
  id: 'test-lecture',
  title: 'Test Lecture',
  description: 'A test lecture for automated testing',
  slides: mockSlides,
};
