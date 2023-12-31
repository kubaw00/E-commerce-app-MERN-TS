import { Request, Response } from 'express';
import Order from '../models/orderModel';
import asyncHandler from 'express-async-handler';

//@desc Create new order
//@route POST /api/orders
//@access Private

const getOrderItems = asyncHandler(async (req: Request, res: Response) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
    return;
  } else {
    const order = new Order({
      orderItems,
      // @ts-expect-error
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

//@desc Get order by Id
//@route GET /api/orders/:id
//@access Private

const getOrderById = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

//@desc Update order to paid
//@route GET /api/orders/:id/pay
//@access Private

const updateOrderToPaid = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      // @ts-expect-error
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const upadatedOrder = await order.save();
    res.json(upadatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

//@desc Get logged in user orders
//@route GET /api/orders/myorders
//@access Private

const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
  // @ts-expect-error
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

//@desc Get all orders
//@route GET /api/orders
//@access Private/Admin

// @ts-expect-error
const getOrders = asyncHandler(async (req: Request, res: Response) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
});

//@desc Update order to delivered
//@route GET /api/orders/:id/deliver
//@access Private/Admin

const updateOrderToDelivered = asyncHandler(
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const upadatedOrder = await order.save();
      res.json(upadatedOrder);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  }
);

export {
  getOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
};
