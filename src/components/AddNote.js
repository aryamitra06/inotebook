import React, {useContext, useState} from 'react'
import noteContext from "../context/notes/NoteContext"

const AddNote = () => {
    const {addNote} = useContext(noteContext);

    const handleClick = (e)=>{
        e.preventDefault();
        
        addNote(note.title, note.description, note.tag);
        //set all the form field blank after submitting the form
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        document.getElementById("tag").value = "";
    }

    const [note, setNote] = useState({title: "", description: "", tag: "default"})
    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }


    return (
        <div className="container my-3">
            <h2>Add a Note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" onChange={onChange} /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea type="text" className="form-control" id="description" name="description" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} /> 
                </div>

                <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
        </div>
    )
}

export default AddNote