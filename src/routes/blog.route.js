import express from 'express';
import multer from "multer";
import {saveBlog,getAllBlog,updateBlog,deleteBlog, commentonBlog, getAllComment} from '../controllers/blog.controller'
const router = express.Router();
import { checkAdminAuth, checkAuth } from '../middleware/check-user';
const storage=multer.diskStorage({});
const fileFilter=(req,file,cb)=>{
    if(file.mimetype.startsWith("image"))
    {
cb(null,true);
    }
    else{
        cb("invalid image file!",false);
    }
};
const uploads=multer({storage,fileFilter});
router.post('/save',checkAdminAuth, uploads.single("photo"), saveBlog);
router.get('/get', getAllBlog);
router.put('/:id',checkAdminAuth, uploads.single("photo"), updateBlog);
router.delete('/delete/:id', checkAdminAuth, deleteBlog);
router.put('/:id/comment',checkAuth, commentonBlog);
router.get('/:id/', checkAdminAuth, getAllComment);


export default router;