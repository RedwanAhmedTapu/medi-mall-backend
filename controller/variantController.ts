import { Request, Response } from 'express';
import Variant from '../models/Variant';

class VariantController {
  // Create a new Variant
  async createVariant(req: Request, res: Response): Promise<Response> {
    try {
      const { name, price } = req.body;
      const variant = new Variant({ name, price });
      await variant.save();
      return res.status(201).json(variant);
    } catch (error) {
      return res.status(500).json({ message: 'Error creating variant', error });
    }
  }

  // Get all Variants
  async getVariants(req: Request, res: Response): Promise<Response> {
    try {
      const variants = await Variant.find();
      return res.status(200).json(variants);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching variants', error });
    }
  }

  // Update a Variant by ID
  async updateVariant(req: Request, res: Response): Promise<Response> {
    try {
      const { name, price } = req.body;
      const variant = await Variant.findByIdAndUpdate(
        req.params.id,
        { name, price },
        { new: true }
      );
      if (!variant) {
        return res.status(404).json({ message: 'Variant not found' });
      }
      return res.status(200).json(variant);
    } catch (error) {
      return res.status(500).json({ message: 'Error updating variant', error });
    }
  }

  // Delete a Variant by ID
  async deleteVariant(req: Request, res: Response): Promise<Response> {
    try {
      const variant = await Variant.findByIdAndDelete(req.params.id);
      if (!variant) {
        return res.status(404).json({ message: 'Variant not found' });
      }
      return res.status(204).json({ message: 'Variant deleted' });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting variant', error });
    }
  }
}

export default new VariantController();
