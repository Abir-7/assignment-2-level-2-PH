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

export const ProductController = {
  createNewProduct,
};
