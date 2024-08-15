import express from 'express';
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from '../controller/categoryController';

const router = express.Router();

router.post('/create-categories', createCategory);
router.get('/get-categories', getCategories);
router.put('/update-categories/:id', updateCategory);
router.delete('/delete-categories/:id', deleteCategory);

export default router;
