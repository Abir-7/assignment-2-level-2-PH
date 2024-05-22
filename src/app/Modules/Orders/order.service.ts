import { Product } from '../Products/product.model';
import { TOrders } from './order.interface';
import { Orders } from './order.model';

const createOrders = async (order: TOrders) => {
  try {
    const product = await Product.findById(order.productId);

    if (!product) {
      throw new Error('Product not found');
    }

    if (product.inventory.quantity < order.quantity) {
      throw new Error('Insufficient inventory');
    }

    const newInventoryQuantity = Math.max(
      product.inventory.quantity - order.quantity,
      0,
    );

    const result = await Orders.create(order);

    // Update product inventory
    await Product.findByIdAndUpdate(order.productId, {
      $set: { 'inventory.quantity': newInventoryQuantity },
    });

    if (newInventoryQuantity === 0) {
      await Product.findByIdAndUpdate(order.productId, {
        $set: { 'inventory.inStock': false },
      });
    }

    return result;
  } catch (error) {
    throw error;
  }
};

const getOrders = async (email: any) => {
  try {
    if (email) {
      const result = await Orders.find({ email });
      return result;
    }
    const result = await Orders.find();
    return result;
  } catch (error) {
    throw error;
  }
};

export const OrderService = {
  createOrders,
  getOrders,
};
