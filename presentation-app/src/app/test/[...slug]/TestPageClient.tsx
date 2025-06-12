"use client";

import SlideRenderer from "@/components/SlideRenderer";
import { useBroadcast } from "@/lib/broadcast-client";
import { useSlideStore } from "@/lib/store";
import { useEffect, useState } from "react";

interface TestPageClientProps {
	courseId: string;
	lectureId: string;
}

export function TestPageClient({ courseId, lectureId }: TestPageClientProps) {
	const [isConnected, setIsConnected] = useState(false);

	const {
		slides,
		currentSlideIndex,
		isLoading,
		error,
		loadLecture,
		nextSlide,
		previousSlide,
		goToSlide,
		getCurrentSlide,
		hasNextSlide,
		hasPreviousSlide,
		currentLecture,
	} = useSlideStore();

	const { connect, disconnect, emitSlideChange } = useBroadcast();

	// Load lecture when courseId and lectureId are available
	useEffect(() => {
		if (!courseId || !lectureId) return;

		console.log("TestPageClient useEffect triggered for:", {
			courseId,
			lectureId,
		});

		loadLecture(lectureId, courseId);

		connect({
			lectureId,
			clientType: "speaker",
			onConnectionChange: setIsConnected,
		});

		return () => {
			disconnect();
		};
	}, [courseId, lectureId, connect, disconnect, loadLecture]);

	const handleSlideChange = (newIndex: number) => {
		goToSlide(newIndex);
		emitSlideChange(newIndex);
	};

	const handleNext = () => {
		if (hasNextSlide()) {
			const newIndex = currentSlideIndex + 1;
			nextSlide();
			emitSlideChange(newIndex);
		}
	};

	const handlePrevious = () => {
		if (hasPreviousSlide()) {
			const newIndex = currentSlideIndex - 1;
			previousSlide();
			emitSlideChange(newIndex);
		}
	};

	const currentSlide = getCurrentSlide();

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-xl">Loading lecture...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-xl text-red-600">Error: {error}</div>
			</div>
		);
	}

	if (!currentLecture) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-xl">No lecture found</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-100">
			{/* Header */}
			<header className="bg-white shadow-sm border-b">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center py-4">
						<div>
							<h1 className="text-2xl font-bold text-gray-900">Test Page</h1>
							<p className="text-sm text-gray-600">
								Course: {courseId}, Lecture: {lectureId}
							</p>
						</div>

						{/* Connection Status */}
						<div
							className={`px-3 py-1 rounded-full text-sm font-medium ${
								isConnected
									? "bg-green-100 text-green-800"
									: "bg-red-100 text-red-800"
							}`}
						>
							{isConnected ? "Connected" : "Disconnected"}
						</div>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* Slide Preview */}
					<div className="lg:col-span-2">
						<div className="bg-white rounded-lg shadow overflow-hidden">
							<div className="px-4 py-5 sm:p-6">
								<h3 className="text-lg font-medium text-gray-900 mb-4">
									Slide Preview
								</h3>
								{currentSlide && (
									<div className="border rounded-lg overflow-hidden">
										<SlideRenderer slide={currentSlide} isPreview={true} />
									</div>
								)}
							</div>
						</div>
					</div>

					{/* Controls */}
					<div className="space-y-6">
						{/* Navigation Controls */}
						<div className="bg-white rounded-lg shadow overflow-hidden">
							<div className="px-4 py-5 sm:p-6">
								<h3 className="text-lg font-medium text-gray-900 mb-4">
									Navigation
								</h3>

								<div className="space-y-3">
									<div className="flex items-center justify-between">
										<span className="text-sm text-gray-600">
											Slide {currentSlideIndex + 1} of {slides.length}
										</span>
									</div>

									<div className="flex space-x-2">
										<button
											type="button"
											onClick={handlePrevious}
											disabled={!hasPreviousSlide()}
											className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
										>
											Previous
										</button>
										<button
											type="button"
											onClick={handleNext}
											disabled={!hasNextSlide()}
											className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
										>
											Next
										</button>
									</div>
								</div>
							</div>
						</div>

						{/* Slide Thumbnails */}
						<div className="bg-white rounded-lg shadow overflow-hidden">
							<div className="px-4 py-5 sm:p-6">
								<h3 className="text-lg font-medium text-gray-900 mb-4">
									Slides
								</h3>

								<div className="space-y-2 max-h-96 overflow-y-auto">
									{slides.map((slide, index) => (
										<button
											type="button"
											key={slide.id}
											onClick={() => handleSlideChange(index)}
											className={`w-full text-left p-3 rounded-md border transition-colors ${
												index === currentSlideIndex
													? "border-blue-500 bg-blue-50"
													: "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
											}`}
										>
											<div className="text-sm font-medium text-gray-900">
												{index + 1}. {slide.title}
											</div>
											<div className="text-xs text-gray-500 mt-1">
												{slide.template}
											</div>
										</button>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
