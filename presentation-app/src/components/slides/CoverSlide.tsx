"use client";

import type { Slide } from "@/types";
import Image from "next/image";

interface CoverSlideProps {
	slide: Slide;
	isPreview?: boolean;
}

export default function CoverSlide({
	slide,
	isPreview = false,
}: CoverSlideProps) {
	// Enhanced responsive sizing for better scaling
	const titleSize = isPreview
		? "text-base sm:text-lg md:text-xl lg:text-2xl"
		: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl";

	const padding = isPreview ? "px-2 sm:px-4" : "px-4 sm:px-6 md:px-8 lg:px-12";

	const brandingSize = isPreview ? "text-xs" : "text-xs sm:text-sm";

	const decorativeWidth = isPreview ? "w-12 sm:w-16" : "w-16 sm:w-20 md:w-24";

	const spacing = isPreview ? "mt-2 sm:mt-4" : "mt-4 sm:mt-6 md:mt-8";

	const bottomSpacing = isPreview
		? "bottom-2 right-2"
		: "bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8";

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
			<div className={`relative z-10 text-center max-w-full ${padding}`}>
				<h1
					className={`
          ${titleSize} 
          font-bold 
          leading-tight 
          text-white 
          drop-shadow-2xl
          animate-fade-in
          px-4
        `}
				>
					{slide.title}
				</h1>

				{/* Decorative element */}
				<div className={`${spacing} flex justify-center`}>
					<div
						className={`${decorativeWidth} h-0.5 sm:h-1 bg-white/50 rounded-full animate-slide-in`}
					/>
				</div>
			</div>

			{/* Corner branding/logo space */}
			<div
				className={`absolute ${bottomSpacing} text-white/70 ${brandingSize}`}
			>
				<span>Cursor AI Course</span>
			</div>

			{/* Subtle pattern overlay */}
			<div className="absolute inset-0 opacity-10 pointer-events-none">
				<div
					className="w-full h-full"
					style={{
						backgroundImage:
							"radial-gradient(circle at 25% 25%, rgba(255,255,255,0.3) 1px, transparent 1px)",
						backgroundSize: "50px 50px",
					}}
				/>
			</div>
		</div>
	);
}
