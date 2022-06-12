import mongoose from "mongoose";
import Product from '../models/productModel.js'

// @desc Fetch all products
// @route GET /api/products
// @access Public
export const getProducts = async(req, res, next) => {
    try {
        const products = await Product.find({});
        res.json({
            success: true,
            data: products
        })
    } catch (error) {
        next(error);
    }
}

// @desc Fetch single products
// @route GET /api/products/:id
// @access Public
export const getProduct = async(req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (product) {
            res.json({
                success: true,
                data: product
            })
        } else {
            throw ('Product not found');
        }
    } catch (error) {
        next(error)
    }
}