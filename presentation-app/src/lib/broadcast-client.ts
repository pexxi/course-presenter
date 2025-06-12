import { BroadcastEvents } from '@/types';
import { usePresentationStore } from './store';
import { useCallback } from 'react';

type ClientType = 'presentation' | 'speaker';

interface BroadcastClientConfig {
    lectureId: string;
    clientType: ClientType;
    onSlideChange?: (slideIndex: number) => void;
    onConnectionChange?: (connected: boolean) => void;
    onError?: (error: string) => void;
}

class BroadcastClient {
    private channel: BroadcastChannel | null = null;
    private config: BroadcastClientConfig | null = null;
    private clientId: string;
    private isConnected = false;
    private heartbeatInterval: NodeJS.Timeout | null = null;
    private syncTimeout: NodeJS.Timeout | null = null;

    constructor() {
        // Generate unique client ID
        this.clientId = `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        // Bind methods to preserve context
        this.handleMessage = this.handleMessage.bind(this);
        this.handleSlideChange = this.handleSlideChange.bind(this);
        this.handleSyncRequest = this.handleSyncRequest.bind(this);
        this.handleSyncResponse = this.handleSyncResponse.bind(this);
        this.handleClientHeartbeat = this.handleClientHeartbeat.bind(this);
        this.sendHeartbeat = this.sendHeartbeat.bind(this);
    }

    connect(config: BroadcastClientConfig): void {
        if (this.isConnected) {
            this.disconnect();
        }

        this.config = config;
        const channelName = `presentation_lecture_${config.lectureId}`;

        try {
            // Create broadcast channel for this lecture
            this.channel = new BroadcastChannel(channelName);
            this.channel.addEventListener('message', this.handleMessage);

            this.isConnected = true;
            console.log(`Connected to broadcast channel: ${channelName}`);

            // Update store connection status
            usePresentationStore.getState().setConnectionStatus(true);
            usePresentationStore.getState().setError(null);

            // Notify config callback
            this.config.onConnectionChange?.(true);

            // Start heartbeat to announce presence
            this.startHeartbeat();

            // Request initial sync
            this.requestSync();

            // Announce connection to other clients
            this.postMessage({
                type: 'client-connected',
                data: {
                    clientId: this.clientId,
                    clientType: this.config.clientType,
                    timestamp: Date.now(),
                },
            });

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to create broadcast channel';
            console.error('Broadcast channel connection error:', error);

            usePresentationStore.getState().setError(errorMessage);
            this.config?.onError?.(errorMessage);
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
                case 'slide-change':
                    this.handleSlideChange(message.data);
                    break;
                case 'sync-request':
                    this.handleSyncRequest(message.data);
                    break;
                case 'sync-response':
                    this.handleSyncResponse(message.data);
                    break;
                case 'client-connected':
                case 'client-disconnected':
                case 'client-heartbeat':
                    this.handleClientHeartbeat(message);
                    break;
                default:
                    console.warn('Unknown broadcast message type:', message.type);
            }
        } catch (error) {
            console.error('Error handling broadcast message:', error);
        }
    }

    private handleSlideChange(data: BroadcastEvents['slide-change'] & {
        sourceClient?: string;
        sourceType?: ClientType;
    }): void {
        console.log('Received slide change:', data);

        if (!this.config || data.lectureId !== this.config.lectureId) {
            return;
        }

        // Update store with new slide index
        usePresentationStore.getState().setCurrentSlideIndex(data.slideIndex);

        // Notify config callback
        this.config.onSlideChange?.(data.slideIndex);
    }

    private handleSyncRequest(data: BroadcastEvents['sync-request']): void {
        console.log('Received sync request:', data);

        if (!this.config) return;

        // Only presentation clients should respond to sync requests with current state
        if (this.config.clientType === 'presentation') {
            const store = usePresentationStore.getState();
            const currentSlide = store.currentSlideIndex;

            // Send sync response
            this.postMessage({
                type: 'sync-response',
                data: {
                    currentSlide,
                    lectureId: this.config.lectureId,
                    timestamp: Date.now(),
                },
            });
        }
    }

    private handleSyncResponse(data: BroadcastEvents['sync-response']): void {
        console.log('Received sync response:', data);

        if (!this.config || data.lectureId !== this.config.lectureId) {
            return;
        }

        // Update store with synced data
        const store = usePresentationStore.getState();
        if (store.currentLecture?.id === data.lectureId) {
            store.setCurrentSlideIndex(data.currentSlide);
        }
    }

    private handleClientHeartbeat(message: any): void {
        // Could be used for tracking connected clients in the future
        console.log('Client activity:', message.type, message.data);
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
            type: 'client-heartbeat',
            data: {
                clientId: this.clientId,
                clientType: this.config.clientType,
                timestamp: Date.now(),
            },
        });
    }

    private postMessage(message: any): void {
        if (!this.channel || !this.isConnected) {
            console.warn('Cannot post message: not connected to broadcast channel');
            return;
        }

        try {
            this.channel.postMessage({
                ...message,
                senderId: this.clientId,
                timestamp: Date.now(),
            });
        } catch (error) {
            console.error('Error posting broadcast message:', error);
        }
    }

    // Public methods for sending events
    emitSlideChange(slideIndex: number): void {
        if (!this.isConnected || !this.config) {
            console.warn('Cannot emit slide change: not connected');
            return;
        }

        this.postMessage({
            type: 'slide-change',
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
            console.warn('Cannot request sync: not connected');
            return;
        }

        this.postMessage({
            type: 'sync-request',
            data: {
                clientId: this.clientId,
                timestamp: Date.now(),
            },
        });
    }

    loadLecture(lectureId: string): void {
        if (!this.config) {
            console.warn('Cannot load lecture: not configured');
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
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval);
            this.heartbeatInterval = null;
        }

        if (this.syncTimeout) {
            clearTimeout(this.syncTimeout);
            this.syncTimeout = null;
        }

        if (this.channel && this.isConnected) {
            // Announce disconnection
            if (this.config) {
                this.postMessage({
                    type: 'client-disconnected',
                    data: {
                        clientId: this.clientId,
                        clientType: this.config.clientType,
                        timestamp: Date.now(),
                    },
                });
            }

            this.channel.removeEventListener('message', this.handleMessage);
            this.channel.close();
            this.channel = null;
        }

        this.isConnected = false;

        // Update store
        usePresentationStore.getState().setConnectionStatus(false);

        // Notify config callback
        this.config?.onConnectionChange?.(false);

        this.config = null;
        console.log('Disconnected from broadcast channel');
    }

    isConnectedToBroadcast(): boolean {
        return this.isConnected && this.channel !== null;
    }

    getClientId(): string {
        return this.clientId;
    }
}

// Create singleton instance
const broadcastClient = new BroadcastClient();
export default broadcastClient;

// React hook for easier usage in components
export function useBroadcast(config?: BroadcastClientConfig) {
    const connect = useCallback((broadcastConfig: BroadcastClientConfig) => {
        broadcastClient.connect(broadcastConfig);
    }, []);

    const disconnect = useCallback(() => {
        broadcastClient.disconnect();
    }, []);

    const emitSlideChange = useCallback((slideIndex: number) => {
        broadcastClient.emitSlideChange(slideIndex);
    }, []);

    const requestSync = useCallback(() => {
        broadcastClient.requestSync();
    }, []);

    const loadLecture = useCallback((lectureId: string) => {
        broadcastClient.loadLecture(lectureId);
    }, []);

    return {
        connect,
        disconnect,
        emitSlideChange,
        requestSync,
        loadLecture,
        isConnected: broadcastClient.isConnectedToBroadcast(),
        clientId: broadcastClient.getClientId(),
    };
} 