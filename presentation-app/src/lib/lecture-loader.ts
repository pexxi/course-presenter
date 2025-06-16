import fs from "node:fs";
import path from "node:path";
import type { CourseInfo, LectureInfo } from "@/types";

/**
 * Get all available courses and their lectures
 */
export async function getAllCourses(): Promise<CourseInfo[]> {
	const coursesDir = path.join(process.cwd(), "courses");

	try {
		// Check if courses directory exists
		if (!fs.existsSync(coursesDir)) {
			console.warn("Courses directory not found");
			return [];
		}

		const courseDirectories = fs
			.readdirSync(coursesDir, { withFileTypes: true })
			.filter((dirent) => dirent.isDirectory())
			.map((dirent) => dirent.name);

		const courses: CourseInfo[] = [];

		for (const courseId of courseDirectories) {
			try {
				const courseInfo = await getCourseInfo(courseId);
				if (courseInfo) {
					courses.push(courseInfo);
				}
			} catch (error) {
				console.error(`Error loading course info for ${courseId}:`, error);
				// Continue with other courses even if one fails
			}
		}

		return courses.sort((a, b) => a.id.localeCompare(b.id));
	} catch (error) {
		console.error("Error scanning course directories:", error);
		return [];
	}
}

/**
 * Get course information and all its lectures
 */
export async function getCourseInfo(
	courseId: string,
): Promise<CourseInfo | null> {
	const coursePath = path.join(process.cwd(), "courses", courseId);

	try {
		// Check if course directory exists
		if (!fs.existsSync(coursePath)) {
			return null;
		}

		// Read course info.json if it exists
		let courseData: Partial<CourseInfo> = {
			title: `Course ${courseId}`,
			description: `Course ${courseId} - No description available`,
		};

		const courseInfoPath = path.join(coursePath, "info.json");
		if (fs.existsSync(courseInfoPath)) {
			try {
				const infoContent = fs.readFileSync(courseInfoPath, "utf-8");
				const parsedInfo = JSON.parse(infoContent);
				courseData = { ...courseData, ...parsedInfo };
			} catch (error) {
				console.error(`Error parsing course info.json for ${courseId}:`, error);
			}
		}

		// Get all lectures in this course
		const lectures = await getLecturesInCourse(courseId);

		return {
			id: courseId,
			title: courseData.title || `Course ${courseId}`,
			description: courseData.description || "No description available",
			lectures,
			// Course metadata
			author: courseData.author,
			level: courseData.level,
			tags: courseData.tags,
			image: courseData.image,
			category: courseData.category,
			prerequisites: courseData.prerequisites,
			learningObjectives: courseData.learningObjectives,
			createdAt: courseData.createdAt,
			updatedAt: courseData.updatedAt,
			version: courseData.version,
		};
	} catch (error) {
		console.error(`Error reading course info for ${courseId}:`, error);
		return null;
	}
}

/**
 * Get all lectures in a specific course
 */
export async function getLecturesInCourse(
	courseId: string,
): Promise<LectureInfo[]> {
	const coursePath = path.join(process.cwd(), "courses", courseId);

	try {
		if (!fs.existsSync(coursePath)) {
			return [];
		}

		const lectureDirectories = fs
			.readdirSync(coursePath, { withFileTypes: true })
			.filter((dirent) => dirent.isDirectory())
			.map((dirent) => dirent.name);

		const lectures: LectureInfo[] = [];

		for (const lectureId of lectureDirectories) {
			try {
				const lectureInfo = await getLectureInfo(lectureId, courseId);
				if (lectureInfo) {
					lectures.push(lectureInfo);
				}
			} catch (error) {
				console.error(
					`Error loading lecture info for ${courseId}/${lectureId}:`,
					error,
				);
				// Continue with other lectures even if one fails
			}
		}

		return lectures.sort((a, b) => a.id.localeCompare(b.id));
	} catch (error) {
		console.error(
			`Error scanning lecture directories in course ${courseId}:`,
			error,
		);
		return [];
	}
}

/**
 * Get all available lectures across all courses
 */
export async function getAllLectures(): Promise<LectureInfo[]> {
	try {
		const courses = await getAllCourses();
		const allLectures: LectureInfo[] = [];

		for (const course of courses) {
			allLectures.push(...course.lectures);
		}

		return allLectures;
	} catch (error) {
		console.error("Error getting all lectures:", error);
		return [];
	}
}

/**
 * Get lecture information from info.json and count slides
 */
export async function getLectureInfo(
	lectureId: string,
	courseId: string,
): Promise<LectureInfo | null> {
	const lecturePath = path.join(process.cwd(), "courses", courseId, lectureId);

	try {
		// Check if lecture directory exists
		if (!fs.existsSync(lecturePath)) {
			return null;
		}

		// Read info.json if it exists
		let lectureData: Partial<LectureInfo> = {
			title: `Lecture ${lectureId}`,
			description: `Lecture ${lectureId} - No description available`,
		};

		const infoPath = path.join(lecturePath, "info.json");
		if (fs.existsSync(infoPath)) {
			try {
				const infoContent = fs.readFileSync(infoPath, "utf-8");
				const parsedInfo = JSON.parse(infoContent);
				lectureData = { ...lectureData, ...parsedInfo };
			} catch (error) {
				console.error(
					`Error parsing lecture info.json for ${courseId}/${lectureId}:`,
					error,
				);
			}
		}

		return {
			id: lectureId,
			title: lectureData.title || `Lecture ${lectureId}`,
			description: lectureData.description || "No description available",
			courseId,
			author: lectureData.author,
			duration: lectureData.duration,
			slides: lectureData.slides || 0,
		};
	} catch (error) {
		console.error(
			`Error reading lecture info for course ${courseId}, lecture ${lectureId}:`,
			error,
		);
		return null;
	}
}

/**
 * Count the number of slide files in a lecture directory
 */
function countSlideFiles(lecturePath: string): number {
	try {
		const files = fs.readdirSync(lecturePath);
		return files.filter((file) => file.endsWith(".md")).length;
	} catch (error) {
		console.error("Error counting slide files:", error);
		return 0;
	}
}
