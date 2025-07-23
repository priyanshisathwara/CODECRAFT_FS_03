import React, { useEffect, useState } from 'react';
import "./Home.css";
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import HeroBanner from './HeroBanner';
import SearchBar from './SearchBar';
import Footer from './Footer';
import NewArrivals from './NewArrivals';
import ProductList from './ProductList';
import axios from 'axios';

export default function Home() {
    const [homeProducts, setHomeProducts] = useState([]);
    const fetchLimitedProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/products/get");
      setHomeProducts(res.data.slice(0, 10)); // only show 10 products
    } catch (err) {
      console.error("Error fetching homepage products:", err);
    }
  };

  useEffect(() => {
    fetchLimitedProducts();
  }, []);

    return (
       <>
       <Navbar />
       <HeroBanner />

       <SearchBar />
       <h2>Look our Amazing </h2>
        <ProductList limit={10} />
        <NewArrivals />
       <Footer />
       </>
    );
}
