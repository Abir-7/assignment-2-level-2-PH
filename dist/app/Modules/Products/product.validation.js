"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductZodSchema = void 0;
const zod_1 = require("zod");
// Define the Zod schema for Variant
const VariantZodSchema = zod_1.z
    .object({
    type: zod_1.z.string({
        required_error: 'Variant is required',
        invalid_type_error: 'Variant must be a string',
    }),
    value: zod_1.z.string({
        required_error: 'Variant value is required',
        invalid_type_error: 'Variant value must be a string',
    }),
})
    .strict();
// Define the Zod schema for Inventory
const InventoryZodSchema = zod_1.z
    .object({
    quantity: zod_1.z
        .number({
        required_error: 'Quantity is required',
        invalid_type_error: 'Quantity must be a number',
    })
        .min(0, 'Inventory quantity must be a positive number'),
    inStock: zod_1.z.boolean({
        required_error: 'inStock is required',
        invalid_type_error: 'inStock must be a boolean',
    }),
})
    .strict();
// Define the Zod schema for Product
exports.ProductZodSchema = zod_1.z.object({
    name: zod_1.z.string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be a string',
    }),
    description: zod_1.z.string({
        required_error: 'Description is required',
        invalid_type_error: 'Description must be a string',
    }),
    price: zod_1.z
        .number({
        required_error: 'Price is required',
        invalid_type_error: 'Price must be a number',
    })
        .min(0, 'Product price must be a positive number'),
    category: zod_1.z.string({
        required_error: 'Product category is required',
        invalid_type_error: 'Product category must be a string',
    }),
    tags: zod_1.z.array(zod_1.z.string(), {
        required_error: 'Product tags  is required',
        invalid_type_error: 'Product tags must be a string',
    }),
    variants: zod_1.z.array(VariantZodSchema),
    inventory: InventoryZodSchema,
    isDeleted: zod_1.z.boolean().optional(),
});
