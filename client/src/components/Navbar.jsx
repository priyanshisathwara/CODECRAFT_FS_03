import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import './Navbar.css';

export default function Navbar() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setIsLoggedIn(!!user);
    }, []);

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">Tradivo</Link>
            </div>

            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/shop">Shop</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact-us">Contact</Link></li>
            </ul>

            <div className="navbar-icons">
                <Link to="/order-summary">
                    <FaShoppingCart size={22} />
                </Link>

                {isLoggedIn ? (
                    <Link to="/profile">
                        <FaUserCircle size={22} />
                    </Link>
                ) : (
                    <button className="register-btn" onClick={() => navigate('/register')}>
                        Register
                    </button>
                )}
            </div>
        </nav>
    );
}
