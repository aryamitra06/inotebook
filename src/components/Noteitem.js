import React, {useContext} from 'react'
import noteContext from "../context/notes/NoteContext"
function Noteitem(props) {

  const {deleteNote} = useContext(noteContext);
  return (
    <>
    <div className="mt-3 col-md-3 col-sm-4">
      <div className="card my-3" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">
              {props.description}
          </p>
          <i className="fas fa-edit"></i>
          <i className="fas fa-trash" onClick={()=>{deleteNote(props._id)}}></i>
        </div>
      </div>
    </div>
    </>
  );
}

export default Noteitem;
