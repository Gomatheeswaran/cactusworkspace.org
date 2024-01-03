import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { connect } from 'react-redux';

const Navbar = ({ setIsLoggedIn, user }) => {
    const [userDetail, setUserDetail] = useState(null);

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserDetail(null);
    };

    useEffect(() => {
        setUserDetail(user);
    },[user])

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
                {user?.role === 'admin' ? <li className="navbar-item">
                    <Link to="/users" className="navbar-link">
                        Users
                    </Link>
                </li> : ''}
                <li className="navbar-item">
                    <Link to="/bookings" className="navbar-link">
                        Bookings
                    </Link>
                </li>
                {user?.role === 'admin' ? <li className="navbar-item">
                    <Link to="/rooms" className="navbar-link">
                        Manage Rooms
                    </Link>
                </li> : ''}
                {userDetail ? <li className="navbar-item-logout">
                    <Link onClick={handleLogout} className="navbar-link logout-button">
                        Log out
                    </Link>
                </li> : ''}
            </ul>
        </nav>
    );
}

const mapStateToProps = (state) => ({
    user: state.user.user,
  });
  
// export default Navbar;
export default connect(mapStateToProps)(Navbar);

