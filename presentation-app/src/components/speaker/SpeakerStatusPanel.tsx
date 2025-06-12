'use client';

interface SpeakerStatusPanelProps {
    isConnected: boolean;
    isPresentationActive: boolean;
    elapsedTime: number;
    onEndPresentation: () => void;
}

export default function SpeakerStatusPanel({
    isConnected,
    isPresentationActive,
    elapsedTime,
    onEndPresentation
}: SpeakerStatusPanelProps) {
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="space-y-6">
            {/* Presentation Status */}
            <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Status</h3>
                <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-gray-600">Connection:</span>
                        <span className={isConnected ? 'text-green-600' : 'text-red-600'}>
                            {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-gray-600">Presentation Window:</span>
                        <span className={isPresentationActive ? 'text-green-600' : 'text-gray-500'}>
                            {isPresentationActive ? '✅ Active' : '⚪ Inactive'}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="text-gray-900 font-mono">
                            ⏱️ {formatTime(elapsedTime)}
                        </span>
                    </div>
                </div>
            </div>

            {/* End Presentation */}
            <div>
                <button
                    onClick={onEndPresentation}
                    className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition-colors"
                >
                    End Presentation
                </button>
            </div>
        </div>
    );
} 