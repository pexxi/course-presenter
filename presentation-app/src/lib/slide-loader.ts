import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import { Slide, SlideHeader, Lecture } from '@/types';
import { 
  generateSlideId, 
  extractSpeakerNotes, 
  extractCodeContent
} from '@/utils/helpers';

/**
 * Load all slides for a specific lecture
 */
export async function loadLectureSlides(lectureId: string): Promise<Slide[]> {
  const lecturePath = path.join(process.cwd(), 'presentation', lectureId);
  
  try {
    if (!fs.existsSync(lecturePath)) {
      throw new Error(`Lecture directory not found: ${lectureId}`);
    }

    // Get all markdown files and sort them by slide number
    const files = fs.readdirSync(lecturePath)
      .filter(file => file.endsWith('.md') && file.match(/^slide\d+\.md$/i))
      .sort((a, b) => {
        const aNum = parseInt(a.match(/\d+/)?.[0] || '0');
        const bNum = parseInt(b.match(/\d+/)?.[0] || '0');
        return aNum - bNum;
      });

    const slides: Slide[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const filePath = path.join(lecturePath, file);
      const slideNumber = i + 1;
      
      try {
        const slide = await processSlideFile(filePath, lectureId, slideNumber);
        if (slide) {
          slides.push(slide);
        }
      } catch (error) {
        console.error(`Error processing slide ${file}:`, error);
        // Continue with other slides even if one fails
      }
    }

    return slides;
  } catch (error) {
    console.error(`Error loading slides for lecture ${lectureId}:`, error);
    return [];
  }
}

/**
 * Process a single slide file
 */
async function processSlideFile(
  filePath: string, 
  lectureId: string, 
  slideNumber: number
): Promise<Slide | null> {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter, content: rawContent } = matter(fileContent);
    
    // Validate frontmatter
    if (!validateSlideHeader(frontmatter)) {
      console.warn(`Invalid frontmatter in ${filePath}`);
      return null;
    }

    const header: SlideHeader = {
      template: frontmatter.template as 'cover' | 'content' | 'code',
      title: frontmatter.title as string,
      image: frontmatter.image as string | undefined
    };

    // Extract speaker notes from HTML comments
    const speakerNotes = extractSpeakerNotes(rawContent);

    // Process content based on template type
    const processedSlide = await processSlideContent({
      id: generateSlideId(lectureId, slideNumber),
      lectureId,
      slideNumber,
      template: header.template,
      title: header.title,
      content: '', // Will be filled by processSlideContent
      rawContent,
      speakerNotes,
      language: undefined, // Will be filled for code slides
      header
    });

    return processedSlide;
  } catch (error) {
    console.error(`Error processing slide file ${filePath}:`, error);
    return null;
  }
}

/**
 * Process slide content based on template type
 */
async function processSlideContent(slide: Slide): Promise<Slide> {
  switch (slide.template) {
    case 'cover':
      return processCoverSlide(slide);
    
    case 'content':
      return await processContentSlide(slide);
    
    case 'code':
      return processCodeSlide(slide);
    
    default:
      console.warn(`Unknown template type: ${slide.template}`);
      return await processContentSlide(slide); // Fallback to content slide
  }
}

/**
 * Process cover slide (title only, no content)
 */
function processCoverSlide(slide: Slide): Slide {
  return {
    ...slide,
    content: '', // Cover slides don't render content
  };
}

/**
 * Process content slide (markdown to HTML)
 */
async function processContentSlide(slide: Slide): Promise<Slide> {
  try {
    const processor = remark().use(remarkHtml, { sanitize: false });
    const result = await processor.process(slide.rawContent);
    
    return {
      ...slide,
      content: result.toString(),
    };
  } catch (error) {
    console.error('Error processing content slide:', error);
    return {
      ...slide,
      content: slide.rawContent, // Fallback to raw content
    };
  }
}

/**
 * Process code slide (extract and syntax highlight code)
 */
function processCodeSlide(slide: Slide): Slide {
  const { code, language } = extractCodeContent(slide.rawContent);
  
  return {
    ...slide,
    content: code,
    language: language,
  };
}

/**
 * Load a complete lecture with all slides
 */
export async function loadLecture(lectureId: string): Promise<Lecture | null> {
  try {
    const slides = await loadLectureSlides(lectureId);
    
    if (slides.length === 0) {
      console.warn(`No slides found for lecture: ${lectureId}`);
      return null;
    }

    return {
      id: lectureId,
      title: slides[0]?.title || `Lecture ${lectureId}`,
      slides,
      currentSlide: 0,
    };
  } catch (error) {
    console.error(`Error loading lecture ${lectureId}:`, error);
    return null;
  }
}

/**
 * Get a specific slide from a lecture
 */
export async function getSlide(
  lectureId: string, 
  slideNumber: number
): Promise<Slide | null> {
  try {
    const slides = await loadLectureSlides(lectureId);
    const slide = slides.find(s => s.slideNumber === slideNumber);
    return slide || null;
  } catch (error) {
    console.error(`Error getting slide ${slideNumber} from lecture ${lectureId}:`, error);
    return null;
  }
}

/**
 * Validate slide header/frontmatter
 */
function validateSlideHeader(frontmatter: Record<string, unknown>): boolean {
  return (
    frontmatter &&
    typeof frontmatter.template === 'string' &&
    ['cover', 'content', 'code'].includes(frontmatter.template) &&
    typeof frontmatter.title === 'string' &&
    (frontmatter.title as string).length > 0
  );
}

/**
 * Get slide navigation info
 */
export interface SlideNavigation {
  currentSlide: number;
  totalSlides: number;
  hasNext: boolean;
  hasPrevious: boolean;
  nextSlideId?: string;
  previousSlideId?: string;
}

export async function getSlideNavigation(
  lectureId: string, 
  currentSlideNumber: number
): Promise<SlideNavigation | null> {
  try {
    const slides = await loadLectureSlides(lectureId);
    const totalSlides = slides.length;
    
    if (totalSlides === 0) return null;
    
    const hasNext = currentSlideNumber < totalSlides;
    const hasPrevious = currentSlideNumber > 1;
    
    return {
      currentSlide: currentSlideNumber,
      totalSlides,
      hasNext,
      hasPrevious,
      nextSlideId: hasNext ? generateSlideId(lectureId, currentSlideNumber + 1) : undefined,
      previousSlideId: hasPrevious ? generateSlideId(lectureId, currentSlideNumber - 1) : undefined,
    };
  } catch (error) {
    console.error(`Error getting slide navigation for ${lectureId}:`, error);
    return null;
  }
}

/**
 * Preload adjacent slides for performance
 */
export async function preloadAdjacentSlides(
  lectureId: string, 
  currentSlideNumber: number
): Promise<{ next?: Slide; previous?: Slide }> {
  try {
    const [nextSlide, previousSlide] = await Promise.all([
      getSlide(lectureId, currentSlideNumber + 1),
      getSlide(lectureId, currentSlideNumber - 1),
    ]);

    return {
      next: nextSlide || undefined,
      previous: previousSlide || undefined,
    };
  } catch (error) {
    console.error(`Error preloading adjacent slides:`, error);
    return {};
  }
} 