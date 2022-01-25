import React from "react";

function Noteitem(props) {
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
          <i className="fas fa-trash"></i>
        </div>
      </div>
    </div>
    </>
  );
}

export default Noteitem;
