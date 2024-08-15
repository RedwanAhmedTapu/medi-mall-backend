import express, { Request, Response } from 'express';
import ShippingAddress from '../models/ShippingAddress';

const router = express.Router();

router.post('/shipping-addresses', async (req: Request, res: Response) => {
  try {
    const { division, district, subDistrict, address, name, phone } = req.body;
    const shippingAddress = new ShippingAddress({ division, district, subDistrict, address, name, phone });
    await shippingAddress.save();
    res.status(201).json(shippingAddress);
  } catch (error) {
    res.status(500).json({ message: 'Error creating shipping address', error });
  }
});

router.get('/shipping-addresses', async (req: Request, res: Response) => {
  try {
    const shippingAddresses = await ShippingAddress.find();
    res.status(200).json(shippingAddresses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching shipping addresses', error });
  }
});

router.put('/shipping-addresses/:id', async (req: Request, res: Response) => {
  try {
    const { division, district, subDistrict, address, name, phone } = req.body;
    const shippingAddress = await ShippingAddress.findByIdAndUpdate(
      req.params.id,
      { division, district, subDistrict, address, name, phone },
      { new: true }
    );
    if (!shippingAddress) return res.status(404).json({ message: 'Shipping address not found' });
    res.status(200).json(shippingAddress);
  } catch (error) {
    res.status(500).json({ message: 'Error updating shipping address', error });
  }
});

router.delete('/shipping-addresses/:id', async (req: Request, res: Response) => {
  try {
    await ShippingAddress.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: 'Shipping address deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting shipping address', error });
  }
});

export default router;
