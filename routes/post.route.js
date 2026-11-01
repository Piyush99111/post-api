const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const {
  createPost, getPosts, getPost, updatePost, deletePost,
} = require("../controllers/post.controller");

// every post route needs the user to be logged in
router.use(protect);

router.post("/", createPost);
router.get("/", getPosts);
router.get("/:id", getPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

module.exports = router;
