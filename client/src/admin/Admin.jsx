import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminProductList from './AdminProductList';
import AddProduct from "./AddProduct";
import './Admin.css';
import AdminSideBar from './AdminSidebar';

export default function Admin() {
    return (
        <div className="admin-panel">
            <AdminSideBar />
            <div className="admin-content">
                <Routes>
                    <Route path="/products" element={<AdminProductList />} />
                    <Route path="/add-product" element={<AddProduct />} />
                </Routes>
            </div>
        </div>
    );
}
