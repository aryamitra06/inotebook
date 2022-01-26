import React from "react";
import {Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Navbar() {
    let location = useLocation();
    React.useEffect(() => {
        if(location.pathname === "/"){
            document.title = "iNotebook"
        }
        if(location.pathname === "/about"){
            document.title = "iNotebook | About"
        }
    }, [location]);
    
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        iNotebook
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <li class="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                            <div>
                            </div>
                        </div>
                    </div>
                        <div className="d-flex">
                            <Link class="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                            <Link class="btn btn-primary mx-2" to="/login" role="button">Signup</Link>
                        </div>
                </div>
            </nav>

        </>
    );
}

export default Navbar;
