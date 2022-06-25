import express from "express";
import { getProducts, getProduct, deleteProduct, createProduct, updateProduct } from "../contoller/productConroller.js";
import { auth, admin } from '../middleware/auth.middleware.js'

const router = express.Router();


router.get('/', getProducts);
router.post('/', auth, admin, createProduct);
router.get('/:id', getProduct);
router.delete('/:id', auth, admin, deleteProduct);
router.put('/:id', auth, admin, updateProduct)

export default router;