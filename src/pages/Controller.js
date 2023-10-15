import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Home from "./home/Home";
import Dashboard from "./dashboard/Dashboard";
import LoginForm from "./../components/login_form/LoginForm";
import UserManagement from "./user_management/UserManagement";

const Controller = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Router>
            <Navbar setIsLoggedIn={setIsLoggedIn} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <LoginForm setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/users" element={isLoggedIn ? <UserManagement /> : <LoginForm setIsLoggedIn={setIsLoggedIn} />} />
            </Routes>
        </Router>
    );
}

export default Controller;
