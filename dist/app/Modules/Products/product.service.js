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
exports.ProductService = void 0;
const product_model_1 = require("./product.model");
const addProductIntoDB = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_model_1.Product.create(productData);
        return result;
    }
    catch (error) {
        throw error;
    }
});
const getAllProduct = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (query) {
            const result = yield product_model_1.Product.find({
                name: { $regex: new RegExp(query, 'i') },
            });
            return result;
        }
        const result = yield product_model_1.Product.find();
        return result;
    }
    catch (err) {
        throw err;
    }
});
const getSingleProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_model_1.Product.findById(productId);
        return result;
    }
    catch (err) {
        throw err;
    }
});
const updateProduct = (productId, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = { _id: productId };
        const result = yield product_model_1.Product.findOneAndUpdate(filter, updatedData, {
            new: true,
        });
        return result;
    }
    catch (err) {
        throw err;
    }
});
const deleteProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = { _id: productId };
        const result = yield product_model_1.Product.deleteOne(filter);
        return result;
    }
    catch (err) {
        throw err;
    }
});
exports.ProductService = {
    addProductIntoDB,
    getAllProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
};
