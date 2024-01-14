import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertContext from '../context/alert/AlertContext';

const Signup = () => {
    const navigate = useNavigate();
    const alertContext = useContext(AlertContext);
    const { showAlert } = alertContext

    const [signupData, setSignupData] = useState({ name: "", email: "", password: "" })
    const onChange = (e) => {
        setSignupData({ ...signupData, [e.target.name]: e.target.value });

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8000/api/authentication/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(signupData)
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // save token in local storage...
            localStorage.setItem("token", json.accessToken);
            showAlert("success", " Signup successfully")
            navigate("/")
        }
        else {

            showAlert("danger", json.message ? json.message : "Some error has occured")
        }

    }
    return (
        <div className='container' style={{ marginTop: "4rem" }}>
            <h1>Create an account to use INotebook</h1>

            <form style={{ marginTop: "30px" }} onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">FullName</label>
                    <input type="text" value={signupData.name} className="form-control" id="name" name='name' onChange={onChange} required />

                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" value={setSignupData.email} className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} minLength={5} required />

                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" value={setSignupData.password} className="form-control" name='password' id="password" onChange={onChange} minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary">Signup</button>
            </form>
        </div>
    )
}

export default Signup
