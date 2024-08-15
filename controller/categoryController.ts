import { Request, Response } from 'express';
import Category from '../models/Category';

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { ...body } = req.body;
    console.log(body,"body")
    const category = new Category( body );
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error creating category', error });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { name, slug, thumbnail } = req.body;
    const category = await Category.findByIdAndUpdate(
      {_id:req.params.id},
      { name, slug, thumbnail },
      { new: true }
    );
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error updating category', error });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const category=await Category.findByIdAndDelete({_id:req.params.id});
    if (!category) return res.status(404).json({ message: 'Category not found' });

    res.status(204).json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error });
  }
};
