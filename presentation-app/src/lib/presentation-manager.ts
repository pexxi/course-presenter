/**
 * Presentation Window Management
 * Handles opening, closing, and synchronizing presentation and speaker windows
 */

export interface PresentationWindowOptions {
  lectureId: string;
  onWindowReady?: () => void;
  onWindowClosed?: () => void;
}

export class PresentationManager {
  private static instance: PresentationManager;
  private presentationWindow: Window | null = null;
  private presentationReadyPromise: Promise<void> | null = null;

  static getInstance(): PresentationManager {
    if (!PresentationManager.instance) {
      PresentationManager.instance = new PresentationManager();
    }
    return PresentationManager.instance;
  }

  /**
   * Start a presentation session
   * Opens presentation view in new window and navigates current window to speaker view
   */
  async startPresentation(options: PresentationWindowOptions): Promise<void> {
    const { lectureId, onWindowReady, onWindowClosed } = options;

    try {
      // Close any existing presentation window
      this.endPresentation();

      // Create presentation window URL with fullscreen parameters
      const presentationUrl = `/presentation/${lectureId}`;
      
      // Open presentation window with fullscreen settings
      this.presentationWindow = window.open(
        presentationUrl,
        'presentation',
        [
          'fullscreen=yes',
          'scrollbars=no',
          'toolbar=no',
          'menubar=no',
          'status=no',
          'location=no',
          'resizable=yes',
          'directories=no'
        ].join(',')
      );

      if (!this.presentationWindow) {
        throw new Error('Failed to open presentation window. Please check popup blockers.');
      }

      // Wait for presentation window to load
      this.presentationReadyPromise = this.waitForWindowLoad(this.presentationWindow);
      await this.presentationReadyPromise;

      // Set up window close detection
      this.setupWindowCloseDetection(onWindowClosed);

      // Callback when window is ready
      onWindowReady?.();

      // Navigate current window to speaker view
      // Use replace to avoid back button issues
      window.location.replace(`/speaker/${lectureId}`);
      
    } catch (error) {
      console.error('Failed to start presentation:', error);
      this.endPresentation();
      throw error;
    }
  }

  /**
   * Wait for a window to fully load
   */
  private waitForWindowLoad(windowRef: Window): Promise<void> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Window load timeout'));
      }, 10000); // 10 second timeout

      const checkLoad = () => {
        try {
          if (windowRef.closed) {
            clearTimeout(timeout);
            reject(new Error('Window was closed before loading'));
            return;
          }

          // Check if window is loaded
          if (windowRef.document?.readyState === 'complete') {
            clearTimeout(timeout);
            resolve();
          } else {
            setTimeout(checkLoad, 100);
          }
        } catch (error) {
          // Cross-origin errors are expected, try alternative approach
          setTimeout(checkLoad, 100);
        }
      };

      checkLoad();
    });
  }

  /**
   * Set up detection for when presentation window is closed
   */
  private setupWindowCloseDetection(onWindowClosed?: () => void): void {
    if (!this.presentationWindow) return;

    const checkClosed = () => {
      if (this.presentationWindow?.closed) {
        this.presentationWindow = null;
        this.presentationReadyPromise = null;
        onWindowClosed?.();
        return;
      }
      setTimeout(checkClosed, 1000);
    };

    setTimeout(checkClosed, 1000);
  }

  /**
   * End the presentation session
   * Closes the presentation window
   */
  endPresentation(): void {
    if (this.presentationWindow && !this.presentationWindow.closed) {
      this.presentationWindow.close();
    }
    this.presentationWindow = null;
    this.presentationReadyPromise = null;
  }

  /**
   * Check if presentation window is open and ready
   */
  isPresentationActive(): boolean {
    return this.presentationWindow !== null && 
           !this.presentationWindow.closed &&
           this.presentationReadyPromise !== null;
  }

  /**
   * Get presentation window reference
   */
  getPresentationWindow(): Window | null {
    return this.presentationWindow;
  }

  /**
   * Focus the presentation window
   */
  focusPresentationWindow(): void {
    if (this.presentationWindow && !this.presentationWindow.closed) {
      this.presentationWindow.focus();
    }
  }

  /**
   * Request fullscreen for presentation window
   */
  async requestFullscreen(): Promise<void> {
    if (!this.presentationWindow || this.presentationWindow.closed) {
      throw new Error('No active presentation window');
    }

    try {
      // Try to request fullscreen on the presentation window
      const doc = this.presentationWindow.document;
      if (doc.documentElement.requestFullscreen) {
        await doc.documentElement.requestFullscreen();
      } else if ((doc.documentElement as any).webkitRequestFullscreen) {
        await (doc.documentElement as any).webkitRequestFullscreen();
      } else if ((doc.documentElement as any).msRequestFullscreen) {
        await (doc.documentElement as any).msRequestFullscreen();
      }
    } catch (error) {
      console.warn('Failed to request fullscreen:', error);
      // Fallback: try to maximize window
      this.presentationWindow.moveTo(0, 0);
      this.presentationWindow.resizeTo(screen.width, screen.height);
    }
  }
}

// Export singleton instance
export const presentationManager = PresentationManager.getInstance();

/**
 * React hook for presentation management
 */
export function usePresentationManager() {
  return {
    startPresentation: (options: PresentationWindowOptions) => 
      presentationManager.startPresentation(options),
    endPresentation: () => presentationManager.endPresentation(),
    isPresentationActive: () => presentationManager.isPresentationActive(),
    focusPresentationWindow: () => presentationManager.focusPresentationWindow(),
    requestFullscreen: () => presentationManager.requestFullscreen(),
  };
} 