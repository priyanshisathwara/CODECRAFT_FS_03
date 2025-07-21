import React from 'react';
import "./Home.css";
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import ProductList from './ProductList';

export default function Home() {

    return (
       <>
       <Navbar />

       <ProductList />
       </>
    );
}
