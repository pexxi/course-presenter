/**
 * Parse duration string (e.g., "30 minutes", "1.5 hours", "90 minutes") to minutes
 */
export function parseDurationToMinutes(
	durationString: string | undefined,
): number {
	if (!durationString) return 0;

	// Normalize the string
	const normalized = durationString.toLowerCase().trim();

	// Extract numbers (supports decimals)
	const numberMatch = normalized.match(/(\d+(?:\.\d+)?)/);
	if (!numberMatch) return 0;

	const value = Number.parseFloat(numberMatch[1]);

	// Check for unit type
	if (normalized.includes("hour")) {
		return Math.round(value * 60); // Convert hours to minutes
	}
	if (normalized.includes("minute") || normalized.includes("min")) {
		return Math.round(value);
	}

	// Default to minutes if no unit specified
	return Math.round(value);
}

/**
 * Format minutes to human-readable duration (e.g., "1h 30m", "45m")
 */
export function formatMinutesToDuration(minutes: number): string {
	if (minutes === 0) return "0m";

	const hours = Math.floor(minutes / 60);
	const remainingMinutes = minutes % 60;

	if (hours === 0) {
		return `${remainingMinutes}m`;
	}
	if (remainingMinutes === 0) {
		return `${hours}h`;
	}
	return `${hours}h ${remainingMinutes}m`;
}

/**
 * Format minutes to clock format (e.g., "30:00", "1:30:00")
 */
export function formatMinutesToClock(minutes: number): string {
	const hours = Math.floor(minutes / 60);
	const remainingMinutes = minutes % 60;

	if (hours === 0) {
		return `${remainingMinutes.toString().padStart(2, "0")}:00`;
	}
	return `${hours}:${remainingMinutes.toString().padStart(2, "0")}:00`;
}

/**
 * Calculate total duration for a course based on lecture durations
 */
export function calculateCourseDuration(
	lectures: Array<{ duration?: string }>,
): string {
	const totalMinutes = lectures.reduce((total, lecture) => {
		return total + parseDurationToMinutes(lecture.duration);
	}, 0);

	return formatMinutesToDuration(totalMinutes);
}

/**
 * Get planned duration in minutes for a lecture
 */
export function getLectureDurationInMinutes(lecture: {
	duration?: string;
}): number {
	return parseDurationToMinutes(lecture.duration);
}
