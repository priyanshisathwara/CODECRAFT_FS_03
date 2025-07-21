import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDetails.css';

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/get/${id}`)
            .then(res => {
                setProduct(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, [id]);

    if (!product) return <p>Loading...</p>;

    const images = JSON.parse(product.image);

    return (
        <div className="product-details">
            <div className="image-gallery">
                {images.map((img, idx) => (
                    <img key={idx} src={`http://localhost:8000${img}`} alt={`${product.name}-${idx}`} />
                ))}
            </div>
            <h2>{product.name}</h2>
            <p className="price">₹{product.price}</p>
            <p>{product.description}</p>
            <p className="stock">In Stock: {product.stock_quantity}</p>
            <p className="category">Category: {product.category}</p>
            <p className="size">Sizes: {product.size}</p>
            <p className="gender">For: {product.gender}</p>
        </div>
    );
}
