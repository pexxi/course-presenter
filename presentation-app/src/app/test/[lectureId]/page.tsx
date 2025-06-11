'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
    usePresentationStore,
    useSlideNavigation,
    useConnectionStatus
} from '@/lib/store';
import { useSocket } from '@/lib/socket-client';
import { loadLecture } from '@/lib/slide-loader';

export default function TestPage() {
    const params = useParams();
    const lectureId = params.lectureId as string;

    const {
        currentLecture,
        setCurrentLecture,
        getCurrentSlide,
        setLoading,
        setError
    } = usePresentationStore();

    const {
        currentSlideIndex,
        hasNext,
        hasPrevious,
        totalSlides,
        progress,
        nextSlide,
        previousSlide,
        goToSlide
    } = useSlideNavigation();

    const { isConnected, isLoading, error } = useConnectionStatus();

    const {
        connect,
        disconnect,
        emitSlideChange,
        requestSync,
        socketId
    } = useSocket();

    const [clientType, setClientType] = useState<'presentation' | 'speaker'>('speaker');

    // Load lecture data
    useEffect(() => {
        const loadData = async () => {
            if (!lectureId) return;

            setLoading(true);
            try {
                const lecture = await loadLecture(lectureId);
                if (lecture) {
                    setCurrentLecture(lecture);
                } else {
                    setError('Lecture not found');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load lecture');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [lectureId, setLoading, setCurrentLecture, setError]);

    // Connect to WebSocket
    useEffect(() => {
        if (!lectureId || !currentLecture) return;

        connect({
            lectureId,
            clientType,
            onSlideChange: (slideIndex) => {
                console.log('Received slide change from socket:', slideIndex);
            },
            onConnectionChange: (connected) => {
                console.log('Connection status changed:', connected);
            },
            onError: (error) => {
                console.error('Socket error:', error);
            }
        });

        return () => {
            disconnect();
        };
    }, [lectureId, currentLecture, clientType, connect, disconnect]);

    const handleSlideChange = (newIndex: number) => {
        goToSlide(newIndex);
        emitSlideChange(newIndex);
    };

    const handleNext = () => {
        if (hasNext) {
            const newIndex = currentSlideIndex + 1;
            nextSlide();
            emitSlideChange(newIndex);
        }
    };

    const handlePrevious = () => {
        if (hasPrevious) {
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
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Phase 3 Test - {currentLecture.title}</h1>

                {/* Connection Status */}
                <div className="bg-white rounded-lg shadow p-4 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Connection Status</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <span className="font-medium">Status:</span>
                            <span className={`ml-2 px-2 py-1 rounded ${isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                {isConnected ? 'Connected' : 'Disconnected'}
                            </span>
                        </div>
                        <div>
                            <span className="font-medium">Socket ID:</span>
                            <span className="ml-2 text-sm text-gray-600">{socketId || 'None'}</span>
                        </div>
                        <div>
                            <span className="font-medium">Client Type:</span>
                            <select
                                value={clientType}
                                onChange={(e) => setClientType(e.target.value as 'presentation' | 'speaker')}
                                className="ml-2 px-2 py-1 border rounded"
                            >
                                <option value="speaker">Speaker</option>
                                <option value="presentation">Presentation</option>
                            </select>
                        </div>
                        <div>
                            <button
                                onClick={requestSync}
                                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Request Sync
                            </button>
                        </div>
                    </div>
                </div>

                {/* Slide Navigation */}
                <div className="bg-white rounded-lg shadow p-4 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Slide Navigation</h2>
                    <div className="flex items-center justify-between mb-4">
                        <button
                            onClick={handlePrevious}
                            disabled={!hasPrevious}
                            className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
                        >
                            Previous
                        </button>

                        <div className="text-center">
                            <div className="text-lg font-medium">
                                Slide {currentSlideIndex + 1} of {totalSlides}
                            </div>
                            <div className="text-sm text-gray-600">
                                Progress: {progress.toFixed(1)}%
                            </div>
                        </div>

                        <button
                            onClick={handleNext}
                            disabled={!hasNext}
                            className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
                        >
                            Next
                        </button>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Slide Preview */}
                <div className="bg-white rounded-lg shadow p-4 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Current Slide</h2>
                    {currentSlide && (
                        <div className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-medium">{currentSlide.title}</h3>
                                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                                    {currentSlide.template}
                                </span>
                            </div>

                            {currentSlide.template === 'content' && (
                                <div
                                    className="prose max-w-none"
                                    dangerouslySetInnerHTML={{ __html: currentSlide.content }}
                                />
                            )}

                            {currentSlide.template === 'code' && (
                                <div className="bg-gray-900 text-white p-4 rounded overflow-x-auto">
                                    <pre><code>{currentSlide.rawContent}</code></pre>
                                </div>
                            )}

                            {currentSlide.template === 'cover' && (
                                <div className="text-center py-8">
                                    <div className="text-2xl font-bold">{currentSlide.title}</div>
                                </div>
                            )}

                            {currentSlide.speakerNotes && (
                                <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400">
                                    <h4 className="font-medium text-yellow-800 mb-1">Speaker Notes:</h4>
                                    <p className="text-yellow-700">{currentSlide.speakerNotes}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Slide Thumbnails */}
                <div className="bg-white rounded-lg shadow p-4">
                    <h2 className="text-xl font-semibold mb-4">All Slides</h2>
                    <div className="grid grid-cols-6 gap-2">
                        {currentLecture.slides.map((slide, index) => (
                            <button
                                key={slide.id}
                                onClick={() => handleSlideChange(index)}
                                className={`p-2 border rounded text-sm ${index === currentSlideIndex
                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                    : 'border-gray-300 hover:border-gray-400'
                                    }`}
                            >
                                <div className="font-medium">{index + 1}</div>
                                <div className="text-xs truncate">{slide.title}</div>
                                <div className="text-xs text-gray-500">{slide.template}</div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
} 