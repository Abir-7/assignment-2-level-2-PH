import express from 'express';
import { ProductController } from './product.controller';

const router = express.Router();

router.post('/products', ProductController.createNewProduct);
router.get('/products', ProductController.getAllProduct);
router.get('/products/:productId', ProductController.getSingleProduct);
router.put('/products/:productId', ProductController.updateProduct);
router.delete('/products/:productId', ProductController.deleteProduct);

export const ProductRouter = router;
