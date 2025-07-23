import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './NewArrivals.css';

export default function NewArrivals() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/products/get')
            .then(res => {
                const latest = res.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setProducts(latest.slice(0, 4)); // Only show latest 6 products
            })
            .catch(err => console.error(err));
    }, []);

    const handleClick = (id) => {
        navigate(`/product/${id}`);
    };

    return (
        <div className="new-arrivals-container">
            <h2 className="section-title"> New Arrivals</h2>
            <div className="products-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card" onClick={() => handleClick(product.id)}>
                        <img src={`http://localhost:8000${JSON.parse(product.image)[0]}`} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>₹{product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
