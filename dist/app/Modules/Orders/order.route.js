"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRouter = void 0;
const express_1 = __importDefault(require("express"));
const orders_controller_1 = require("./orders.controller");
const router = express_1.default.Router();
router.post('/orders', orders_controller_1.OrderController.createOrders);
router.get('/orders', orders_controller_1.OrderController.getOrders);
router.get('/products/:productId');
router.put('/products/:productId');
router.delete('/products/:productId');
exports.OrderRouter = router;
