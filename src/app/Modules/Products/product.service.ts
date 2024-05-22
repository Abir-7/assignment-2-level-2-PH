import { Product } from './product.model';

import { TProduct } from './products.interface';

const addProductIntoDB = async (productData: TProduct) => {
  try {
    const result = await Product.create(productData);
    return result;
  } catch (error: any) {
    throw error;
  }
};

export const ProductService = {
  addProductIntoDB,
};
