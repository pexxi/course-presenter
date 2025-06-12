# Migration from Socket.IO to Broadcast Channel API

## Overview

This project has been migrated from using Socket.IO for real-time communication between presentation windows to using the browser's native Broadcast Channel API.

## Key Changes

### 1. Client-Side Communication

- **Before**: Socket.IO client connecting to a server-side Socket.IO server
- **After**: Broadcast Channel API for direct browser tab/window communication

### 2. Architecture Changes

- **Removed**: Server-side Socket.IO route (`/api/socket`)
- **Added**: `broadcast-client.ts` - Client-side broadcast channel management
- **Updated**: All components now use `useBroadcast()` hook instead of `useSocket()`

### 3. Event Types

- **Legacy**: `SocketEvents` interface (kept for backward compatibility)
- **New**: `BroadcastEvents` interface with enhanced message structure

### 4. Dependencies Removed

- `socket.io`
- `socket.io-client`

### 5. Configuration Updates

- Removed WebSocket rewrites from `next.config.ts`

## How Broadcast Channel Works

The Broadcast Channel API allows communication between browser tabs/windows of the same origin without requiring a server. Each lecture creates a unique channel:

```javascript
const channel = new BroadcastChannel(`presentation_lecture_${lectureId}`);
```

### Message Flow

1. **Slide Changes**: When a user changes slides, a message is broadcast to all other tabs
2. **Sync Requests**: Clients can request current slide state from presentation windows
3. **Heartbeat**: Periodic messages to track active clients

### Supported Events

- `slide-change`: Synchronize slide position between windows
- `sync-request`: Request current slide state
- `sync-response`: Respond with current slide state
- `client-connected`: Announce new client connection
- `client-disconnected`: Announce client disconnection
- `client-heartbeat`: Periodic presence indicator

## Benefits

### Advantages

- **No Server Required**: Eliminates server-side complexity
- **Better Performance**: Direct browser communication
- **Simpler Architecture**: Fewer moving parts
- **Same Origin Only**: Enhanced security by design

### Limitations

- **Same Origin Only**: Only works between tabs/windows of the same domain
- **No Network Communication**: Cannot sync across different devices
- **Browser Support**: Requires modern browsers (well-supported)

## Browser Compatibility

The Broadcast Channel API is supported in:

- Chrome 54+
- Firefox 38+
- Safari 15.4+
- Edge 79+

## Usage Example

```typescript
import { useBroadcast } from '@/lib/broadcast-client';

const { connect, disconnect, emitSlideChange } = useBroadcast();

// Connect to lecture channel
connect({
  lectureId: 'lecture-1',
  clientType: 'presentation',
  onSlideChange: (slideIndex) => {
    console.log('Slide changed to:', slideIndex);
  },
  onConnectionChange: (connected) => {
    console.log('Connection status:', connected);
  }
});

// Emit slide change
emitSlideChange(5);

// Cleanup
disconnect();
```

## Migration Notes

1. **Backward Compatibility**: The `SocketEvents` interface is preserved for any legacy code
2. **Drop-in Replacement**: The `useBroadcast()` hook has the same API as the old `useSocket()` hook
3. **No Server Changes**: Since the server-side Socket.IO code is removed, there are no server deployment considerations

This migration simplifies the architecture while maintaining all the real-time synchronization features between presentation and speaker views.
