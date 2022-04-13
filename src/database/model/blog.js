import mongoose from "mongoose";

const blogSchema= new mongoose.Schema({
title: String,
author: String,
description:String,
photo:String,
comment:[{
    name:String,
    comment:String,
}],
});

const Blog =mongoose.model('Blog', blogSchema);
export default Blog;