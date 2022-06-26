import express from "express";
import { getProducts, getProduct, deleteProduct, createProduct, updateProduct, createProductReviews } from "../contoller/productConroller.js";
import { auth, admin } from '../middleware/auth.middleware.js'

const router = express.Router();


router.get('/', getProducts);
router.post('/', auth, admin, createProduct);
router.get('/:id', getProduct);
router.delete('/:id', auth, admin, deleteProduct);
router.put('/:id', auth, admin, updateProduct)
router.post('/:id/reviews', auth, createProductReviews)

export default router;