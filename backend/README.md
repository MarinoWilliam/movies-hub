# Movies Hub Backend

Movies Hub Backend is the server-side application built using NestJS and Prisma. It integrates with the OMDb API to fetch movie details and provides a set of RESTful endpoints for managing a list of favorite movies. The application uses PostgreSQL for data persistence.

## Features

### API Integration
- Fetch movie details from the OMDb API.
- Seamlessly integrate OMDb search results with the backend.

### CRUD Operations
- Save a favorite movie to the database.
- Retrieve all favorite movies.
- Update details of a favorite movie.
- Delete a favorite movie.

### Database
- PostgreSQL database for storing users and favorites.
- Prisma ORM for database schema and queries.

### Error Handling
- Graceful error handling for API calls and database issues.
- Meaningful error messages in API responses.

## Requirements

- Node.js (v16 or later)
- PostgreSQL
- OMDb API Key

## Setup Instructions

### Clone the Repository

git clone https://github.com/MarinoWilliam/movies-hub-Backend.git
cd movies-hub-Backend

### Install Dependencies

Run the following command to install all required dependencies:  
npm install

### Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

- DATABASE_URL=postgresql://(username):(password)@(host):(port)/(database)
- OMDb_API=(your-omdb-api-key)
- PORT= 3333
- JWT_SECRET="movies_jwt_password"
- 
Replace `<username>`, `<password>`, `<host>`, `<port>`, and `<database>` with your PostgreSQL database details. Replace `<your-omdb-api-key>` with your OMDb API key.

### Database Setup

Run Prisma migrations to set up the database schema:  
npm run db:dev:restart
this will run the Prisma migrations and start the restart docker contaier for the database
### Start the Application

Run the following command to start the server:  
npm run start

The server will start on the port specified in the `.env` file.


### API Endpoints

### Check user
- `auth`: Check for user's state.
- to check for users, send a `GET` request to 'auth'
- it retrives user's userName and id.

#### Sign Up

- `auth/signup`: Create a new user.

- To create a new account, send a `POST` request to the `/signup` endpoint with the following data:

- `username`: Your desired username.
- `email`: Your email address.
- `password`: Your chosen password.

Upon successful sign-up, you will receive a confirmation message and a JSON Web Token (JWT) for authentication.


#### Sign In

- `auth/signin`: Log in with an existing user.

- To log in with an existing account, send a `POST` request to the `/signin` endpoint with the following data:

- `email`: Your registered email.
- `password`: Your account password.

If the credentials are correct, you will receive a JWT token that you can use to authenticate your requests.


#### Movie Search
- **GET** `/movies/search?title=<movie-title>`  
  Fetches movies from the OMDb API based on the provided title even if it is only part of the name.

#### Favorites Management
- **POST** `/favorites`  
  Add a movie to the favorites list.

- **GET** `/favorites`  
  Retrieve the list of all favorite movies.

- **PATCH** `/favorites/:id`  
  Update details of a favorite movie.

- **DELETE** `/favorites/:id`  
  Remove a movie from the favorites list.



