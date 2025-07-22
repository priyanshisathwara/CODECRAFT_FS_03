import express from 'express';
import multer from 'multer';
import path from 'path';
import { addProduct, deleteProduct, getProductById, getProducts, getPurchasedProducts, purchaseMultipleProducts, purchaseOneProduct, searchProducts, updateProduct } from '../controller/productController.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});



const upload = multer({ storage });

router.post('/add', upload.array('images', 5), addProduct);
router.get('/get', getProducts);
router.get('/get/:id', getProductById);
router.delete('/delete/:id', deleteProduct);
router.put('/update/:id', upload.array('images', 5), updateProduct);
router.post('/search', searchProducts);
router.post('/purchased', getPurchasedProducts);
router.post('/purchase-one', purchaseOneProduct);
router.post('/purchase-multiple', purchaseMultipleProducts);





export default router;
