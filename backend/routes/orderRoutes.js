import express from "express";
import { addOrderItems, getOrderById, updateOrderToPaid, getMyOrder, getOrders } from "../contoller/orderController.js";
import { auth, admin } from '../middleware/auth.middleware.js'


const router = express.Router();


router.post('/', auth, addOrderItems);
router.get('/', auth, admin, getOrders)
router.get('/myorders', auth, getMyOrder)
router.get('/:id', auth, getOrderById)
router.put('/:id/pay', auth, updateOrderToPaid)

export default router;