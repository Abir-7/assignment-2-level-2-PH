import { Schema, model } from 'mongoose';
import { TProduct } from './products.interface';
import { ProductZodSchema } from './product.validation';

// Define the Variant schema
const VariantSchema = new Schema(
  {
    type: {
      type: String,
      required: [true, 'Variant type is required'],
    },
    value: {
      type: String,
      required: [true, 'Variant value is required'],
    },
  },
  { _id: false },
);

// Define the Inventory schema with custom error messages
const InventorySchema = new Schema(
  {
    quantity: {
      type: Number,
      required: [true, 'Inventory quantity is required'],
    },
    inStock: {
      type: Boolean,
      required: [true, 'Inventory inStock status is required'],
    },
  },
  { _id: false },
);

//define product schema
const productSchema = new Schema<TProduct>({
  name: {
    type: String,
    required: [true, 'Product name is required'],
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
  },
  tags: {
    type: [String],
    required: [true, 'Product tags are required'],
  },
  variants: {
    type: [VariantSchema],
    required: [true, 'Product variants are required'],
  },
  inventory: {
    type: InventorySchema,
    required: [true, 'Product inventory is required'],
  },
  isDeleted: {
    type: Boolean,
  },
});

//interface for UpdatedData
export interface UpdatedProductData {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  tags?: string[];
  variants?: { type: string; value: string }[];
  inventory?: { quantity: number; inStock: boolean };
}

//pre middleware
productSchema.pre('save', async function (next) {
  try {
    const product = this;
    const existingProduct = await Product.findOne({
      name: product.name,
      description: product.description,
      price: product.price,
      inventory: product.inventory,
    });
    console.log(existingProduct);
    if (existingProduct) {
      throw new Error('Product already exists');
    }
    next(); // Continue with the save if no error
  } catch (err: any) {
    next(err); // Pass any unexpected errors to the next middleware
  }
});

productSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

productSchema.pre('findOne', function (next) {
  try {
    this.find({ isDeleted: { $ne: true } });
    next();
  } catch (error) {
    throw new Error('Something is wrong');
  }
});

// Create the Product model
export const Product = model<TProduct>('Product', productSchema);
