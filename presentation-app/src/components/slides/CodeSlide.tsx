'use client';

import { Slide } from '@/types';
import { Highlight, themes } from 'prism-react-renderer';

interface CodeSlideProps {
    slide: Slide;
    isPreview?: boolean;
}

export default function CodeSlide({ slide, isPreview = false }: CodeSlideProps) {
    const titleSize = isPreview
        ? 'text-xl md:text-2xl'
        : 'text-3xl md:text-4xl';

    const codeSize = isPreview
        ? 'text-xs'
        : 'text-base md:text-lg';

    // Default to typescript if no language specified
    const language = slide.language || 'typescript';

    return (
        <div className="w-full h-full bg-gray-900 text-white flex flex-col">
            {/* Header */}
            <header className="bg-gray-800 border-b border-gray-700 px-8 py-6">
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
                        <span className="px-3 py-1 bg-blue-600 text-blue-100 text-sm rounded-full font-medium">
                            {slide.language}
                        </span>
                    )}
                </div>
            </header>

            {/* Code Area */}
            <main className="flex-1 overflow-auto p-8">
                <div className="max-w-7xl mx-auto">
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
                  p-6 
                  overflow-auto
                  font-mono
                  leading-relaxed
                  animate-slide-in
                `}
                                style={style}
                            >
                                {tokens.map((line, i) => (
                                    <div key={i} {...getLineProps({ line, key: i })} className="table-row">
                                        <span className="table-cell text-right pr-4 select-none opacity-50 font-mono text-sm">
                                            {i + 1}
                                        </span>
                                        <span className="table-cell">
                                            {line.map((token, key) => (
                                                <span key={key} {...getTokenProps({ token, key })} />
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
            <footer className="bg-gray-800 border-t border-gray-700 px-8 py-4">
                <div className="flex justify-between items-center text-sm text-gray-400">
                    <span>Slide {slide.slideNumber}</span>
                    <div className="flex items-center gap-4">
                        <span>Lines: {slide.content.split('\n').length}</span>
                        <span>{slide.lectureId}</span>
                    </div>
                </div>
            </footer>
        </div>
    );
} 