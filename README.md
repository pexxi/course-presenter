# Cursor AI Training Course Platform

A comprehensive, modern web-based presentation platform designed for delivering interactive Cursor AI training courses. This project combines a Next.js-powered presentation system with a complete course development workflow.

## 🎯 Project Overview

This platform provides everything needed to create, manage, and deliver professional presentation-based training courses about Cursor AI. It features real-time synchronization between presenter and audience views, responsive design, and a comprehensive course development workflow.

### What's Included

- **Presentation App**: Modern web-based presentation system with real-time features
- **Complete Cursor AI Training Course**: 5 comprehensive lectures covering Cursor from basics to enterprise integration
- **Course Development Tools**: Structured workflow for creating new courses and content
- **Testing Infrastructure**: Comprehensive testing setup with unit, integration, and e2e tests

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Getting Started

1. **Clone and Setup**:

   ```bash
   git clone <repository-url>
   cd cursor-course-1
   chmod +x start-presentation.sh
   ```

2. **Start the Application**:

   ```bash
   ./start-presentation.sh
   ```

   This script will:
   - Check dependencies and install if needed
   - Start the development server
   - Open the application at <http://localhost:3000>

3. **Access Different Views**:
   - **Main Dashboard**: `http://localhost:3000`
   - **Presentation View**: `http://localhost:3000/presentation/cursor-ai-training/lecture1`
   - **Speaker View**: `http://localhost:3000/speaker/cursor-ai-training/lecture1`
   - **Test View**: `http://localhost:3000/test/cursor-ai-training/lecture1`

## 📚 Course Content

### Cursor AI Training Course

A complete 5-lecture course covering Cursor AI from fundamentals to enterprise integration:

#### Lecture 1: Cursor Overview & Basics (28 slides)

- Introduction to Cursor AI
- Installation & setup
- Core interface overview
- Basic autocomplete features
- Hands-on demonstrations

#### Lecture 2: Advanced Chat & Inline Editing (16 slides)

- Chat interface fundamentals
- Advanced chat features
- Inline editing capabilities
- Code explanation & documentation
- Integration workflows

#### Lecture 3: Codebase Understanding & Context (12 slides)

- Codebase navigation
- AI-powered code discovery
- @Folders integration
- Multi-file operations
- Context optimization

#### Lecture 4: Cursor Rules & Configuration (36 slides)

- New Cursor Rules system
- MDC file format & project rules
- Rule types & activation patterns
- Team collaboration strategies
- Enterprise integration

#### Lecture 5: MCP Servers & Enterprise Integration (27 slides)

- Introduction to MCP servers
- Enterprise integration strategies
- Security and compliance
- Advanced workflows
- Future planning

Each lecture includes:

- **Professional slides** with consistent formatting
- **Comprehensive speaker notes** suitable for teleprompter use
- **Code examples** and practical demonstrations
- **Hands-on exercises** with success metrics
- **30+ minutes** of presentation content

## 🏗️ Architecture

### Project Structure

```
cursor-course-1/
├── presentation-app/          # Next.js presentation application
│   ├── src/
│   │   ├── app/              # Next.js App Router pages
│   │   │   ├── api/          # API routes (slides, socket)
│   │   │   ├── presentation/ # Presentation view
│   │   │   ├── speaker/      # Speaker view
│   │   │   └── test/         # Testing view
│   │   ├── components/       # React components
│   │   ├── lib/              # Utilities and hooks
│   │   └── types/            # TypeScript definitions
│   ├── courses/              # Course content
│   │   └── cursor-ai-training/ # Cursor AI course
│   └── public/               # Static assets
├── course-plans/             # Source planning documents
├── docs/                     # Additional documentation
├── start-presentation.sh     # Quick start script
├── TODO.md                   # Development tracking
└── TESTING_PLAN.md          # Testing documentation
```

### Technology Stack

**Frontend & Framework**

- **Next.js 15** with App Router and Turbopack
- **React 19** with modern hooks and patterns
- **TypeScript** for type safety
- **Tailwind CSS** for styling and responsive design

**State & Real-time**

- **Zustand** for state management
- **Socket.IO** for real-time synchronization
- **WebSocket** communication between presenter and audience

**Content & Processing**

- **Markdown** with frontmatter for slide content
- **Gray Matter** for frontmatter parsing
- **Remark** for markdown processing
- **Prism** for syntax highlighting

**Testing & Quality**

- **Jest** for unit and integration testing
- **Playwright** for end-to-end testing
- **Testing Library** for component testing
- **ESLint** and **Biome** for code quality

## 🎨 Features

### Presentation System

**Multi-View Architecture**

- **Presentation View**: Full-screen slides for audience
- **Speaker View**: Split-screen with slide preview, navigation, and notes
- **Test View**: Development interface for content testing

**Real-time Synchronization**

- WebSocket-based slide synchronization
- Connection status monitoring
- Automatic reconnection handling
- Multi-client support

