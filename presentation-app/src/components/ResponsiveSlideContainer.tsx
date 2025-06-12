"use client";

import type { ReactNode } from "react";

interface ResponsiveSlideContainerProps {
	children: ReactNode;
	className?: string;
	isPreview?: boolean;
}

export default function ResponsiveSlideContainer({
	children,
	className = "",
	isPreview = false,
}: ResponsiveSlideContainerProps) {
	// For preview mode (thumbnails, speaker view), we use aspect ratio constrained sizing
	const containerClassName = isPreview
		? `
            w-full 
            aspect-[16/9] 
            ${className}
        `
		: `
            w-full 
            h-full 
            flex 
            items-center 
            justify-center 
            ${className}
        `;

	if (isPreview) {
		return (
			<div className={containerClassName.trim()}>
				<div className="w-full h-full overflow-hidden">{children}</div>
			</div>
		);
	}

	// For full presentation view, we need to calculate the best fit for 16:9 ratio
	return (
		<div className={containerClassName.trim()}>
			<div className="relative w-full h-full max-w-full max-h-full">
				{/* This container maintains 16:9 aspect ratio and scales to fit */}
				<div className="absolute inset-0 flex items-center justify-center p-4">
					<div
						className="w-full h-full max-w-full max-h-full shadow-2xl"
						style={{
							aspectRatio: "16/9",
							// Scale down if needed to fit both width and height constraints
							maxWidth: "min(calc(100vw - 2rem), calc((100vh - 2rem) * 16/9))",
							maxHeight: "min(calc(100vh - 2rem), calc((100vw - 2rem) * 9/16))",
						}}
					>
						<div className="w-full h-full overflow-hidden rounded-lg bg-white">
							{children}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
