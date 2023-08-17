import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../styles/Register.css";

const Login = () => {

    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const email = form.email.value;
        const password = form.password.value;

        try {
            // Sign in
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");

        } catch (error) {
            setError(true);
        }

    }

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Chat</span>
                <span className="title">Login</span>
                <form className="form" onSubmit={handleSubmit}>
                    <input className="input" type="email" name="email" placeholder='Email' />
                    <input className="input" type="password" name="password" placeholder='Password' />
                    <button className="button">Login</button>
                    {error && <span>Something went wrong!</span>}
                </form>
                <p>You don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </div>
    );
};

export default Login;