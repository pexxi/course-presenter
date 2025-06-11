import { NextRequest } from 'next/server';
import { Server as SocketIOServer } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { SocketEvents } from '@/types';

// Global server instance to avoid recreating on each request
let io: SocketIOServer | undefined;

// Connection tracking
const connections = new Map<string, {
  lectureId: string;
  clientType: 'presentation' | 'speaker';
  timestamp: number;
}>();

// Room-based slide states
const roomStates = new Map<string, {
  currentSlide: number;
  lectureId: string;
  lastUpdate: number;
}>();

function initializeSocketServer(server: HTTPServer): SocketIOServer {
  const io = new SocketIOServer(server, {
    path: '/api/socket',
    addTrailingSlash: false,
    cors: {
      origin: process.env.NODE_ENV === 'production' 
        ? process.env.NEXT_PUBLIC_APP_URL 
        : ['http://localhost:3000', 'http://127.0.0.1:3000'],
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);
    
    // Join lecture room and set client type
    socket.on('join-lecture', ({ lectureId, clientType }: { 
      lectureId: string; 
      clientType: 'presentation' | 'speaker';
    }) => {
      const roomName = `lecture-${lectureId}`;
      
      // Leave previous rooms
      Array.from(socket.rooms).forEach(room => {
        if (room !== socket.id && room.startsWith('lecture-')) {
          socket.leave(room);
        }
      });
      
      // Join new room
      socket.join(roomName);
      
      // Track connection
      connections.set(socket.id, {
        lectureId,
        clientType,
        timestamp: Date.now(),
      });
      
      console.log(`Client ${socket.id} joined ${roomName} as ${clientType}`);
      
      // Send current room state if it exists
      const roomState = roomStates.get(roomName);
      if (roomState) {
        socket.emit('sync-response', {
          currentSlide: roomState.currentSlide,
          lectureId: roomState.lectureId,
        });
      }
      
      // Notify room about new connection
      socket.to(roomName).emit('client-connected', {
        clientId: socket.id,
        clientType,
        timestamp: Date.now(),
      });
    });

    // Handle slide changes
    socket.on('slide-change', ({ slideIndex, lectureId }: SocketEvents['slide-change']) => {
      const roomName = `lecture-${lectureId}`;
      const connection = connections.get(socket.id);
      
      if (!connection || connection.lectureId !== lectureId) {
        socket.emit('error', { message: 'Not authorized for this lecture' });
        return;
      }
      
      // Update room state
      roomStates.set(roomName, {
        currentSlide: slideIndex,
        lectureId,
        lastUpdate: Date.now(),
      });
      
      console.log(`Slide change in ${roomName}: slide ${slideIndex} by ${connection.clientType}`);
      
      // Broadcast to all other clients in the room
      socket.to(roomName).emit('slide-change', {
        slideIndex,
        lectureId,
        sourceClient: socket.id,
        sourceType: connection.clientType,
      });
    });

    // Handle sync requests
    socket.on('sync-request', ({ clientId }: SocketEvents['sync-request']) => {
      const connection = connections.get(socket.id);
      
      if (!connection) {
        socket.emit('error', { message: 'No active connection' });
        return;
      }
      
      const roomName = `lecture-${connection.lectureId}`;
      const roomState = roomStates.get(roomName);
      
      if (roomState) {
        socket.emit('sync-response', {
          currentSlide: roomState.currentSlide,
          lectureId: roomState.lectureId,
        });
      } else {
        socket.emit('sync-response', {
          currentSlide: 0,
          lectureId: connection.lectureId,
        });
      }
    });

    // Handle lecture loading
    socket.on('lecture-load', ({ lectureId }: SocketEvents['lecture-load']) => {
      const connection = connections.get(socket.id);
      
      if (connection) {
        // Update connection info
        connections.set(socket.id, {
          ...connection,
          lectureId,
          timestamp: Date.now(),
        });
        
        // Leave old room and join new one
        const oldRoom = `lecture-${connection.lectureId}`;
        const newRoom = `lecture-${lectureId}`;
        
        socket.leave(oldRoom);
        socket.join(newRoom);
        
        console.log(`Client ${socket.id} switched from ${oldRoom} to ${newRoom}`);
        
        // Send current state of new room
        const roomState = roomStates.get(newRoom);
        if (roomState) {
          socket.emit('sync-response', {
            currentSlide: roomState.currentSlide,
            lectureId: roomState.lectureId,
          });
        }
      }
    });

    // Handle disconnection
    socket.on('disconnect', (reason) => {
      const connection = connections.get(socket.id);
      
      if (connection) {
        const roomName = `lecture-${connection.lectureId}`;
        
        console.log(`Client ${socket.id} (${connection.clientType}) disconnected from ${roomName}: ${reason}`);
        
        // Notify room about disconnection
        socket.to(roomName).emit('client-disconnected', {
          clientId: socket.id,
          clientType: connection.clientType,
          timestamp: Date.now(),
        });
        
        // Clean up connection
        connections.delete(socket.id);
      }
    });

    // Handle errors
    socket.on('error', (error) => {
      console.error(`Socket error for ${socket.id}:`, error);
    });
  });

  // Cleanup old room states periodically (every 30 minutes)
  setInterval(() => {
    const now = Date.now();
    const thirtyMinutes = 30 * 60 * 1000;
    
    for (const [roomName, state] of roomStates.entries()) {
      if (now - state.lastUpdate > thirtyMinutes) {
        roomStates.delete(roomName);
        console.log(`Cleaned up old room state: ${roomName}`);
      }
    }
  }, 5 * 60 * 1000); // Check every 5 minutes

  return io;
}

// Handle HTTP upgrades for WebSocket connections
export async function GET(req: NextRequest) {
  // This route is primarily for WebSocket upgrades
  // But we'll return a simple status for regular HTTP requests
  return new Response(JSON.stringify({ 
    status: 'Socket.IO server running',
    timestamp: new Date().toISOString(),
    connections: connections.size,
    rooms: roomStates.size,
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

// WebSocket upgrade handling
export async function POST(req: NextRequest) {
  // This will be handled by the Socket.IO server
  return new Response('Method not allowed for WebSocket endpoint', { 
    status: 405 
  });
}

// Initialize the Socket.IO server when this module loads
if (typeof window === 'undefined') {
  // Server-side only
  const server = new HTTPServer();
  io = initializeSocketServer(server);
} 