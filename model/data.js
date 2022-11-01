const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
    content:{ type:String ,required:true},
    blogPost:{type:String }
    });
    const blog =  mongoose.model("blog",blogSchema);
    module.exports = blog;