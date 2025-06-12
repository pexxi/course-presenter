import type { Lecture, PresentationState } from "@/types";
import { useCallback } from "react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

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
	getCurrentSlide: () => import("@/types").Slide | null;
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
				set(
					{ currentLecture: lecture, currentSlideIndex: 0, error: null },
					false,
					"setCurrentLecture",
				),

			setCurrentSlideIndex: (index: number) => {
				const { currentLecture } = get();
				if (!currentLecture) return;

				const clampedIndex = Math.max(
					0,
					Math.min(index, currentLecture.slides.length - 1),
				);
				set({ currentSlideIndex: clampedIndex }, false, "setCurrentSlideIndex");
			},

			// Navigation actions
			nextSlide: () => {
				const { currentSlideIndex, currentLecture } = get();
				if (!currentLecture) return;

				if (currentSlideIndex < currentLecture.slides.length - 1) {
					set({ currentSlideIndex: currentSlideIndex + 1 }, false, "nextSlide");
				}
			},

			previousSlide: () => {
				const { currentSlideIndex } = get();
				if (currentSlideIndex > 0) {
					set(
						{ currentSlideIndex: currentSlideIndex - 1 },
						false,
						"previousSlide",
					);
				}
			},

			goToSlide: (index: number) => {
				const { currentLecture } = get();
				if (!currentLecture) return;

				const clampedIndex = Math.max(
					0,
					Math.min(index, currentLecture.slides.length - 1),
				);
				set({ currentSlideIndex: clampedIndex }, false, "goToSlide");
			},

			// Connection and status
			setConnectionStatus: (status: boolean) =>
				set({ isConnected: status }, false, "setConnectionStatus"),

			setLoading: (loading: boolean) =>
				set({ isLoading: loading }, false, "setLoading"),

			setError: (error: string | null) => set({ error }, false, "setError"),

			reset: () => set(initialState, false, "reset"),

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
			name: "presentation-store",
		},
	),
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

	const loadLecture = useCallback(
		async (lectureId: string, courseId: string) => {
			// Prevent multiple concurrent requests
			if (store.isLoading) {
				console.log("Already loading, skipping request");
				return;
			}

			// Check if lecture is already loaded
			if (
				store.currentLecture?.id === lectureId &&
				store.currentLecture?.courseId === courseId
			) {
				console.log("Lecture already loaded, skipping request");
				return;
			}

			store.setLoading(true);
			store.setError(null);

			try {
				console.log(
					`Loading lecture: course ${courseId}, lecture ${lectureId}`,
				);

				// Create AbortController for timeout
				const controller = new AbortController();
				const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

				// Use API route with new courseId/lectureId structure
				const response = await fetch(`/api/slides/${courseId}/${lectureId}`, {
					signal: controller.signal,
					headers: {
						"Content-Type": "application/json",
					},
				});

				clearTimeout(timeoutId);

				console.log(`Response status: ${response.status}`);

				if (!response.ok) {
					const error = await response.json();
					throw new Error(
						error.error || `HTTP ${response.status}: Failed to load lecture`,
					);
				}

				const data = await response.json();
				console.log(
					`Loaded ${data.slides?.length || 0} slides for course ${courseId}, lecture ${lectureId}`,
				);

				const lecture = {
					id: data.lectureId,
					title: data.slides[0]?.title || `Lecture ${data.lectureId}`,
					courseId: data.courseId,
					slides: data.slides,
					currentSlide: 0,
				};

				store.setCurrentLecture(lecture);
			} catch (error) {
				console.error("Error loading lecture:", error);

				let errorMessage = "Failed to load lecture";
				if (error instanceof Error) {
					if (error.name === "AbortError") {
						errorMessage = "Request timed out (10s)";
					} else {
						errorMessage = error.message;
					}
				}

				store.setError(errorMessage);
			} finally {
				store.setLoading(false);
			}
		},
		[store],
	);

	return {
		slides: store.currentLecture?.slides || [],
		currentSlideIndex: store.currentSlideIndex,
		currentLecture: store.currentLecture,
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
