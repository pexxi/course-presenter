'use client';

import { Slide } from '@/types';
import { Highlight, themes } from 'prism-react-renderer';

interface CodeSlideProps {
    slide: Slide;
    isPreview?: boolean;
}

export default function CodeSlide({ slide, isPreview = false }: CodeSlideProps) {
    // Enhanced responsive sizing for better scaling
    const titleSize = isPreview
        ? 'text-sm sm:text-base md:text-lg'
        : 'text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl';

    const codeSize = isPreview
        ? 'text-xs'
        : 'text-xs sm:text-sm md:text-base lg:text-lg';

    const headerSpacing = isPreview
        ? 'px-2 py-2'
        : 'px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6';

    const mainSpacing = isPreview
        ? 'p-2'
        : 'p-4 sm:p-6 md:p-8';

    const footerSpacing = isPreview
        ? 'px-2 py-1'
        : 'px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4';

    const codeSpacing = isPreview
        ? 'p-2'
        : 'p-3 sm:p-4 md:p-6';

    const badgeSize = isPreview
        ? 'px-2 py-0.5 text-xs'
        : 'px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm';

    const lineNumberSize = isPreview
        ? 'text-xs'
        : 'text-xs sm:text-sm';

    const footerTextSize = isPreview
        ? 'text-xs'
        : 'text-xs sm:text-sm';

    // Default to typescript if no language specified
    const language = slide.language || 'typescript';

    return (
        <div className="w-full h-full bg-gray-900 text-white flex flex-col">
            {/* Header */}
            <header className={`bg-gray-800 border-b border-gray-700 ${headerSpacing}`}>
                <div className="flex items-center justify-between">
                    <h1 className={`
            ${titleSize} 
            font-bold 
            text-white 
            leading-tight
            animate-fade-in
          `}>
                        {slide.title}
                    </h1>
                    {slide.language && (
                        <span className={`${badgeSize} bg-blue-600 text-blue-100 rounded-full font-medium`}>
                            {slide.language}
                        </span>
                    )}
                </div>
            </header>

            {/* Code Area */}
            <main className={`flex-1 overflow-auto ${mainSpacing}`}>
                <div className="max-w-none mx-auto">
                    <Highlight
                        theme={themes.vsDark}
                        code={slide.content}
                        language={language}
                    >
                        {({ className, style, tokens, getLineProps, getTokenProps }) => (
                            <pre
                                className={`
                  ${className} 
                  ${codeSize}
                  rounded-lg 
                  ${codeSpacing}
                  overflow-auto
                  font-mono
                  leading-relaxed
                  animate-slide-in
                `}
                                style={style}
                            >
                                {tokens.map((line, i) => (
                                    <div {...getLineProps({ line, key: i })} className="table-row" key={i} >
                                        <span className={`table-cell text-right pr-2 sm:pr-4 select-none opacity-50 font-mono ${lineNumberSize}`} key={`${i}-line-number`}>
                                            {i + 1}
                                        </span>
                                        <span className="table-cell">
                                            {line.map((token, key) => (
                                                <span {...getTokenProps({ token, key })} key={key} />
                                            ))}
                                        </span>
                                    </div>
                                ))}
                            </pre>
                        )}
                    </Highlight>
                </div>
            </main>

            {/* Footer */}
            <footer className={`bg-gray-800 border-t border-gray-700 ${footerSpacing}`}>
                <div className={`flex justify-between items-center ${footerTextSize} text-gray-400`}>
                    <span>Slide {slide.slideNumber}</span>
                    <div className="flex items-center gap-2 sm:gap-4">
                        <span>Lines: {slide.content.split('\n').length}</span>
                        <span>{slide.lectureId}</span>
                    </div>
                </div>
            </footer>
        </div>
    );
} 