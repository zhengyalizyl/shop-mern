import express from "express";
import { getProducts, getProduct } from "../contoller/productConroller.js";
import products from "../data/products.js";
const router = express.Router();

// @desc Fetch all products
// @route GET /api/products
// @access Public
router.get('/', getProducts)

// @desc Fetch single products
// @route GET /api/products/:id
// @access Public
router.get('/:id', getProduct)


export default router;