import React, { useState, useEffect } from 'react';
import './SearchBar.css';
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
    const [search, setSearch] = useState("");
    const [searchData, setSearchData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(-1);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setSearch(e.target.value);
        setSelectedItem(-1);
    };

    const handleClose = () => {
        setSearch("");
        setSearchData([]);
        setSelectedItem(-1);
    };

    const handleKeyDown = (e) => {
        if (searchData.length === 0) return;

        if (e.key === "ArrowUp") {
            setSelectedItem(prev => Math.max(prev - 1, 0));
        } else if (e.key === "ArrowDown") {
            setSelectedItem(prev => Math.min(prev + 1, searchData.length - 1));
        } else if (e.key === "Enter") {
            if (selectedItem >= 0 && selectedItem < searchData.length) {
                handleProductClick(searchData[selectedItem]);
            }
        }
    };

    const handleProductClick = (product) => {
        navigate(`/product/${product.id}`);
        setSearch("");
        setSearchData([]);
    };

    useEffect(() => {
        if (search.trim() === "") {
            setSearchData([]);
            return;
        }

        axios.post("http://localhost:8000/api/products/search", { query: search })
            .then((res) => {
                const uniqueProducts = Array.from(new Set(res.data.map(item => item.name)))
                    .map(name => res.data.find(item => item.name === name));
                setSearchData(uniqueProducts);
            })
            .catch(err => {
                console.error("Error fetching search results:", err);
                setSearchData([]);
            });
    }, [search]);

    return (
        <section className='search-section'>
            <div className='search-wrapper'>
                <div className='search-input-div'>
                    <input
                        type='text'
                        className='search-input'
                        placeholder='Search products...'
                        autoComplete='off'
                        onChange={handleChange}
                        value={search}
                        onKeyDown={handleKeyDown}
                    />
                    <div className='search-icon'>
                        {search === "" ? (
                            <AiOutlineSearch size={24} color="#FFFFFF" />
                        ) : (
                            <AiOutlineClose size={24} color="#FFFFFF" onClick={handleClose} />
                        )}
                    </div>
                </div>

                {searchData.length > 0 && (
                    <div className="search-result">
                        {searchData.map((data, index) => (
                            <div
                                key={index}
                                onClick={() => handleProductClick(data)}
                                className={selectedItem === index ? 'search-suggestion-line active' : 'search-suggestion-line'}>
                                {data.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
