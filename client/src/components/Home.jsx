import React from 'react';
import "./Home.css";
import { useNavigate } from 'react-router-dom';
import Profile from './Profile';

export default function Home() {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/register");
    };

    return (
        <div className="home-container">
            <h2 className="home-title">Welcome to User Authentication</h2>
            <p className="home-subtitle">Register to create your account and get started!</p>
            <div className="home-btn-container">
                <button className="home-register-btn" onClick={handleNavigate}>Register</button>
            </div>
            <Profile />
        </div>
    );
}
