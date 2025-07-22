import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './BuyNowPage.css'; // Your existing CSS

export default function BuyNowPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/get/${id}`)
            .then(res => setProduct(res.data))
            .catch(err => console.error(err));
    }, [id]);

    const handleSubmit = (e) => {
    e.preventDefault();
    const existingOrders = JSON.parse(localStorage.getItem('purchased')) || [];
    existingOrders.push(product);
    localStorage.setItem('purchased', JSON.stringify(existingOrders));

    toast.success('Order placed successfully!', {
        position: 'top-center',
        autoClose: 1500,
        onClose: () => navigate('/')
    });
};


    if (!product) return <p>Loading...</p>;

    return (
        <div className="buy-now-container">
            <h2 className="heading">Buy Now - {product.name}</h2>
            <p className="price">Price: ₹{product.price}</p>
            <p className="description">{product.description}</p>

            <h3 className="shipping-heading">Shipping Information</h3>
            <form className="shipping-form" onSubmit={handleSubmit}>
                <label>Full Name</label>
                <input type="text" placeholder="Full Name" required />

                <label>Address</label>
                <input type="text" placeholder="Address" required />

                <label>City</label>
                <input type="text" placeholder="City" required />

                <label>Pincode</label>
                <input type="text" placeholder="Pincode" required />

                <label>Phone Number</label>
                <input type="text" placeholder="Phone Number" required />

                <button type="submit" className="place-order-btn">Place Order</button>
            </form>

            <ToastContainer />
        </div>
    );
}
