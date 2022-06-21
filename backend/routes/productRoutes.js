import express from "express";
import { getProducts, getProduct, deleteProduct } from "../contoller/productConroller.js";
import { auth, admin } from '../middleware/auth.middleware.js'

const router = express.Router();


router.get('/', getProducts);
router.get('/:id', getProduct);
router.delete('/:id', auth, admin, deleteProduct);


export default router;