const express = require("express");
const router = express.Router();
const authMiddleware = require("../authmiddleware");
const Note = require("../notes");

// Get notes
router.get("/", authMiddleware, async (req, res) => {
  const notes = await Note.find({ user: req.userId });
  res.json(notes);
});

// Create note
router.post("/", authMiddleware, async (req, res) => {
  const note = new Note({
    user: req.userId,
    title: req.body.title,
    content: req.body.content,
  });
  await note.save();
  res.json(note);
});

module.exports = router;
