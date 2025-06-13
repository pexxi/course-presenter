import type { BroadcastEvents } from "@/types";
import { useCallback, useEffect, useMemo, useState } from "react";

type EventCallback = (...args: any[]) => void;

class EventEmitter {
	private events: Record<string, EventCallback[]> = {};

	on(event: string, callback: EventCallback) {
		if (!this.events[event]) {
			this.events[event] = [];
		}
		this.events[event].push(callback);
		return this;
	}

	off(event: string, callback: EventCallback) {
		if (!this.events[event]) return this;
		this.events[event] = this.events[event].filter(cb => cb !== callback);
		return this;
	}

	emit(event: string, ...args: any[]) {
		if (!this.events[event]) return;
		this.events[event].forEach(callback => callback(...args));
	}
}

type ClientType = "presentation" | "speaker";

interface BroadcastClientConfig {
	lectureId: string;
	clientType: ClientType;
	onSlideChange?: (slideIndex: number) => void;
	onConnectionChange?: (connected: boolean) => void;
	onError?: (error: string) => void;
	onSyncRequest?: () => void;
}

interface ClientHeartbeatMessage {
	type: "client-heartbeat";
	data: {
		clientId: string;
		clientType: ClientType;
	};
}

interface SlideChangeMessage {
	type: "slide-change";
	data: {
		slideIndex: number;
		lectureId: string;
		sourceClient: string;
		sourceType: ClientType;
	};
}

interface SyncRequestMessage {
	type: "sync-request";
	data: {
		clientId: string;
	};
}

interface ClientDisconnectedMessage {
	type: "client-disconnected";
	data: {
		clientId: string;
		clientType: ClientType;
	};
}

interface ClientConnectedMessage {
	type: "client-connected";
	data: {
		clientId: string;
		clientType: ClientType;
	};
}

interface SyncResponseMessage {
	type: "sync-response";
	data: {
		currentSlide: number;
		lectureId: string;
	};
}

type BroadcastMessage =
	| ClientHeartbeatMessage
	| SlideChangeMessage
	| SyncRequestMessage
	| ClientDisconnectedMessage
	| SyncResponseMessage
	| ClientConnectedMessage;

class BroadcastClient extends EventEmitter {
	private channel: BroadcastChannel | null = null;
	private config: BroadcastClientConfig | null = null;
	private clientId: string;
	private isConnected = false;
	private heartbeatInterval: NodeJS.Timeout | null = null;
	private syncTimeout: NodeJS.Timeout | null = null;

