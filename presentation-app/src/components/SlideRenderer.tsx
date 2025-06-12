"use client";

import ResponsiveSlideContainer from "@/components/ResponsiveSlideContainer";
import CodeSlide from "@/components/slides/CodeSlide";
import ContentSlide from "@/components/slides/ContentSlide";
import CoverSlide from "@/components/slides/CoverSlide";
import type { Slide } from "@/types";

interface SlideRendererProps {
	slide: Slide;
	isPreview?: boolean;
	className?: string;
}

export default function SlideRenderer({
	slide,
	isPreview = false,
	className = "",
}: SlideRendererProps) {
	// Render the appropriate slide component based on template
	const renderSlideContent = () => {
		switch (slide.template) {
			case "cover":
				return <CoverSlide slide={slide} isPreview={isPreview} />;
			case "content":
				return <ContentSlide slide={slide} isPreview={isPreview} />;
			case "code":
				return <CodeSlide slide={slide} isPreview={isPreview} />;
			default:
				return (
					<div className="w-full h-full bg-red-50 border-2 border-red-200 flex items-center justify-center">
						<div className="text-center text-red-600">
							<h2 className="text-2xl font-bold mb-4">
								Unknown Slide Template
							</h2>
							<p className="text-lg">Template: {slide.template}</p>
							<p className="text-sm mt-2">Slide ID: {slide.id}</p>
						</div>
					</div>
				);
		}
	};

	return (
		<ResponsiveSlideContainer isPreview={isPreview} className={className}>
			{renderSlideContent()}
		</ResponsiveSlideContainer>
	);
}
