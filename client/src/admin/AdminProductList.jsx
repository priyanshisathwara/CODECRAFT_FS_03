import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminProductList.css';

export default function AdminProductList() {
    const [products, setProducts] = useState([]);
    const [editProduct, setEditProduct] = useState(null);
    const [imagePreviews, setImagePreviews] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock_quantity: '',
        size: '',
        gender: '',
        images: [],
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/products/get');
            setProducts(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure to delete this product?')) return;
        try {
            await axios.delete(`http://localhost:8000/api/products/delete/${id}`);
            fetchProducts();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (product) => {
        setEditProduct(product);
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            stock_quantity: product.stock_quantity,
            size: product.size,
            gender: product.gender,
            images: [],
        });
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'images') {
            const fileArray = Array.from(files);
            setFormData({ ...formData, images: fileArray });

            const previewUrls = fileArray.map(file => URL.createObjectURL(file));
            setImagePreviews(previewUrls);
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };


    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!editProduct) return;

        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'images') {
                Array.from(formData.images).forEach(file => {
                    data.append('images', file);
                });
            } else {
                data.append(key, formData[key]);
            }
        });

        try {
            await axios.put(`http://localhost:8000/api/products/update/${editProduct.id}`, data);
            alert('Product updated successfully');
            fetchProducts();
            setEditProduct(null);
        } catch (err) {
            console.error(err);
            alert('Failed to update product');
        }
    };

    return (
        <div className="admin-product-list">
            <h2>Product List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>
                                <img
                                    src={`http://localhost:8000${JSON.parse(product.image || '[]')[0] || ''
                                        }`}
                                    alt={product.name}
                                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                />
                            </td>

                            <td>{product.name}</td>
                            <td>₹{product.price}</td>
                            <td>{product.stock_quantity}</td>
                            <td>
                                <button onClick={() => handleEdit(product)}>Edit</button>
                                <button onClick={() => handleDelete(product.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editProduct && (
                <div className="edit-modal">
                    <form className="edit-product-form" onSubmit={handleUpdate}>
                        <h3>Edit Product</h3>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" required />
                        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description"></textarea>
                        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />
                        <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" required />
                        <input type="number" name="stock_quantity" value={formData.stock_quantity} onChange={handleChange} placeholder="Stock" required />
                        <input type="text" name="size" value={formData.size} onChange={handleChange} placeholder="Sizes (S, M, L, XL)" required />
                        <select name="gender" onChange={handleChange} value={formData.gender}>
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                            <option value="Unisex">Unisex</option>
                        </select>
                        <input type="file" name="images" accept="image/*" multiple onChange={handleChange} />
                        <div className="image-preview-container">
                            {imagePreviews.length > 0 ? (
                                imagePreviews.map((src, idx) => (
                                    <img key={idx} src={src} alt={`preview-${idx}`} className="image-preview" />
                                ))
                            ) : (
                                editProduct?.image && JSON.parse(editProduct.image).map((img, idx) => (
                                    <img key={idx} src={`http://localhost:8000${img}`} alt={`existing-${idx}`} className="image-preview" />
                                ))
                            )}
                        </div>


                        <div className="buttons">
                            <button type="submit">Update</button>
                            <button type="button" onClick={() => setEditProduct(null)}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
