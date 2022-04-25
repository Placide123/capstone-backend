import express from 'express';
import {deleteSubscriber, getAllSubscriber, saveSubscriber} from '../controllers/subscriber.controller'
import { checkAdminAuth } from '../middleware/check-user';
const router = express.Router();
router.post('/', saveSubscriber);
router.get('/',checkAdminAuth, getAllSubscriber);
router.delete('/:id',checkAdminAuth, deleteSubscriber);


export default router;