import express from "express";
import { addOrderItems } from "../contoller/orderController.js";
import { auth } from '../middleware/auth.middleware.js'


const router = express.Router();


router.post('/', auth, addOrderItems);



export default router;