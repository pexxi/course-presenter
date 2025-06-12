'use client'

import { useEffect, useState } from 'react'
import { useSlideStore } from '@/lib/store'
import { useBroadcast } from '@/lib/broadcast-client'
import { usePresentationManager } from '@/lib/presentation-manager'
import SlideRenderer from '@/components/SlideRenderer'
import NavigationControls from '@/components/NavigationControls'
import ConnectionStatus from '@/components/ConnectionStatus'
import LoadingSpinner from '@/components/LoadingSpinner'
import ErrorBoundary from '@/components/ErrorBoundary'

interface SpeakerViewProps {
    lectureId: string;
}

export function SpeakerView({ lectureId }: SpeakerViewProps) {
    const [isConnected, setIsConnected] = useState(false);
    const [presentationStartTime, setPresentationStartTime] = useState<Date | null>(null);
    const [elapsedTime, setElapsedTime] = useState(0);

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
        getTotalSlides,
        getProgress
    } = useSlideStore();

    const { connect, disconnect, emitSlideChange } = useBroadcast();
    const { endPresentation, isPresentationActive, focusPresentationWindow } = usePresentationManager();

    // Load lecture and connect socket
    useEffect(() => {
        console.log('SpeakerView useEffect triggered for lectureId:', lectureId);

        // Only proceed if we have a valid lectureId
        if (!lectureId) {
            console.warn('No lectureId provided');
            return;
        }

        loadLecture(lectureId);

        connect({
            lectureId,
            clientType: 'speaker',
            onConnectionChange: setIsConnected,
            onSlideChange: (slideIndex: number) => {
                // Update local state when other clients change slides
                goToSlide(slideIndex);
            }
        });

        // Start presentation timer
        setPresentationStartTime(new Date());

        return () => {
            console.log('SpeakerView cleanup');
            disconnect();
        };
    }, [lectureId]); // Remove loadLecture, connect, disconnect, goToSlide from dependencies

    // Update elapsed time every second
    useEffect(() => {
        if (!presentationStartTime) return;

        const interval = setInterval(() => {
            const now = new Date();
            const elapsed = Math.floor((now.getTime() - presentationStartTime.getTime()) / 1000);
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

    const handleEndPresentation = () => {
        const confirmed = window.confirm('Are you sure you want to end the presentation?');
        if (confirmed) {
            endPresentation();
            // Navigate back to home
            window.location.href = '/';
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Speaker View Error</h1>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
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

                        <div className="flex items-center gap-4">
                            <div className="text-sm text-gray-600">
                                Time: {formatTime(elapsedTime)}
                            </div>

                            {isPresentationActive() && (
                                <button
                                    onClick={focusPresentationWindow}
                                    className="px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md transition-colors"
                                >
                                    Focus Presentation
                                </button>
                            )}

                            <button
                                onClick={handleEndPresentation}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition-colors"
                            >
                                End Presentation
                            </button>
                        </div>
                    </div>
                </header>

                {/* Main Layout: 50% slide preview, 25% notes, 25% controls */}
                <div className="flex flex-col h-[calc(100vh-80px)]">
                    {/* Slide Preview Area (50%) */}
                    <div className="flex-1 bg-white m-4 rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-medium text-gray-900">Current Slide</h2>
                            <div className="text-sm text-gray-500">
                                {currentSlideIndex + 1} / {getTotalSlides()}
                            </div>
                        </div>

                        <div className="h-full max-h-[calc(100%-3rem)] border border-gray-200 rounded-lg overflow-hidden bg-white">
                            {currentSlide ? (
                                <SlideRenderer
                                    slide={currentSlide}
                                    className="w-full h-full"
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

                    {/* Bottom Half: Notes and Controls (25% each) */}
                    <div className="flex flex-1 gap-4 mx-4 mb-4">
                        {/* Speaker Notes (25% of total screen) */}
                        <div className="flex-1 bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Speaker Notes</h3>
                            <div className="h-full max-h-[calc(100%-3rem)] overflow-y-auto">
                                {currentSlide?.speakerNotes ? (
                                    <div
                                        className="prose prose-sm max-w-none text-gray-700"
                                        dangerouslySetInnerHTML={{ __html: currentSlide.speakerNotes }}
                                    />
                                ) : (
                                    <div className="h-full flex items-center justify-center text-gray-500">
                                        <p>No speaker notes for this slide</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Controls (25% of total screen) */}
                        <div className="flex-1 bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Controls</h3>

                            <div className="space-y-6">
                                {/* Navigation Controls */}
                                <div>
                                    <h4 className="text-sm font-medium text-gray-700 mb-3">Navigation</h4>
                                    <NavigationControls
                                        currentSlide={currentSlideIndex + 1}
                                        totalSlides={getTotalSlides()}
                                        onNext={handleNextSlide}
                                        onPrevious={handlePreviousSlide}
                                        onGoToSlide={(slideNumber) => handleGoToSlide(slideNumber - 1)}
                                    />
                                </div>

                                {/* Progress Bar */}
                                <div>
                                    <h4 className="text-sm font-medium text-gray-700 mb-3">Progress</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm text-gray-600">
                                            <span>Slide {currentSlideIndex + 1} of {getTotalSlides()}</span>
                                            <span>{Math.round(getProgress())}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${getProgress()}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Presentation Status */}
                                <div>
                                    <h4 className="text-sm font-medium text-gray-700 mb-3">Status</h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600">Connection:</span>
                                            <span className={isConnected ? 'text-green-600' : 'text-red-600'}>
                                                {isConnected ? 'Connected' : 'Disconnected'}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600">Presentation Window:</span>
                                            <span className={isPresentationActive() ? 'text-green-600' : 'text-gray-500'}>
                                                {isPresentationActive() ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600">Duration:</span>
                                            <span className="text-gray-900 font-mono">
                                                {formatTime(elapsedTime)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div>
                                    <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Actions</h4>
                                    <div className="space-y-2">
                                        <button
                                            onClick={() => handleGoToSlide(0)}
                                            className="w-full px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                                        >
                                            Go to First Slide
                                        </button>
                                        <button
                                            onClick={() => handleGoToSlide(slides.length - 1)}
                                            className="w-full px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                                        >
                                            Go to Last Slide
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ErrorBoundary>
    );
} 