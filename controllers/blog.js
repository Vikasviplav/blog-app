const Blog = require("../database/Blog.js");
const User = require("../database/user.js");
const { v4: uuid } = require("uuid");

async function addblog(req, res) {
    const {
        title,
        category,
        author,
        content
    } = req.body

    const user = await User.findOne({
        email
    })

    if (!user) {
        return res.status(400).send({
            status: "error",
            message: "User not found"
        })
    }

    await Blog.create({
        blogId: uuid(),
        title,
        category,
        author,
        content
    });

    return res.status(200).send({
        status: "success",
        message: "Blog Created"
    })
}

async function getblog(req, res) {
    const { email } = req.body;

    const user = await User.findOne({
        email
    })

    if (!user) {
        return res.status(400).send({
            status: "error",
            message: "User not found"
        })
    }

    const Blogs = await Blog.find({ email });

    res.status(200).json(blogs);
}

async function deleteblog(req, res) {
    const id = req.query.id;

    const blog = await Blog.find({ blogId: id });


    if (blog.length == 0) {
        return res.status(400).send({
            response: "error",
            message: "id not matched"
        })
    }

    await Blog.deleteOne({ blogId: id })

    res.status(200).send({
        response: "success",
        message: "blog deleted"
    })
}

async function updateblog(req, res) {
    const id = req.query.id;

    const blog = await Blog.find({ blogId: id });


    if (blog.length == 0) {
        return res.status(400).send({
            response: "error",
            message: "id not matched"
        })
    }

    const { title, content } = req.body.data

    await Blog.updateOne({ blogId: id }, { title, content })

    res.status(200).send({
        response: "success",
        message: "blog updated"
    })
}

module.exports = {
    addblog,
    getblog,
    deleteblog,
    updateblog
}