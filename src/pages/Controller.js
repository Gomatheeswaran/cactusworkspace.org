import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Home from "./home/Home";
import Dashboard from "./dashboard/Dashboard";
import LoginForm from "./../components/login_form/LoginForm";
import UserManagement from "./user_management/UserManagement";
import RoomManagement from "./room_management/RoomManagement";
import Bookings from "./bookings/Bookings";
import { connect } from 'react-redux';
import { jwtDecode } from 'jwt-decode';

const Controller = ({ token, user }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                if (decodedToken.exp < currentTime) {
                    console.log('Token is expired');
                    setIsLoggedIn(false);
                } else {
                    console.log('log in successfull')
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.error('Invalid token format', error);
                // Handle invalid token format
                setIsLoggedIn(false);
            }
        }
    }, [token]);

    return (
        <Router>
            <Navbar setIsLoggedIn={setIsLoggedIn} />
            <Routes>
                <Route index path="/staging-cactus/" element={<Home />} />
                <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <LoginForm setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/users" element={isLoggedIn ? <UserManagement /> : <LoginForm setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/rooms" element={isLoggedIn ? <RoomManagement /> : <LoginForm setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/bookings" element={isLoggedIn ? <Bookings /> : <LoginForm setIsLoggedIn={setIsLoggedIn} />} />
            </Routes>
        </Router>
    );
}

// export default RoomManagement;
const mapStateToProps = (state) => ({
    user: state.user.user,
    token: state.token.token
});
  
export default connect(mapStateToProps)(Controller);
