import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Lecture, PresentationState } from '@/types';

interface PresentationStore extends PresentationState {
  // Actions
  setCurrentLecture: (lecture: Lecture) => void;
  setCurrentSlideIndex: (index: number) => void;
  nextSlide: () => void;
  previousSlide: () => void;
  goToSlide: (index: number) => void;
  setConnectionStatus: (status: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
  
  // Computed getters
  getCurrentSlide: () => import('@/types').Slide | null;
  hasNextSlide: () => boolean;
  hasPreviousSlide: () => boolean;
  getTotalSlides: () => number;
  getProgress: () => number;
}

const initialState: PresentationState = {
  currentLecture: null,
  currentSlideIndex: 0,
  isConnected: false,
  isLoading: false,
  error: null,
};

export const usePresentationStore = create<PresentationStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      // Basic setters
      setCurrentLecture: (lecture: Lecture) => 
        set({ currentLecture: lecture, currentSlideIndex: 0, error: null }, false, 'setCurrentLecture'),

      setCurrentSlideIndex: (index: number) => {
        const { currentLecture } = get();
        if (!currentLecture) return;
        
        const clampedIndex = Math.max(0, Math.min(index, currentLecture.slides.length - 1));
        set({ currentSlideIndex: clampedIndex }, false, 'setCurrentSlideIndex');
      },

      // Navigation actions
      nextSlide: () => {
        const { currentSlideIndex, currentLecture } = get();
        if (!currentLecture) return;
        
        if (currentSlideIndex < currentLecture.slides.length - 1) {
          set({ currentSlideIndex: currentSlideIndex + 1 }, false, 'nextSlide');
        }
      },

      previousSlide: () => {
        const { currentSlideIndex } = get();
        if (currentSlideIndex > 0) {
          set({ currentSlideIndex: currentSlideIndex - 1 }, false, 'previousSlide');
        }
      },

      goToSlide: (index: number) => {
        const { currentLecture } = get();
        if (!currentLecture) return;
        
        const clampedIndex = Math.max(0, Math.min(index, currentLecture.slides.length - 1));
        set({ currentSlideIndex: clampedIndex }, false, 'goToSlide');
      },

      // Connection and status
      setConnectionStatus: (status: boolean) => 
        set({ isConnected: status }, false, 'setConnectionStatus'),

      setLoading: (loading: boolean) => 
        set({ isLoading: loading }, false, 'setLoading'),

      setError: (error: string | null) => 
        set({ error }, false, 'setError'),

      reset: () => 
        set(initialState, false, 'reset'),

      // Computed getters
      getCurrentSlide: () => {
        const { currentLecture, currentSlideIndex } = get();
        if (!currentLecture || !currentLecture.slides.length) return null;
        return currentLecture.slides[currentSlideIndex] || null;
      },

      hasNextSlide: () => {
        const { currentLecture, currentSlideIndex } = get();
        if (!currentLecture) return false;
        return currentSlideIndex < currentLecture.slides.length - 1;
      },

      hasPreviousSlide: () => {
        const { currentSlideIndex } = get();
        return currentSlideIndex > 0;
      },

      getTotalSlides: () => {
        const { currentLecture } = get();
        return currentLecture?.slides.length || 0;
      },

      getProgress: () => {
        const { currentLecture, currentSlideIndex } = get();
        if (!currentLecture || currentLecture.slides.length === 0) return 0;
        return ((currentSlideIndex + 1) / currentLecture.slides.length) * 100;
      },
    }),
    {
      name: 'presentation-store',
    }
  )
);

// Selector hooks for better performance
export const useCurrentSlide = () => 
  usePresentationStore((state) => state.getCurrentSlide());

export const useSlideNavigation = () => 
  usePresentationStore((state) => ({
    currentSlideIndex: state.currentSlideIndex,
    hasNext: state.hasNextSlide(),
    hasPrevious: state.hasPreviousSlide(),
    totalSlides: state.getTotalSlides(),
    progress: state.getProgress(),
    nextSlide: state.nextSlide,
    previousSlide: state.previousSlide,
    goToSlide: state.goToSlide,
  }));

export const useConnectionStatus = () => 
  usePresentationStore((state) => ({
    isConnected: state.isConnected,
    isLoading: state.isLoading,
    error: state.error,
  }));

// Main slide management hook
export const useSlideStore = () => {
  const store = usePresentationStore();
  
  const loadLecture = async (lectureId: string) => {
    store.setLoading(true);
    store.setError(null);
    
    try {
      const { loadLecture: loadLectureData } = await import('@/lib/slide-loader');
      const lecture = await loadLectureData(lectureId);
      
      if (lecture) {
        store.setCurrentLecture(lecture);
      } else {
        store.setError(`Failed to load lecture: ${lectureId}`);
      }
    } catch (error) {
      store.setError(error instanceof Error ? error.message : 'Failed to load lecture');
    } finally {
      store.setLoading(false);
    }
  };

  return {
    slides: store.currentLecture?.slides || [],
    currentSlideIndex: store.currentSlideIndex,
    isLoading: store.isLoading,
    error: store.error,
    loadLecture,
    nextSlide: store.nextSlide,
    previousSlide: store.previousSlide,
    goToSlide: store.goToSlide,
    getCurrentSlide: store.getCurrentSlide,
    hasNextSlide: store.hasNextSlide,
    hasPreviousSlide: store.hasPreviousSlide,
    getTotalSlides: store.getTotalSlides,
    getProgress: store.getProgress,
  };
}; 