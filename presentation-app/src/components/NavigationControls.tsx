"use client";

import {
	ChevronLeftIcon,
	ChevronRightIcon,
	PauseIcon,
	PlayIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

interface NavigationControlsProps {
	currentSlide: number;
	totalSlides: number;
	onPrevious: () => void;
	onNext: () => void;
	onGoToSlide: (slideNumber: number) => void;
	isPlaying?: boolean;
	onPlayPause?: () => void;
	className?: string;
}

export default function NavigationControls({
	currentSlide,
	totalSlides,
	onPrevious,
	onNext,
	onGoToSlide,
	isPlaying = false,
	onPlayPause,
	className = "",
}: NavigationControlsProps) {
	const [showSlideInput, setShowSlideInput] = useState(false);
	const [slideInput, setSlideInput] = useState("");

	// Keyboard navigation
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			// Don't handle keyboard events if user is typing in an input
			if (event.target instanceof HTMLInputElement) return;

			switch (event.key) {
				case "ArrowLeft":
				case "ArrowUp":
					event.preventDefault();
					onPrevious();
					break;
				case "ArrowRight":
				case "ArrowDown":
				case " ":
					event.preventDefault();
					onNext();
					break;
				case "Home":
					event.preventDefault();
					onGoToSlide(1);
					break;
				case "End":
					event.preventDefault();
					onGoToSlide(totalSlides);
					break;
				case "g":
					if (event.ctrlKey || event.metaKey) {
						event.preventDefault();
						setShowSlideInput(true);
					}
					break;
				case "Escape":
					setShowSlideInput(false);
					break;
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [onPrevious, onNext, onGoToSlide, totalSlides]);

	const handleSlideInputSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const slideNumber = Number.parseInt(slideInput);
		if (slideNumber >= 1 && slideNumber <= totalSlides) {
			onGoToSlide(slideNumber);
		}
		setSlideInput("");
		setShowSlideInput(false);
	};

	const canGoPrevious = currentSlide > 1;
	const canGoNext = currentSlide < totalSlides;

	return (
		<div className={`flex items-center gap-4 ${className}`}>
			{/* Go to slide input */}
			{showSlideInput && (
				<form
					onSubmit={handleSlideInputSubmit}
					className="flex items-center gap-2"
				>
					<span className="text-sm text-gray-600">Go to slide:</span>
					<input
						type="number"
						min="1"
						max={totalSlides}
						value={slideInput}
						onChange={(e) => setSlideInput(e.target.value)}
						className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
						placeholder={currentSlide.toString()}
					/>
					<button
						type="submit"
						className="px-2 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
					>
						Go
					</button>
					<button
						type="button"
						onClick={() => setShowSlideInput(false)}
						className="px-2 py-1 text-gray-500 text-sm hover:text-gray-700"
					>
						Cancel
					</button>
				</form>
			)}

			{!showSlideInput && (
				<>
					{/* Previous Button */}
					<button
						type="button"
						onClick={onPrevious}
						disabled={!canGoPrevious}
						className={`
              flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors
              ${
								canGoPrevious
									? "bg-gray-600 hover:bg-gray-700 text-white"
									: "bg-gray-300 text-gray-500 cursor-not-allowed"
							}
            `}
					>
						<ChevronLeftIcon className="w-4 h-4" />
						Previous
					</button>

					{/* Slide Counter */}
					<div className="flex items-center gap-2">
						<span className="text-sm text-gray-600">Slide</span>
						<button
							type="button"
							onClick={() => setShowSlideInput(true)}
							className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-mono"
							title="Click to go to specific slide (Ctrl+G)"
						>
							{currentSlide} / {totalSlides}
						</button>
					</div>

					{/* Next Button */}
					<button
						type="button"
						onClick={onNext}
						disabled={!canGoNext}
						className={`
              flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors
              ${
								canGoNext
									? "bg-blue-600 hover:bg-blue-700 text-white"
									: "bg-gray-300 text-gray-500 cursor-not-allowed"
							}
            `}
					>
						Next
						<ChevronRightIcon className="w-4 h-4" />
					</button>

					{/* Play/Pause Button (optional) */}
					{onPlayPause && (
						<button
							type="button"
							onClick={onPlayPause}
							className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors"
							title={isPlaying ? "Pause slideshow" : "Start slideshow"}
						>
							{isPlaying ? (
								<>
									<PauseIcon className="w-4 h-4" />
									Pause
								</>
							) : (
								<>
									<PlayIcon className="w-4 h-4" />
									Play
								</>
							)}
						</button>
					)}
				</>
			)}

			{/* Keyboard shortcuts help */}
			<div className="hidden md:block text-xs text-gray-500">
				<div>← → Space: Navigate</div>
				<div>Ctrl+G: Go to slide</div>
			</div>
		</div>
	);
}
