const express = require("express");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth.route");
const postRoute = require("./routes/post.route");

const app = express();

app.use(express.json());   // lets us read JSON request bodies (req.body)
app.use(cookieParser());   // lets us read cookies (req.cookies)

app.get("/", (req, res) => res.send("Post API is running"));
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

module.exports = app;
