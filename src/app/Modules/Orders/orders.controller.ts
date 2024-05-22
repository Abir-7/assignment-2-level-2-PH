import { Request, Response } from 'express';
import { OrderService } from './order.service';

const createOrders = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const result = await OrderService.createOrders(order);
    res.status(200).send({
      success: true,
      message: 'Order created successfully',
      date: result,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message || 'Something is wrong!! Try Again',
      error: error,
    });
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const email = req.query.email;
    const result = await OrderService.getOrders(email);
    res.status(200).send({
      success: true,
      message: 'Orders fetched successfully',
      date: result,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message || 'Something is wrong!! Try Again',
      error: error,
    });
  }
};

export const OrderController = {
  createOrders,
  getOrders,
};