**Responsive Design**

- Maintains 16:9 aspect ratio on all screen sizes
- Mobile-optimized interface
- Scalable typography and layouts
- Professional presentation aesthetics

**Speaker Tools**

- Slide preview with navigation controls
- Adjustable speaker notes font sizes
- Duration timer and presentation controls
- Connection status indicators
- Start/stop presentation with confirmations

### Content Management

**Flexible Content System**

- Markdown-based slide content
- Frontmatter metadata support
- Dynamic slide loading
- Extensible slide types (cover, content, code, custom)

**Course Organization**

- Structured course and lecture hierarchy
- JSON metadata for courses and lectures
- Automatic slide counting and navigation
- Professional slide templates

## 🛠️ Development

### Development Workflow

1. **Start Development Server**:

   ```bash
   cd presentation-app
   npm run dev
   ```

2. **Run Tests**:

   ```bash
   # Unit tests
   npm run test
   
   # Watch mode
   npm run test:watch
   
   # Coverage report
   npm run test:coverage
   
   # E2E tests
   npm run test:e2e
   ```

3. **Code Quality**:

   ```bash
   # Linting
   npm run lint
   
   # Type checking
   npx tsc --noEmit
   ```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run test` | Run all tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Generate coverage report |
| `npm run test:unit` | Run unit tests only |
| `npm run test:components` | Run component tests only |
| `npm run test:api` | Run API tests only |
| `npm run test:e2e` | Run end-to-end tests |
| `npm run test:e2e:ui` | Run e2e tests with UI |
| `npm run test:e2e:debug` | Debug e2e tests |
| `npm run lint` | Run ESLint |

### Adding New Courses

1. **Create Course Structure**:

   ```bash
   mkdir -p presentation-app/courses/[course-id]
   ```

2. **Add Course Metadata**:

   ```json
   // presentation-app/courses/[course-id]/info.json
   {
     "id": "course-id",
     "title": "Course Title",
     "description": "Course description",
     "author": "Author Name",
     "lectures": [...]
   }
   ```

3. **Create Lectures**:

   ```bash
   mkdir -p presentation-app/courses/[course-id]/lecture1
   ```

4. **Add Slide Content**:

   ```markdown
   ---
   type: "content"
   title: "Slide Title"
   speakerNotes: "<p>Speaker notes in HTML</p>"
   ---

   # Slide Content
   Your slide content in Markdown.
   ```

### Testing Strategy

**Unit Tests**

- Component functionality
- Utility functions
- State management
- API route handlers

**Integration Tests**

- Component interactions
- API integrations
- Real-time communication
- State synchronization

**End-to-End Tests**

- Full presentation workflows
- Multi-view synchronization
- Navigation and controls
- Error handling

## 🚀 Deployment

### Production Build

```bash
cd presentation-app
npm run build
npm run start
```

### Deployment Options

**Vercel (Recommended)**

- Optimized for Next.js applications
- Automatic deployments from Git
- Edge function support
- Built-in analytics

**Docker**

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY presentation-app/package*.json ./
RUN npm install
COPY presentation-app/ .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

**Static Export** (Limited functionality)

```bash
npm run build
npm run export
```

### Environment Configuration

Create `.env.local` in the presentation-app directory:

```env
# WebSocket configuration
NEXT_PUBLIC_SOCKET_URL=ws://localhost:3001

# API configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Feature flags
NEXT_PUBLIC_ENABLE_REAL_TIME=true
```

## 📖 API Reference

### Slide API

**Get Lecture Slides**

```
GET /api/slides/[courseId]/[lectureId]
```

Response:

```json
{
  "slides": [...],
  "metadata": {
    "courseId": "cursor-ai-training",
    "lectureId": "lecture1",
    "slideCount": 28
  }
}
```

### WebSocket Events

**Client → Server**

- `join-room`: Join presentation room
- `slide-change`: Request slide navigation
- `presentation-control`: Start/stop presentation

**Server → Client**

- `slide-update`: Broadcast slide changes
- `connection-status`: Connection state updates
- `presentation-state`: Presentation status changes

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and add tests
4. **Run the test suite**: `npm run test`
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Code Style

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write comprehensive tests
- Add JSDoc comments for functions
- Follow the existing project structure

### Commit Convention

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation updates
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions/updates
- `chore:` Maintenance tasks

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the `/docs` directory for detailed guides
- **Issues**: Report bugs and feature requests via GitHub Issues
- **Testing**: Review `TESTING_PLAN.md` for testing procedures
- **Development**: See `TODO.md` for development status and roadmap

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/) and [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Real-time features powered by [Socket.IO](https://socket.io/)
- Testing with [Jest](https://jestjs.io/) and [Playwright](https://playwright.dev/)
- Content processing with [Remark](https://remark.js.org/)

---

**Ready to start presenting?** Run `./start-presentation.sh` and begin your Cursor AI training journey! 🚀
