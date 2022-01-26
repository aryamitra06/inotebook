import { useState } from "react";
import NoteContext from "./NoteContext";
// defining the state
const NoteState = (props) =>{

  const host = "http://localhost:5000";

    const notesInitial = [];
    // getting all the notes
    const getNotes = async () => {
      // API Call 
      const response = await fetch(`${host}/api/notes/allnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlZDAzM2JhYTliZmY4ODYwODk4NWM1In0sImlhdCI6MTY0MzIwMjE2M30.jtAuT_TkYgxPc0sHl0C7qrG6VF9Ppiu7kqHKf98KeHo"
        }
      });
      const json = await response.json()
      console.log(json)
      setNotes(json)
    }

    const [notes, setNotes] = useState(notesInitial);

    // Adding a note
      const addNote = async (title, description, tag) =>{
        // api call

        await fetch(`${host}/api/notes/addnote/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlZDAzM2JhYTliZmY4ODYwODk4NWM1In0sImlhdCI6MTY0MzIwMjE2M30.jtAuT_TkYgxPc0sHl0C7qrG6VF9Ppiu7kqHKf98KeHo"
          },
          body: JSON.stringify({title, description, tag})
        });

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
      const deleteNote = async (id) =>{
          // api call
        await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlZDAzM2JhYTliZmY4ODYwODk4NWM1In0sImlhdCI6MTY0MzIwMjE2M30.jtAuT_TkYgxPc0sHl0C7qrG6VF9Ppiu7kqHKf98KeHo"
          }
        });
        const newNotes = notes.filter((note)=>{return note._id!==id});
        setNotes(newNotes);
      }

    // Editing a note
      const editNote = async (id, title, description, tag) =>{
          //api call
          await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlZDAzM2JhYTliZmY4ODYwODk4NWM1In0sImlhdCI6MTY0MzIwMjE2M30.jtAuT_TkYgxPc0sHl0C7qrG6VF9Ppiu7kqHKf98KeHo"
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