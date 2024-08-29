# Personal Project

## Description

This is a personal project built with Node.js, Express, and TypeScript. It includes user authentication, admin management, and product/category handling.

## Features

- User registration and authentication
- Email verification with OTP
- Admin creation and management
- Product and category management
- Token blacklisting for enhanced security

## Technologies Used

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- JSON Web Tokens (JWT)
- Nodemailer
- Bcrypt
- Mocha and Chai for testing

## Project Structure

The project follows a modular structure:

- `src/`: Contains the main source code
  - `config/`: Configuration files
  - `middlewares/`: Custom middleware functions
  - `modules/`: Feature-specific modules (users, admins, products, categories)
  - `helper/`: Utility functions and constants
  - `email/`: Email templates
- `migrations/`: Database migration files

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up your environment variables in a `.env` file (see `.env.example` for required variables)
4. Set up your database and run migrations:
   ```
   npm run migrate:up
   ```
5. Start the development server:
   ```
   npm run dev
   ```

## Available Scripts
