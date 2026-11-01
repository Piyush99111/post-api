const mongoose = require("mongoose");
const Post = require("../models/post.model");

const badId = (id) => !mongoose.isValidObjectId(id);

// CREATE  POST /api/posts
const createPost = async (req, res) => {
  try {
    const { title, content } = req.body || {};
    if (!title || !content) {
      return res.status(400).json({ message: "title and content are required" });
    }
    const post = await Post.create({ title, content, author: req.user._id });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ ALL  GET /api/posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).populate("author", "username").sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ ONE  GET /api/posts/:id
const getPost = async (req, res) => {
  try {
    if (badId(req.params.id)) return res.status(400).json({ message: "Invalid post id" });
    const post = await Post.findById(req.params.id).populate("author", "username");
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE  PATCH /api/posts/:id   (only the author)
const updatePost = async (req, res) => {
  try {
    if (badId(req.params.id)) return res.status(400).json({ message: "Invalid post id" });
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only edit your own posts" });
    }

    // only allow these fields to change
    const { title, content } = req.body || {};
    if (title !== undefined) post.title = title;
    if (content !== undefined) post.content = content;
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE  DELETE /api/posts/:id   (only the author)
const deletePost = async (req, res) => {
  try {
    if (badId(req.params.id)) return res.status(400).json({ message: "Invalid post id" });
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only delete your own posts" });
    }
    await post.deleteOne();
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPost, getPosts, getPost, updatePost, deletePost };
