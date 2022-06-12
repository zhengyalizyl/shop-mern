import express from "express";
import { authUser, getUserProfile, registerUser } from "../contoller/userController.js";
import { auth } from '../middleware/auth.middleware.js'


const router = express.Router();


router.post('/login', authUser);
router.get('/profile', auth, getUserProfile);
router.post('/register', registerUser);


export default router;