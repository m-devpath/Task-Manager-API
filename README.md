# Task Manager API

A simple REST API for managing personal tasks, with user authentication.
Built with Node.js, Express, and MongoDB.

## Features
- User registration & login (JWT authentication)
- Create, read, update, and delete tasks
- Each user can only access their own tasks

## Tech Stack
- Node.js / Express
- MongoDB / Mongoose
- JWT for authentication
- bcryptjs for password hashing

## Getting Started

### Prerequisites
- Node.js installed
- A MongoDB database (local or Atlas)

### Installation
1. Clone the repo
   \`\`\`
   git clone https://github.com/m-devpath/Task-Manager-API
   cd Task-Manager-API
   \`\`\`
2. Install dependencies
   \`\`\`
   npm install
   \`\`\`
3. Create a `.env` file (see `.env.example` for the required variables)
4. Start the server
   \`\`\`
   npm run dev
   \`\`\`

## API Endpoints

### Auth
| Method | Endpoint              | Auth Required | Description          |
|--------|-----------------------|---------------|----------------------|
| POST   | /api/auth/register    | No            | Register a new user  |
| POST   | /api/auth/login       | No            | Log in               |

### Tasks
| Method | Endpoint            | Auth Required | Description                |
|--------|---------------------|---------------|----------------------------|
| POST   | /api/task           | Yes           | Create a new task          |
| GET    | /api/task           | Yes           | Get all your tasks         |
| GET    | /api/task/:id       | Yes           | Get one task               |
| PUT    | /api/task/:id       | Yes           | Update a task              |
| DELETE | /api/task/:id       | Yes           | Delete a task              |