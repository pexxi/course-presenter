import { NextRequest, NextResponse } from 'next/server';
import { loadLectureSlides } from '@/lib/slide-loader';

interface RouteParams {
  params: Promise<{ lectureId: string }>;
}

export async function GET(
  request: NextRequest,
  context: RouteParams
) {
  try {
    const { lectureId } = await context.params;
    
    if (!lectureId) {
      return NextResponse.json(
        { error: 'Lecture ID is required' },
        { status: 400 }
      );
    }

    const slides = await loadLectureSlides(lectureId);
    
    if (slides.length === 0) {
      return NextResponse.json(
        { error: `No slides found for lecture: ${lectureId}` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      lectureId,
      totalSlides: slides.length,
      slides
    });
  } catch (error) {
    console.error('Error loading slides:', error);
    return NextResponse.json(
      { error: 'Failed to load slides' },
      { status: 500 }
    );
  }
} 