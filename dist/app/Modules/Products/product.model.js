"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
// Define the Variant schema
const VariantSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: [true, 'Variant type is required'],
    },
    value: {
        type: String,
        required: [true, 'Variant value is required'],
    },
}, { _id: false });
// Define the Inventory schema with custom error messages
const InventorySchema = new mongoose_1.Schema({
    quantity: {
        type: Number,
        required: [true, 'Inventory quantity is required'],
    },
    inStock: {
        type: Boolean,
        required: [true, 'Inventory inStock status is required'],
    },
}, { _id: false });
//define product schema
const productSchema = new mongoose_1.Schema({
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
//pre middleware
productSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const product = this;
            const existingProduct = yield exports.Product.findOne({
                name: product.name,
                description: product.description,
                price: product.price,
                inventory: product.inventory,
            });
            if (existingProduct) {
                throw new Error('Product already exists');
            }
            next(); // Continue with the save if no error
        }
        catch (err) {
            next(err); // Pass any unexpected errors to the next middleware
        }
    });
});
productSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
productSchema.pre('findOne', function (next) {
    try {
        this.find({ isDeleted: { $ne: true } });
        next();
    }
    catch (error) {
        throw new Error('Something is wrong');
    }
});
// Create the Product model
exports.Product = (0, mongoose_1.model)('Product', productSchema);
