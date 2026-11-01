# API Documentation

Base URL: `http://localhost:3000`

Post routes need a logged-in user. Login sets a `token` cookie, which Postman and browsers send automatically.

## Auth

### POST /api/auth/register
Body:
```json
{ "username": "piyush", "email": "piyush@example.com", "password": "secret123" }
```
- 201: `{ "message": "Registered successfully", "user": { "id", "username", "email" } }`
- 400: missing fields or password shorter than 6 characters
- 409: user already exists

### POST /api/auth/login
Body:
```json
{ "email": "piyush@example.com", "password": "secret123" }
```
- 200: `{ "message": "Logged in", "user": {...} }` and sets the `token` cookie
- 400: missing fields
- 401: invalid email or password

### POST /api/auth/logout
- 200: `{ "message": "Logged out" }` and clears the cookie

## Posts (login required)

### POST /api/posts
Body:
```json
{ "title": "My first post", "content": "Hello from Express and MongoDB" }
```
- 201: the created post
- 400: title or content missing
- 401: not logged in

### GET /api/posts
- 200: array of posts (newest first), with `author.username`

### GET /api/posts/:id
- 200: the post
- 400: invalid id, 404: not found

### PATCH /api/posts/:id
Body (any of these fields):
```json
{ "title": "Edited title", "content": "Edited content" }
```
- 200: updated post
- 403: you are not the author
- 404: not found

### DELETE /api/posts/:id
- 200: `{ "message": "Post deleted" }`
- 403: you are not the author
- 404: not found

## Status codes used
200 OK, 201 Created, 400 Bad request, 401 Unauthorized, 403 Forbidden, 404 Not found, 409 Conflict, 500 Server error
