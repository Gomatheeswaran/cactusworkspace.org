import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css"; // Import your custom CSS

const LoginForm = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        // You can implement your authentication logic here
        // For simplicity, we'll consider a successful login for any non-empty username and password
        if (username && password) {
            setIsLoggedIn(true);
            navigate("/dashboard");
        }
    };

    return (
        <div className="login-form-container">
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="login-input"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
            />
            <button onClick={handleLogin} className="login-button">
                Log In
            </button>
        </div>
    );
};

export default LoginForm;
