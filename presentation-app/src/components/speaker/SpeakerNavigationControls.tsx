"use client";

interface SpeakerNavigationControlsProps {
	currentSlideIndex: number;
	totalSlides: number;
	onFirstSlide: () => void;
	onPreviousSlide: () => void;
	onNextSlide: () => void;
	onLastSlide: () => void;
}

export default function SpeakerNavigationControls({
	currentSlideIndex,
	totalSlides,
	onFirstSlide,
	onPreviousSlide,
	onNextSlide,
	onLastSlide,
}: SpeakerNavigationControlsProps) {
	return (
		<div className="mb-6">
			<h3 className="text-sm font-medium text-gray-700 mb-3">Navigation</h3>
			<div className="flex items-center gap-2">
				<button
					type="button"
					onClick={onFirstSlide}
					disabled={currentSlideIndex === 0}
					className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 text-gray-700 rounded-md transition-colors"
				>
					First
				</button>
				<button
					type="button"
					onClick={onPreviousSlide}
					disabled={currentSlideIndex === 0}
					className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 text-gray-700 rounded-md transition-colors"
				>
					Previous
				</button>
				<div className="px-4 py-2 text-sm bg-blue-50 text-blue-800 rounded-md font-medium">
					{currentSlideIndex + 1} / {totalSlides}
				</div>
				<button
					type="button"
					onClick={onNextSlide}
					disabled={currentSlideIndex === totalSlides - 1}
					className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 text-gray-700 rounded-md transition-colors"
				>
					Next
				</button>
				<button
					type="button"
					onClick={onLastSlide}
					disabled={currentSlideIndex === totalSlides - 1}
					className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 text-gray-700 rounded-md transition-colors"
				>
					Last
				</button>
			</div>
		</div>
	);
}
