# MCR File Processor

## Overview

This is a full-stack web application for processing MCR (macro) files with humanization capabilities. The application allows users to upload .mcr files, configure humanization settings to make automation commands appear more natural and human-like, and optimize file processing through intelligent comparison and merging. The system includes a visual keyboard editor for advanced command manipulation and real-time processing updates via WebSocket communication.

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
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
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
- **Optimization Features**:
  - Duration calculation and extension
  - Mouse command removal
  - Zero-delay elimination
  - Intelligent file comparison and merging
  - Visual keyboard editor for command manipulation

### Development Environment
- **Build System**: Vite for development server and production builds
- **Desktop App**: Electron integration for standalone desktop application
- **Development Tools**: Hot module replacement, TypeScript checking, and Replit integration

## External Dependencies

### Database & Infrastructure
- **Neon Database**: Serverless PostgreSQL hosting for production
- **Drizzle Kit**: Database migrations and schema management

### UI & Styling
- **Radix UI**: Headless UI components for accessibility
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography

### File Processing
- **Multer**: Multipart form data handling for file uploads
- **Node.js File System**: Native file operations for MCR processing

### Development & Build
- **Vite**: Build tool and development server
- **TypeScript**: Type safety and modern JavaScript features
- **ESBuild**: Fast JavaScript bundler for server-side code
- **Electron**: Desktop application packaging
- **Replit Plugins**: Development environment integration