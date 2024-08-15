import express from 'express';
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from '../controller/productController';

const router = express.Router();

router.post('/add-products', createProduct);
router.get('/get-products', getProducts);
router.put('/update-products/:id', updateProduct);
router.delete('/delete-products/:id', deleteProduct);

export default router;
