const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    blogId: String,
    title: String,
    category: String,
    author: String,
    content: String
}, {
    timestamps: true
})

const blog = mongoose.model("blog", blogSchema);

module.exports = blog;