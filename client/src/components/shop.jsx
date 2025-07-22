import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Shop.css';
import SearchBar from './SearchBar';

export default function Shop() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/products/get')
            .then(res => setProducts(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleClick = (id) => {
        navigate(`/product/${id}`);
    };

    return (
        <div className="shop-container">
            <h2 className="shop-title">🛍 Explore Our Collection</h2>
            <p className="shop-subtitle">Find something you love from our latest styles and trends.</p>
            <SearchBar />

            <div className="shop-grid">
                {products.map(product => {
                    const images = JSON.parse(product.image);
                    return (
                        <div
                            key={product.id}
                            className="shop-card"
                            onClick={() => handleClick(product.id)}
                        >
                            <img src={`http://localhost:8000${images[0]}`} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p className="price">₹{product.price}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
