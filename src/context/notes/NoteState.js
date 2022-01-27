import { useState } from "react";
import swal from 'sweetalert';
import NoteContext from "./NoteContext";
// defining the state
const NoteState = (props) =>{

  const host = "http://localhost:5000";

    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);
    
    // getting all the notes
    const getNotes = async () => {
      // API Call 
      const response = await fetch(`${host}/api/notes/allnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        }
      });
      const json = await response.json()
      setNotes(json)
    }



    // Adding a note
      const addNote = async (title, description, tag) =>{
        // api call
        const response = await fetch(`${host}/api/notes/addnote/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({title, description, tag})
        });
        const note = await response.json();
        setNotes(notes.concat(note));
        //alert
        swal("New note added!", "", "success");
      }
      // Deleting a note
      const deleteNote = async (id) =>{
          // api call
        await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          }
        });
        const newNotes = notes.filter((note)=>{return note._id!==id});
        setNotes(newNotes);
        //alert
        swal("Note deleted!", "", "success");        
      }

    // Editing a note
      const editNote = async (id, title, description, tag) =>{
          //api call
          await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
          });

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
        <NoteContext.Provider value={{notes, addNote, editNote, deleteNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;