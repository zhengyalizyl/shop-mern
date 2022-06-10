import mongoose from "mongoose";
import { reviewSchema } from './reviewModel'



const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: false,
        default: 0
    },
    numberReview: {
        type: Number,
        required: false,
        default: 0
    },
    countInStock: {
        type: Number,
        required: false,
        default: 0
    },
    price: {
        type: Number,
        default: 0

    },
    reviews: [reviewSchema]

}, { timestamps: true })

const product = mongoose.model("product", productSchema);

export default product;