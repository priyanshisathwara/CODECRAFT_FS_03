import React, { useState, useEffect } from 'react';
import './SearchBar.css';
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
    const [search, setSearch] = useState("");
    const [searchSuggestions, setSearchSuggestions] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setSearch(e.target.value);
        setSelectedIndex(-1);
    };

    const handleClose = () => {
        setSearch("");
        setSearchSuggestions([]);
        setSelectedIndex(-1);
    };

    const handleKeyDown = (e) => {
        if (searchSuggestions.length === 0) return;

        if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex(prev => Math.max(prev - 1, 0));
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex(prev => Math.min(prev + 1, searchSuggestions.length - 1));
        } else if (e.key === "Enter") {
            if (selectedIndex >= 0 && selectedIndex < searchSuggestions.length) {
                navigate(`/search/${searchSuggestions[selectedIndex]}`);
                handleClose();
            } else {
                navigate(`/search/${search}`);
                handleClose();
            }
        }
    };

    useEffect(() => {
        if (search.trim() === "") {
            setSearchSuggestions([]);
            return;
        }

        axios.post("http://localhost:8000/api/products/search", { query: search })
            .then((res) => {
                const uniqueSuggestions = [...new Set(
                    res.data.map(item => item.name.toLowerCase().includes('watch') ? 'watch' : item.name.toLowerCase())
                )];
                setSearchSuggestions(uniqueSuggestions);
            })
            .catch(err => {
                console.error("Error fetching search results:", err);
                setSearchSuggestions([]);
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
                            <AiOutlineSearch size={24} />
                        ) : (
                            <AiOutlineClose size={24} onClick={handleClose} />
                        )}
                    </div>
                </div>

                {searchSuggestions.length > 0 && (
                    <div className="search-result">
                        {searchSuggestions.map((suggestion, index) => (
                            <div
                                key={index}
                                onClick={() => {
                                    navigate(`/search/${suggestion}`);
                                    handleClose();
                                }}
                                className={selectedIndex === index ? 'search-suggestion-line active' : 'search-suggestion-line'}
                            >
                                {suggestion}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