	constructor() {
		super();
		// Generate unique client ID
		this.clientId = `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

		// Bind methods to preserve context
		this.handleMessage = this.handleMessage.bind(this);
		this.handleSlideChange = this.handleSlideChange.bind(this);
		this.handleSyncRequest = this.handleSyncRequest.bind(this);
		this.handleSyncResponse = this.handleSyncResponse.bind(this);
		this.handleClientHeartbeat = this.handleClientHeartbeat.bind(this);
		this.sendHeartbeat = this.sendHeartbeat.bind(this);
		this.handleConnectionChange = this.handleConnectionChange.bind(this);
	}

	private handleConnectionChange = (connected: boolean) => {
		// Only update if the state actually changed
		if (this.isConnected !== connected) {
			this.isConnected = connected;
			// Notify listeners
			this.config?.onConnectionChange?.(connected);
			this.emit('connectionChange', connected);
		}
	};

	connect(config: BroadcastClientConfig): void {
		// If already connected with the same config, do nothing
		if (this.isConnected && this.config?.lectureId === config.lectureId) {
			console.log("Already connected to the same lecture");
			return;
		}

		// Disconnect from previous connection if any
		if (this.isConnected) {
			this.disconnect();
		}

		this.config = config;

		try {
			this.channel = new BroadcastChannel(`lecture-${config.lectureId}`);

			// Set up message handler
			this.channel.addEventListener("message", this.handleMessage);

			// Send initial connection message
			this.postMessage({
				type: "client-connected",
				data: {
					clientId: this.clientId,
					clientType: config.clientType,
				},
			});

			// Start heartbeat
			this.startHeartbeat();

			// Update connection state
			this.handleConnectionChange(true);
		} catch (error) {
			console.error("Failed to connect to broadcast channel:", error);
			this.config = null;
			this.handleConnectionChange(false);
		}
	}

	private handleMessage(event: MessageEvent): void {
		try {
			const message = event.data;

			// Don't process our own messages
			if (message.senderId === this.clientId) {
				return;
			}

			switch (message.type) {
				case "slide-change":
					this.handleSlideChange(message.data);
					break;
				case "sync-request":
					this.handleSyncRequest(message.data);
					break;
				case "sync-response":
					this.handleSyncResponse(message.data);
					break;
				case "client-connected":
				case "client-disconnected":
				case "client-heartbeat":
					this.handleClientHeartbeat(message);
					break;
				default:
					console.warn("Unknown broadcast message type:", message.type);
			}
		} catch (error) {
			console.error("Error handling broadcast message:", error);
		}
	}

	private handleSlideChange(
		data: BroadcastEvents["slide-change"] & {
			sourceClient?: string;
			sourceType?: ClientType;
		},
	): void {
		console.log("Received slide change:", data);

		if (!this.config || data.lectureId !== this.config.lectureId) {
			return;
		}

		// Notify config callback
		this.config.onSlideChange?.(data.slideIndex);
	}

	private handleSyncRequest(data: BroadcastEvents["sync-request"]): void {
		console.log("Received sync request:", data);

		if (!this.config) return;

		// Only presentation clients should respond to sync requests with current state
		if (this.config.clientType === "presentation") {
			// Notify the component about the sync request
			// The component should handle getting the current slide and call requestSync with it
			this.config.onSyncRequest?.();
		}
	}

	private handleSyncResponse(message: BroadcastMessage): void {
		if (message.type !== "sync-response" || !this.config) return;
		const { data } = message;

		// Only process sync responses that match our current lecture
		if (data.lectureId !== this.config.lectureId) {
			return;
		}

		// Notify about the slide change
		this.config.onSlideChange?.(data.currentSlide);
	}

	private handleClientHeartbeat(message: BroadcastMessage): void {
		// Could be used for tracking connected clients in the future
		console.log("Client activity:", message.type, message.data);
	}

	private startHeartbeat(): void {
		if (this.heartbeatInterval) {
			clearInterval(this.heartbeatInterval);
		}

		// Send heartbeat every 30 seconds
		this.heartbeatInterval = setInterval(this.sendHeartbeat, 30000);
	}

	private sendHeartbeat(): void {
		if (!this.config) return;

		this.postMessage({
			type: "client-heartbeat",
			data: {
				clientId: this.clientId,
				clientType: this.config.clientType,
			},
		});
	}

	private postMessage(message: BroadcastMessage): void {
		if (!this.channel || !this.isConnected) {
			console.warn("Cannot post message: not connected to broadcast channel");
			return;
		}

		try {
			this.channel.postMessage({
				...message,
				senderId: this.clientId,
				timestamp: Date.now(),
			});
		} catch (error) {
			console.error("Error posting broadcast message:", error);
		}
	}

	// Public methods for sending events
	emitSlideChange(slideIndex: number): void {
		if (!this.isConnected || !this.config) {
			console.warn("Cannot emit slide change: not connected");
			return;
		}

		this.postMessage({
			type: "slide-change",
			data: {
				slideIndex,
				lectureId: this.config.lectureId,
				sourceClient: this.clientId,
				sourceType: this.config.clientType,
			},
		});
	}

	requestSync(): void {
		if (!this.isConnected) {
			console.warn("Cannot request sync: not connected");
			return;
		}

		this.postMessage({
			type: "sync-request",
			data: {
				clientId: this.clientId,
			},
		});
	}

	loadLecture(lectureId: string): void {
		if (!this.config) {
			console.warn("Cannot load lecture: not configured");
			return;
		}

		// Update config with new lecture ID
		const oldLectureId = this.config.lectureId;
		this.config.lectureId = lectureId;

		// If we're changing lectures, reconnect to the new channel
		if (oldLectureId !== lectureId) {
			const clientType = this.config.clientType;
			const callbacks = {
				onSlideChange: this.config.onSlideChange,
				onConnectionChange: this.config.onConnectionChange,
				onError: this.config.onError,
			};

			this.disconnect();
			this.connect({
				lectureId,
				clientType,
				...callbacks,
			});
		}
	}

	disconnect(): void {
		// If already disconnected, do nothing
		if (!this.isConnected && !this.channel) {
			return;
		}

		// Clear intervals and timeouts
		if (this.heartbeatInterval) {
			clearInterval(this.heartbeatInterval);
			this.heartbeatInterval = null;
		}

		if (this.syncTimeout) {
			clearTimeout(this.syncTimeout);
			this.syncTimeout = null;
		}

		const wasConnected = this.isConnected;
		const currentConfig = this.config;
		
		// Mark as disconnected before making any callbacks
		this.isConnected = false;
		this.config = null;

		try {
			if (this.channel) {
				// Announce disconnection if we were connected and have a config
				if (wasConnected && currentConfig) {
					// Store the channel reference before cleanup
					const channel = this.channel;
					
					try {
						channel.postMessage({
							type: "client-disconnected",
							data: {
								clientId: this.clientId,
								clientType: currentConfig.clientType,
							},
						});
					} catch (e) {
						console.warn("Failed to send disconnect message:", e);
					}
				}

				// Clean up channel
				this.channel.removeEventListener("message", this.handleMessage);
				this.channel.close();
			}
		} catch (e) {
			console.warn("Error during disconnect cleanup:", e);
		} finally {
			// Ensure channel is null even if there was an error
			this.channel = null;

			// Notify callbacks after all cleanup is done
			if (wasConnected) {
				try {
					currentConfig?.onConnectionChange?.(false);
				} catch (e) {
					console.error("Error in onConnectionChange callback:", e);
				}
			}

			// Emit event last
			if (wasConnected) {
				this.emit('connectionChange', false);
			}

			console.log("Disconnected from broadcast channel");
		}
	}

	// Helper to get client ID
	public getClientId(): string {
		return this.clientId;
	}

	// Helper to check if connected
	public isConnectedToBroadcast(): boolean {
		return this.isConnected;
	}
}

// Create singleton instance
const broadcastClient = new BroadcastClient();
export default broadcastClient;

// React hook for easier usage in components
export function useBroadcast() {
	const [isConnected, setIsConnected] = useState(broadcastClient.isConnectedToBroadcast());

	// Memoize the connection change handler
	const handleConnectionChange = useCallback((connected: boolean) => {
		setIsConnected(connected);
	}, []);

	useEffect(() => {
		// Set initial state
		setIsConnected(broadcastClient.isConnectedToBroadcast());

		// Subscribe to connection changes
		broadcastClient.on('connectionChange', handleConnectionChange);

		return () => {
			// Unsubscribe when component unmounts
			broadcastClient.off('connectionChange', handleConnectionChange);
		};
	}, [handleConnectionChange]);

	const connect = useCallback((broadcastConfig: BroadcastClientConfig) => {
		if (!broadcastConfig.lectureId) {
			console.error('Cannot connect: lectureId is required');
			return;
		}

		try {
			broadcastClient.connect({
				...broadcastConfig,
				onConnectionChange: (connected) => {
					// Update local state
					setIsConnected(connected);
					// Call the original callback if provided
					broadcastConfig.onConnectionChange?.(connected);
				}
			});
		} catch (error) {
			console.error('Failed to connect to broadcast channel:', error);
			setIsConnected(false);
		}
	}, []);

	const disconnect = useCallback(() => {
		try {
			broadcastClient.disconnect();
			// Don't set isConnected to false here - wait for the connectionChange event
		} catch (error) {
			console.error('Error disconnecting from broadcast channel:', error);
		}
	}, []);

	const emitSlideChange = useCallback((slideIndex: number) => {
		if (!isConnected) {
			console.warn('Cannot emit slide change: not connected to broadcast channel');
			return;
		}
		broadcastClient.emitSlideChange(slideIndex);
	}, [isConnected]);

	const requestSync = useCallback(() => {
		if (isConnected) {
			broadcastClient.requestSync();
		}
	}, [isConnected]);

	const loadLecture = useCallback((lectureId: string) => {
		broadcastClient.loadLecture(lectureId);
	}, []);

	return useMemo(() => ({
		connect,
		disconnect,
		emitSlideChange,
		requestSync,
		loadLecture,
		isConnected,
		clientId: broadcastClient.getClientId(),
	}), [
		connect,
		disconnect,
		emitSlideChange,
		isConnected,
		loadLecture,
		requestSync,
	]);
}
