import React from "react";

function Alert(props) {
  return (
    <>
      <div className="container-fluid mt-3">
        <div className="alert alert-primary" role="alert">
          {props.msg}
        </div>
      </div>
    </>
  );
}

export default Alert;
