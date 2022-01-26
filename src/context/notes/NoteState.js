import { useState } from "react";
import NoteContext from "./NoteContext";
// defining the state
const NoteState = (props) =>{

    const notesInitial = [
        {
          "_id": "61ed5675ca1416de2cd7edkukuf7",
          "user": "61ed033baa9bff88608985c5",
          "title": "this is the first note",
          "description": "this app is nice!",
          "tag": "anything",
          "date": "2022-01-23T13:21:57.895Z",
          "__v": 0
        },
        {
            "_id": "61ed5675ca1416de2cdkukuk7edf7",
            "user": "61ed033baa9bff88608985c5",
            "title": "this is the first note",
            "description": "this app is nice!",
            "tag": "anything",
            "date": "2022-01-23T13:21:57.895Z",
            "__v": 0
          }
      ]

    const [notes, setNotes] = useState(notesInitial);

    // Adding a note
      const addNote = (title, description, tag) =>{
        // api call
        const note = {
                "_id": "61ed5675ca1416de2cd7edf7",
                "user": "61ed033baa9bff88608985c5",
                "title": title,
                "description": description,
                "tag": tag,
                "date": "2022-01-23T13:21:57.895Z",
                "__v": 0
              }
        setNotes(notes.concat(note));
      }
    // Deleting a note
      const deleteNote = (id) =>{
          // api call
        console.log("Deleting the note with id" + id);
        const newNotes = notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes)
      }

    // Editing a note
      const editNote = (id, title, description, tag) =>{
          //api call

          for (let index = 0; index < notes.length; index++) {
              const element = notes[index];
              if(element._id ===id){
                  element.title = title;
                  element.description = description;
                  element.tag = tag;
              }
              
          }

      }

    return (
        <NoteContext.Provider value={{notes, addNote, editNote, deleteNote}}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;