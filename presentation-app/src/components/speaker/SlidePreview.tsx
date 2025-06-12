'use client';

import { Slide } from '@/types';
import SlideRenderer from '@/components/SlideRenderer';

interface SlidePreviewProps {
    currentSlide: Slide | null;
    currentSlideIndex: number;
    totalSlides: number;
}

export default function SlidePreview({
    currentSlide,
    currentSlideIndex,
    totalSlides
}: SlidePreviewProps) {
    return (
        <div className="flex-1 bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Current Slide</h2>
                <div className="text-sm text-gray-500">
                    {currentSlideIndex + 1} / {totalSlides}
                </div>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden bg-white flex items-center justify-center min-h-0 flex-1">
                {currentSlide ? (
                    <SlideRenderer
                        slide={currentSlide}
                        className="w-full"
                        isPreview={true}
                    />
                ) : (
                    <div className="h-full flex items-center justify-center text-gray-500">
                        <div className="text-center">
                            <div className="text-4xl mb-2">📋</div>
                            <p>No slide to display</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
} 