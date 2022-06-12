import User from "../models/userModel.js";
import mongoose from "mongoose";
import StatusCodes from "http-status-codes";
import generateToken from "../utils/generateToken.js";

// @desc Auth user & get token
// @route post /api/users/login
// @access Public
export const authUser = async(req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            const { password, ...res1 } = user._doc;
            console.log(user)
            const { _id } = res1;
            res.json({
                success: true,
                data: {
                    ...res1,
                    token: generateToken(_id)
                }
            })
        } else {
            res.status(StatusCodes.UNPROCESSABLE_ENTITY)
            throw new Error(
                'user not found'
            );
        }

    } catch (error) {
        next(error);
    }
}



// @desc Get user profile
// @route get /api/users/profile
// @access Private
export const getUserProfile = async(req, res, next) => {
    try {


        const { _id } = req.user;
        const user = await User.findById(_id).select('-password');
        if (user) {
            res.json({
                success: true,
                data: {
                    ...user._doc
                }
            })
        } else {
            res.status(StatusCodes.UNPROCESSABLE_ENTITY)
            throw new Error(
                'user not found'
            );
        }

    } catch (error) {
        next(error);
    }
}


// @desc Register a new user
// @route post /api/users/register
// @access Public
export const registerUser = async(req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400);
            throw new Error('User already exists')
        }
        const user = await User.create({
            name,
            email,
            password
        })
        if (user) {
            const { _id, name, email, isAdmin } = user;
            res.status(201).json({
                _id,
                name,
                email,
                isAdmin,
                token: generateToken(_id)
            })

        } else {
            res.status(400);
            throw new Error('Invalid user data')
        }
    } catch (error) {
        next(error);
    }
}