import React from 'react';
import Notes from './Notes';
function Home() {
  return(
  <>
  <div className="container my-3">
  <h3>Add Note</h3>
  <form action="" method="post">
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Note Title</label>
          <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">Note Description</label>
          <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} defaultValue={""} />
        </div>
  <button className="btn btn-primary" type="submit">Add Note</button>      
  </form>
  <Notes/>
  </div>
  </>
  );
}

export default Home;
