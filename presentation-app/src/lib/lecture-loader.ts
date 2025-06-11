import fs from 'fs';
import path from 'path';

export interface LectureInfo {
  id: string;
  title: string;
  description: string;
  author?: string;
  duration?: string;
  level?: string;
  tags?: string[];
  slideCount: number;
}

/**
 * Get all available lectures by scanning the presentation directory
 */
export async function getAllLectures(): Promise<LectureInfo[]> {
  const presentationDir = path.join(process.cwd(), 'presentation');
  
  try {
    // Check if presentation directory exists
    if (!fs.existsSync(presentationDir)) {
      console.warn('Presentation directory not found');
      return [];
    }

    const lectureDirectories = fs.readdirSync(presentationDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    const lectures: LectureInfo[] = [];

    for (const lectureId of lectureDirectories) {
      try {
        const lectureInfo = await getLectureInfo(lectureId);
        if (lectureInfo) {
          lectures.push(lectureInfo);
        }
      } catch (error) {
        console.error(`Error loading lecture info for ${lectureId}:`, error);
        // Continue with other lectures even if one fails
      }
    }

    return lectures.sort((a, b) => a.id.localeCompare(b.id));
  } catch (error) {
    console.error('Error scanning lecture directories:', error);
    return [];
  }
}

/**
 * Get lecture information from info.json and count slides
 */
export async function getLectureInfo(lectureId: string): Promise<LectureInfo | null> {
  const lecturePath = path.join(process.cwd(), 'presentation', lectureId);
  const infoPath = path.join(lecturePath, 'info.json');
  
  try {
    // Check if lecture directory exists
    if (!fs.existsSync(lecturePath)) {
      return null;
    }

    // Read info.json if it exists
    let lectureData: Partial<LectureInfo> = {
      title: `Lecture ${lectureId}`,
      description: `Lecture ${lectureId} - No description available`
    };

    if (fs.existsSync(infoPath)) {
      const infoContent = fs.readFileSync(infoPath, 'utf-8');
      const parsedInfo = JSON.parse(infoContent);
      lectureData = { ...lectureData, ...parsedInfo };
    }

    // Count slide files
    const slideCount = countSlideFiles(lecturePath);

    return {
      id: lectureId,
      title: lectureData.title || `Lecture ${lectureId}`,
      description: lectureData.description || 'No description available',
      author: lectureData.author,
      duration: lectureData.duration,
      level: lectureData.level,
      tags: lectureData.tags,
      slideCount
    };
  } catch (error) {
    console.error(`Error reading lecture info for ${lectureId}:`, error);
    return null;
  }
}

/**
 * Count slide files in a lecture directory
 */
function countSlideFiles(lecturePath: string): number {
  try {
    const files = fs.readdirSync(lecturePath);
    return files.filter(file => 
      file.endsWith('.md') && file.match(/^slide\d+\.md$/i)
    ).length;
  } catch (error) {
    console.error('Error counting slide files:', error);
    return 0;
  }
} 