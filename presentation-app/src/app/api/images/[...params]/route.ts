import fs from "node:fs";
import path from "node:path";
import { getImageContentType, isValidImageFile } from "@/utils/image-helpers";
import { type NextRequest, NextResponse } from "next/server";

interface RouteParams {
	params: Promise<{ params: string[] }>;
}

export async function GET(request: NextRequest, context: RouteParams) {
	try {
		const { params } = await context.params;

		// Expected format: /api/images/courseId/lectureId/filename
		if (params.length !== 3) {
			return NextResponse.json(
				{
					error:
						"Invalid parameters. Expected format: courseId/lectureId/filename",
				},
				{ status: 400 },
			);
		}

		const [courseId, lectureId, filename] = params;

		if (!courseId || !lectureId || !filename) {
			return NextResponse.json(
				{ error: "courseId, lectureId, and filename are required" },
				{ status: 400 },
			);
		}

		// Validate that it's a valid image file
		if (!isValidImageFile(filename)) {
			return NextResponse.json(
				{ error: `Invalid image file: ${filename}` },
				{ status: 400 },
			);
		}

		// Construct the path to the image file
		const imagePath = path.join(
			process.cwd(),
			"courses",
			courseId,
			lectureId,
			filename,
		);

		// Check if the file exists
		if (!fs.existsSync(imagePath)) {
			return NextResponse.json(
				{ error: `Image not found: ${filename}` },
				{ status: 404 },
			);
		}

		// Check if it's actually a file (not a directory)
		const stats = fs.statSync(imagePath);
		if (!stats.isFile()) {
			return NextResponse.json(
				{ error: `${filename} is not a file` },
				{ status: 400 },
			);
		}

		// Get content type based on file extension
		const contentType = getImageContentType(filename);

		// Read the file
		const imageBuffer = fs.readFileSync(imagePath);

		// Return the image with appropriate headers
		return new NextResponse(imageBuffer, {
			status: 200,
			headers: {
				"Content-Type": contentType,
				"Cache-Control": "public, max-age=31536000, immutable", // Cache for 1 year
				"Content-Length": imageBuffer.length.toString(),
			},
		});
	} catch (error) {
		console.error("Error serving image:", error);
		return NextResponse.json(
			{ error: "Failed to serve image" },
			{ status: 500 },
		);
	}
}
