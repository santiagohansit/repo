# MCR File Processor

## Overview

This is a full-stack web application for processing MCR (macro) files with humanization capabilities. The application allows users to upload .mcr files, configure humanization settings to make automation scripts appear more natural, and download the processed results. It features real-time processing updates, file management, and a modern React-based dashboard interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development and building
- **UI Components**: Shadcn/ui component library built on Radix UI primitives for accessible, consistent design
- **Styling**: Tailwind CSS with CSS variables for theming and responsive design
- **State Management**: TanStack React Query for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **File Uploads**: React Dropzone for drag-and-drop file upload functionality

### Backend Architecture
- **Runtime**: Node.js with Express.js for the REST API server
- **Language**: TypeScript with ES modules for type safety and modern JavaScript features
- **File Processing**: Custom MCR parser and humanization engine for processing macro files
- **WebSocket**: Real-time updates for processing progress and status changes
- **File Handling**: Multer middleware for multipart file uploads with .mcr validation
- **Session Management**: Express sessions with PostgreSQL store for user state

### Database Design
- **Database**: PostgreSQL with Neon serverless hosting
- **ORM**: Drizzle ORM for type-safe database operations and migrations
- **Schema**: Three main tables:
  - `users`: User authentication and management
  - `mcr_files`: File metadata, processing status, and humanization settings
  - `processing_queue`: Background job queue for file processing operations

### Real-time Communication
- **WebSocket Server**: Integrated with HTTP server for live processing updates
- **Event Broadcasting**: Server-side event broadcasting to connected clients
- **Client Reconnection**: Automatic WebSocket reconnection handling on the frontend

### File Processing Pipeline
- **Upload Validation**: File type checking (.mcr extension) and size limits (10MB)
- **Command Parsing**: MCR file parser to extract automation commands
- **Humanization Engine**: Configurable settings for:
  - Delay variation (1-100%)
  - Typing error injection (0-10 errors)
  - Hesitation pauses (0-50% frequency)
  - Structure preservation options
- **Progress Tracking**: Real-time progress updates during processing
- **Error Handling**: Comprehensive error tracking and user feedback

### Development Tooling
- **Build System**: Vite for fast development server and optimized production builds
- **Code Quality**: TypeScript strict mode for type checking
- **Development Plugins**: Replit-specific plugins for enhanced development experience
- **Hot Reload**: Vite HMR for instant development feedback

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Connection Pool**: @neondatabase/serverless for efficient database connections

### UI and Styling
- **Radix UI**: Comprehensive set of unstyled, accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom theme configuration
- **Class Variance Authority**: Type-safe component variant management
- **Lucide React**: Modern icon library for consistent iconography

### State Management and Data Fetching
- **TanStack React Query**: Server state synchronization with caching and background updates
- **React Hook Form**: Performant form library with minimal re-renders
- **Zod**: Runtime type validation for forms and API data

### File Handling and Processing
- **Multer**: Express middleware for handling multipart/form-data uploads
- **Date-fns**: Modern date utility library for timestamp formatting

### Development and Build Tools
- **Vite**: Next-generation frontend build tool with fast HMR
- **TypeScript**: Static type checking for enhanced developer experience
- **PostCSS**: CSS processing with Tailwind and Autoprefixer plugins
- **ESBuild**: Fast JavaScript bundler for production builds

### WebSocket Communication
- **ws**: WebSocket library for real-time client-server communication
- **Native WebSocket API**: Browser-native WebSocket implementation on frontend