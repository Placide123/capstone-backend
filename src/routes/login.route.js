import express from 'express';
import {saveUser} from '../controllers/login.controller';
const router = express.Router();
router.post('/login', saveUser);


export default router;