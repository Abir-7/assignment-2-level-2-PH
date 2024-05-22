import { Product } from '../Products/product.model';
import { TOrders } from './order.interface';
import { Orders } from './order.model';

const createOrders = async (order: TOrders) => {
  try {
    const result = await Orders.create(order);
    console.log(result);

    if (result._id && result.productId) {
      await Product.findOneAndUpdate(
        { _id: result.productId },
        { $inc: { 'inventory.quantity': -order.quantity } },
      );
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
