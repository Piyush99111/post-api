# Post API

A beginner-friendly backend built with **Node.js, Express and MongoDB (Mongoose)**.
It provides user authentication (register, login, logout) and full CRUD for blog-style posts.
Built while following the Hack Club backend tutorial and tested with Postman.

## Features
- Register and login with passwords hashed using **bcrypt**
- Authentication with **JWT** stored in an httpOnly cookie
- Protected routes using custom **middleware**
- Create, read, update (PATCH) and delete posts
- Only the author of a post can edit or delete it
- Clean **Model - Route - Controller** structure
- Secrets kept in a `.env` file (not uploaded to GitHub)

## Tech stack
Node.js, Express, MongoDB Atlas, Mongoose, bcryptjs, jsonwebtoken, cookie-parser, dotenv, nodemon, Postman

## Folder structure
```
post-api/
|-- config/db.js                  database connection
|-- models/                       User and Post schemas
|-- controllers/                  auth and post logic
|-- routes/                       URL to controller mapping
|-- middleware/auth.middleware.js login check
|-- postman/                      Postman collection
|-- docs/API.md                   endpoint documentation
|-- app.js                        Express app setup
|-- index.js                      entry point
```

## Getting started
**Requirements:** Node.js 18+, Git, a free MongoDB Atlas cluster, Postman.

```bash
git clone https://github.com/Piyush99111/post-api.git
cd post-api
npm install
```

Create a `.env` file (see `.env.example`):
```
PORT=3000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=a_long_random_string
NODE_ENV=development
```

Run:
```bash
npm run dev
```
You should see `Connected to MongoDB` and `Server running on http://localhost:3000`.

## Testing with Postman
Import `postman/post-api.postman_collection.json` and run requests 1 to 8 in order
(Register, Login, Create Post, Get All, Get One, Update, Delete, Logout).
Full request and response details are in [docs/API.md](docs/API.md).

## Screenshots
Add your Postman and Atlas screenshots to `docs/screenshots/` and link them here:

![Postman requests](docs/screenshots/postman.png)
![MongoDB Atlas data](docs/screenshots/atlas.png)

## Author
Piyush - B.Tech CSE, BML Munjal University
