import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ setIsLoggedIn }) => {
    const handleLogout = () => {
        setIsLoggedIn(false);
    };
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="navbar-item">
                    <Link to="/" className="navbar-link">
                        Home
                    </Link>
                </li>
                <li className="navbar-item">
                    <Link to="/dashboard" className="navbar-link">
                        Dashboard
                    </Link>
                </li>
                <li className="navbar-item">
                    <Link to="/users" className="navbar-link">
                        User Management
                    </Link>
                </li>
                <li className="navbar-item">
                    <Link onClick={handleLogout} className="navbar-link logout-button">
                        Log out
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
