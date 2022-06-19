import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'

export const auth = async(req, res, next) => {
    const authorizationHeader = req.headers["authorization"];
    if (authorizationHeader && authorizationHeader.startsWith('Bearer')) {
        try {
            const token = authorizationHeader.split('Bearer ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, token failed')
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
}


export const admin = async(req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {

        res.status(401);
        throw new Error('Not authorized as an admin')

    }
}