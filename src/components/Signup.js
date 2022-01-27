import React from 'react';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom'
const Signup = () => {

  let history = useHistory();
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, email, password})
    });
    const json = await response.json()
    //print the auth token
    console.log(json);

    if(json.authtoken){
        localStorage.setItem('token', json.authtoken); 
        swal("Welcome to iNotebook!", "Your account has been created.", "success");
        history.push("/");
    }
    if(json.error){
      swal("Error!", "User already exists!", "error");
    }
}

  return (
    <>
      <div className="container login-div">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" aria-describedby="name" name="name" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" aria-describedby="email" name="email" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" />
          </div>
          <button type="submit" className="btn btn-primary">Create Account</button>
        </form>
      </div>
    </>
  );
};

export default Signup;
