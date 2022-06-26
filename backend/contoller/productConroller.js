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


// @desc create a product
// @route POSt /api/products
// @access Priavte/admin
export const createProduct = async(req, res, next) => {
        try {
            const product = new Product({
                user: req.user._id,
                name: 'Airpods Wireless Bluetooth Headphones',
                image: '/images/airpods.jpg',
                description: 'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
                brand: 'Apple',
                category: 'Electronics',
                price: 89.99,
                countInStock: 10,
                rating: 4.5,
                numReviews: 0,
            })
            const createdProduct = await product.save();
            res.status(201).json({
                data: createdProduct,
                success: true
            })
        } catch (error) {
            next(error)
        }
    }
    // @desc update a product
    // @route PUT/api/products/:id
    // @access Priavte/admin
export const updateProduct = async(req, res, next) => {
    try {
        const { name, price, image, brand, category, countInStock, description } = req.body
        let product = await Product.findById(req.params.id)
        if (product) {
            product.name = name;
            product.price = price;
            product.image = image;
            product.brand = brand;
            product.category = category;
            product.countInStock = countInStock;
            product.description = description
            const createdProduct = await product.save();
            res.json({
                success: true,
                data: createdProduct
            })
        } else {
            res.status(404);
            throw new Error('product not found')
        }
    } catch (error) {
        next(error)
    }
}

// @desc create new review
// @route POst/api/products/:id/reviews
// @access Priavte
export const createProductReviews = async(req, res, next) => {
    try {
        const { rating, comment } = req.body
        let product = await Product.findById(req.params.id)
        if (product) {
            const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString());
            if (alreadyReviewed) {
                res.status(400);
                throw new Error('Product already reviewed')
            } else {
                const review = {
                    name: req.user.name,
                    rating: Number(rating),
                    comment,
                    user: req.user._id

                }
                product.reviews.push(review);
                product.numReviews = product.reviews.length;

                product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
                await product.save();
                res.json({
                    success: true,
                    message: 'Review added'
                })
            }
        } else {
            res.status(404);
            throw new Error('product not found')
        }
    } catch (error) {
        next(error)
    }
}