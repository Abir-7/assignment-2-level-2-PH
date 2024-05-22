import { z } from 'zod';

// Define the Zod schema for Variant
const VariantZodSchema = z
  .object({
    type: z.string({
      required_error: 'Variant is required',
      invalid_type_error: 'Variant must be a string',
    }),
    value: z.string({
      required_error: 'Variant value is required',
      invalid_type_error: 'Variant value must be a string',
    }),
  })
  .strict();

// Define the Zod schema for Inventory
const InventoryZodSchema = z
  .object({
    quantity: z
      .number({
        required_error: 'Quantity is required',
        invalid_type_error: 'Quantity must be a number',
      })
      .min(0, 'Inventory quantity must be a positive number'),
    inStock: z.boolean({
      required_error: 'inStock is required',
      invalid_type_error: 'inStock must be a boolean',
    }),
  })
  .strict();

// Define the Zod schema for Product
export const ProductZodSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string',
  }),
  description: z.string({
    required_error: 'Description is required',
    invalid_type_error: 'Description must be a string',
  }),
  price: z
    .number({
      required_error: 'Price is required',
      invalid_type_error: 'Price must be a number',
    })
    .min(0, 'Product price must be a positive number'),
  category: z.string({
    required_error: 'Product category is required',
    invalid_type_error: 'Product category must be a string',
  }),
  tags: z.array(z.string(), {
    required_error: 'Product tags  is required',
    invalid_type_error: 'Product tags must be a string',
  }),
  variants: z.array(VariantZodSchema),
  inventory: InventoryZodSchema,
  isDeleted: z.boolean().optional(),
});
