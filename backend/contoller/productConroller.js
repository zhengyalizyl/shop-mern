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

// @desc delete products by id
// @route delete /api/products/:id
// @access private/admin
export const deleteProduct = async(req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.remove();
            res.json({ success: true, message: 'Product removed' })
        } else {
            res.status(404)
            throw new Error('Product not found')
        }
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