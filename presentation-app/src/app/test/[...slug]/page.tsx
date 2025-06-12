import { TestPageClient } from "./TestPageClient";

interface TestPageProps {
	params: Promise<{ slug: string[] }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function TestPage({
	params,
	searchParams: _searchParams,
}: TestPageProps) {
	const resolvedParams = await params;

	// Show error for invalid URL format
	if (resolvedParams.slug.length !== 2) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-xl text-red-600">
					Invalid URL format. Expected: /test/courseId/lectureId
				</div>
			</div>
		);
	}

	const [courseId, lectureId] = resolvedParams.slug;

	return <TestPageClient courseId={courseId} lectureId={lectureId} />;
}
