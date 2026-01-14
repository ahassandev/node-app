const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const auth = require("../middleware/auth");

router.post("/create", auth, async (req, res) => {
  try {
    const { title, description } = req.body;

    const blog = new Blog({
      title,
      description,
      user: req.user.id, 
    });

    await blog.save();

    console.log("BLOG SAVED:", blog);

    res.status(201).json({ message: "Blog created", blog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
