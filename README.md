# Training Project

A comprehensive training course and presentation system for teaching and learning.

## 📋 Project Overview

This repository contains a complete educational package for Cursor AI training, including:

- **Interactive Presentation System**: A Next.js-based web application for delivering course content
- **Course Materials**: Structured curriculum and lecture content
- **Documentation**: Comprehensive guides and reference materials
- **Template Resources**: PowerPoint templates and presentation assets

## 🏗️ Project Structure

```
/
├── presentation-app/          # Main Next.js presentation application
│   ├── src/                   # Application source code
│   ├── courses/               # Course content and slides
│   ├── public/                # Static assets
│   └── README.md              # Detailed app documentation
├── course-plans/              # Curriculum planning and structure
│   └── cursor-ai-training/    # Cursor AI training materials
├── docs/                      # Project documentation
├── template.pptx              # PowerPoint presentation template
└── README.md                  # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or higher
- npm, yarn, pnpm, or bun package manager

### Running the Presentation App

1. **Navigate to the presentation app directory**:

   ```bash
   cd presentation-app
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

4. **Access the application**:
   - Main application: [http://localhost:3000](http://localhost:3000)
   - Presentation view: `http://localhost:3000/presentation/[courseId]/[lectureId]`
   - Speaker view: `http://localhost:3000/speaker/[courseId]/[lectureId]`

## 🎯 Features

### Presentation System

- **Real-time Synchronization**: WebSocket-based slide sync across multiple devices
- **Multi-View Support**: Separate views for presenter, audience, and testing
- **Responsive Design**: Automatic scaling for different screen sizes
- **Interactive Controls**: Navigation, timing, and presentation management

### Course Content

- **Structured Curriculum**: Organized course and lecture materials
- **Markdown-Based Slides**: Easy-to-edit slide content with frontmatter
- **Speaker Notes**: Integrated notes system for instructors
- **Code Highlighting**: Syntax highlighting for code examples

### Educational Tools

- **Progress Tracking**: Built-in presentation flow management
- **Connection Monitoring**: Real-time status indicators
- **Flexible Navigation**: Jump to any slide, first/last slide controls

## 📚 Course Content

The project includes comprehensive training materials for Cursor AI:

- **Course 1**: Cursor AI fundamentals and best practices
- **Lecture Structure**: Modular lessons with clear objectives
- **Practical Examples**: Real-world coding scenarios and solutions

## 🔧 Development

### Project Components

1. **presentation-app/**: Main Next.js application
   - See [presentation-app/README.md](presentation-app/README.md) for detailed documentation
   - Full-featured presentation system with real-time capabilities

2. **course-plans/**: Educational curriculum structure
   - Course planning and organization
   - Learning objectives and outcomes

3. **docs/**: Additional documentation and resources

### Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Real-time**: Socket.IO
- **Content**: Markdown with frontmatter
- **State Management**: Zustand

## 📖 Usage

### For Instructors

1. **Prepare Content**: Create or modify slides in the `presentation-app/courses/` directory
2. **Start Presentation**: Use the speaker view for full presentation control
3. **Monitor Progress**: Track presentation timing and connection status
4. **Interactive Teaching**: Use real-time sync for engaging classroom experiences

### For Students

1. **Access Presentations**: Join via the presentation URL provided by instructor
2. **Follow Along**: Slides automatically sync with instructor's presentation
3. **Review Materials**: Access course content and examples after sessions

### For Developers

1. **Extend Functionality**: Add new slide types or presentation features
2. **Customize Styling**: Modify themes and layouts
3. **Integrate Content**: Add new courses and educational materials

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is designed for educational purposes as part of Cursor AI training curriculum.

## 🙋‍♂️ Support

For questions about the presentation system, see the detailed documentation in [presentation-app/README.md](presentation-app/README.md).

For course content questions, refer to the materials in the `course-plans/` directory.

---

**Happy Learning with Cursor AI! 🚀**
