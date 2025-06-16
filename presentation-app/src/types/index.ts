export interface SlideHeader {
	template: "cover" | "content" | "code";
	title: string;
	image?: string; // for cover slides
}

export interface Slide {
	id: string;
	lectureId: string;
	courseId: string; // Required courseId for new structure
	slideNumber: number;
	template: SlideHeader["template"];
	title: string;
	content: string; // HTML content (empty for cover slides)
	rawContent: string; // Original markdown content
	speakerNotes: string; // Extracted from HTML comments
	language?: string; // Detected from code blocks
	header: SlideHeader;
}

export interface Lecture {
	id: string;
	title: string;
	courseId: string; // Required courseId for new structure
	slides: Slide[];
	currentSlide: number;
}

export interface LectureInfo {
	id: string;
	title: string;
	description: string;
	courseId: string; // Required courseId for new structure
	author?: string;
	duration?: string;
	slides: number;
}

export interface CourseInfo {
	id: string;
	title: string;
	description: string;
	lectures: LectureInfo[];
	// Course metadata from info.json
	author?: string;
	level?: string;
	tags?: string[];
	image?: string;
	category?: string;
	prerequisites?: string[];
	learningObjectives?: string[];
	createdAt?: string;
	updatedAt?: string;
	version?: string;
}

// Legacy SocketEvents for backward compatibility during migration
export interface SocketEvents {
	"slide-change": { slideIndex: number; lectureId: string };
	"sync-request": { clientId: string };
	"sync-response": { currentSlide: number; lectureId: string };
	"lecture-load": { lectureId: string };
	"join-lecture": { lectureId: string; clientType: "presentation" | "speaker" };
	"client-connected": {
		clientId: string;
		clientType: "presentation" | "speaker";
		timestamp: number;
	};
	"client-disconnected": {
		clientId: string;
		clientType: "presentation" | "speaker";
		timestamp: number;
	};
	error: { message: string };
}

// New BroadcastEvents for Broadcast Channel API
export interface BroadcastEvents {
	"slide-change": { slideIndex: number; lectureId: string };
	"sync-request": { clientId: string; timestamp: number };
	"sync-response": {
		currentSlide: number;
		lectureId: string;
		timestamp: number;
	};
	"client-connected": {
		clientId: string;
		clientType: "presentation" | "speaker";
		timestamp: number;
	};
	"client-disconnected": {
		clientId: string;
		clientType: "presentation" | "speaker";
		timestamp: number;
	};
	"client-heartbeat": {
		clientId: string;
		clientType: "presentation" | "speaker";
		timestamp: number;
	};
}

export interface PresentationState {
	currentLecture: Lecture | null;
	currentSlideIndex: number;
	isConnected: boolean;
	isLoading: boolean;
	error: string | null;
}

export interface ProcessedSlide extends Slide {
	processedContent?: string;
}
