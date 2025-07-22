import React from 'react';
import "./Home.css";
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import ProductList from './ProductList';
import HeroBanner from './HeroBanner';
import SearchBar from './SearchBar';
import Footer from './Footer';

export default function Home() {

    return (
       <>
       <Navbar />
       <HeroBanner />

       <SearchBar />

       <ProductList />
       <Footer />
       </>
    );
}
