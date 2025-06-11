'use client';

import { Slide } from '@/types';

interface ContentSlideProps {
    slide: Slide;
    isPreview?: boolean;
}

export default function ContentSlide({ slide, isPreview = false }: ContentSlideProps) {
    const titleSize = isPreview
        ? 'text-2xl md:text-3xl'
        : 'text-4xl md:text-5xl';

    const contentSize = isPreview
        ? 'text-sm'
        : 'text-lg md:text-xl';

    return (
        <div className="w-full h-full bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 shadow-sm px-8 py-6">
                <h1 className={`
          ${titleSize} 
          font-bold 
          text-gray-900 
          leading-tight
          animate-fade-in
        `}>
                    {slide.title}
                </h1>
            </header>

            {/* Content Area */}
            <main className="flex-1 overflow-auto">
                <div className="max-w-6xl mx-auto px-8 py-8">
                    <div
                        className={`
              ${contentSize}
              text-gray-800 
              leading-relaxed
              prose prose-lg max-w-none
              prose-headings:text-gray-900
              prose-headings:font-semibold
              prose-p:text-gray-800
              prose-p:leading-relaxed
              prose-strong:text-gray-900
              prose-em:text-gray-700
              prose-ul:text-gray-800
              prose-ol:text-gray-800
              prose-li:my-2
              prose-code:bg-gray-100
              prose-code:px-2
              prose-code:py-1
              prose-code:rounded
              prose-code:text-sm
              prose-blockquote:border-l-blue-500
              prose-blockquote:bg-blue-50
              prose-blockquote:p-4
              prose-blockquote:my-6
              animate-slide-in
            `}
                        dangerouslySetInnerHTML={{ __html: slide.content }}
                    />
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 px-8 py-4">
                <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>Slide {slide.slideNumber}</span>
                    <span>{slide.lectureId}</span>
                </div>
            </footer>
        </div>
    );
} 