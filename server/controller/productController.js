import db from "../config/db.js";

export async function addProduct(req, res) {
    const { name, description, price, category, stock_quantity, size, gender } = req.body;

    // Collect all image paths into an array
    const images = req.files.map(file => `/uploads/${file.filename}`);

    if (!name || !price || !category || !stock_quantity || !size || !gender) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const query = `
            INSERT INTO products 
            (name, description, price, image, category, stock_quantity, size, gender) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        await db.promise().query(query, [
            name,
            description || '',
            price,
            JSON.stringify(images), // Store as JSON string in DB
            category,
            stock_quantity,
            size,
            gender
        ]);

        return res.json({ message: 'Product created successfully' });
    } catch (error) {
        console.error('Error creating product:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}



export async function getProducts(req, res) {
    try {
        const [rows] = await db.promise().query('SELECT * FROM products');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function getProductById(req, res) {
    try {
        const [rows] = await db.promise().query('SELECT * FROM products WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Product not found' });
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


export async function deleteProduct(req, res) {
    try {
        await db.promise().query('DELETE FROM products WHERE id = ?', [req.params.id]);
        return res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function updateProduct(req, res) {
    const { name, description, price, category, stock_quantity, size, gender } = req.body;
    const images = req.files.map(file => `/uploads/${file.filename}`);

    if (!name || !price || !category || !stock_quantity || !size || !gender) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const query = `
            UPDATE products 
            SET name = ?, 
                description = ?, 
                price = ?, 
                image = ?, 
                category = ?, 
                stock_quantity = ?, 
                size = ?, 
                gender = ? 
            WHERE id = ?
        `;

        await db.promise().query(query, [
            name,
            description || '',
            price,
            JSON.stringify(images), // Store as JSON string in DB
            category,
            stock_quantity,
            size,
            gender,
            req.params.id
        ]);

        return res.json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error('Error updating product:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
