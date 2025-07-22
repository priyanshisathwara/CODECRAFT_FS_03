import React, { useEffect, useState } from 'react';
import './CartPage.css'; // Scoped CSS

export default function CartPage() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(items);
    }, []);

    return (
        <div className="cart-container">
            <h2 className="cart-heading">Your Cart</h2>
            {cartItems.length === 0 ? (
                <p className="empty-cart">Your cart is empty.</p>
            ) : (
                cartItems.map((item, index) => (
                    <div key={index} className="cart-item">
                        <h3 className="item-name">{item.name}</h3>
                        <p className="item-price">Price: ₹{item.price}</p>
                    </div>
                ))
            )}
        </div>
    );
}
