# Dev Tinder API

This project is a backend API designed to handle user authentication, profile management, and connection requests for a social networking application. The API enables users to create profiles, send and manage connection requests, and retrieve their personalized feed based on accepted and pending connections.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Profile](#profile)
  - [Connection Requests](#connection-requests)
  - [User](#user)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Sign up, login, and logout functionality.
- **Profile Management**: Edit profile details, update passwords, and view profile information.
- **Connection Requests**: Send, accept, ignore, and reject connection requests to connect with other users.
- **User Feed**: Retrieve personalized feeds based on connection status.
- **Connection Management**: List of all connected and requested connections.

## Tech Stack

- **Node.js** and **Express**: Backend framework
- **MongoDB**: Database for storing user and connection data
- **Mongoose**: ODM for MongoDB
- **JWT**: JSON Web Tokens for authentication

## Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/nachatra-sharma/dev-tinder-node.git
    cd dev-tinder-node
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure environment variables:** Create a .env file in the root directory and add your MongoDB URI, JWT secret, and other necessary configurations:

    ```bash
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```

4.  **Run the server:**

    ```bash
    npm start
    ```

The server should be running at http://localhost:3000.

## API Endpoints

### Authentication

- **POST /signup**: Create a new user account.
- **POST /login**: Login with an existing account.
- **POST /logout**: Logout from the current session.

### Profile

- **GET /profile/view**: View the profile of the currently logged-in user.
- **POST /profile/edit**: Update the profile details of the logged-in user.
- **POST /profile/password**: Update the password of the logged-in user.

### Connection Requests

- **POST /request/send/interested/:userId**: Send a connection request to a user as "interested."
- **POST /request/send/ignored/:userId**: Ignore a connection request from a user.
- **POST /request/review/accepted/:requestId**: Accept a connection request.
- **POST /request/review/rejected/:requestId**: Reject a connection request.

### User

- **GET /user/connections**: Retrieve a list of accepted connections.
- **GET /user/requests**: Retrieve a list of connection requests with "interested" status.
- **GET /user/feed**: Retrieve a feed of users based on connection status.

### Error Handling

The API follows a consistent error response structure. On error, the API returns:

- `success`: Boolean, `false` for failed requests.
- `message`: Description of the error.
- `data`: Any data related to the error (empty by default).
- `error`: The error message or details.

**Example error response**:

```json
{
  "success": false,
  "message": "Something went wrong while getting the feed.",
  "data": {},
  "error": "Detailed error message"
}
```
