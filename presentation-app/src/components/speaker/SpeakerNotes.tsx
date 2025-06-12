'use client';

import { Slide } from '@/types';

interface SpeakerNotesProps {
    currentSlide: Slide | null;
    fontSize: 'small' | 'medium' | 'large' | 'xlarge';
    onIncreaseFontSize: () => void;
    onDecreaseFontSize: () => void;
}

export default function SpeakerNotes({
    currentSlide,
    fontSize,
    onIncreaseFontSize,
    onDecreaseFontSize
}: SpeakerNotesProps) {
    const getFontSizeClasses = () => {
        switch (fontSize) {
            case 'small': return 'text-sm leading-relaxed';
            case 'medium': return 'text-base leading-relaxed';
            case 'large': return 'text-lg leading-relaxed';
            case 'xlarge': return 'text-2xl leading-relaxed';
            default: return 'text-base leading-relaxed';
        }
    };

    const getFontSizeLabel = () => {
        switch (fontSize) {
            case 'small': return 'Small';
            case 'medium': return 'Medium';
            case 'large': return 'Large';
            case 'xlarge': return 'X-Large';
            default: return 'Medium';
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Speaker Notes</h2>
                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">Font Size: {getFontSizeLabel()}</span>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={onDecreaseFontSize}
                            className="px-2 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded border"
                            title="Decrease font size"
                        >
                            A-
                        </button>
                        <button
                            onClick={onIncreaseFontSize}
                            className="px-2 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded border"
                            title="Increase font size"
                        >
                            A+
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                {currentSlide?.speakerNotes ? (
                    <div className={`prose prose-slate max-w-none text-gray-800 ${getFontSizeClasses()}`}>
                        <div dangerouslySetInnerHTML={{ __html: currentSlide.speakerNotes }} />
                    </div>
                ) : (
                    <div className="h-full flex items-center justify-center text-gray-500">
                        <div className="text-center">
                            <div className="text-4xl mb-2">📝</div>
                            <p>No speaker notes for this slide</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
} 