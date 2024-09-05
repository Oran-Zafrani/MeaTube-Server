# MeaTube-Server
This project implements a dynamic web server for an online video-sharing platform. The server allows users to upload videos, manage their profiles, and interact with video content through likes, comments, and more. It provides a RESTful API and uses **MongoDB** for data storage.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [API Endpoints](#api-endpoints)
4. [Features](#features)
5. [Tech Stack](#tech-stack)
6. [License](#license)

---

## Installation

1. **Clone the repository**:
   ```bash
2. **Navigate to the project directory**:
   cd videoplatform
3. **Install dependencies:**
   npm install
4. **Set up MongoDB:**
   Ensure you have MongoDB installed and running. Modify the config file to point to your MongoDB instance.
5. **Run the server:**
   npm start
   
The server will be running locally at http://localhost:5000. The API serves endpoints for video and user interactions, supporting CRUD operations for videos and users.

## API Routes

### User Routes
- `GET /users/:id`: Get details about a user by their ID
- `GET /users/username/:username`: Get details about a user by their username
- `GET /users/channel/:channelname`: Get details about a user by their channel name
- `POST /users`: Create a new user
- `POST /login`: Authenticate a user and return a JWT token
- `PUT /users/:username`: Update details of a user (protected route, requires authentication)
- `DELETE /users/:username`: Delete a user (protected route, requires authentication)

### Video Routes
- `GET /videos/:id`: Get details of a specific video by its ID (requires weak authentication)
- `GET /videos`: Get a list of the top 20 videos, sorted randomly
- `GET /search`: Search for videos by keyword
- `GET /videos/username/:username`: Get a list of all videos uploaded by a specific user
- `POST /videos`: Add a new video (protected route, requires authentication)
- `PUT /videos/:id`: Update details of a specific video (protected route, requires authentication)
- `DELETE /videos/:id`: Delete a specific video by ID (protected route, requires authentication)

### Like Routes
- `GET /videos/:id/likes`: Get the number of likes for a specific video (protected route)
- `GET /videos/:id/dislikes`: Get the number of dislikes for a specific video (protected route)
- `POST /videos/:id/likes`: Like a specific video (protected route)
- `POST /videos/:id/dislikes`: Dislike a specific video (protected route)
- `DELETE /videos/:id/likes`: Remove a like from a video (protected route)
- `DELETE /videos/:id/dislikes`: Remove a dislike from a video (protected route)

### Comment Routes
- `GET /videos/:id/comments`: Get all comments for a specific video (protected route)
- `POST /videos/:id/comments`: Add a comment to a video (protected route)
- `PUT /comments/:id`: Update a comment by its ID (protected route)
- `DELETE /comments/:id`: Delete a comment by its ID (protected route)

## Features
   Video Uploads: Users can upload, view, and manage videos.
   User Authentication: Secure login using JWT (JSON Web Tokens).
   RESTful API: Exposed API for managing users and videos.
   Dynamic Video List: Top videos are displayed in random order.
   Likes and Comments: Users can like/dislike videos and add comments.
   
## Tech Stack
   Frontend: React (HTML, CSS, JavaScript)
   Backend: Node.js, Express
   Database: MongoDB (for data persistence)
   API: RESTful API built with Express
   
## License
   MIT License
