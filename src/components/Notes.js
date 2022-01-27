import { useContext, React, useEffect } from 'react';
import NoteContext from '../context/notes/NoteContext';
import AddNote from './AddNote';
import { useHistory } from 'react-router-dom';
import Noteitem from './Noteitem';

const Notes = () => {
    // if user is not logged in, push to him to the login!
    let history = useHistory();
    if(!localStorage.getItem('token')){
      history.push('/login');
    }

    const {notes, getNotes} = new useContext(NoteContext);
    useEffect(() => {
      getNotes()
      // eslint-disable-next-line
  }, [])
    
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
