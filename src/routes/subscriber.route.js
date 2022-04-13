import express from 'express';
import {deleteSubscriber, getAllSubscriber, saveSubscriber, updateSubscriber} from '../controllers/subscriber.controller'
const router = express.Router();
router.post('/save', saveSubscriber);
router.get('/get', getAllSubscriber);
router.put('/update/:id', updateSubscriber);
router.delete('/delete/:id', deleteSubscriber);


export default router;