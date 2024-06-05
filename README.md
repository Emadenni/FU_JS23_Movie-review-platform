# FU_JS23_Movie-review-platform
individuell examination databaser
# Movie Review Platform API

This is an API for a movie review platform. It allows users to view and review movies. Administrators can also manage movies, including adding, updating, and removing them.

## Endpoints

| Method | Endpoint                 | Description                                          |
|--------|--------------------------|------------------------------------------------------|
| POST   | /register                | Register a new user.                                 |
| POST   | /login                   | Login with user credentials.                         |
| POST   | /movies                  | Add a new movie (admin request).                     |
| GET    | /movies                  | Get the list of all movies.                          |
| GET    | /movies/:id              | Get details of a specific movie.                     |
| PUT    | /movies/:id              | Update an existing movie (admin request).            |
| DELETE | /movies/:id              | Delete an existing movie (admin request).            |
| POST   | /reviews                 | Add a new review.                                    |
| GET    | /reviews                 | Get the list of all reviews.                         |
| GET    | /reviews/:id             | Get details of a specific review.                    |
| PUT    | /reviews/:id             | Update an existing review.                           |
| DELETE | /reviews/:id             | Delete an existing review.                           |
| GET    | /movies/ratings          | Get the list of all movies with their average ratings.|

