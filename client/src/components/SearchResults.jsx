import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SearchResults.css';

export default function SearchResults() {
    const { query } = useParams();
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.post("http://localhost:8000/api/products/search", { query })
            .then((res) => {
                setProducts(res.data);
            })
            .catch(err => console.error(err));
    }, [query]);

    return (
        <div className="search-results-container">
            <h2>Results for "{query}"</h2>
            <div className="products-grid">
                {products.length === 0 ? (
                    <p>No products found.</p>
                ) : (
                    products.map((product) => (
                        <div
                            key={product.id}
                            className="product-card"
                            onClick={() => navigate(`/product/${product.id}`)}
                        >
                            <img src={`http://localhost:8000${JSON.parse(product.image)[0]}`} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>₹{product.price}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
