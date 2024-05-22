import express from 'express';
import { OrderController } from './orders.controller';

const router = express.Router();

router.post('/orders', OrderController.createOrders);
router.get('/orders', OrderController.getOrders);
router.get('/products/:productId');
router.put('/products/:productId');
router.delete('/products/:productId');

export const OrderRouter = router;
