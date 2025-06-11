# Presentation Web App Implementation Plan

## Overview

Build a dual-window presentation system using Next.js and TypeScript that synchronizes a fullscreen presentation view with a speaker control interface.

## Architecture Overview

### Core Components

1. **Slide Loader**: Load individual markdown slide files from lecture directories
2. **State Management**: Centralized slide state with real-time synchronization
3. **Presentation View**: Fullscreen slide display window
4. **Speaker View**: Control interface with slide preview and speaker notes
5. **WebSocket Server**: Real-time synchronization between windows

## Technical Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS for responsive design
- **Real-time Sync**: Socket.IO for WebSocket communication
- **Markdown Processing**: `remark` and `remark-html` for parsing
- **Syntax Highlighting**: `prism-react-renderer` for code slides
- **State Management**: Zustand for client-side state
- **UI Components**: Headless UI for accessibility

## Project Structure

```
presentation-app/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── socket/
│   │   ├── presentation/
│   │   │   └── [lectureId]/
│   │   │       └── page.tsx
│   │   ├── speaker/
│   │   │   └── [lectureId]/
│   │   │       └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── slides/
│   │   │   ├── CoverSlide.tsx
│   │   │   ├── ContentSlide.tsx
│   │   │   └── CodeSlide.tsx
│   │   ├── SlideRenderer.tsx
│   │   ├── SpeakerView.tsx
│   │   ├── PresentationView.tsx
│   │   └── NavigationControls.tsx
│   ├── lib/
│   │   ├── markdown-parser.ts
│   │   ├── slide-loader.ts
│   │   ├── socket-client.ts
│   │   └── store.ts
│   ├── types/
│   │   └── index.ts
│   └── utils/
│       └── helpers.ts
├── presentation/
│   ├── lecture1/
│   │   ├── slide1.md
│   │   ├── slide2.md
│   │   └── ...
│   ├── lecture2/
│   │   ├── slide1.md
│   │   ├── slide2.md
│   │   └── ...
│   └── ...
├── public/
│   └── images/
├── package.json
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

## Implementation Phases

### Phase 1: Project Setup and Core Structure

1. **Initialize Next.js project** with TypeScript
2. **Install dependencies**:
   - Socket.IO (client & server)
   - Remark for markdown processing with frontmatter support
   - Prism React Renderer for syntax highlighting
   - Tailwind CSS for styling
   - Zustand for state management
3. **Setup basic project structure**
4. **Configure TypeScript and build tools**
5. **Create presentation directory structure**

### Phase 2: Slide Loading and Template System

1. **Create slide loader** (`lib/slide-loader.ts`):
   - Load individual markdown files from lecture directories
   - Parse YAML frontmatter for template and title metadata
   - Convert markdown content to HTML (except for cover slides)
   - Extract language from code blocks for syntax highlighting
   - Generate slide ordering from filenames
2. **Slide data structure**:

   ```typescript
   interface SlideHeader {
     template: 'cover' | 'content' | 'code';
     title: string;
     image?: string; // for cover slides
   }
   
   interface Slide {
     id: string;
     lectureId: string;
     slideNumber: number;
     template: SlideHeader['template'];
     title: string;
     content: string; // HTML content (empty for cover slides)
     rawContent: string; // Original markdown content
     speakerNotes: string; // Extracted from HTML comments
     language?: string; // Detected from code blocks
     header: SlideHeader;
   }
   
   interface Lecture {
     id: string;
     title: string;
     slides: Slide[];
     currentSlide: number;
   }
   ```

3. **Template system**:
   - Cover slide: Large title display with optional background image (no content area)
   - Content slide: Title + markdown-rendered HTML content
   - Code slide: Title + syntax-highlighted code from markdown code blocks

### Phase 3: State Management and WebSocket

1. **Create Zustand store** (`lib/store.ts`):
   - Current slide index
   - Presentation data
   - Navigation methods
   - Sync state
2. **WebSocket server** (`app/api/socket/route.ts`):
   - Handle slide navigation events
   - Broadcast changes to all connected clients
   - Room-based sessions for multiple presentations
3. **Socket client** (`lib/socket-client.ts`):
   - Connect to WebSocket server
   - Listen for slide changes
   - Emit navigation events

### Phase 4: Core Components

1. **Slide Template Components**:
   - CoverSlide: Large title display with optional background image (no content rendering)
   - ContentSlide: Title + markdown-to-HTML rendered content area
   - CodeSlide: Title + syntax-highlighted code blocks with auto-detected language

2. **SlideRenderer Component**:
   - Route to appropriate template based on slide header template field
   - Handle language detection from markdown code blocks
   - Extract and render speaker notes from HTML comments
   - Responsive design for different screen sizes

3. **NavigationControls Component**:
   - Previous/Next buttons
   - Slide counter display
   - Keyboard shortcuts (arrow keys)

4. **Base layout components**:
   - Responsive design
   - Error boundaries
   - Loading states

### Phase 5: Presentation Views

1. **Lecture Selection/Home Page** (`app/page.tsx` or `app/lectures/page.tsx`):
   - List available lectures from the presentation directory
   - "Start Presentation" button for each lecture
   - Lecture preview with slide count and description

2. **Start Presentation Flow**:
   - Single "Start Presentation" button triggers:
     - Opens presentation view in a new window (`window.open()`)
     - Navigates current window to speaker view
     - Establishes WebSocket connection between both windows
   - Both views sync automatically via WebSocket

3. **Presentation View** (`app/presentation/[lectureId]/page.tsx`):
   - **New window** (opened programmatically)
   - Fullscreen slide display with template-based rendering
   - Minimal UI, maximum content visibility
   - Auto-hide cursor after inactivity
   - Keyboard navigation support (arrow keys, space, etc.)
   - Receives slide changes from speaker view via WebSocket

4. **Speaker View** (`app/speaker/[lectureId]/page.tsx`):
   - **Original window** (navigated automatically)
   - Split layout:
     - Top 50%: Slide preview with current template
     - Middle 25%: Speaker notes
     - Bottom 25%: Controls and navigation
   - Real-time sync indicators showing presentation window status
   - Timer and presentation progress
   - Master controls: sends slide changes to presentation window
   - "End Presentation" button to close presentation window

### Phase 6: Advanced Features

1. **Multi-presentation support**:
   - Dynamic loading of different lecture files
   - Presentation selection interface

2. **Enhanced navigation**:
   - Slide thumbnails overview
   - Jump to specific slide
   - Search functionality

3. **Presentation tools**:
   - Laser pointer simulation
   - Drawing/annotation tools
   - Zoom functionality

## Key Implementation Details

### Presentation Window Management

```typescript
// Start presentation flow implementation
async function startPresentation(lectureId: string) {
  // 1. Open presentation view in new window
  const presentationWindow = window.open(
    `/presentation/${lectureId}`,
    'presentation',
    'fullscreen=yes,scrollbars=no,toolbar=no,menubar=no,status=no'
  );

  // 2. Wait for presentation window to load
  await waitForWindowLoad(presentationWindow);

  // 3. Navigate current window to speaker view
  window.location.href = `/speaker/${lectureId}`;

  // 4. Both windows will establish WebSocket connections
  // and sync automatically via the existing socket infrastructure
}

