'use client';

import { Slide } from '@/types';
import Image from 'next/image';

interface CoverSlideProps {
    slide: Slide;
    isPreview?: boolean;
}

export default function CoverSlide({ slide, isPreview = false }: CoverSlideProps) {
    const titleSize = isPreview
        ? 'text-3xl md:text-4xl'
        : 'text-5xl md:text-6xl lg:text-7xl';

    return (
        <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white overflow-hidden">
            {/* Background Image */}
            {slide.header.image && (
                <div className="absolute inset-0 z-0">
                    <Image
                        src={slide.header.image}
                        alt=""
                        fill
                        className="object-cover opacity-30"
                        priority={!isPreview}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-purple-900/70 to-indigo-900/70" />
                </div>
            )}

            {/* Content */}
            <div className="relative z-10 text-center max-w-5xl px-8">
                <h1 className={`
          ${titleSize} 
          font-bold 
          leading-tight 
          text-white 
          drop-shadow-2xl
          animate-fade-in
        `}>
                    {slide.title}
                </h1>

                {/* Decorative element */}
                <div className="mt-8 flex justify-center">
                    <div className="w-24 h-1 bg-white/50 rounded-full animate-slide-in" />
                </div>
            </div>

            {/* Corner branding/logo space */}
            <div className="absolute bottom-8 right-8 text-white/70 text-sm">
                <span>Cursor AI Course</span>
            </div>

            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="w-full h-full"
                    style={{
                        backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                    }}
                />
            </div>
        </div>
    );
} 