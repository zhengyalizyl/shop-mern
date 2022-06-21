import express from "express";
import { getProducts, getProduct, deleteProduct } from "../contoller/productConroller.js";


const router = express.Router();


router.get('/', getProducts);
router.get('/:id', getProduct);
router.delete('/:id', deleteProduct);


export default router;