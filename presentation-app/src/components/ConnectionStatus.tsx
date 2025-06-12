"use client";

interface ConnectionStatusProps {
	isConnected: boolean;
	className?: string;
	showText?: boolean;
}

export default function ConnectionStatus({
	isConnected,
	className = "",
	showText = true,
}: ConnectionStatusProps) {
	return (
		<div className={`flex items-center gap-2 ${className}`}>
			<div className="relative">
				<div
					className={`w-3 h-3 rounded-full transition-colors duration-200 ${
						isConnected ? "bg-green-500" : "bg-red-500"
					}`}
				/>
				{isConnected && (
					<div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-75" />
				)}
			</div>

			{showText && (
				<span
					className={`text-sm font-medium ${
						isConnected ? "text-green-700" : "text-red-700"
					}`}
				>
					{isConnected ? "Connected" : "Disconnected"}
				</span>
			)}
		</div>
	);
}

export function DetailedConnectionStatus({
	isConnected,
	clientCount = 0,
	className = "",
}: {
	isConnected: boolean;
	clientCount?: number;
	className?: string;
}) {
	return (
		<div className={`flex items-center gap-4 ${className}`}>
			<ConnectionStatus isConnected={isConnected} showText={true} />

			{isConnected && (
				<div className="flex items-center gap-1 text-sm text-gray-600">
					<svg
						className="w-4 h-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						aria-label="Users"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
						/>
					</svg>
					<span>
						{clientCount} client{clientCount !== 1 ? "s" : ""}
					</span>
				</div>
			)}
		</div>
	);
}
