'use client'

import { useState } from 'react'
import { usePresentationManager } from '@/lib/presentation-manager'

interface StartPresentationButtonProps {
    lectureId: string;
    courseId: string;
    className?: string;
    children?: React.ReactNode;
}

export function StartPresentationButton({
    lectureId,
    courseId,
    className = '',
    children = 'Start Presentation'
}: StartPresentationButtonProps) {
    const [isStarting, setIsStarting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { startPresentation } = usePresentationManager();

    const handleStartPresentation = async () => {
        setIsStarting(true);
        setError(null);

        try {
            await startPresentation({
                lectureId,
                courseId,
                onWindowReady: () => {
                    console.log('Presentation window ready');
                },
                onWindowClosed: () => {
                    console.log('Presentation window closed');
                    // Could show a notification or redirect back to home
                }
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to start presentation');
            setIsStarting(false);
        }
    };

    return (
        <div className="space-y-2">
            <button
                onClick={handleStartPresentation}
                disabled={isStarting}
                className={`
          ${className}
          ${isStarting
                        ? 'opacity-50 cursor-not-allowed bg-gray-400'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }
          text-white font-medium py-2 px-4 rounded-md transition-colors duration-200
          flex items-center justify-center gap-2
        `}
            >
                {isStarting && (
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                )}
                {isStarting ? 'Starting...' : children}
            </button>

            {error && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
                    {error}
                    <div className="mt-1 text-xs text-red-500">
                        Please ensure popup blockers are disabled and try again.
                    </div>
                </div>
            )}
        </div>
    );
} 