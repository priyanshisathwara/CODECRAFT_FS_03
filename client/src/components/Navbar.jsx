import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import './Navbar.css';

export default function Navbar() {
    const navigate = useNavigate();
    const [isRegistered, setIsRegistered] = useState(false);

    // Check on component mount if user has registered before
    useEffect(() => {
        const registered = localStorage.getItem('isRegistered');
        if (registered === 'true') {
            setIsRegistered(true);
        }
    }, []);

    const handleRegister = () => {
        localStorage.setItem('isRegistered', 'true');
        setIsRegistered(true);
        navigate('/register');
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">Tradivo</Link>
            </div>

            <ul className="navbar-links">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/products">Shop</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/contact-us">Contact</Link>
                </li>
            </ul>

            <div className="navbar-icons">
                <Link to="/order-summary">
                    <FaShoppingCart size={22} />
                </Link>

                {isRegistered ? (
                    <Link to="/profile">
                        <FaUserCircle size={22} />
                    </Link>
                ) : (
                    <button className="register-btn" onClick={handleRegister}>
                        Register
                    </button>
                )}
            </div>
        </nav>
    );
}
