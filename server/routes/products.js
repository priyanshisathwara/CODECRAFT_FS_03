import express from 'express';
import multer from 'multer';
import path from 'path';
import { addProduct, deleteProduct, getProductById, getProducts, searchProducts, updateProduct } from '../controller/productController.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

router.post('/add', upload.array('images', 5), addProduct);
router.get('/get', getProducts);
router.get('/get/:id', getProductById);
router.delete('/delete/:id', deleteProduct);
router.put('/update/:id', upload.array('images', 5), updateProduct);
router.post('/search', searchProducts);

export default router;
