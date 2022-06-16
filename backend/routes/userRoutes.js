import express from "express";
import { authUser, getUserProfile, registerUser, updateUserProfile } from "../contoller/userController.js";
import { auth } from '../middleware/auth.middleware.js'


const router = express.Router();


router.post('/login', authUser);
router.get('/profile', auth, getUserProfile);
router.put('/profile', auth, updateUserProfile)
router.post('/register', registerUser);


export default router;