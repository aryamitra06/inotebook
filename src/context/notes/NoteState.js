import { useState } from "react";
import NoteContext from "./NoteContext";
// defining the state
const NoteState = (props) =>{
    const notesInitial = [
        {
          "_id": "61ed5675ca1416de2cd7edf7",
          "user": "61ed033baa9bff88608985c5",
          "title": "this is the first note",
          "description": "this app is nice!",
          "tag": "anything",
          "date": "2022-01-23T13:21:57.895Z",
          "__v": 0
        },
        {
            "_id": "61ed5675ca1416de2cd7edf7",
            "user": "61ed033baa9bff88608985c5",
            "title": "this is the first note",
            "description": "this app is nice!",
            "tag": "anything",
            "date": "2022-01-23T13:21:57.895Z",
            "__v": 0
          }
      ]

    const [notes, setNotes] = useState(notesInitial)

    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;