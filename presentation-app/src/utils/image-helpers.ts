/**
 * Transform relative image paths to API routes for slides
 */
export function transformImagePath(
	imagePath: string | undefined,
	courseId: string,
	lectureId: string,
): string | undefined {
	if (!imagePath) {
		return undefined;
	}

	// If it's already an absolute path (starts with /) or a full URL (starts with http), return as-is
	if (imagePath.startsWith("/") || imagePath.startsWith("http")) {
		return imagePath;
	}

	// It's a relative path, transform it to use our image API
	return `/api/images/${courseId}/${lectureId}/${imagePath}`;
}

/**
 * Check if a filename is a valid image file
 */
export function isValidImageFile(filename: string): boolean {
	const validExtensions = [
		".jpg",
		".jpeg",
		".png",
		".gif",
		".webp",
		".svg",
		".bmp",
		".ico",
	];
	const ext = filename.toLowerCase().substring(filename.lastIndexOf("."));
	return validExtensions.includes(ext);
}

/**
 * Get the content type for an image file based on its extension
 */
export function getImageContentType(filename: string): string {
	const ext = filename.toLowerCase().substring(filename.lastIndexOf("."));
	const contentTypeMap: Record<string, string> = {
		".jpg": "image/jpeg",
		".jpeg": "image/jpeg",
		".png": "image/png",
		".gif": "image/gif",
		".webp": "image/webp",
		".svg": "image/svg+xml",
		".bmp": "image/bmp",
		".ico": "image/x-icon",
	};

	return contentTypeMap[ext] || "application/octet-stream";
}
