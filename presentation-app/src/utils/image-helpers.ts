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
 * Image validation and content type detection utilities
 */

// Supported image file extensions
const VALID_IMAGE_EXTENSIONS = [
	'.jpg',
	'.jpeg',
	'.png',
	'.gif',
	'.webp',
	'.svg',
	'.bmp',
	'.ico',
	'.tiff',
	'.tif'
] as const

// Content type mapping for image files
const IMAGE_CONTENT_TYPES: Record<string, string> = {
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.png': 'image/png',
	'.gif': 'image/gif',
	'.webp': 'image/webp',
	'.svg': 'image/svg+xml',
	'.bmp': 'image/bmp',
	'.ico': 'image/x-icon',
	'.tiff': 'image/tiff',
	'.tif': 'image/tiff'
} as const

/**
 * Check if a filename has a valid image extension
 * @param filename - The filename to validate
 * @returns True if the file has a valid image extension
 */
export function isValidImageFile(filename: string): boolean {
	if (!filename) {
		return false
	}

	const extension = getFileExtension(filename)
	return VALID_IMAGE_EXTENSIONS.includes(extension as any)
}

/**
 * Get the appropriate content type for an image file
 * @param filename - The image filename
 * @returns The MIME type for the image
 */
export function getImageContentType(filename: string): string {
	const extension = getFileExtension(filename)
	return IMAGE_CONTENT_TYPES[extension] || 'application/octet-stream'
}

/**
 * Extract the file extension from a filename (including the dot)
 * @param filename - The filename
 * @returns The file extension in lowercase
 */
function getFileExtension(filename: string): string {
	const lastDotIndex = filename.lastIndexOf('.')
	if (lastDotIndex === -1) {
		return ''
	}
	return filename.slice(lastDotIndex).toLowerCase()
}

/**
 * Validate if a filename is safe (no directory traversal)
 * @param filename - The filename to validate
 * @returns True if the filename is safe
 */
export function isSafeFilename(filename: string): boolean {
	if (!filename) {
		return false
	}

	// Check for directory traversal patterns
	const dangerousPatterns = [
		'../',
		'..\\',
		'/..',
		'\\..',
		'%2e%2e',
		'%2e%2e%2f',
		'%2e%2e%5c',
		'..%2f',
		'..%5c'
	]

	const lowerFilename = filename.toLowerCase()

	for (const pattern of dangerousPatterns) {
		if (lowerFilename.includes(pattern)) {
			return false
		}
	}

	// Check for null bytes
	if (filename.includes('\0')) {
		return false
	}

	// Check for control characters
	if (/[\x00-\x1f\x7f-\x9f]/.test(filename)) {
		return false
	}

	return true
}

/**
 * Get all supported image extensions
 * @returns Array of supported image extensions
 */
export function getSupportedImageExtensions(): readonly string[] {
	return VALID_IMAGE_EXTENSIONS
}

/**
 * Get the content type mapping for all supported image types
 * @returns Object mapping extensions to content types
 */
export function getImageContentTypeMapping(): Record<string, string> {
	return { ...IMAGE_CONTENT_TYPES }
}
