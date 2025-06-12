import { PresentationView } from '@/components/PresentationView'

interface PresentationPageProps {
    params: Promise<{ params: string[] }>;
}

export default async function PresentationPage({
    params
}: PresentationPageProps) {
    const { params: routeParams } = await params;

    // Expected format: /presentation/courseId/lectureId
    if (routeParams.length !== 2) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl text-red-600">
                    Invalid URL format. Expected: /presentation/courseId/lectureId
                </div>
            </div>
        );
    }

    const [courseId, lectureId] = routeParams;

    return <PresentationView lectureId={lectureId} courseId={courseId} />;
} 