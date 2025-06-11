import { SpeakerView } from '@/components/SpeakerView'

interface SpeakerPageProps {
    params: Promise<{ lectureId: string }>;
}

export default async function SpeakerPage({
    params
}: SpeakerPageProps) {
    const { lectureId } = await params;

    return <SpeakerView lectureId={lectureId} />;
} 