import express from 'express';
import {Signup,getAllUser, login,deleteUser} from '../controllers/signup.controler';
import { checkAdminAuth } from '../middleware/check-user';
const router = express.Router();
router.post('/', Signup);
router.get('/get', checkAdminAuth, getAllUser);
router.post('/login',login);
router.delete('/delete/:id',checkAdminAuth,deleteUser);

export default router;