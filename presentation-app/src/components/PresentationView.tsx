'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSlideStore } from '@/lib/store'
import { useBroadcast } from '@/lib/broadcast-client'
import SlideRenderer from '@/components/SlideRenderer'
import LoadingSpinner from '@/components/LoadingSpinner'
import ErrorBoundary from '@/components/ErrorBoundary'

interface PresentationViewProps {
    lectureId: string;
    courseId: string;
}

export function PresentationView({ lectureId, courseId }: PresentationViewProps) {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isConnected, setIsConnected] = useState(false);

    const {
        slides,
        currentSlideIndex,
        isLoading,
        error,
        loadLecture,
        nextSlide,
        previousSlide,
        goToSlide
    } = useSlideStore();

    const { connect, disconnect } = useBroadcast();

    // Load lecture on mount
    useEffect(() => {
        loadLecture(lectureId, courseId);
        connect({
            lectureId,
            clientType: 'presentation',
            onConnectionChange: setIsConnected,
        });

        return () => {
            disconnect();
        };
    }, [lectureId, courseId]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'ArrowRight':
                case 'Space':
                case 'PageDown':
                    event.preventDefault();
                    nextSlide();
                    break;
                case 'ArrowLeft':
                case 'PageUp':
                    event.preventDefault();
                    previousSlide();
                    break;
                case 'Home':
                    event.preventDefault();
                    goToSlide(0);
                    break;
                case 'End':
                    event.preventDefault();
                    goToSlide(slides.length - 1);
                    break;
                case 'F11':
                case 'f':
                case 'F':
                    event.preventDefault();
                    toggleFullscreen();
                    break;
                case 'Escape':
                    if (isFullscreen) {
                        exitFullscreen();
                    }
                    break;
                // Number keys for direct slide navigation
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    event.preventDefault();
                    const slideNumber = parseInt(event.key) - 1;
                    if (slideNumber < slides.length) {
                        goToSlide(slideNumber);
                    }
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [nextSlide, previousSlide, goToSlide, slides.length, isFullscreen]);

    // Fullscreen management
    const toggleFullscreen = async () => {
        try {
            if (!document.fullscreenElement) {
                await document.documentElement.requestFullscreen();
                setIsFullscreen(true);
            } else {
                await document.exitFullscreen();
                setIsFullscreen(false);
            }
        } catch (error) {
            console.warn('Fullscreen not supported or failed:', error);
        }
    };

    const exitFullscreen = async () => {
        try {
            if (document.fullscreenElement) {
                await document.exitFullscreen();
                setIsFullscreen(false);
            }
        } catch (error) {
            console.warn('Exit fullscreen failed:', error);
        }
    };

    // Listen for fullscreen changes
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    // Auto-request fullscreen on load
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!document.fullscreenElement) {
                toggleFullscreen();
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    // Listen for close presentation signals
    useEffect(() => {
        // Listen for localStorage changes (close signal)
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === 'closePresentationWindow') {
                window.close();
            }
        };

        // Listen for BroadcastChannel messages
        let broadcastChannel: BroadcastChannel | null = null;
        if (typeof BroadcastChannel !== 'undefined') {
            try {
                broadcastChannel = new BroadcastChannel('presentation-control');
                broadcastChannel.onmessage = (event) => {
                    if (event.data.type === 'CLOSE_PRESENTATION') {
                        window.close();
                    }
                };
            } catch (error) {
                console.warn('BroadcastChannel not available:', error);
            }
        }

        // Listen for window messages from parent
        const handleWindowMessage = (event: MessageEvent) => {
            if (event.data.type === 'CLOSE_PRESENTATION') {
                window.close();
            }
        };

        // Send ready signal to parent window
        if (window.opener) {
            window.opener.postMessage({ type: 'PRESENTATION_WINDOW_READY' }, '*');
        }

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('message', handleWindowMessage);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('message', handleWindowMessage);
            if (broadcastChannel) {
                broadcastChannel.close();
            }
        };
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center text-white">
                    <LoadingSpinner size="lg" />
                    <p className="mt-4 text-xl">Loading presentation...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center text-white max-w-md">
                    <div className="text-6xl mb-4">❌</div>
                    <h1 className="text-2xl font-bold mb-4">Presentation Error</h1>
                    <p className="text-gray-300 mb-6">{error}</p>
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

    if (!slides.length) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center text-white">
                    <div className="text-6xl mb-4">📋</div>
                    <h1 className="text-2xl font-bold">No slides found</h1>
                    <p className="text-gray-300 mt-2">Lecture: {lectureId}</p>
                </div>
            </div>
        );
    }

    const currentSlide = slides[currentSlideIndex];

    return (
        <ErrorBoundary>
            <div className="min-h-screen bg-black text-white overflow-hidden relative">
                {/* Connection status indicator (top-right) */}
                <div className="absolute top-4 right-4 z-50">
                    <div className={`
            px-3 py-1 rounded-full text-xs font-medium
            ${isConnected ? 'bg-green-600' : 'bg-red-600'}
          `}>
                        {isConnected ? 'Connected' : 'Disconnected'}
                    </div>
                </div>

                {/* Slide progress indicator (bottom) */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50">
                    <div className="bg-black bg-opacity-50 rounded-full px-4 py-2 text-sm">
                        {currentSlideIndex + 1} / {slides.length}
                    </div>
                </div>

                {/* Fullscreen hint (bottom-right) */}
                {!isFullscreen && (
                    <div className="absolute bottom-4 right-4 z-50">
                        <div className="bg-black bg-opacity-50 rounded px-2 py-1 text-xs">
                            Press F11 or F for fullscreen
                        </div>
                    </div>
                )}

                {/* Main slide content */}
                <div className="h-screen w-screen overflow-hidden">
                    {currentSlide && (
                        <SlideRenderer
                            slide={currentSlide}
                            className="w-full h-full"
                            isPreview={false}
                        />
                    )}
                </div>

                {/* Navigation hints */}
                <div className="absolute bottom-8 left-8 z-50 text-xs text-gray-400">
                    <div className="space-y-1">
                        <div>← → Arrow keys to navigate</div>
                        <div>Space for next slide</div>
                        <div>1-9 for direct slide access</div>
                        <div>Home/End for first/last</div>
                    </div>
                </div>
            </div>
        </ErrorBoundary>
    );
} 