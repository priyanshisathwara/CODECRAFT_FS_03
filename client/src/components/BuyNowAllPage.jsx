import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import './BuyNowAllPage.css';

export default function BuyNowAllPage() {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/register');
            return;
        }
        const cart = JSON.parse(localStorage.getItem(`cart_${user.email}`)) || [];
        setCartItems(cart);
    }, [navigate]);

    useEffect(() => {
        const totalPrice = cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0).toFixed(2);
        setTotal(totalPrice);
    }, [cartItems]);


    const handlePlaceOrder = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !cartItems.length) return;

        const productIds = cartItems.map(item => item.id);

        try {
            await axios.post('http://localhost:8000/api/products/purchase-multiple', {
                user_id: user.id,
                product_ids: productIds,
            });
            toast.success('Order placed for all products!');
            localStorage.removeItem(`cart_${user.email}`);
            navigate('/order-summary');
        } catch (error) {
            console.error(error);
            toast.error('Failed to place order.');
        }
    };

    return (
        <div className="buy-now-all-container">
            <h2>Review Your Cart</h2>
            <div className="product-list">
                {cartItems.map((item, index) => (
                    <div key={index} className="product-card">
                        <h3>{item.name}</h3>
                        <p>Price: ₹{item.price}</p>
                    </div>
                ))}
            </div>

            <h3>Total: ₹{total}</h3>

            <button className="place-order-btn" onClick={handlePlaceOrder}>Place Order</button>
            <ToastContainer />
        </div>
    );
}
