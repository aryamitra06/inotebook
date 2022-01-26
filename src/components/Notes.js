import { useContext, React } from 'react';
import NoteContext from '../context/notes/NoteContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem';

const Notes = () => {
    const {notes} = new useContext(NoteContext);
  return (
    <>
    <AddNote/>
      <div className="row my-3">
        <h3>My Notes</h3>
        {notes.map((note) => {
          return <Noteitem  title={note.title} description = {note.description} _id={note._id}/>;
        })}
      </div>
    </>
  );
};

export default Notes;
