import { useState } from 'react';
import axios from 'axios';
import './AddProduct.css';

export default function AddProduct() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock_quantity: '',
        size: '',
        gender: 'Unisex',
        images: [],
    });

    const [imagePreviews, setImagePreviews] = useState([]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'images') {
            const fileArray = Array.from(files);
            setFormData({ ...formData, images: fileArray });
            for (let pair of formData.entries()) {
                console.log(pair[0], pair[1]);
            }


            const previewUrls = fileArray.map(file => URL.createObjectURL(file));
            setImagePreviews(previewUrls);
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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
            await axios.post('http://localhost:8000/api/products/add', data);
            alert('Product added successfully');
            setFormData({
                name: '',
                description: '',
                price: '',
                category: '',
                stock_quantity: '',
                size: '',
                gender: 'Unisex',
                images: [],
            });
            setImagePreviews([]);
        } catch (err) {
            console.error(err);
            alert('Failed to add product');
        }
    };

    return (
        <form className="add-product-form" onSubmit={handleSubmit}>
            <label>Product Name</label>
            <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required />

            <label>Description</label>
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange}></textarea>

            <label>Price</label>
            <input type="number" step="0.01" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />

            <label>Category</label>
            <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />

            <label>Stock Quantity</label>
            <input type="number" name="stock_quantity" placeholder="Stock Quantity" value={formData.stock_quantity} onChange={handleChange} required />

            <label>Sizes</label>
            <input type="text" name="size" placeholder="Sizes (S, M, L, XL)" value={formData.size} onChange={handleChange} required />

            <label>Gender</label>
            <select name="gender" onChange={handleChange} value={formData.gender}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Unisex">Unisex</option>
            </select>


            <label>Product Images</label>
            <input type="file" name="images" accept="image/*" multiple onChange={handleChange} />

            <div className="image-preview-container">
                {imagePreviews.map((src, idx) => (
                    <img key={idx} src={src} alt={`preview-${idx}`} className="image-preview" />
                ))}
            </div>

            <button type="submit">Add Product</button>
        </form>
    );
}
