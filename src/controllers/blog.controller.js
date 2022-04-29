import Blog from "../database/model/blog";
import { fileUpload } from "../helpers/multer";
import { blogValidation } from "../helpers/validation.schema";

export const saveBlog = async (req, res) => {
    const{error} =blogValidation(req.body);
    if(error){
        return res.status(400).json({message:error.details[0].message})
    }
	if (req.file) {
        req.body.photo = await fileUpload(req);
    } 
	else {
        req.body.photo =
            "https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80";
    }

    const blog = {
        title: req.body.title,
		author: req.body.author,
        description: req.body.description,
        photo: req.body.photo,
        
    };
    const{title}=req.body;
    const oldBlog= await Blog.findOne({title});
        if(oldBlog){
            return res.status(409).send("Blog Already Exist. Please change the title");
        }
	
	//console.log(blog);
    const newBlog = new Blog(blog);
	//console.log(newBlog);
    await newBlog.save();
    res.status(201).json({success: true, data: newBlog});
	
}

export const getAllBlog = async (req, res) => {
    const blogs= await Blog.find();
    res.status(200).json({success: true, data: blogs})
}

export const updateBlog= async (req, res) =>{
	try {
		const blog = await Blog.findOne({ _id: req.params.id })

		if (req.body.title) {
			blog.title = req.body.title
		}

		if (req.body.author) {
			blog.author = req.body.author
		}
        if (req.body.description) {
			blog.description = req.body.description
		}
        if(req.body.photo){
            if (req.file) {
                req.body.photo = await fileUpload(req);
            }
            blog.photo=req.body.photo;
        }

		await blog.save()
		res.send(blog)
	} catch {
		res.status(404)
		res.send({ error: "This blog doesn't exist!" })
	}
}

export const deleteBlog=async (req, res) => {
	try {
		await Blog.deleteOne({ _id: req.params.id })
		res.status(202).json({success: true, data: null})
	} catch {
		res.status(404)
		res.send({ error: "Message doesn't exist!" })
	}
}

export const commentonBlog = async (req, res) => {
    const id = (req.params.id)
    const idea = req.body;
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ status: "fail", message: "blog not found" });
    blog.comments.push(idea);
    console.log(blog);
    await Blog.findByIdAndUpdate(id, idea);
    blog.save();
    res.status(201).json({ status: "success", message: "comment added" });
}
export const getAllComment = async (req, res) => {
    const id = (req.params.id)
    const blog = await Blog.findById(id);
    const comment = blog.comments;
    res.status(200).json({ status: "success", data: comment})
}




