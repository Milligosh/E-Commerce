# Personal Project

## Description

This is a personal project built with Node.js, Express, and TypeScript. It includes user authentication, admin management, and product/category handling.

## Features

- User registration, authentication and authorization
- Email verification with OTP
- Admin creation and management
- Product and category management
- Token blacklisting for enhanced security
- Rating system for products

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

## API Endpoints

### Users
- POST /api/v1/users/signup: Create a new user account
- POST /api/v1/users/verify-otp: Verify user's email with OTP
- POST /api/v1/users/login: User login

### Products
- POST /api/v1/product/:categoryId/create-product: Create a new product (Admin only)
- GET /api/v1/product/search: Search products by name or description
- GET /api/v1/product/filter: Filter products by category, price range, and rating

### Categories
- POST /api/v1/category/create-category: Create a new category (Admin only)

### Ratings
- POST /api/v1/users/create-rating: Create a new rating for a product

## Security Features

- JWT-based authentication
- Password hashing using bcrypt
- Input validation and sanitization
- Error handling and logging

## Testing

The project includes unit tests for various components, including:
- User registration and authentication
- Category creation
- Product management

To run the tests, use the following command:
- npm test

## Future Improvements

- Implement pagination for product listing
- Add more advanced search and filtering options
- Implement user profile management
- Add image upload functionality for products
- Implement a review system in addition to ratings


## License
This project is licensed under the MIT License.
