interface SpeakerViewProps {
    params: Promise<{ lectureId: string }>;
}

export default async function SpeakerView({
    params
}: SpeakerViewProps) {
    const { lectureId } = await params;

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow-sm border-b p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-gray-900">
                        Speaker View - {lectureId}
                    </h1>
                    <div className="text-sm text-gray-500">
                        Phase 5 Implementation
                    </div>
                </div>
            </header>

            {/* Main Layout - Will be 50% slide preview, 25% notes, 25% controls */}
            <div className="flex flex-col h-[calc(100vh-80px)]">
                {/* Slide Preview Area (50%) */}
                <div className="flex-1 bg-white m-4 rounded-lg shadow-md p-6">
                    <div className="h-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                        <div className="text-center text-gray-500">
                            <h2 className="text-xl font-medium mb-2">Slide Preview</h2>
                            <p>Current slide will be displayed here (50% of screen)</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Half: Notes and Controls */}
                <div className="flex flex-1 gap-4 mx-4 mb-4">
                    {/* Speaker Notes (50% of bottom half = 25% total) */}
                    <div className="flex-1 bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Speaker Notes</h3>
                        <div className="h-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                            <p className="text-gray-500">Speaker notes will appear here</p>
                        </div>
                    </div>

                    {/* Controls (50% of bottom half = 25% total) */}
                    <div className="flex-1 bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Controls</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-center h-16 bg-gray-50 rounded-lg">
                                <p className="text-gray-500">Navigation Controls</p>
                            </div>
                            <div className="flex items-center justify-center h-16 bg-gray-50 rounded-lg">
                                <p className="text-gray-500">Timer & Progress</p>
                            </div>
                            <div className="flex items-center justify-center h-16 bg-gray-50 rounded-lg">
                                <p className="text-gray-500">Sync Status</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 