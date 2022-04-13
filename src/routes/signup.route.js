import express from 'express';
import {Signup,getAllUser, login} from '../controllers/signup.controler';
const router = express.Router();
router.post('/register', Signup);
router.get('/get', getAllUser);
router.post('/login',login);


export default router;