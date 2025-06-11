'use client';

import { Slide } from '@/types';
import CoverSlide from '@/components/slides/CoverSlide';
import ContentSlide from '@/components/slides/ContentSlide';
import CodeSlide from '@/components/slides/CodeSlide';

interface SlideRendererProps {
    slide: Slide;
    isPreview?: boolean;
    className?: string;
}

export default function SlideRenderer({
    slide,
    isPreview = false,
    className = ''
}: SlideRendererProps) {
    const baseClassName = `
    w-full h-full flex flex-col
    ${isPreview ? 'scale-75 origin-top-left' : ''}
    ${className}
  `.trim();

    switch (slide.template) {
        case 'cover':
            return (
                <div className={baseClassName}>
                    <CoverSlide slide={slide} isPreview={isPreview} />
                </div>
            );

        case 'content':
            return (
                <div className={baseClassName}>
                    <ContentSlide slide={slide} isPreview={isPreview} />
                </div>
            );

        case 'code':
            return (
                <div className={baseClassName}>
                    <CodeSlide slide={slide} isPreview={isPreview} />
                </div>
            );

        default:
            return (
                <div className={`${baseClassName} bg-red-50 border-2 border-red-200`}>
                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-center text-red-600">
                            <h2 className="text-2xl font-bold mb-4">Unknown Slide Template</h2>
                            <p className="text-lg">Template: {slide.template}</p>
                            <p className="text-sm mt-2">Slide ID: {slide.id}</p>
                        </div>
                    </div>
                </div>
            );
    }
} 