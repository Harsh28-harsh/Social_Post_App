const express = require("express");
const router = express.Router();

const Post = require("../models/Post");
const User = require("../models/User");
const fetchuser = require("../middleware/fetchuser");

// Create Post
router.post("/create", fetchuser, async (req, res) => {
  try {
    const { text, image } = req.body;

    if (!text && !image) {
      return res.status(400).json({
        error: "Text ya image me se ek required hai"
      });
    }

    const post = new Post({
      text,
      image,
      user: req.user.id
    });

    const savedPost = await post.save();

    res.json(savedPost);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Feed
router.get("/feed", async (req, res) => {
  try {

    const posts = await Post.find()
      .populate("user", "name")
      .sort({ date: -1 });

    res.json(posts);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
// Delete Post

router.delete("/delete/:id", fetchuser, async (req, res) => {
  try {

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        error: "Post Not Found"
      });
    }

    // Sirf post owner delete kar sakta hai

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({
        error: "Not Allowed"
      });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Post Deleted Successfully"
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Like Post
router.put("/like/:id", fetchuser, async (req, res) => {
  try {

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).send("Post Not Found");
    }

    const alreadyLiked = post.likes.find(
      like => like.user.toString() === req.user.id
    );

    if (alreadyLiked) {
      return res.status(400).json({
        error: "Already liked"
      });
    }

   const user = await User.findById(req.user.id);

post.likes.push({
  user: req.user.id,
  username: user.name
});

    await post.save();

    res.json(post);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Comment Post
router.post("/comment/:id", fetchuser, async (req, res) => {
  try {

    const { text } = req.body;

    const user = await User.findById(req.user.id);

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).send("Post Not Found");
    }

    post.comments.push({
      user: req.user.id,
      username: user.name,
      text
    });

    await post.save();

    res.json(post);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;