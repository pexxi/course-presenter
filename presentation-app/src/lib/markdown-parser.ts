import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkFrontmatter from 'remark-frontmatter';
import matter from 'gray-matter';

/**
 * Parse markdown content with frontmatter
 */
export interface ParsedMarkdown {
  content: string;
  frontmatter: Record<string, unknown>;
  rawContent: string;
}

/**
 * Enhanced markdown parser with frontmatter support
 */
export async function parseMarkdown(markdownContent: string): Promise<ParsedMarkdown> {
  try {
    // Parse frontmatter using gray-matter
    const { data: frontmatter, content: rawContent } = matter(markdownContent);
    
    // Process markdown content to HTML
    const processor = remark()
      .use(remarkFrontmatter)
      .use(remarkHtml, { sanitize: false });
    
    const result = await processor.process(rawContent);
    const htmlContent = result.toString();
    
    return {
      content: htmlContent,
      frontmatter,
      rawContent
    };
  } catch (error) {
    console.error('Error parsing markdown:', error);
    throw new Error(`Failed to parse markdown: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Parse markdown content without HTML conversion (for code slides)
 */
export function parseMarkdownRaw(markdownContent: string): ParsedMarkdown {
  try {
    const { data: frontmatter, content: rawContent } = matter(markdownContent);
    
    return {
      content: rawContent,
      frontmatter,
      rawContent
    };
  } catch (error) {
    console.error('Error parsing raw markdown:', error);
    throw new Error(`Failed to parse raw markdown: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Extract code blocks from markdown content
 */
export interface CodeBlock {
  language?: string;
  code: string;
  meta?: string;
}

export function extractCodeBlocks(markdownContent: string): CodeBlock[] {
  const codeBlockRegex = /```(\w+)?\s*(?:\{([^}]*)\})?\s*\n([\s\S]*?)```/g;
  const codeBlocks: CodeBlock[] = [];
  let match;
  
  while ((match = codeBlockRegex.exec(markdownContent)) !== null) {
    codeBlocks.push({
      language: match[1] || undefined,
      meta: match[2] || undefined,
      code: match[3].trim()
    });
  }
  
  return codeBlocks;
}

/**
 * Extract inline code from markdown content
 */
export function extractInlineCode(markdownContent: string): string[] {
  const inlineCodeRegex = /`([^`]+)`/g;
  const inlineCodes: string[] = [];
  let match;
  
  while ((match = inlineCodeRegex.exec(markdownContent)) !== null) {
    inlineCodes.push(match[1]);
  }
  
  return inlineCodes;
}

/**
 * Clean HTML content by removing specific tags
 */
export function cleanHtmlContent(htmlContent: string, tagsToRemove: string[] = []): string {
  let cleaned = htmlContent;
  
  // Remove specified tags
  tagsToRemove.forEach(tag => {
    const tagRegex = new RegExp(`<${tag}[^>]*>.*?<\/${tag}>`, 'gi');
    cleaned = cleaned.replace(tagRegex, '');
  });
  
  return cleaned.trim();
}

/**
 * Extract plain text from HTML content
 */
export function extractPlainText(htmlContent: string): string {
  return htmlContent
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
}

/**
 * Parse markdown table into structured data
 */
export interface TableData {
  headers: string[];
  rows: string[][];
}

export function parseMarkdownTable(markdownContent: string): TableData | null {
  const lines = markdownContent.split('\n').filter(line => line.trim());
  
  if (lines.length < 2) return null;
  
  // Check if it's a valid table format
  const headerLine = lines[0];
  const separatorLine = lines[1];
  
  if (!headerLine.includes('|') || !separatorLine.includes('|') || !separatorLine.includes('-')) {
    return null;
  }
  
  // Parse headers
  const headers = headerLine
    .split('|')
    .map(cell => cell.trim())
    .filter(cell => cell.length > 0);
  
  // Parse rows
  const rows = lines.slice(2).map(line => 
    line
      .split('|')
      .map(cell => cell.trim())
      .filter(cell => cell.length > 0)
  );
  
  return { headers, rows };
}

/**
 * Convert markdown links to HTML
 */
export function parseMarkdownLinks(content: string): string {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  
  return content.replace(linkRegex, (match, text, url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`;
  });
}

/**
 * Process markdown for specific slide template
 */
export async function processTemplateMarkdown(
  markdownContent: string,
  template: 'cover' | 'content' | 'code'
): Promise<string> {
  switch (template) {
    case 'cover':
      // Cover slides don't process content
      return '';
      
    case 'content':
      // Full markdown processing
      const { content } = await parseMarkdown(markdownContent);
      return content;
      
    case 'code':
      // Extract just the code blocks
      const codeBlocks = extractCodeBlocks(markdownContent);
      return codeBlocks.map(block => block.code).join('\n\n');
      
    default:
      throw new Error(`Unknown template type: ${template}`);
  }
} 