# Company Products Tracking

## Overview

This project is a web application for tracking companies and their products. It provides a user-friendly interface for managing company and product data, built with React and Redux for state management on the frontend, and Node.js for the backend.

## Features

- User authentication (login/signup)
- Company management (add, edit, delete, view)
- Product management (add, edit, delete, view)
- Dashboard with data visualization
- Responsive design for various screen sizes
- Centralized state management with Redux

## Tech Stack

- Frontend: React, Redux, Redux Toolkit, Material-UI
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT
- State Management: Redux

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
cd client && npm install
cd ../server && npm install
```

3. Set up environment variables (see `.env.example`)
4. Start the server:

```bash
cd server && npm start
```

5. Start the client:

```bash
cd client && npm start
```

## Redux Implementation

The application uses Redux for state management, providing a centralized store for:

- User authentication state
- Company data
- Product data
- UI state (e.g., loading indicators, error messages)

Redux Toolkit is utilized to simplify the Redux setup and reduce boilerplate code.

## For dashboard Login & Regiter

For sign in you can use;

- username: test, password: Test.1234

Or you can create new user with sign up functionality and you can login with that username and password.
