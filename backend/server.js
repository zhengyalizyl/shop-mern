import express from "express";
import dotenv from "dotenv";
import connectDB from './config/db.js';
import colors from 'colors';
import productRoutes from './routes/productRoutes.js';
import { errorHandlermiddleware } from './middleware/errorHandler.middleware.js'
import { notFound } from './middleware/notFound.middlerware.js'

dotenv.config();

connectDB();

const app = express();


app.get('/', (req, res) => {
    res.send('API is running...');
})

app.use('/api/products', productRoutes)

app.use(notFound)
app.use(errorHandlermiddleware)

const PORT = process.env.PORT || 5001;

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold)
);