// Window communication helper
function waitForWindowLoad(windowRef: Window): Promise<void> {
  return new Promise((resolve) => {
    const checkLoad = () => {
      if (windowRef.document.readyState === 'complete') {
        resolve();
      } else {
        setTimeout(checkLoad, 100);
      }
    };
    checkLoad();
  });
}

// Close presentation window from speaker view
function endPresentation(presentationWindow: Window | null) {
  if (presentationWindow && !presentationWindow.closed) {
    presentationWindow.close();
  }
}
```

### Slide Loading Strategy

```typescript
// Load slides from lecture directory
async function loadLectureSlides(lectureId: string): Promise<Slide[]> {
  // Read all .md files from presentation/{lectureId}/
  // Parse YAML frontmatter for template and title
  // Sort by filename (slide1.md, slide2.md, etc.)
  // Convert markdown content to HTML (skip for cover slides)
  // Extract language from code blocks for syntax highlighting
  // Extract speaker notes from HTML comments
}

// Slide file processing logic
function processSlideContent(slide: Slide): ProcessedSlide {
  switch (slide.template) {
    case 'cover':
      // Only render title, ignore content
      return { ...slide, content: '' };
    case 'content':
      // Convert markdown content to HTML
      return { ...slide, content: markdownToHtml(slide.rawContent) };
    case 'code':
      // Extract code blocks and detect language
      const { code, language } = extractCodeBlock(slide.rawContent);
      return { ...slide, content: code, language };
  }
}
```

### WebSocket Event Structure

```typescript
interface SocketEvents {
  'slide-change': { slideIndex: number; lectureId: string };
  'sync-request': { clientId: string };
  'sync-response': { currentSlide: number; lectureId: string };
  'lecture-load': { lectureId: string };
}
```

### Responsive Design Approach

- **Mobile-first design** with Tailwind CSS
- **Fullscreen API** for presentation mode
- **Touch gestures** for mobile navigation
- **High contrast mode** for accessibility

### Performance Considerations

- **Lazy loading** of slide content
- **Image optimization** with Next.js Image component
- **Prefetching** of adjacent slides
- **Code splitting** for different views

## File Structure Details

### Key Files to Create

1. `src/types/index.ts` - TypeScript interfaces ✅
2. `src/lib/slide-loader.ts` - Slide loading and processing logic ✅
3. `src/lib/store.ts` - Zustand state management ✅
4. `src/lib/socket-client.ts` - WebSocket client wrapper ✅
5. `src/components/slides/CoverSlide.tsx` - Cover slide template ✅
6. `src/components/slides/ContentSlide.tsx` - Content slide template ✅
7. `src/components/slides/CodeSlide.tsx` - Code slide template with syntax highlighting ✅
8. `src/components/SlideRenderer.tsx` - Template router component ✅
9. `src/app/page.tsx` - Home page with lecture selection and "Start Presentation" buttons ✅
10. `src/app/presentation/[lectureId]/page.tsx` - Fullscreen presentation view (opens in new window) ✅
11. `src/app/speaker/[lectureId]/page.tsx` - Speaker control interface (navigated to from home) ✅
12. `src/app/api/socket/route.ts` - WebSocket server ✅
13. `src/lib/presentation-manager.ts` - Window management and presentation flow logic ✅
14. `src/components/StartPresentationButton.tsx` - Single-click presentation launcher ✅
15. `src/components/PresentationView.tsx` - Fullscreen presentation component ✅
16. `src/components/SpeakerView.tsx` - Speaker control interface component ✅

### Configuration Files

1. `next.config.js` - Next.js configuration
2. `tailwind.config.js` - Tailwind CSS setup
3. `package.json` - Dependencies and scripts

## Testing Strategy

1. **Unit tests** for markdown parsing
2. **Integration tests** for WebSocket synchronization
3. **E2E tests** for presentation flow
4. **Cross-browser testing** for compatibility

## Deployment Considerations

1. **Local development** with hot reload
2. **Production build** optimization
3. **Environment variables** for configuration
4. **Error handling** and logging

## Timeline Estimate

- **Phase 1-2**: 2-3 days (Setup + Parsing)
- **Phase 3-4**: 3-4 days (State + Components)
- **Phase 5**: 2-3 days (Views)
- **Phase 6**: 2-3 days (Polish + Features)
- **Total**: ~10-13 days

## Success Criteria

- ✅ **Phase 1-3 Complete**: Setup, parsing, state management, and WebSocket infrastructure
- ✅ **Phase 4 Complete**: Core components with responsive design and animations
- ✅ **Phase 5 Complete**: Presentation views and window management
- ✅ Three slide templates (cover, content, code) with syntax highlighting
- ✅ Individual slide file support with dynamic lecture loading
- ✅ Zustand store with slide navigation and WebSocket synchronization
- ✅ WebSocket server with room-based multi-client support
- ✅ Socket client with auto-reconnection and error handling
- ✅ SlideRenderer component with template routing and error handling
- ✅ NavigationControls with keyboard shortcuts and "go to slide" functionality
- ✅ Base layout components with error boundaries and loading states
- ✅ CSS animations and responsive design system
- ✅ **Single-button presentation flow**: "Start Presentation" opens new window + navigates to speaker view
- ✅ Two synchronized windows (presentation + speaker) with real-time slide synchronization
- ✅ Proper speaker view layout ratios (50% slide, 25% notes, 25% controls)
- ✅ Fullscreen presentation view with minimal UI and keyboard navigation
- ✅ Window management (close presentation from speaker view)
- ✅ Responsive design for different screen sizes
- ✅ Error handling and graceful degradation
- ✅ Production-ready local development environment

## Slide File Structure

Each slide is a markdown file with:

1. **YAML Header Section**: Contains template type and slide title
2. **Markdown Content**: The actual slide content (varies by template)
3. **Speaker Notes**: HTML comments for presenter guidance

### Template-Specific Content Rules

- **Cover slides**: Content is ignored, only title is displayed
- **Content slides**: Markdown content is converted to HTML and displayed
- **Code slides**: Markdown code blocks are syntax-highlighted based on specified language

## Slide File Format Examples

### Cover Slide (slide1.md)

```markdown
---
template: cover
title: "Welcome to Cursor AI"
image: "/images/cursor-hero.jpg"
---

