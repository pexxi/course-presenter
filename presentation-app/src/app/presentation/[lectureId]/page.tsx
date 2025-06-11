import { PresentationView } from '@/components/PresentationView'

interface PresentationPageProps {
    params: Promise<{ lectureId: string }>;
}

export default async function PresentationPage({
    params
}: PresentationPageProps) {
    const { lectureId } = await params;

    return <PresentationView lectureId={lectureId} />;
} 