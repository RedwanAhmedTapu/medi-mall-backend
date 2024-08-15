import { Request, Response } from 'express';
import Product from '../models/Product';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      slug,
      photos,
      description,
      metaKey,
      price,
      discount,
      stockStatus,
      status,
      primaryCategory,
      secondaryCategory,
      tertiaryCategory,
      variants
    } = req.body;
    console.log(req.body)

    const product = new Product({
      name,
      slug,
      photos,
      description,
      metaKey,
      price,
      discount,
      stockStatus,
      status,
      primaryCategoryId:primaryCategory,
      secondaryCategoryId:secondaryCategory,
      tertiaryCategoryId:tertiaryCategory,
      variants
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find()
      .populate('primaryCategoryId', 'name') // Populate with only the 'name' field, or include more fields as necessary
      .populate('secondaryCategoryId', 'name')
      .populate('tertiaryCategoryId', 'name')
      .populate('variants', 'name price'); // Populate the variants with 'name' and 'price'

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};


export const updateProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      slug,
      photos,
      description,
      metaKey,
      price,
      discount,
      stockStatus,
      status,
      primaryCategory,
      secondaryCategory,
      tertiaryCategory,
      variants
    } = req.body;

    const product = await Product.findByIdAndUpdate(
        {_id:req.params.id},
      {
        name,
        slug,
        photos,
        description,
        metaKey,
        price,
        discount,
        stockStatus,
        status,
        primaryCategory,
        secondaryCategory,
        tertiaryCategory,
        variants
      },
      { new: true }
    );

    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await Product.findByIdAndDelete({_id:req.params.id});
    res.status(204).json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
};
