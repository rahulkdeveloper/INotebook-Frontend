import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate, } from 'react-router-dom';


const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate()



    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate('/login')

    }


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">INotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>

                    </ul>
                    {/* <form className="d-flex">

                        <Link className={`btn btn-primary mx-2 ${accessToken ? "" : "d-none"}`} role="button" onc>Logout</Link>
                        <Link className={`btn btn-primary mx-2 ${!accessToken ? "" : "d-none"}`} to='/login' role="button">Login</Link>
                        <Link className={`btn btn-primary mx-2 ${!accessToken ? "" : "d-none"}`} to='/signup' role="button">SignUp</Link>
                    </form> */}
                    {!localStorage.getItem("token") ? <form className="d-flex">
                        <Link className="btn btn-primary mx-2" to='/login' role="button">Login</Link>
                        <Link className="btn btn-primary mx-2" to='/signup' role="button">SignUp</Link>
                    </form> :
                        <button className='btn btn-primary' onClick={handleLogout}>Logout</button>
                    }

                </div>
            </div>
        </nav>
    )
}

export default Navbar
