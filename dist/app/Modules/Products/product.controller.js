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
exports.ProductController = void 0;
const product_service_1 = require("./product.service");
const product_validation_1 = require("./product.validation");
const zod_1 = require("zod");
const createNewProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        const zodParsedData = product_validation_1.ProductZodSchema.parse(productData);
        const result = yield product_service_1.ProductService.addProductIntoDB(zodParsedData);
        res.status(200).send({
            success: true,
            message: 'Product created successfully',
            data: result,
        });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
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
        }
        else {
            res.status(500).send({
                success: false,
                message: error.message || 'Something is wrong!! Try Again',
                error: error,
            });
        }
    }
});
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query.searchTerm;
        const result = yield product_service_1.ProductService.getAllProduct(query);
        res.status(200).send({
            success: true,
            message: 'Products fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: error.message || 'Something is wrong!! Try Again',
            error: error,
        });
    }
});
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productId;
        const result = yield product_service_1.ProductService.getSingleProduct(id);
        res.status(200).send({
            success: true,
            message: 'Product fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: error.message || 'Something is wrong!! Try Again',
            error: error,
        });
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productId;
        const updatedData = req.body;
        const result = yield product_service_1.ProductService.updateProduct(id, updatedData);
        res.status(200).send({
            success: true,
            message: 'Product updated successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: error.message || 'Something is wrong!! Try Again',
            error: error,
        });
    }
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productId;
        const result = yield product_service_1.ProductService.deleteProduct(id);
        res.status(200).send({
            success: true,
            message: 'Product deleted successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: error.message || 'Something is wrong!! Try Again',
            error: error,
        });
    }
});
exports.ProductController = {
    createNewProduct,
    getAllProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
};
