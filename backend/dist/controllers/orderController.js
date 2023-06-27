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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderToDelivered = exports.getOrders = exports.getMyOrders = exports.updateOrderToPaid = exports.getOrderById = exports.getOrderItems = void 0;
const orderModel_1 = __importDefault(require("../models/orderModel"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const getOrderItems = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice, } = req.body;
    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
        return;
    }
    else {
        const order = new orderModel_1.default({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });
        const createdOrder = yield order.save();
        res.status(201).json(createdOrder);
    }
}));
exports.getOrderItems = getOrderItems;
const getOrderById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield orderModel_1.default.findById(req.params.id).populate('user', 'name email');
    if (order) {
        res.json(order);
    }
    else {
        res.status(404);
        throw new Error('Order not found');
    }
}));
exports.getOrderById = getOrderById;
const updateOrderToPaid = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield orderModel_1.default.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        };
        const upadatedOrder = yield order.save();
        res.json(upadatedOrder);
    }
    else {
        res.status(404);
        throw new Error('Order not found');
    }
}));
exports.updateOrderToPaid = updateOrderToPaid;
const getMyOrders = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield orderModel_1.default.find({ user: req.user._id });
    res.json(orders);
}));
exports.getMyOrders = getMyOrders;
const getOrders = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield orderModel_1.default.find({}).populate('user', 'id name');
    res.json(orders);
}));
exports.getOrders = getOrders;
const updateOrderToDelivered = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield orderModel_1.default.findById(req.params.id);
    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        const upadatedOrder = yield order.save();
        res.json(upadatedOrder);
    }
    else {
        res.status(404);
        throw new Error('Order not found');
    }
}));
exports.updateOrderToDelivered = updateOrderToDelivered;
//# sourceMappingURL=orderController.js.map