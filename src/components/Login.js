import React, { useState, useContext } from 'react';
import { useNavigate, } from 'react-router-dom';
import AlertContext from '../context/alert/AlertContext';


const Login = (props) => {
    const navigate = useNavigate();
    const context = useContext(AlertContext)
    const { showAlert } = context;
    const [loginData, setLoginData] = useState({ email: "", password: "" })
    const onChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8000/api/authentication/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData)
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // save token in local storage...
            localStorage.setItem("token", json.accessToken);
            // localStorage.setItem("username","")
            showAlert("success", "Login successfully")
            navigate("/")
        }
        else {
            showAlert("danger", json.message ? json.message : "Some error occured.")
        }

    }

    return (
        <div className='container' style={{ marginTop: "4rem" }}>
            <h1>Login to continue to INotebook</h1>
            <form style={{ marginTop: "30px" }} onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" value={loginData.email} className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} />

                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" value={loginData.password} className="form-control" name='password' id="password" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login
