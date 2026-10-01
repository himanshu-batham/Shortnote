const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

// GET /api/notes  -> read all notes, newest first
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch notes", error: err.message });
  }
});

// GET /api/notes/:id -> read a single note
router.get("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch note", error: err.message });
  }
});

// POST /api/notes -> create a note
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });
    const saved = await note.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Failed to create note", error: err.message });
  }
});

// PUT /api/notes/:id -> update a note
router.put("/:id", async (req, res) => {
  try {
    const { title, content } = req.body;
    const updated = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Note not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Failed to update note", error: err.message });
  }
});

// DELETE /api/notes/:id -> delete a note
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Note.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Note not found" });
    res.json({ message: "Note deleted", id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete note", error: err.message });
  }
});

module.exports = router;
