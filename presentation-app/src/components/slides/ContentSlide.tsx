'use client';

import { Slide } from '@/types';

interface ContentSlideProps {
    slide: Slide;
    isPreview?: boolean;
}

export default function ContentSlide({ slide, isPreview = false }: ContentSlideProps) {
    // Enhanced responsive sizing that scales better with container size
    const titleSize = isPreview
        ? 'text-lg sm:text-xl md:text-2xl'
        : 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl';

    const contentSize = isPreview
        ? 'text-xs sm:text-sm'
        : 'text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl';

    const spacing = isPreview
        ? 'px-2 py-2'
        : 'px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-6 md:py-8';

    const headerSpacing = isPreview
        ? 'px-2 py-2'
        : 'px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-4 md:py-6';

    const footerSpacing = isPreview
        ? 'px-2 py-1'
        : 'px-4 sm:px-6 md:px-8 lg:px-12 py-2 sm:py-3 md:py-4';

    return (
        <div className="w-full h-full bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">
            {/* Header */}
            <header className={`bg-white border-b border-gray-200 shadow-sm ${headerSpacing}`}>
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
                <div className={`max-w-none mx-auto ${spacing}`}>
                    <div
                        className={`
              ${contentSize}
              text-gray-800 
              leading-relaxed
              prose max-w-none
              prose-headings:text-gray-900
              prose-headings:font-semibold
              prose-p:text-gray-800
              prose-p:leading-relaxed
              prose-strong:text-gray-900
              prose-em:text-gray-700
              prose-ul:text-gray-800
              prose-ol:text-gray-800
              prose-li:my-1
              prose-code:bg-gray-100
              prose-code:px-1
              prose-code:py-0.5
              prose-code:rounded
              prose-code:${isPreview ? 'text-xs' : 'text-sm'}
              prose-blockquote:border-l-blue-500
              prose-blockquote:bg-blue-50
              prose-blockquote:p-2
              prose-blockquote:${isPreview ? 'my-2' : 'my-4'}
              animate-slide-in
            `}
                        dangerouslySetInnerHTML={{ __html: slide.content }}
                    />
                </div>
            </main>

            {/* Footer */}
            <footer className={`bg-white border-t border-gray-200 ${footerSpacing}`}>
                <div className={`flex justify-between items-center ${isPreview ? 'text-xs' : 'text-xs sm:text-sm'} text-gray-500`}>
                    <span>Slide {slide.slideNumber}</span>
                    <span>{slide.lectureId}</span>
                </div>
            </footer>
        </div>
    );
} 