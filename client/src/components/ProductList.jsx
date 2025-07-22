import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ProductList.css';

export default function ProductList({ limit }) {
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({
        category: '',
        size: '',
        gender: '',
        minPrice: '',
        maxPrice: ''
    });
    const navigate = useNavigate();

  const fetchProducts = async (filterParams = {}) => {
    const params = new URLSearchParams(filterParams).toString();
    const url = params
        ? `http://localhost:8000/api/products/get?${params}`
        : `http://localhost:8000/api/products/get`;
    try {
        const res = await axios.get(url);
        let data = res.data;
        if (limit) {
            data = data.slice(0, limit);
        }
        setProducts(data);
    } catch (err) {
        console.error(err);
    }
};

    

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        fetchProducts(filters);
    };

    const handleReset = () => {
        const resetFilters = {
            category: '',
            size: '',
            gender: '',
            minPrice: '',
            maxPrice: ''
        };
        setFilters(resetFilters);
        fetchProducts();
    };

    const handleCardClick = (product) => {
        navigate(`/product/${product.id}`);
    };

    return (
        <>
            <form className="filter-form" onSubmit={handleFilterSubmit}>
                <select name="category" value={filters.category} onChange={handleFilterChange}>
                    <option value="">All Categories</option>
                    <option value="T-shirt">T-shirt</option>
                    <option value="Dress">Dress</option>
                    <option value="Accessories">Accessories</option>
                </select>


                <select name="size" value={filters.size} onChange={handleFilterChange}>
                    <option value="">All Sizes</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                </select>

                <select name="gender" value={filters.gender} onChange={handleFilterChange}>
                    <option value="">All Genders</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Unisex">Unisex</option>
                </select>

                <input
                    type="number"
                    name="minPrice"
                    placeholder="Min Price"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                />
                <input
                    type="number"
                    name="maxPrice"
                    placeholder="Max Price"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                />

                <button type="submit">Apply</button>
                <button type="button" onClick={handleReset}>Reset</button>
            </form>

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
        </>
    );
}
