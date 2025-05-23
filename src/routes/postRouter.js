const express = require('express');
const router = express.Router();

const { createPost, getAllPosts, getPostByID, updatePost, deletePost } = require("../controllers/postController")


router.post("/post", createPost);
router.get("/post", getAllPosts);
router.get("/post/:post_id", getPostByID);
router.put("/post/:post_id", updatePost);
router.delete("/post/:post_id", deletePost);


module.exports = router