import Blog from "../database/model/blog";
import { fileUpload } from "../helpers/multer";

export const saveBlog = async (req, res) => {
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
	
	console.log(blog);
    const newBlog = new Blog(blog);
	console.log(newBlog);
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

