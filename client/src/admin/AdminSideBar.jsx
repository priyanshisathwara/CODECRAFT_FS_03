import React from 'react';
import { Link } from 'react-router-dom';
import './AdminSideBar.css';

export default function AdminSideBar() {
    return (
        <div className="sidebar">
            <h2>Admin</h2>
            <ul className="menu">
                <li><Link to="/admin/products">All Products</Link></li>
                <li><Link to="/admin/add-product">Add Product</Link></li>
            </ul>
        </div>
    );
}
