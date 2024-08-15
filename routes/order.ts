import express, { Request, Response } from 'express';
import Order from '../models/Order';

const router = express.Router();

router.post('/orders', async (req: Request, res: Response) => {
  try {
    const { user, product, quantity, totalPrice, status, date } = req.body;
    const order = new Order({ user, product, quantity, totalPrice, status, date });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
});

router.get('/orders', async (req: Request, res: Response) => {
  try {
    const orders = await Order.find().populate('user').populate('product');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
});

router.put('/orders/:id', async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order', error });
  }
});

router.delete('/orders/:id', async (req: Request, res: Response) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: 'Order deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error });
  }
});

export default router;
