import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroBanner.css';

export default function HeroBanner() {
    const navigate = useNavigate();

    return (
        <div className="hero-banner">
            <div className="hero-content">
                <h1>Welcome to Our Store</h1>
                <p>Discover your style with the latest fashion for Men, Women & Unisex.</p>
                <button onClick={() => navigate('/products')} className="hero-btn">Shop Now</button>
            </div>
        </div>
    );
}
