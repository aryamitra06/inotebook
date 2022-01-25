import React from 'react';
import { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';
function About() {
  const context = new useContext(NoteContext);
  return(
    <>
    {context.name}
    </>
  );
}

export default About;
