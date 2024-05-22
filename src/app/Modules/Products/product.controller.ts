import { Request, Response } from 'express';
import { ProductService } from './product.service';
import { ProductZodSchema } from './product.validation';
import { ZodError } from 'zod';

const createNewProduct = async (req: Request, res: Response) => {
  try {
    const { productData } = req.body;
    const zodParsedData = ProductZodSchema.parse(productData);
    const result = await ProductService.addProductIntoDB(zodParsedData);
    console.log(result);
    res.status(200).send({
      success: true,
      message: 'Product created successfully',
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    if (error instanceof ZodError) {
      // Concatenate error messages into a single string
      let errorString = error.errors.map((err) => err.message).join('. ');
      // Add full stop to the end if there are errors
      if (error.errors.length > 0) {
        errorString += '.';
      }
      res.status(500).send({
        success: false,
        message: errorString || 'Something is wrong!! Try Again',
        error: error,
      });
    } else {
      res.status(500).send({
        success: false,
        message: error.message || 'Something is wrong!! Try Again',
        error: error,
      });
    }
  }
};

const getAllProduct = async (req: Request, res: Response) => {
  try {
    const result = await ProductService.getAllProduct();
    res.status(200).send({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message || 'Something is wrong!! Try Again',
      error: error,
    });
  }
};
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.productId;
    const result = await ProductService.getSingleProduct(id);
    res.status(200).send({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message || 'Something is wrong!! Try Again',
      error: error,
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.productId;
    const updatedData = req.body;

    const result = await ProductService.updateProduct(id, updatedData);
    console.log(result, 'gg');

    if (!result) {
      return res.status(500).send({
        success: false,
        message: 'Can not Update. Product maybe deleted',
        error: {},
      });
    }

    res.status(200).send({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message || 'Something is wrong!! Try Again',
      error: error,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.productId;
    const result = await ProductService.deleteProduct(id);
    res.status(200).send({
      success: true,
      message: 'Product deleted successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message || 'Something is wrong!! Try Again',
      error: error,
    });
  }
};

export const ProductController = {
  createNewProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
