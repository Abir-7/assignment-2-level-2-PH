import { Schema, model } from 'mongoose';
import { TProduct } from './products.interface';

// Define the Variant schema
const VariantSchema = new Schema({
  type: {
    type: String,
    required: [true, 'Variant type is required'],
  },
  value: {
    type: String,
    required: [true, 'Variant value is required'],
  },
});

// Define the Inventory schema with custom error messages
const InventorySchema = new Schema({
  quantity: {
    type: Number,
    required: [true, 'Inventory quantity is required'],
  },
  inStock: {
    type: Boolean,
    required: [true, 'Inventory inStock status is required'],
  },
});

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
});

// Create the Product model
const Product = model<TProduct>('Product', productSchema);

module.exports = Product;
