import React, { useState } from 'react';

export default function Filter({ onFilterChange }) {
    const [category, setCategory] = useState('');
    const [size, setSize] = useState('');
    const [gender, setGender] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilterChange({ category, size, gender, minPrice, maxPrice });
    };

    const handleReset = () => {
        setCategory('');
        setSize('');
        setGender('');
        setMinPrice('');
        setMaxPrice('');
        onFilterChange({});
    };

    return (
        <form onSubmit={handleSubmit} className="filter-form">
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">All Categories</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Unisex">Unisex</option>
            </select>

            <select value={size} onChange={(e) => setSize(e.target.value)}>
                <option value="">All Sizes</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
            </select>

            <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">All Genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Unisex">Unisex</option>
            </select>

            <input type="number" placeholder="Min Price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
            <input type="number" placeholder="Max Price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />

            <button type="submit">Apply Filters</button>
            <button type="button" onClick={handleReset}>Reset Filters</button>
        </form>
    );
}
