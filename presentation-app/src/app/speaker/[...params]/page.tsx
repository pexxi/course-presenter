import { SpeakerView } from '@/components/SpeakerView'

interface SpeakerPageProps {
    params: Promise<{ params: string[] }>;
}

export default async function SpeakerPage({
    params
}: SpeakerPageProps) {
    const { params: routeParams } = await params;

    // Expected format: /speaker/courseId/lectureId
    if (routeParams.length !== 2) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl text-red-600">
                    Invalid URL format. Expected: /speaker/courseId/lectureId
                </div>
            </div>
        );
    }

    const [courseId, lectureId] = routeParams;

    return <SpeakerView lectureId={lectureId} courseId={courseId} />;
} 