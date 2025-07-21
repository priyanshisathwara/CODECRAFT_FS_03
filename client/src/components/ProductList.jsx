import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ProductList.css';

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/products/get')
            .then(res => {
                setProducts(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    const handleCardClick = (product) => {
        navigate(`/product/${product.id}`);
    };

    return (
        <div className="product-list">
            {products.map(product => {
                const images = JSON.parse(product.image);
                return (
                    <div
                        key={product.id}
                        className="product-card"
                        onClick={() => handleCardClick(product)}
                    >
                        <img src={`http://localhost:8000${images[0]}`} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p className="price">₹{product.price}</p>
                    </div>
                );
            })}
        </div>
    );
}
