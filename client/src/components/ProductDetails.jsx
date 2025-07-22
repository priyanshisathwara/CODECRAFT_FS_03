import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductDetails.css';

export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/get/${id}`)
            .then(res => {
                setProduct(res.data);
                const imgs = JSON.parse(res.data.image);
                setSelectedImage(`http://localhost:8000${imgs[0]}`);
            })
            .catch(err => {
                console.error(err);
            });
    }, [id]);

    if (!product) return <p>Loading...</p>;

    const images = JSON.parse(product.image);

   const handleBuyNow = () => {
    navigate(`/buynow/${id}`);
};


    const handleAddToCart = () => {
        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
        existingCart.push(product);
        localStorage.setItem('cart', JSON.stringify(existingCart));
        alert('Product added to cart!');
    };

    return (
        <div className="product-container">
            <div className="left-column">
                <div className="main-image">
                    <img src={selectedImage} alt={product.name} />
                </div>
                <div className="thumbnail-gallery">
                    {images.map((img, idx) => (
                        <img
                            key={idx}
                            src={`http://localhost:8000${img}`}
                            alt={`${product.name}-${idx}`}
                            onClick={() => setSelectedImage(`http://localhost:8000${img}`)}
                            className={selectedImage === `http://localhost:8000${img}` ? 'active' : ''}
                        />
                    ))}
                </div>
            </div>
            <div className="right-column">
                <h2 className="product-title">{product.name}</h2>
                <p className="product-price">₹{product.price}</p>
                <p className="product-description">{product.description}</p>
                <div className="product-info">
                    <p><strong>In Stock:</strong> {product.stock_quantity}</p>
                    <p><strong>Category:</strong> {product.category}</p>
                    <p><strong>Sizes:</strong> {product.size}</p>
                    <p><strong>Gender:</strong> {product.gender}</p>
                </div>
                <div className="button-group">
                    <button className="add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
                    <button className="buy-now-btn" onClick={handleBuyNow}>Buy Now</button>
                </div>
            </div>
        </div>
    );
}
