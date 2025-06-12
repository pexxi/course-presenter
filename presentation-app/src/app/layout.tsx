import type { Metadata, Viewport } from "next";
import { Fira_Code, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const firaCode = Fira_Code({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "Presentation App - Cursor AI Course",
	description:
		"A dual-window presentation system with speaker notes and real-time synchronization",
	keywords: ["presentation", "slides", "cursor", "ai", "course"],
	authors: [{ name: "Cursor AI Course" }],
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className="h-full">
			<body
				className={`${inter.className} ${firaCode.className} h-full bg-white text-gray-900 antialiased`}
			>
				<div className="min-h-full">{children}</div>
			</body>
		</html>
	);
}
