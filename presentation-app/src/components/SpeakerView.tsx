"use client";

import ConnectionStatus from "@/components/ConnectionStatus";
import ErrorBoundary from "@/components/ErrorBoundary";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
	SlidePreview,
	SpeakerControls,
	SpeakerNotes,
} from "@/components/speaker";
import { useBroadcast } from "@/lib/broadcast-client";
import { usePresentationManager } from "@/lib/presentation-manager";
import { useSlideStore } from "@/lib/store";
import { getLectureDurationInMinutes } from "@/utils/duration-helpers";
import { useCallback, useEffect, useRef, useState } from "react";

interface SpeakerViewProps {
	lectureId: string;
	courseId: string;
}

export function SpeakerView({ lectureId, courseId }: SpeakerViewProps) {
	const [isConnected, setIsConnected] = useState(false);
	const [presentationStartTime, setPresentationStartTime] =
		useState<Date | null>(null);
	const [elapsedTime, setElapsedTime] = useState(0);
	const [speakerNotesFontSize, setSpeakerNotesFontSize] = useState<
		"small" | "medium" | "large" | "xlarge"
	>("medium");
	const [lectureDurationMinutes, setLectureDurationMinutes] = useState<
		number | undefined
	>(undefined);

	const {
		slides,
		currentSlideIndex,
		isLoading,
		error,
		loadLecture,
		goToSlide,
		getCurrentSlide,
		getTotalSlides,
	} = useSlideStore();

	const { connect, disconnect, emitSlideChange, requestSync } = useBroadcast();
	const {
		endPresentation,
		isPresentationActive,
		focusPresentationWindow,
		openPresentationWindow,
	} = usePresentationManager();

	const isMounted = useRef(true);

	// Memoize the connection change handler
	const handleConnectionChange = useCallback((connected: boolean) => {
		if (isMounted.current) {
			setIsConnected(connected);
		}
	}, []);

	// Memoize the slide change handler
	const handleSlideChange = useCallback((slideIndex: number) => {
		if (isMounted.current) {
			goToSlide(slideIndex);
		}
	}, [goToSlide]);

	// Load lecture and connect socket
	useEffect(() => {
		isMounted.current = true;
		console.log("SpeakerView useEffect triggered for lectureId:", lectureId);

		// Only proceed if we have a valid lectureId
		if (!lectureId) {
			console.warn("No lectureId provided");
			return;
		}

		loadLecture(lectureId, courseId);

		// Load lecture duration
		const loadLectureDuration = async () => {
			try {
				const response = await fetch(`/api/lecture/${courseId}/${lectureId}`);
				if (response.ok) {
					const lectureInfo = await response.json();
					if (lectureInfo?.duration && isMounted.current) {
						setLectureDurationMinutes(getLectureDurationInMinutes(lectureInfo));
					}
				} else {
					console.error("Failed to fetch lecture info:", response.statusText);
				}
			} catch (error) {
				console.error("Failed to load lecture duration:", error);
			}
		};
		loadLectureDuration();

		// Connect to the broadcast channel
		connect({
			lectureId,
			clientType: "speaker",
			onConnectionChange: handleConnectionChange,
			onSlideChange: handleSlideChange,
			onSyncRequest: () => {
				// When a sync request is received, respond with the current slide
				if (isConnected) {
					emitSlideChange(currentSlideIndex);
				}
			},
		});

		// Start presentation timer
		setPresentationStartTime(new Date());

		return () => {
			console.log("SpeakerView cleanup");
			isMounted.current = false;
			disconnect();
		};
	}, [lectureId, courseId, loadLecture, connect, disconnect, handleConnectionChange, handleSlideChange, isConnected, currentSlideIndex]);

	// Update elapsed time every second
	useEffect(() => {
		if (!presentationStartTime) return;

		const interval = setInterval(() => {
			const now = new Date();
			const elapsed = Math.floor(
				(now.getTime() - presentationStartTime.getTime()) / 1000,
			);
			setElapsedTime(elapsed);
		}, 1000);

		return () => clearInterval(interval);
	}, [presentationStartTime]);

	// Navigation handlers that emit changes
	const handleNextSlide = () => {
		const newIndex = Math.min(currentSlideIndex + 1, slides.length - 1);
		if (newIndex !== currentSlideIndex) {
			goToSlide(newIndex);
			emitSlideChange(newIndex);
		}
	};

	const handlePreviousSlide = () => {
		const newIndex = Math.max(currentSlideIndex - 1, 0);
		if (newIndex !== currentSlideIndex) {
			goToSlide(newIndex);
			emitSlideChange(newIndex);
		}
	};

	const handleGoToSlide = (index: number) => {
		if (index >= 0 && index < slides.length && index !== currentSlideIndex) {
			goToSlide(index);
			emitSlideChange(index);
		}
	};

	const handleFirstSlide = () => handleGoToSlide(0);
	const handleLastSlide = () => handleGoToSlide(slides.length - 1);

	const handleEndPresentation = () => {
		const confirmed = window.confirm(
			"Are you sure you want to end the presentation?",
		);
		if (confirmed) {
			endPresentation();
			// Navigate back to home
			window.location.href = "/";
		}
	};

	const handleOpenPresentationWindow = async () => {
		try {
			await openPresentationWindow({
				lectureId,
				courseId,
				onWindowReady: () => {
					console.log("Presentation window reopened and ready");
				},
				onWindowClosed: () => {
					console.log("Presentation window closed");
				},
			});
		} catch (error) {
			console.error("Failed to open presentation window:", error);
			alert(
				"Failed to open presentation window. Please check if popup blockers are disabled.",
			);
		}
	};

	// Font size controls for speaker notes
	const increaseFontSize = () => {
		setSpeakerNotesFontSize((current) => {
			if (current === "small") return "medium";
			if (current === "medium") return "large";
			if (current === "large") return "xlarge";
			return "xlarge";
		});
	};

	const decreaseFontSize = () => {
		setSpeakerNotesFontSize((current) => {
			if (current === "xlarge") return "large";
			if (current === "large") return "medium";
			if (current === "medium") return "small";
			return "small";
		});
	};

	const currentSlide = getCurrentSlide();

	if (isLoading) {
		return (
			<div className="min-h-screen bg-gray-100 flex items-center justify-center">
				<div className="text-center">
					<LoadingSpinner size="lg" />
					<p className="mt-4 text-xl text-gray-600">Loading speaker view...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen bg-gray-100 flex items-center justify-center">
				<div className="text-center max-w-md">
					<div className="text-6xl mb-4">❌</div>
					<h1 className="text-2xl font-bold text-gray-900 mb-4">
						Speaker View Error
					</h1>
					<p className="text-gray-600 mb-6">{error}</p>
					<button
						type="button"
						onClick={() => window.location.reload()}
						className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
					>
						Reload
					</button>
				</div>
			</div>
		);
	}

	return (
		<ErrorBoundary>
			<div className="min-h-screen bg-gray-100">
				{/* Header */}
				<header className="bg-white shadow-sm border-b px-6 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<h1 className="text-xl font-semibold text-gray-900">
								Speaker View - {lectureId}
							</h1>
							<ConnectionStatus isConnected={isConnected} />
						</div>

						{isPresentationActive() && (
							<button
								type="button"
								onClick={focusPresentationWindow}
								className="px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md transition-colors"
							>
								Focus Presentation
							</button>
						)}
					</div>
				</header>

				{/* Main Layout */}
				<div className="flex flex-col h-[calc(100vh-80px)]">
					{/* Top Row: Slide Preview (Left) + Controls (Right) - 50% of screen */}
					<div className="flex flex-1 gap-4 m-4">
						<SlidePreview
							currentSlide={currentSlide}
							currentSlideIndex={currentSlideIndex}
							totalSlides={getTotalSlides()}
						/>

						<SpeakerControls
							currentSlideIndex={currentSlideIndex}
							totalSlides={getTotalSlides()}
							isConnected={isConnected}
							isPresentationActive={isPresentationActive()}
							elapsedTime={elapsedTime}
							lectureDurationMinutes={lectureDurationMinutes}
							onFirstSlide={handleFirstSlide}
							onPreviousSlide={handlePreviousSlide}
							onNextSlide={handleNextSlide}
							onLastSlide={handleLastSlide}
							onEndPresentation={handleEndPresentation}
							onOpenPresentationWindow={handleOpenPresentationWindow}
						/>
					</div>

					{/* Bottom Half: Speaker Notes - 50% of screen */}
					<div className="flex-1 m-4 mt-0">
						<SpeakerNotes
							currentSlide={currentSlide}
							fontSize={speakerNotesFontSize}
							onIncreaseFontSize={increaseFontSize}
							onDecreaseFontSize={decreaseFontSize}
						/>
					</div>
				</div>
			</div>
		</ErrorBoundary>
	);
}
