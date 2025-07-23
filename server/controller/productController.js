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
        const { category, size, gender, minPrice, maxPrice } = req.query;

        let query = 'SELECT * FROM products WHERE 1=1';
        const params = [];

        if (category) {
            query += ' AND category = ?';
            params.push(category);
        }

        if (size) {
            query += ' AND size = ?';
            params.push(size);
        }

        if (gender) {
            query += ' AND gender = ?';
            params.push(gender);
        }

        if (minPrice && maxPrice) {
            query += ' AND price BETWEEN ? AND ?';
            params.push(Number(minPrice), Number(maxPrice));
        }
        const [rows] = await db.promise().query(query, params);
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

    let images = [];
    if (req.files.length > 0) {
        images = req.files.map(file => `/uploads/${file.filename}`);
    } else if (req.body.existingImages) {
        images = JSON.parse(req.body.existingImages);
    }

    try {
        const query = `
            UPDATE products SET 
                name = ?, 
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
            JSON.stringify(images),
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




export async function searchProducts(req, res) {
    const { query } = req.body;

    if (!query || query.trim() === '') {
        return res.json([]);
    }

    try {
        const [rows] = await db.promise().query(
            `SELECT * FROM products WHERE LOWER(name) LIKE LOWER(?)`,
            [`%${query}%`]
        );
        res.json(rows);
    } catch (error) {
        console.error('Error searching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function getPurchasedProducts(req, res) {
    const { user_id } = req.body;

    if (!user_id) {
        return res.status(400).json({ error: "User ID is required." });
    }

    try {
        const [rows] = await db.promise().query(
            `SELECT p.* FROM products p
             JOIN purchased_products pp ON p.id = pp.product_id
             WHERE pp.user_id = ?`,
            [user_id]
        );
        res.json(rows);
    } catch (error) {
        console.error('Error fetching purchased products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Controller: PurchaseController.js

export const purchaseOneProduct = async (req, res) => {
    const { user_id, product_id, quantity } = req.body;

    if (!user_id || !product_id || !quantity) {
        return res.status(400).json({ error: 'Missing user_id, product_id, or quantity' });
    }

    try {
        const [rows] = await db.promise().query(
            'SELECT stock_quantity FROM products WHERE id = ?',
            [product_id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const currentStock = rows[0].stock_quantity;

        if (currentStock < quantity) {
            return res.status(400).json({ error: 'Insufficient stock available' });
        }

        // Insert into purchased_products
        await db.promise().query(
            'INSERT INTO purchased_products (user_id, product_id, quantity, purchase_date) VALUES (?, ?, ?, NOW())',
            [user_id, product_id, quantity]
        );

        // Update stock
        await db.promise().query(
            'UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?',
            [quantity, product_id]
        );

        res.json({ success: true, message: 'Product purchased successfully' });
    } catch (error) {
        console.error('Error during purchase:', error); // 🔥 log real error
        res.status(500).json({ error: 'Internal Server Error', detail: error.message });
    }
};




export async function purchaseMultipleProducts(req, res) {
    const { user_id, product_ids } = req.body;

    if (!user_id || !product_ids || !product_ids.length) {
        return res.status(400).json({ error: 'Missing user_id or product_ids' });
    }

    try {
        for (const product_id of product_ids) {
            await db.promise().query(
                'INSERT INTO purchased_products (user_id, product_id) VALUES (?, ?)',
                [user_id, product_id]
            );
        }
        res.json({ success: true, message: 'All products purchased successfully' });
    } catch (error) {
        console.error('Error inserting purchases:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
