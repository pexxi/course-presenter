import { StartPresentationButton } from "@/components/StartPresentationButton";
import { getAllCourses } from "@/lib/lecture-loader";
import type { CourseInfo } from "@/types";
import { calculateCourseDuration } from "@/utils/duration-helpers";
import Link from "next/link";

async function getCourses(): Promise<CourseInfo[]> {
	try {
		return await getAllCourses();
	} catch (error) {
		console.error("Failed to load courses:", error);
		return [];
	}
}

export default async function Home() {
	const courses = await getCourses();
	const totalLectures = courses.reduce(
		(total, course) => total + course.lectures.length,
		0,
	);

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
			<div className="container mx-auto px-4 py-12">
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold text-gray-900 mb-4">
						Presentation App
					</h1>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">
						A dual-window presentation system with speaker notes and real-time
						synchronization
					</p>
				</div>

				<div className="max-w-6xl mx-auto">
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-2xl font-semibold text-gray-800">
							Available Courses
						</h2>
						<div className="text-sm text-gray-500">
							{courses.length} course{courses.length !== 1 ? "s" : ""} •{" "}
							{totalLectures} lecture{totalLectures !== 1 ? "s" : ""}
						</div>
					</div>

					<div className="space-y-8">
						{courses.map((course) => (
							<div
								key={course.id}
								className="bg-white rounded-lg shadow-lg overflow-hidden"
							>
								{/* Course Header */}
								<div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
									<div className="flex items-start justify-between mb-3">
										<h3 className="text-2xl font-bold flex-1">
											{course.title}
										</h3>
										{course.level && (
											<span className="px-3 py-1 text-sm font-medium rounded-full bg-white/20 backdrop-blur-sm ml-4">
												{course.level}
											</span>
										)}
									</div>

									<p className="text-blue-100 mb-4 leading-relaxed">
										{course.description}
									</p>

									{/* Course Metadata */}
									<div className="flex flex-wrap items-center gap-4 text-sm text-blue-100">
										<div className="flex items-center gap-1">
											<span>📚</span>
											<span>
												{course.lectures.length} lecture
												{course.lectures.length !== 1 ? "s" : ""}
											</span>
										</div>
										<div className="flex items-center gap-1">
											<span>⏱️</span>
											<span>{calculateCourseDuration(course.lectures)}</span>
										</div>
										{course.author && (
											<div className="flex items-center gap-1">
												<span>👤</span>
												<span>{course.author}</span>
											</div>
										)}
										{course.category && (
											<div className="flex items-center gap-1">
												<span>🏷️</span>
												<span>{course.category}</span>
											</div>
										)}
									</div>

									{/* Course Tags */}
									{course.tags && course.tags.length > 0 && (
										<div className="flex flex-wrap gap-2 mt-4">
											{course.tags.map((tag: string) => (
												<span
													key={tag}
													className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-md"
												>
													{tag}
												</span>
											))}
										</div>
									)}

									{/* Prerequisites */}
									{course.prerequisites && course.prerequisites.length > 0 && (
										<div className="mt-4">
											<h4 className="text-sm font-medium text-blue-100 mb-2">
												Prerequisites:
											</h4>
											<ul className="text-sm text-blue-200 space-y-1">
												{course.prerequisites.map((prereq: string) => (
													<li key={prereq} className="flex items-start gap-2">
														<span className="text-blue-300 mt-1">•</span>
														<span>{prereq}</span>
													</li>
												))}
											</ul>
										</div>
									)}

									{/* Learning Objectives */}
									{course.learningObjectives &&
										course.learningObjectives.length > 0 && (
											<div className="mt-4">
												<h4 className="text-sm font-medium text-blue-100 mb-2">
													Learning Objectives:
												</h4>
												<ul className="text-sm text-blue-200 space-y-1">
													{course.learningObjectives.map(
														(objective: string) => (
															<li
																key={objective}
																className="flex items-start gap-2"
															>
																<span className="text-blue-300 mt-1">•</span>
																<span>{objective}</span>
															</li>
														),
													)}
												</ul>
											</div>
										)}
								</div>

								{/* Lectures List */}
								<div className="p-6">
									<h4 className="text-lg font-semibold text-gray-800 mb-4">
										Lectures
									</h4>

									<div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
										{course.lectures.map((lecture) => (
											<div
												key={lecture.id}
												className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
											>
												<div className="flex items-start justify-between mb-2">
													<h5 className="font-semibold text-gray-900 flex-1">
														{lecture.title}
													</h5>
												</div>

												<p className="text-gray-600 text-sm mb-3 leading-relaxed">
													{lecture.description}
												</p>

												<div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
													<div className="flex items-center gap-1">
														<span>📄</span>
														<span>
															{lecture.slideCount} slide
															{lecture.slideCount !== 1 ? "s" : ""}
														</span>
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

												<div className="flex gap-2">
													<StartPresentationButton
														lectureId={lecture.id}
														courseId={lecture.courseId}
														className="flex-1 text-sm"
													/>
													<Link
														href={`/speaker/${lecture.courseId}/${lecture.id}`}
														className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-3 rounded-md text-center text-sm transition-colors duration-200"
													>
														Speaker Only
													</Link>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						))}
					</div>

					{courses.length === 0 && (
						<div className="text-center py-12">
							<div className="text-6xl mb-4">📁</div>
							<p className="text-gray-500 text-lg mb-2">No courses found</p>
							<p className="text-gray-400 text-sm max-w-lg mx-auto">
								Add course directories to the{" "}
								<code className="bg-gray-100 px-2 py-1 rounded">courses/</code>{" "}
								folder, each containing an{" "}
								<code className="bg-gray-100 px-2 py-1 rounded">info.json</code>{" "}
								file and lecture folders with slide markdown files.
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
							<p>
								<strong>Presentation View:</strong> Fullscreen slides for
								projector/screen
							</p>
							<p>
								<strong>Speaker View:</strong> Control interface with notes and
								navigation
							</p>
							<p>
								<strong>Synchronization:</strong> Both windows stay in sync
								automatically
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
