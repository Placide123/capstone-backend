import express from 'express';
import {saveMessage,getAllMessage, updateMessage,deleteMessage} from '../controllers/message.contoller'
const router = express.Router();
router.post('/save', saveMessage);
router.get('/', getAllMessage);
router.put('/:id', updateMessage);
router.delete('/:id', deleteMessage);

export default router;