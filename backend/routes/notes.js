const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

// <==== ROUTE (get): Getting all the notes !!!LOGIN REQUIRED!!!!====>
router.get('/allnotes', fetchuser, async(req, res) => {
    const notes = await Note.find({user: req.user.id});
    res.json(notes);
})

// <==== ROUTE (post): Adding notes !!!LOGIN REQUIRED!!!!====>
router.post('/addnote', fetchuser,
[
    // Validators for adding notes
    body('title', 'Enter a valid title').isLength({ min: 1 }),
    body('description', 'Enter a valid description').isLength({ min: 1 }),
    body('tag', 'Enter a valid tag').isLength({ min: 0 }),
],
async(req, res) => {
      // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {title, description, tag} = req.body;
  const note = new Note({
    title, description, tag, user: req.user.id
  })
  const savedNote = await note.save();
  res.json(savedNote);
})

module.exports = router;