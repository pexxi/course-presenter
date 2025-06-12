# Presentation App

A modern, responsive web-based presentation system built with Next.js, featuring real-time synchronization between presenter and audience views.

## 🚀 Features

### Core Functionality

- **Multi-View System**: Separate views for presentation, speaker, and testing
- **Real-time Synchronization**: WebSocket-based slide synchronization across all connected clients
- **Responsive Design**: Slides automatically scale to maintain 16:9 aspect ratio on any screen size
- **Speaker Tools**: Dedicated speaker view with slide preview, navigation controls, and speaker notes

### Presentation Views

- **Presentation View**: Full-screen slide display for audience
- **Speaker View**: Split-screen layout with slide preview, controls, and speaker notes
- **Test View**: Development/testing interface for slide content

### Advanced Features

- **Dynamic Slide Loading**: Markdown-based slide content with dynamic rendering
- **Font Size Controls**: Adjustable speaker notes font size (Small, Medium, Large, X-Large)
- **Connection Status**: Real-time connection monitoring and status indicators
- **Presentation Management**: Start, control, and end presentations with confirmation dialogs

## 🏗️ Architecture

### Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Real-time Communication**: Socket.IO
- **Content Format**: Markdown with frontmatter

### Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── api/                      # API routes
│   │   ├── slides/[...params]/   # Dynamic slide API
│   │   └── socket/               # WebSocket endpoint
│   ├── presentation/[...params]/ # Presentation view
│   ├── speaker/[...params]/      # Speaker view
│   └── test/[...params]/         # Test view
├── components/                   # React components
│   ├── slides/                   # Slide type components
│   ├── speaker/                  # Speaker view components
│   └── ...                       # Shared components
├── lib/                          # Utilities and hooks
├── types/                        # TypeScript definitions
└── utils/                        # Helper functions
```

### Component Architecture

The speaker view has been modularized into reusable components:

- `SlidePreview`: Displays current slide with 16:9 aspect ratio
- `SpeakerNavigationControls`: Navigation buttons (first, previous, next, last)
- `SpeakerStatusPanel`: Connection status, duration timer, and controls
- `SpeakerNotes`: Speaker notes with adjustable font sizes
- `SpeakerControls`: Combined navigation and status panel

## 🎯 Slide System

### Slide Types

- **Cover Slides**: Title slides with course/lecture information
- **Content Slides**: Standard content with title and body
- **Code Slides**: Syntax-highlighted code examples
- **Custom Slides**: Extensible slide type system

### Content Structure

```
courses/
└── [courseId]/
    ├── info.json              # Course metadata
    ├── [lectureId]/
    │   ├── info.json          # Lecture metadata
    │   ├── slide1.md          # Slide content
    │   ├── slide2.md
    │   └── ...
    └── README.md              # Course documentation
```

### Slide Format

Each slide is a Markdown file with frontmatter:

```markdown
---
type: "content"
title: "Slide Title"
speakerNotes: "<p>Notes for the speaker</p>"
---

# Slide Content
Your slide content in Markdown format.
```

## 🔧 Development

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Run development server**:

   ```bash
   npm run dev
   ```

3. **Open in browser**:
   - Main app: [http://localhost:3000](http://localhost:3000)
   - Presentation: `http://localhost:3000/presentation/[courseId]/[lectureId]`
   - Speaker view: `http://localhost:3000/speaker/[courseId]/[lectureId]`
   - Test view: `http://localhost:3000/test/[courseId]/[lectureId]`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 Real-time Features

### WebSocket Communication

- **Client Types**: Presentation, Speaker, Test
- **Events**: Slide changes, connection status, presentation control
- **Synchronization**: All connected clients receive real-time updates

### Connection Management

- Automatic reconnection on connection loss
- Visual connection status indicators
- Client type identification for targeted updates

## 📱 Responsive Design

### Slide Scaling

- Maintains 16:9 aspect ratio across all screen sizes
- Uses CSS `aspect-ratio` with fallback calculations
- Responsive typography with Tailwind breakpoints
- Optimized for both desktop and mobile viewing

### Breakpoint System

- `sm:` - Small screens (640px+)
- `md:` - Medium screens (768px+)
- `lg:` - Large screens (1024px+)
- `xl:` - Extra large screens (1280px+)
- `2xl:` - 2X large screens (1536px+)

## 🎨 Styling

### Design System

- **Colors**: Tailwind's default palette with custom extensions
- **Typography**: Geist font family with responsive sizing
- **Components**: Consistent styling with Tailwind utilities
- **Layout**: Flexbox and Grid-based responsive layouts

### Theme

- Clean, modern interface
- High contrast for readability
- Consistent spacing and typography
- Professional presentation aesthetics

## 🚀 Deployment

### Build Process

```bash
npm run build
```

### Deployment Options

- **Vercel**: Optimized for Next.js applications
- **Docker**: Containerized deployment
- **Static Export**: For static hosting (limited functionality)

### Environment Variables

Configure as needed for your deployment environment:

- WebSocket server configuration
- API endpoints
- Feature flags

## 🔍 API Reference

### Slide API

- `GET /api/slides/[courseId]/[lectureId]` - Fetch lecture slides
- Returns slide data with metadata and content

### WebSocket Events

- `slide-change` - Broadcast slide navigation
- `connection-status` - Client connection updates
- `presentation-control` - Start/stop presentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is part of a course curriculum. Please refer to the main repository for licensing information.
