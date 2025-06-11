'use client';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    text?: string;
    className?: string;
    fullscreen?: boolean;
}

export default function LoadingSpinner({
    size = 'md',
    text = 'Loading...',
    className = '',
    fullscreen = false
}: LoadingSpinnerProps) {
    const spinnerSizes = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12'
    };

    const textSizes = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg'
    };

    const spinner = (
        <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
            <div
                className={`${spinnerSizes[size]} border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin`}
                role="status"
                aria-label="Loading"
            />
            {text && (
                <p className={`${textSizes[size]} text-gray-600 font-medium`}>
                    {text}
                </p>
            )}
        </div>
    );

    if (fullscreen) {
        return (
            <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
                {spinner}
            </div>
        );
    }

    return spinner;
}

// Specialized loading components for different contexts
export function SlideLoadingSpinner() {
    return (
        <div className="w-full h-full flex items-center justify-center bg-gray-50">
            <LoadingSpinner
                size="lg"
                text="Loading presentation..."
                className="text-center"
            />
        </div>
    );
}

export function PresentationLoadingSpinner() {
    return (
        <LoadingSpinner
            size="lg"
            text="Preparing presentation..."
            fullscreen={true}
        />
    );
}

export function SyncLoadingSpinner() {
    return (
        <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
            <span>Syncing...</span>
        </div>
    );
} 