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

const getAllProduct = async () => {
  try {
    const result = await Product.find();
    return result;
  } catch (err: any) {
    throw err;
  }
};
const getSingleProduct = async (productId: string) => {
  try {
    const result = await Product.findById(productId);
    return result;
  } catch (err: any) {
    throw err;
  }
};

const updateProduct = async (productId: string) => {
  try {
    const result = await Product.findById(productId);
    return result;
  } catch (err: any) {
    throw err;
  }
};

export const ProductService = {
  addProductIntoDB,
  getAllProduct,
  getSingleProduct,
  updateProduct,
};
