import React from 'react';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
const Login = () => {
    let history = useHistory();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        const response = await fetch("http://localhost:5000/api/auth/loginuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });
        const json = await response.json()
        if(json.authtoken){
            localStorage.setItem('token', json.authtoken); 
            swal("Welcome back!", "", "success");
            history.push("/");
        }
        if(json.error){
            swal("Error!", "Email or password is incorrect.", "error");
          }
    }
    return (
        <>
            <div className="container login-div">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" aria-describedby="email" name="email"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </>
    );
};

export default Login;
