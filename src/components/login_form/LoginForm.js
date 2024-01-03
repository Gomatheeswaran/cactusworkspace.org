import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css"; // Import your custom CSS
import { connect } from 'react-redux';
import { setUser } from "../../actions/UserActions";
import { setToken } from "../../actions/TokenActions";

const LoginForm = ({ setIsLoggedIn, setUser, setToken}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        // You can implement your authentication logic here
        // For simplicity, we'll consider a successful login for any non-empty username and password
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const res = await response.json();
                setUser(res.user_data);
                setToken(res.token);
                // Handle successful login on the client side
                setIsLoggedIn(true);
                navigate("/dashboard");
            } else {
                // Handle failed login on the client side
                console.error('Login failed');
            }
        } catch (error) {
            // Handle network or other errors
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="login-form-container">
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

// export default LoginForm;
export default connect(null, { setUser, setToken })(LoginForm);
