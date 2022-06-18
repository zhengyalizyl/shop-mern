import Order from "../models/orderModel.js";

// @desc Create new order
// @route post /api/orders
// @access Private
export const addOrderItems = async(req, res, next) => {
    try {
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
            throw new Error("No order items");
        } else {
            const order = new Order({
                orderItems,
                user: req.user._id,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
            });

            const createdOrder = await order.save();

            res.status(201).json({
                success: true,
                data: createdOrder
            });
        }
    } catch (error) {
        next(error)
    }
}


// @desc get order
// @route get /api/orders/:id
// @access Private
export const getOrderById = async(req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email');

        if (order) {
            res.json({
                success: true,
                data: order
            })
        } else {
            res.status(404);
            throw new Error('order not found')
        }
    } catch (error) {
        next(error)
    }
}