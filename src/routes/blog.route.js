import express from 'express';
import multer from "multer";
import {saveBlog,getAllBlog,updateBlog,deleteBlog, commentonBlog, getAllComment} from '../controllers/blog.controller'
const router = express.Router();

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
router.post('/save',uploads.single("photo"),saveBlog);
router.get('/get', getAllBlog);
router.put('/update/:id', updateBlog);
router.delete('/delete/:id', deleteBlog);
router.put('/:id/comment',commentonBlog);
router.get('/getcomment/:id',getAllComment);


export default router;