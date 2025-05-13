# AdWrap - Media Management System

A full-stack application for managing media items (Static Billboards and Street Poles) across workspaces.

## Features

- Create and manage workspaces
- Add media items (Static Billboards and Street Poles) to workspaces
- Automatic custom ID generation for media items
- Responsive design with dark mode support
- Type-safe API with Zod validation

## Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- ShadCN UI
- React Hook Form
- Zod

### Backend
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- Zod

## Prerequisites

- Node.js 18 or later
- Docker and Docker Compose
- PostgreSQL (if running locally)

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/adwrap.git
cd adwrap
```

2. Create environment files:
```bash
# Backend
cp backend/.env.example backend/.env

# Frontend
cp frontend/.env.example frontend/.env
```

3. Start the development environment:
```bash
docker-compose up --build
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- PostgreSQL: localhost:5432

## Development

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Testing

### Backend Tests

```bash
cd backend
npm test
```

### Frontend Tests

```bash
cd frontend
npm test
```

## API Documentation

### Workspaces

- `GET /api/workspaces` - List all workspaces
- `GET /api/workspaces/:id` - Get workspace by ID
- `POST /api/workspaces` - Create new workspace
- `PUT /api/workspaces/:id` - Update workspace
- `DELETE /api/workspaces/:id` - Delete workspace

### Media Items

- `GET /api/media?workspace_id=1` - List media items by workspace
- `GET /api/media/:id` - Get media item by ID
- `POST /api/media` - Create new media item
- `PUT /api/media/:id` - Update media item
- `DELETE /api/media/:id` - Delete media item

## License

MIT
