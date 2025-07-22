import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './BuyNowPage.css';

export default function BuyNowPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/get/${id}`)
            .then(res => setProduct(res.data))
            .catch(err => console.error(err));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/register');
            return;
        }

        try {
            await axios.post('http://localhost:8000/api/products/purchase-one', {
                user_id: user.id,
                product_id: product.id,
            });

            const existingOrders = JSON.parse(localStorage.getItem('purchased')) || [];
            existingOrders.push(product);
            localStorage.setItem('purchased', JSON.stringify(existingOrders));

            toast.success('Order placed successfully!', {
                position: 'top-center',
                autoClose: 1500,
                onClose: () => navigate('/order-summary')
            });
        } catch (error) {
            console.error(error);
            toast.error('Purchase failed.');
        }
    };

    if (!product) return <p>Loading...</p>;

    return (
        <div className="buy-now-container">
            <h2 className="heading">Buy Now - {product.name}</h2>
            <p className="price">Price: ₹{product.price}</p>
            <p className="description">{product.description}</p>

            <h3 className="shipping-heading">Shipping Information</h3>
            <form className="shipping-form" onSubmit={handleSubmit}>
                <label>Name</label>
                <input type="text" placeholder="Full Name" required />

                <label>Address</label>
                <input type="text" placeholder="Address" required />

                <label>City</label>
                <input type="text" placeholder="City" required />

                <label>Pincode</label>
                <input type="text" placeholder="Pincode" required />

                <label>Phone Number</label>
                <input type="text" placeholder="Phone Number" required />

                <h3 className="shipping-heading">Payment Method</h3>
                <div className="payment-method">
                    <input type="radio" id="cod" name="payment" value="Cash on Delivery" defaultChecked required />
                    <label htmlFor="cod">Cash on Delivery (COD)</label>
                </div>


                <button type="submit" className="place-order-btn">Place Order</button>
            </form>

            <ToastContainer />
        </div>

    );
}
