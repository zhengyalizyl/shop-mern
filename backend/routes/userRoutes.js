import express from "express";
import { authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, getUserById, updateUser } from "../contoller/userController.js";
import { auth, admin } from '../middleware/auth.middleware.js'


const router = express.Router();


router.post('/login', authUser);
router.get('/profile', auth, getUserProfile);
router.put('/profile', auth, updateUserProfile)
router.post('/register', registerUser);
router.get('/', auth, admin, getUsers);
router.delete('/:id', auth, admin, deleteUser);
router.get('/:id', auth, admin, getUserById);
router.put('/:id', auth, admin, updateUser);


export default router;