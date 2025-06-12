import { NextRequest, NextResponse } from 'next/server';
import { getLectureInfo } from '@/lib/lecture-loader';

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ courseId: string; lectureId: string }> }
) {
    try {
        const { courseId, lectureId } = await context.params;

        if (!courseId || !lectureId) {
            return NextResponse.json(
                { error: 'Course ID and Lecture ID are required' },
                { status: 400 }
            );
        }

        const lectureInfo = await getLectureInfo(lectureId, courseId);

        if (!lectureInfo) {
            return NextResponse.json(
                { error: 'Lecture not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(lectureInfo);
    } catch (error) {
        console.error('Error fetching lecture info:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
} 