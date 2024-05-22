import { Product, UpdatedProductData } from './product.model';

import { TProduct } from './products.interface';

const addProductIntoDB = async (productData: TProduct) => {
  try {
    const result = await Product.create(productData);
    return result;
  } catch (error: any) {
    throw error;
  }
};

const getAllProduct = async (query: any) => {
  try {
    if (query) {
      const result = await Product.find({
        name: { $regex: new RegExp(query, 'i') },
      });
      return result;
    }
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

const updateProduct = async (
  productId: string,
  updatedData: UpdatedProductData,
) => {
  try {
    const filter = { _id: productId };
    const result = await Product.findOneAndUpdate(filter, updatedData, {
      new: true,
    });

    return result;
  } catch (err: any) {
    throw err;
  }
};

const deleteProduct = async (productId: string) => {
  try {
    const filter = { _id: productId };
    const result = await Product.deleteOne(filter);
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
  deleteProduct,
};
