import Link from 'next/link'
import { getAllLectures, type LectureInfo } from '@/lib/lecture-loader'

async function getLectures(): Promise<LectureInfo[]> {
  try {
    return await getAllLectures();
  } catch (error) {
    console.error('Failed to load lectures:', error);
    return [];
  }
}

export default async function Home() {
  const lectures = await getLectures();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Presentation App
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A dual-window presentation system with speaker notes and real-time synchronization
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Available Lectures
            </h2>
            <div className="text-sm text-gray-500">
              {lectures.length} lecture{lectures.length !== 1 ? 's' : ''} found
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            {lectures.map((lecture) => (
              <div
                key={lecture.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-gray-900 flex-1">
                    {lecture.title}
                  </h3>
                  {lecture.level && (
                    <span className={`
                      px-2 py-1 text-xs font-medium rounded-full ml-3
                      ${lecture.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                        lecture.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'}
                    `}>
                      {lecture.level}
                    </span>
                  )}
                </div>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {lecture.description}
                </p>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <span>📄</span>
                    <span>{lecture.slideCount} slide{lecture.slideCount !== 1 ? 's' : ''}</span>
                  </div>
                  {lecture.duration && (
                    <div className="flex items-center gap-1">
                      <span>⏱️</span>
                      <span>{lecture.duration}</span>
                    </div>
                  )}
                  {lecture.author && (
                    <div className="flex items-center gap-1">
                      <span>👤</span>
                      <span>{lecture.author}</span>
                    </div>
                  )}
                </div>

                {lecture.tags && lecture.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {lecture.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex gap-3">
                  <Link
                    href={`/presentation/${lecture.id}`}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md text-center transition-colors duration-200"
                  >
                    Start Presentation
                  </Link>
                  <Link
                    href={`/speaker/${lecture.id}`}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md text-center transition-colors duration-200"
                  >
                    Speaker View
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {lectures.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📁</div>
              <p className="text-gray-500 text-lg mb-2">
                No lectures found
              </p>
              <p className="text-gray-400 text-sm max-w-lg mx-auto">
                Add lecture directories to the <code className="bg-gray-100 px-2 py-1 rounded">presentation/</code> folder,
                each containing an <code className="bg-gray-100 px-2 py-1 rounded">info.json</code> file and slide markdown files.
              </p>
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-sm p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              How to Use
            </h3>
            <div className="text-gray-600 space-y-2">
              <p><strong>Presentation View:</strong> Fullscreen slides for projector/screen</p>
              <p><strong>Speaker View:</strong> Control interface with notes and navigation</p>
              <p><strong>Synchronization:</strong> Both windows stay in sync automatically</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
