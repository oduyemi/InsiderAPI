## InsiderAPI Documentation

An API that people can post reviews on businesses so that job seekers can easily find insider information about the places they are applying to.

### Overview

InsiderAPI is a Node.js project built using TypeScript, Express.js, GraphQL, and MongoDB. It serves as the backend API for the InsiderInsights, providing endpoints and GraphQL queries/mutations for managing users, businesses, reviews, and admins.

### Project Structure

```
/insider-api
|-- /public
|   |-- .gitkeep
|-- /src
|   |-- /config
|   |   |-- db.ts        # MongoDB connection configuration
|   |-- /middlewares
|   |   |-- graphql.ts   # GraphQL middleware configuration
|   |-- /models
|   |   |-- Admin.ts     # Mongoose model for Admin
|   |   |-- Business.ts  # Mongoose model for Business
|   |   |-- Review.ts    # Mongoose model for Review
|   |   |-- User.ts      # Mongoose model for User
|   |-- /routes
|   |   |-- index.ts     # Express routes for API endpoints
|   |-- /schema
|   |   |-- schema.ts    # GraphQL schema definition
|   |-- index.ts         # Entry point of the application
|-- .env                 # Environment variables configuration
|-- package.json         # Project dependencies and scripts
|-- tsconfig.json        # TypeScript configuration
```

### Dependencies

The project uses the following major dependencies:

- **Express.js**: Web framework for Node.js
- **TypeScript**: Typed superset of JavaScript
- **GraphQL**: Query language for APIs
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling tool for Node.js

### Configuration

#### Environment Variables (.env)

Ensure you have a `.env` file in the root directory with the following environment variables configured:

```
PORT=3000                  
MONGO_URI=mongodb://localhost:27017/businessreview
```

### Scripts

In `package.json`, the following scripts are available:

- **start**: Starts the production server (assumes `tsc` is used for TypeScript compilation).
- **dev**: Starts the server with `nodemon` for automatic reloading during development.
- **build**: Compiles TypeScript to JavaScript (if needed).
- **lint**: Runs linter for TypeScript files (if configured).

### API Endpoints

The API provides CRUD operations via GraphQL for managing users, businesses, reviews, and admins. Below are the main GraphQL queries and mutations:

- **User**: Query for fetching user details, mutation for creating new users.
- **Business**: Query for fetching business details, mutation for creating new businesses.
- **Review**: Queries for fetching reviews (all or by ID), mutation for creating new reviews.
- **Admin**: Query for fetching admin details, mutation for creating new admins.

### Middleware

#### GraphQL Middleware

Middleware is configured in `src/middlewares/graphql.ts` to handle GraphQL requests and responses.

### Database Configuration

#### MongoDB Connection

The MongoDB connection is configured in `src/config/db.ts`. Ensure your MongoDB server is running and accessible via the `MONGO_URI` defined in `.env`.

### Usage

1. **Install Dependencies**: Run `npm install` to install required dependencies.
2. **Environment Setup**: Configure `.env` file with appropriate environment variables.
3. **Run the Server**: Start the server with `npm run dev` for development or `npm start` for production.

### Testing

- Use GraphiQL or GraphQL Playground to test API queries and mutations.
- Ensure proper data validation and error handling in API responses.

### Contributing

- Fork the repository, create a feature branch, and submit pull requests.
- Follow coding standards and guidelines as per the project.