This content will be ignored for cover slides - only the title is displayed.

<!-- Speaker Notes:
Welcome everyone to our comprehensive course on Cursor AI.
Start with energy and explain what we'll accomplish today.
-->
```

### Content Slide (slide2.md)

```markdown
---
template: content
title: "Key Benefits"
---

# Why Choose Cursor?

- **Productivity Multiplier**: 2-5x faster development
- **Seamless Integration**: Built on VS Code foundation
- **Smart Suggestions**: Context-aware AI assistance
- **Learning Accelerator**: Helps master new technologies

This markdown content will be converted to HTML and displayed in the content area.

<!-- Speaker Notes:
Emphasize each point with real examples.
Mention the productivity gains from personal experience.
-->
```

### Code Slide (slide3.md)

```markdown
---
template: code
title: "AI-Assisted Function Creation"
---

```typescript
// Create a function that validates email addresses
// Should check for proper format and return boolean

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Usage example
console.log(validateEmail("test@example.com")); // true
console.log(validateEmail("invalid-email"));    // false
```

<!-- Speaker Notes:
Show how Cursor AI can complete this function automatically.
Demonstrate the Tab-to-accept workflow.
Point out the clean, production-ready code that AI generates.
Note: The language (typescript) is automatically detected from the code block.
-->
```
