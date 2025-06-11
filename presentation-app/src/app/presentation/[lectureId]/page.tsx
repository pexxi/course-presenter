interface PresentationViewProps {
    params: Promise<{ lectureId: string }>;
}

export default async function PresentationView({
    params
}: PresentationViewProps) {
    const { lectureId } = await params;

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">
                    Presentation View
                </h1>
                <p className="text-xl text-gray-300 mb-8">
                    Lecture: {lectureId}
                </p>
                <div className="bg-gray-800 rounded-lg p-8 max-w-2xl">
                    <p className="text-gray-400">
                        This fullscreen presentation view will be implemented in Phase 5.
                        <br />
                        It will display slides with minimal UI and support keyboard navigation.
                    </p>
                </div>
            </div>
        </div>
    )
} 