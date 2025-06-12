import { NextRequest, NextResponse } from 'next/server';
import { loadLectureSlides } from '@/lib/slide-loader';

interface RouteParams {
    params: Promise<{ params: string[] }>;
}

export async function GET(
    request: NextRequest,
    context: RouteParams
) {
    try {
        const { params } = await context.params;

        // Expected format: /api/slides/courseId/lectureId
        if (params.length !== 2) {
            return NextResponse.json(
                { error: 'Invalid parameters. Expected format: courseId/lectureId' },
                { status: 400 }
            );
        }

        const [courseId, lectureId] = params;

        if (!courseId || !lectureId) {
            return NextResponse.json(
                { error: 'Both courseId and lectureId are required' },
                { status: 400 }
            );
        }

        const slides = await loadLectureSlides(lectureId, courseId);

        if (slides.length === 0) {
            return NextResponse.json(
                { error: `No slides found for course ${courseId}, lecture ${lectureId}` },
                { status: 404 }
            );
        }

        return NextResponse.json({
            courseId,
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