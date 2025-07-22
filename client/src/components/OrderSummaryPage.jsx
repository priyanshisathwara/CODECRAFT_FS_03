import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './OrderSummaryPage.css';
import { toast } from 'react-toastify';

export default function OrderSummaryPage() {
    const [cartItems, setCartItems] = useState([]);
    const [purchasedItems, setPurchasedItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/register');
            return;
        }

        const cartKey = `cart_${user.email}`;
        const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
        setCartItems(cart);

        axios.post('http://localhost:8000/api/products/purchased', { user_id: user.id })
            .then(res => {
                setPurchasedItems(res.data);
            })
            .catch(err => console.error(err));
    }, [navigate]);

    const getFirstImage = (item) => {
        try {
            const images = JSON.parse(item.image);
            return `http://localhost:8000${images[0]}`;
        } catch {
            return '';
        }
    };

    const handleCardClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    const handleCancelCartItem = (productId) => {
        const user = JSON.parse(localStorage.getItem('user'));
        const cartKey = `cart_${user.email}`;
        const existingCart = JSON.parse(localStorage.getItem(cartKey)) || [];

        const updatedCart = existingCart.filter(item => item.id !== productId);
        localStorage.setItem(cartKey, JSON.stringify(updatedCart));
        setCartItems(updatedCart);
    };

   const handleBuyAll = () => {
   const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/register');
            return;
        }
    navigate('/buynowall');
};




    return (
        <div className="order-summary-container">
            <h2 className="order-summary-title">Order Summary</h2>

            <div className="order-summary-section">
                <h3 className="order-summary-heading">Products in Cart</h3>
                <div className="order-summary-list">
                    {cartItems.map((item, index) => (
                        <div
                            key={index}
                            className="order-summary-card"
                            style={{ cursor: 'pointer' }}
                        >
                            <img src={getFirstImage(item)} alt={item.name} onClick={() => handleCardClick(item.id)} />
                            <h3>{item.name}</h3>
                            <p className="order-summary-price">₹{item.price}</p>
                            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                <button
                                    onClick={() => handleCancelCartItem(item.id)}
                                    className="cancel-btn"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => navigate(`/buynow/${item.id}`)}
                                    className="buy-btn"
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {cartItems.length > 0 && (
                    <button className="buy-all-btn" onClick={handleBuyAll}>
                        Buy All in Cart
                    </button>
                )}
            </div>

            <div className="order-summary-section">
                <h3 className="order-summary-heading">Purchased Products</h3>
                <div className="order-summary-list">
                    {purchasedItems.length === 0 ? (
                        <p>No products purchased yet.</p>
                    ) : (
                        purchasedItems.map((item, index) => (
                            <div
                                key={index}
                                className="order-summary-card"
                                onClick={() => handleCardClick(item.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                <img src={getFirstImage(item)} alt={item.name} />
                                <h3>{item.name}</h3>
                                <p className="order-summary-price">₹{item.price}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
