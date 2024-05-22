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
exports.OrderService = void 0;
const product_model_1 = require("../Products/product.model");
const order_model_1 = require("./order.model");
const createOrders = (order) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_model_1.Product.findById(order.productId);
        if (!product) {
            throw new Error('Product not found');
        }
        if (product.inventory.quantity < order.quantity) {
            throw new Error('Insufficient quantity available in inventory');
        }
        const newInventoryQuantity = Math.max(product.inventory.quantity - order.quantity, 0);
        const result = yield order_model_1.Orders.create(order);
        // Update product inventory
        yield product_model_1.Product.findByIdAndUpdate(order.productId, {
            $set: { 'inventory.quantity': newInventoryQuantity },
        });
        if (newInventoryQuantity === 0) {
            yield product_model_1.Product.findByIdAndUpdate(order.productId, {
                $set: { 'inventory.inStock': false },
            });
        }
        return result;
    }
    catch (error) {
        throw error;
    }
});
const getOrders = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (email) {
            const result = yield order_model_1.Orders.find({ email });
            if (result.length === 0) {
                throw new Error('Order not found');
            }
            return result;
        }
        const result = yield order_model_1.Orders.find();
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.OrderService = {
    createOrders,
    getOrders,
};
