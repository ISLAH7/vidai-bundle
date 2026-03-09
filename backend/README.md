# VidAI Bundle Backend

Express.js REST API backend for the AI Video Content landing page.

## Features

- ✅ User Authentication (JWT)
- ✅ User Registration & Login
- ✅ Video Management (CRUD)
- ✅ MongoDB Integration
- ✅ Role-based Authorization
- ✅ Error Handling

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs

## Getting Started

### Prerequisites

- Node.js 16+
- MongoDB (local or remote)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vidai-bundle
JWT_SECRET=your-secret-key
```

### Running the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will be running at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)

### Videos
- `GET /api/videos` - Get all published videos
- `GET /api/videos/:id` - Get single video by ID
- `POST /api/videos` - Create new video (requires auth)
- `PUT /api/videos/:id` - Update video (requires auth)
- `DELETE /api/videos/:id` - Delete video (requires auth)
- `POST /api/videos/:id/like` - Like a video (requires auth)

## Project Structure

```
backend/
├── config/          # Configuration files
├── middleware/      # Express middleware
├── models/          # Mongoose schemas
├── routes/          # API routes
├── server.js        # Main server file
├── package.json     # Dependencies
└── .env.example     # Environment variables template
```

## Authentication

Use Bearer token authentication for protected endpoints:

```
Authorization: Bearer <your-jwt-token>
```

## Testing

Run tests with:
```bash
npm test
```

## License

ISC
