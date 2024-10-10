import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Journal from '../Journal';
import Entry from '../Entry';

function LoginMED() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState('');
    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8081/MED_ACCOUNT', {email, password})
        .then(res => setResponse(res.data))
        .catch(err => console.log(err));
        if (response === "Login Successfully") {
            navigate("/Journal");
        }
    }
    return (
        <div className="d-flex vh-100 justifycotent-center align-intems-center">
            <div className="p-3 bg-white w-25">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder="Enter Email" className="form-control" onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Enter Password" className="form-control" onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <button className="btn btn-success">Login</button>
                </form>
            </div>
        </div>
    )
}
export default LoginMED;