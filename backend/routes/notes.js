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
],
async(req, res) => {
      // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {title, description, tag} = req.body;
  const note = new Note({                                 
    title, description, tag, user: req.user.id  // req.user.id = logged in user's id
  })
  const savedNote = await note.save();
  res.json(savedNote);
})

// <==== ROUTE (put): Updating note !!!LOGIN REQUIRED!!!!====>
router.put('/updatenote/:id', fetchuser, async(req, res) => {

  const {title, description, tag} = req.body;

  // creating a newNote object
  const newNote = {};
  if(title){newNote.title = title};
  if(description){newNote.description = description};
  if(tag){newNote.tag = tag};

  // <== making it more secure ==>
  let note = await Note.findById(req.params.id); // to grab the value from :id in /updatenote/:id
  if(!note){
      return res.status(404).send("Note not found");
  }

  // checking if the jwt user id is same to the note's user id
  if(note.user.toString() !== req.user.id){
    return res.status(401).send("Not Allowed");
}
   // updating and saving the note
   note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
   res.json({note});

})

   // <==== ROUTE (delete): Deleting note !!!LOGIN REQUIRED!!!!====>
router.delete('/deletenote/:id', fetchuser, async(req, res) => {

      // <== making it more secure ==>
    let note = await Note.findById(req.params.id); // to grab the value from :id in /deletenote/:id
    if(!note){
        return res.status(404).send("Note not found");
    }
  
    // checking if the jwt user id is same to the note's user id
    if(note.user.toString() !== req.user.id){
      return res.status(401).send("Not Allowed");
  }
     // updating and saving the note
     note = await Note.findByIdAndDelete(req.params.id)
     res.send({ "Success": "Note has been deleted"});
     
})


module.exports = router;