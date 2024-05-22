import express from 'express';

const router = express.Router();

router.post('/products');
router.get('/products');
router.get('/products/:productId');
router.put('/products/:productId');
router.delete('/products/:productId');

export const OrderRouter = router;
