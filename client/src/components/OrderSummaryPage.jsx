import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderSummaryPage.css';

export default function OrderSummaryPage() {
    const [cartItems, setCartItems] = useState([]);
    const [purchasedItems, setPurchasedItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const purchased = JSON.parse(localStorage.getItem('purchased')) || [];
        setCartItems(cart);
        setPurchasedItems(purchased);
    }, []);

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

    return (
        <div className="order-summary-container">
            <h2 className="order-summary-title">Order Summary</h2>

            <div className="order-summary-section">
                <h3 className="order-summary-heading">Products in Cart</h3>
                <div className="order-summary-list">
                    {cartItems.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        cartItems.map((item, index) => (
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
