'use client';

import SpeakerNavigationControls from './SpeakerNavigationControls';
import SpeakerStatusPanel from './SpeakerStatusPanel';

interface SpeakerControlsProps {
    currentSlideIndex: number;
    totalSlides: number;
    isConnected: boolean;
    isPresentationActive: boolean;
    elapsedTime: number;
    onFirstSlide: () => void;
    onPreviousSlide: () => void;
    onNextSlide: () => void;
    onLastSlide: () => void;
    onEndPresentation: () => void;
    onOpenPresentationWindow: () => void;
}

export default function SpeakerControls({
    currentSlideIndex,
    totalSlides,
    isConnected,
    isPresentationActive,
    elapsedTime,
    onFirstSlide,
    onPreviousSlide,
    onNextSlide,
    onLastSlide,
    onEndPresentation,
    onOpenPresentationWindow
}: SpeakerControlsProps) {
    return (
        <div className="flex-1 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Controls</h2>

            <SpeakerNavigationControls
                currentSlideIndex={currentSlideIndex}
                totalSlides={totalSlides}
                onFirstSlide={onFirstSlide}
                onPreviousSlide={onPreviousSlide}
                onNextSlide={onNextSlide}
                onLastSlide={onLastSlide}
            />

            <div className="border-t pt-6">
                <SpeakerStatusPanel
                    isConnected={isConnected}
                    isPresentationActive={isPresentationActive}
                    elapsedTime={elapsedTime}
                    onEndPresentation={onEndPresentation}
                    onOpenPresentationWindow={onOpenPresentationWindow}
                />
            </div>
        </div>
    );
} 