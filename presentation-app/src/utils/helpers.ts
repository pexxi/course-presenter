/**
 * Utility functions for the presentation application
 */

/**
 * Generate a unique ID for slides
 */
export function generateSlideId(lectureId: string, slideNumber: number, courseId: string): string {
  return `${courseId}-${lectureId}-slide-${slideNumber}`;
}

/**
 * Extract speaker notes from HTML content
 */
export function extractSpeakerNotes(htmlContent: string): string {
  const notesRegex = /<!--\s*Speaker Notes:\s*([\s\S]*?)\s*-->/gi;
  const matches = htmlContent.match(notesRegex);

  if (!matches) return '';

  return matches
    .map(match => match.replace(/<!--\s*Speaker Notes:\s*|\s*-->/gi, '').trim())
    .join('\n\n');
}

/**
 * Detect programming language from code block
 */
export function detectLanguage(codeBlock: string): string | undefined {
  const langRegex = /^```(\w+)/;
  const match = codeBlock.match(langRegex);
  return match ? match[1] : undefined;
}

/**
 * Extract code content and language from markdown
 */
export function extractCodeContent(markdownContent: string): { code: string; language?: string } {
  const codeBlockRegex = /```(\w+)?\s*\n([\s\S]*?)```/g;
  const matches = [...markdownContent.matchAll(codeBlockRegex)];

  if (matches.length === 0) {
    return { code: markdownContent };
  }

  // Get the first code block
  const firstMatch = matches[0];
  const language = firstMatch[1] || undefined;
  const code = firstMatch[2]?.trim() || '';

  return { code, language };
}

/**
 * Format slide content for display
 */
export function formatSlideContent(content: string, maxLength: number = 100): string {
  if (content.length <= maxLength) {
    return content;
  }

  return content.substring(0, maxLength) + '...';
}

/**
 * Sanitize HTML content
 */
export function sanitizeHtml(html: string): string {
  // Basic HTML sanitization - remove script tags and potentially dangerous attributes
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/javascript:/gi, '');
}

/**
 * Calculate reading time for slide content
 */
export function calculateReadingTime(content: string, wordsPerMinute: number = 200): number {
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Get file extension from filename
 */
export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || '';
}

/**
 * Validate slide template type
 */
export function isValidTemplate(template: string): template is 'cover' | 'content' | 'code' {
  return ['cover', 'content', 'code'].includes(template);
}

/**
 * Sanitize lecture ID for file system usage
 */
export function sanitizeLectureId(lectureId: string): string {
  return lectureId.replace(/[^a-zA-Z0-9-_]/g, '-').toLowerCase();
}

/**
 * Format slide number with leading zeros
 */
export function formatSlideNumber(slideNumber: number, totalSlides: number): string {
  const digits = totalSlides.toString().length;
  return slideNumber.toString().padStart(digits, '0');
}

/**
 * Check if running in browser environment
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
} 