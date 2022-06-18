import express from "express";
import dotenv from "dotenv";
import connectDB from './config/db.js';
import colors from 'colors';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandlermiddleware } from './middleware/errorHandler.middleware.js';
import { notFound } from './middleware/notFound.middlerware.js';
import cors from "cors";
import bodyParser from "body-parser";
import orderRoutes from './routes/orderRoutes.js'

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('API is running...');
})

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes)

app.use(notFound)
app.use(errorHandlermiddleware)

const PORT = process.env.PORT || 5001;

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold)
);