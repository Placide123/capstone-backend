import express from 'express';
import { checkAdminAuth, checkAuth } from '../middleware/check-user';
import {saveMessage,getAllMessage, updateMessage,deleteMessage} from '../controllers/message.contoller'
const router = express.Router();
router.post('/', saveMessage);
router.get('/', checkAdminAuth, getAllMessage);
router.delete('/:id', checkAdminAuth, deleteMessage);

export default router;