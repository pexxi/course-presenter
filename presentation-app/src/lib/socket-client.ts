import { io, Socket } from 'socket.io-client';
import { SocketEvents } from '@/types';
import { usePresentationStore } from './store';

type ClientType = 'presentation' | 'speaker';

interface SocketClientConfig {
  lectureId: string;
  clientType: ClientType;
  onSlideChange?: (slideIndex: number) => void;
  onConnectionChange?: (connected: boolean) => void;
  onError?: (error: string) => void;
}

class SocketClient {
  private socket: Socket | null = null;
  private config: SocketClientConfig | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectTimeout: NodeJS.Timeout | null = null;

  constructor() {
    // Bind methods to preserve context
    this.handleConnect = this.handleConnect.bind(this);
    this.handleDisconnect = this.handleDisconnect.bind(this);
    this.handleSlideChange = this.handleSlideChange.bind(this);
    this.handleSyncResponse = this.handleSyncResponse.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleClientConnected = this.handleClientConnected.bind(this);
    this.handleClientDisconnected = this.handleClientDisconnected.bind(this);
  }

  connect(config: SocketClientConfig): void {
    if (this.socket?.connected) {
      this.disconnect();
    }

    this.config = config;

    const socketUrl = process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_SOCKET_URL || window.location.origin
      : 'http://localhost:3000';

    this.socket = io(socketUrl, {
      path: '/api/socket',
      transports: ['websocket', 'polling'],
      timeout: 10000,
      reconnection: true,
      reconnectionAttempts: this.maxReconnectAttempts,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    if (!this.socket) return;

    // Connection events
    this.socket.on('connect', this.handleConnect);
    this.socket.on('disconnect', this.handleDisconnect);
    this.socket.on('connect_error', this.handleError);

    // Presentation events
    this.socket.on('slide-change', this.handleSlideChange);
    this.socket.on('sync-response', this.handleSyncResponse);

    // Client tracking events
    this.socket.on('client-connected', this.handleClientConnected);
    this.socket.on('client-disconnected', this.handleClientDisconnected);

    // Error handling
    this.socket.on('error', this.handleError);
  }

  private handleConnect(): void {
    console.log('Socket connected');
    
    if (!this.config) return;

    // Join the lecture room
    this.socket?.emit('join-lecture', {
      lectureId: this.config.lectureId,
      clientType: this.config.clientType,
    });

    // Update store connection status
    usePresentationStore.getState().setConnectionStatus(true);
    usePresentationStore.getState().setError(null);

    // Reset reconnect attempts
    this.reconnectAttempts = 0;

    // Clear any pending reconnect timeout
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    // Notify config callback
    this.config.onConnectionChange?.(true);

    // Request sync on connection
    this.requestSync();
  }

  private handleDisconnect(reason: string): void {
    console.log('Socket disconnected:', reason);

    // Update store connection status
    usePresentationStore.getState().setConnectionStatus(false);

    // Notify config callback
    this.config?.onConnectionChange?.(false);

    // Handle reconnection for certain disconnect reasons
    if (reason === 'io server disconnect') {
      // Server initiated disconnect, don't auto-reconnect
      usePresentationStore.getState().setError('Server disconnected');
    } else if (reason === 'transport close' || reason === 'ping timeout') {
      // Network issues, attempt reconnection with exponential backoff
      this.attemptReconnection();
    }
  }

  private handleSlideChange(data: SocketEvents['slide-change'] & { 
    sourceClient?: string; 
    sourceType?: ClientType; 
  }): void {
    console.log('Received slide change:', data);

    // Don't process our own slide changes
    if (data.sourceClient === this.socket?.id) {
      return;
    }

    // Update store with new slide index
    usePresentationStore.getState().setCurrentSlideIndex(data.slideIndex);

    // Notify config callback
    this.config?.onSlideChange?.(data.slideIndex);
  }

  private handleSyncResponse(data: SocketEvents['sync-response']): void {
    console.log('Received sync response:', data);

    // Update store with synced data
    const store = usePresentationStore.getState();
    if (store.currentLecture?.id === data.lectureId) {
      store.setCurrentSlideIndex(data.currentSlide);
    }
  }

  private handleClientConnected(data: { 
    clientId: string; 
    clientType: ClientType; 
    timestamp: number; 
  }): void {
    console.log('Client connected to room:', data);
    // Could be used for showing connection status in UI
  }

  private handleClientDisconnected(data: { 
    clientId: string; 
    clientType: ClientType; 
    timestamp: number; 
  }): void {
    console.log('Client disconnected from room:', data);
    // Could be used for showing connection status in UI
  }

  private handleError(error: any): void {
    console.error('Socket error:', error);

    const errorMessage = typeof error === 'string' 
      ? error 
      : error?.message || 'Unknown socket error';

    // Update store error state
    usePresentationStore.getState().setError(errorMessage);

    // Notify config callback
    this.config?.onError?.(errorMessage);
  }

  private attemptReconnection(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      usePresentationStore.getState().setError(
        'Failed to reconnect after maximum attempts'
      );
      return;
    }

    this.reconnectAttempts++;
    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts - 1), 30000);

    console.log(`Attempting reconnection ${this.reconnectAttempts}/${this.maxReconnectAttempts} in ${delay}ms`);

    this.reconnectTimeout = setTimeout(() => {
      if (this.config) {
        this.connect(this.config);
      }
    }, delay);
  }

  // Public methods for sending events
  emitSlideChange(slideIndex: number): void {
    if (!this.socket?.connected || !this.config) {
      console.warn('Cannot emit slide change: not connected');
      return;
    }

    this.socket.emit('slide-change', {
      slideIndex,
      lectureId: this.config.lectureId,
    });
  }

  requestSync(): void {
    if (!this.socket?.connected) {
      console.warn('Cannot request sync: not connected');
      return;
    }

    this.socket.emit('sync-request', {
      clientId: this.socket.id,
    });
  }

  loadLecture(lectureId: string): void {
    if (!this.socket?.connected) {
      console.warn('Cannot load lecture: not connected');
      return;
    }

    // Update config
    if (this.config) {
      this.config.lectureId = lectureId;
    }

    this.socket.emit('lecture-load', { lectureId });
  }

  disconnect(): void {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }

    // Update store
    usePresentationStore.getState().setConnectionStatus(false);

    // Notify config callback
    this.config?.onConnectionChange?.(false);

    this.config = null;
    this.reconnectAttempts = 0;
  }

  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }

  getSocketId(): string | null {
    return this.socket?.id ?? null;
  }
}

// Create singleton instance
const socketClient = new SocketClient();
export default socketClient;

// React hook for easier usage in components
export function useSocket(config?: SocketClientConfig) {
  const connect = (socketConfig: SocketClientConfig) => {
    socketClient.connect(socketConfig);
  };

  const disconnect = () => {
    socketClient.disconnect();
  };

  const emitSlideChange = (slideIndex: number) => {
    socketClient.emitSlideChange(slideIndex);
  };

  const requestSync = () => {
    socketClient.requestSync();
  };

  const loadLecture = (lectureId: string) => {
    socketClient.loadLecture(lectureId);
  };

  return {
    connect,
    disconnect,
    emitSlideChange,
    requestSync,
    loadLecture,
    isConnected: socketClient.isConnected(),
    socketId: socketClient.getSocketId(),
  };
} 