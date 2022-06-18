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