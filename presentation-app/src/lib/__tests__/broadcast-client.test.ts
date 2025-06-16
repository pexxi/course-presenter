import BroadcastClient from '../broadcast-client';

// Mock the BroadcastChannel API
const mockPostMessage = jest.fn();
const mockClose = jest.fn();
const mockAddEventListener = jest.fn();
const mockRemoveEventListener = jest.fn();

const mockBroadcastChannel = jest.fn().mockImplementation(() => ({
  name: 'test-channel',
  onmessage: null,
  onmessageerror: null,
  postMessage: mockPostMessage,
  close: mockClose,
  addEventListener: mockAddEventListener,
  removeEventListener: mockRemoveEventListener,
  dispatchEvent: jest.fn(),
}));

global.BroadcastChannel = mockBroadcastChannel;

describe('BroadcastClient', () => {
  const mockOnConnectionChange = jest.fn();
  const mockOnSyncRequest = jest.fn();
  const mockOnError = jest.fn();
  
  const testConfig = {
    lectureId: 'test-lecture',
    clientType: 'presentation' as const,
    onConnectionChange: mockOnConnectionChange,
    onSyncRequest: mockOnSyncRequest,
    onError: mockOnError,
  };

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Reset the singleton instance by disconnecting if it exists
    if (BroadcastClient.isConnectedToBroadcast()) {
      BroadcastClient.disconnect();
    }
  });

  afterEach(() => {
    // Clean up after each test
    if (BroadcastClient.isConnectedToBroadcast()) {
      BroadcastClient.disconnect();
    }
  });

  describe('connect', () => {
    it('should connect to the broadcast channel', () => {
      // Act
      BroadcastClient.connect(testConfig);
      
      // Assert
      expect(mockBroadcastChannel).toHaveBeenCalledWith(`lecture-${testConfig.lectureId}`);
      expect(mockAddEventListener).toHaveBeenCalledWith('message', expect.any(Function));
      expect(mockOnConnectionChange).toHaveBeenCalledWith(true);
    });
  });

  describe('message handling', () => {
    it('should handle slide change messages', () => {
      // Arrange
      const onSlideChange = jest.fn();
      const config = { ...testConfig, onSlideChange };
      BroadcastClient.connect(config);
      const messageHandler = mockAddEventListener.mock.calls[0][1];
      
      // Act - Simulate receiving a slide change message
      messageHandler({
        data: {
          type: 'slide-change',
          data: {
            slideIndex: 2,
            lectureId: 'test-lecture',
            sourceClient: 'other-client',
            sourceType: 'presentation'
          },
          senderId: 'other-client'
        }
      });
      
      // Assert
      expect(onSlideChange).toHaveBeenCalledWith(2);
    });

    it('should handle sync request messages', () => {
      // Arrange
      const onSyncRequest = jest.fn();
      const config = { ...testConfig, onSyncRequest, clientType: 'presentation' as const };
      BroadcastClient.connect(config);
      const messageHandler = mockAddEventListener.mock.calls[0][1];
      
      // Act - Simulate receiving a sync request message
      messageHandler({
        data: {
          type: 'sync-request',
          data: {
            clientId: 'test-client',
            timestamp: Date.now()
          },
          senderId: 'other-client'
        }
      });
      
      // Assert
      expect(onSyncRequest).toHaveBeenCalled();
    });

    it('should ignore messages from self', () => {
      // Arrange
      const onSlideChange = jest.fn();
      const config = { ...testConfig, onSlideChange };
      BroadcastClient.connect(config);
      const messageHandler = mockAddEventListener.mock.calls[0][1];
      
      // Mock the client ID to match the sender
      const originalClientId = BroadcastClient['clientId'];
      BroadcastClient['clientId'] = 'test-client';
      
      try {
        // Act - Simulate receiving a slide change message from self
        messageHandler({
          data: {
            type: 'slide-change',
            data: {
              slideIndex: 2,
              lectureId: 'test-lecture',
              sourceClient: 'test-client',
              sourceType: 'presentation'
            },
            senderId: 'test-client'
          }
        });
        
        // Assert - Should be ignored
        expect(onSlideChange).not.toHaveBeenCalled();
      } finally {
        // Clean up
        BroadcastClient['clientId'] = originalClientId;
      }
    });

    it('should ignore messages for different lectures', () => {
      // Arrange
      const onSlideChange = jest.fn();
      const config = { ...testConfig, onSlideChange };
      BroadcastClient.connect(config);
      const messageHandler = mockAddEventListener.mock.calls[0][1];
      
      // Act - Simulate receiving a slide change message for a different lecture
      messageHandler({
        data: {
          type: 'slide-change',
          data: {
            slideIndex: 2,
            lectureId: 'different-lecture',
            sourceClient: 'other-client',
            sourceType: 'presentation'
          },
          senderId: 'other-client'
        }
      });
      
      // Assert - Should be ignored
      expect(onSlideChange).not.toHaveBeenCalled();
    });
  });

  describe('error handling', () => {
    it('should handle connection errors gracefully', () => {
      // Arrange - Force an error when creating the BroadcastChannel
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const error = new Error('Failed to create BroadcastChannel');
      mockBroadcastChannel.mockImplementationOnce(() => {
        throw error;
      });

      // Act - Should not throw, but should log the error
      BroadcastClient.connect(testConfig);
      
      // Assert
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to connect to broadcast channel:', error);
      expect(BroadcastClient.isConnectedToBroadcast()).toBe(false);
      
      // Clean up
      consoleErrorSpy.mockRestore();
    });

    it('should log unknown message types', () => {
      // Arrange
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      BroadcastClient.connect(testConfig);
      const messageHandler = mockAddEventListener.mock.calls[0][1];
      
      // Act - Simulate receiving an unknown message type
      messageHandler({
        data: {
          type: 'unknown-message-type',
          data: {},
          senderId: 'other-client'
        }
      });
      
      // Assert - Should log a warning
      expect(consoleWarnSpy).toHaveBeenCalledWith('Unknown broadcast message type:', 'unknown-message-type');
      
      // Clean up
      consoleWarnSpy.mockRestore();
    });

    it('should handle message handler errors gracefully', () => {
      // Arrange
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const onSlideChange = jest.fn();
      
      // Connect with test config
      BroadcastClient.connect({
        ...testConfig,
        onSlideChange,
      });
      
      const messageHandler = mockAddEventListener.mock.calls[0][1];
      
      // Mock handleSlideChange to throw an error
      const originalHandleSlideChange = BroadcastClient['handleSlideChange'];
      BroadcastClient['handleSlideChange'] = jest.fn().mockImplementation(() => {
        throw new Error('Test error in slide change handler');
      });
      
      try {
        // Act - Simulate receiving a slide change message
        messageHandler({
          data: {
            type: 'slide-change',
            data: {
              slideIndex: 2,
              lectureId: 'test-lecture',
              sourceClient: 'other-client',
              sourceType: 'presentation'
            },
            senderId: 'other-client'
          }
        });
        
        // Assert - Should log the error but not throw
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          'Error handling broadcast message:',
          expect.any(Error)
        );
        
        // The error should be caught and not propagate
        expect(onSlideChange).not.toHaveBeenCalled();
      } finally {
        // Clean up
        BroadcastClient['handleSlideChange'] = originalHandleSlideChange;
        consoleErrorSpy.mockRestore();
      }
    });
  });

  describe('disconnect', () => {
    it('should close the connection and clean up', () => {
      // Arrange
      BroadcastClient.connect(testConfig);
      
      // Act
      BroadcastClient.disconnect();

      // Assert
      expect(mockClose).toHaveBeenCalled();
      expect(mockRemoveEventListener).toHaveBeenCalledWith('message', expect.any(Function));
    });
  });

  describe('connection status', () => {
    it('should report connection status correctly', () => {
      // Initially not connected
      expect(BroadcastClient.isConnectedToBroadcast()).toBe(false);
      
      // Connect and verify
      BroadcastClient.connect({
        ...testConfig,
        onSlideChange: jest.fn(),
        onConnectionChange: jest.fn(),
        onError: jest.fn(),
        onSyncRequest: jest.fn()
      });
      expect(BroadcastClient.isConnectedToBroadcast()).toBe(true);
      
      // Disconnect and verify
      BroadcastClient.disconnect();
      expect(BroadcastClient.isConnectedToBroadcast()).toBe(false);
    });
  });

  describe('emitSlideChange', () => {
    it('should send a slide change message', () => {
      // Arrange
      const slideIndex = 3;
      const config = {
        ...testConfig,
        onSlideChange: jest.fn(),
        onConnectionChange: jest.fn(),
        onError: jest.fn(),
        onSyncRequest: jest.fn()
      };
      BroadcastClient.connect(config);
      
      // Act - Call emitSlideChange with just the slideIndex
      BroadcastClient.emitSlideChange(slideIndex);
      
      // Get the call arguments
      const callArgs = mockPostMessage.mock.calls[0][0];
      
      // Assert
      expect(callArgs.type).toBe('slide-change');
      expect(callArgs.data).toMatchObject({
        slideIndex,
        lectureId: config.lectureId
      });
      expect(callArgs.senderId).toBe(BroadcastClient['clientId']);
    });
    
    it('should not send message if not connected', () => {
      // Make sure we're disconnected
      BroadcastClient.disconnect();
      
      // Act - Call emitSlideChange with just the slideIndex
      BroadcastClient.emitSlideChange(1);
      
      // Assert
      expect(mockPostMessage).not.toHaveBeenCalled();
    });
  });

  describe('requestSync', () => {
    it('should send a sync request message', () => {
      // Arrange
      const clientId = 'test-client';
      
      // Connect first
      const config = {
        ...testConfig,
        onSlideChange: jest.fn(),
        onConnectionChange: jest.fn(),
        onError: jest.fn(),
        onSyncRequest: jest.fn()
      };
      BroadcastClient.connect(config);
      
      // Act - Call requestSync without arguments (it should generate its own clientId)
      BroadcastClient.requestSync();
      
      // Get the generated clientId from the call
      const callArgs = mockPostMessage.mock.calls[0][0];
      
      // Assert
      expect(callArgs.type).toBe('sync-request');
      expect(callArgs.data).toHaveProperty('clientId');
      expect(typeof callArgs.data.clientId).toBe('string');
      expect(callArgs.senderId).toBe(BroadcastClient['clientId']);
    });
    
    it('should not send message if not connected', () => {
      // Make sure we're disconnected
      BroadcastClient.disconnect();
      
      // Act - Call requestSync without arguments
      BroadcastClient.requestSync();
      
      // Assert
      expect(mockPostMessage).not.toHaveBeenCalled();
    });
  });

  describe('message validation', () => {
    it('should ignore messages with invalid format', () => {
      // Arrange
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      
      // Connect with a test config
      const config = {
        ...testConfig,
        onSlideChange: jest.fn(),
        onConnectionChange: jest.fn(),
        onError: jest.fn(),
        onSyncRequest: jest.fn()
      };
      
      // Connect and get the message handler
      BroadcastClient.connect(config);
      const messageHandler = mockAddEventListener.mock.calls[0][1];
      
      // Act - Simulate receiving an invalid message (not an object with type and data)
      messageHandler({
        data: 'invalid-format'
      });
      
      // Assert - Should log a warning about the invalid format
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'Cannot post message: not connected to broadcast channel'
      );
      
      // Clean up
      consoleWarnSpy.mockRestore();
    });
  });
});
