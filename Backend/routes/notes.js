const express = require("express");
const Note = require("../models/Notes");
const auth = require("../middleware/auth");  // <-- add this

const router = express.Router();

// GET NOTES (USER SPECIFIC)
router.get("/", auth, async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.json(notes);
});

// ADD NOTE
router.post("/", auth, async (req, res) => {
  const note = new Note({
    title: req.body.title,
    content: req.body.content,
    user: req.user.id
  });

  const newNote = await note.save();
  res.status(201).json(newNote);
});

// UPDATE NOTE
router.put("/:id", auth, async (req, res) => {
  const note = await Note.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(note);
});

// DELETE NOTE
router.delete("/:id", auth, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Note deleted" });
});

module.exports = router;
