const User = require("../database/user")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const Blog = require("../database/Blog");

const SECRET_KEY = "J@dkjhudwhHhdjfsfb*3#";

async function register(req, res) {
    let {
        email, name, password
    } = req.body

    const user = await User.findOne({
        email
    })

    if (user) {
        return res.status(400).send({
            status: "error",
            message: "Email already registered"
        })
    }

    password = bcrypt.hashSync(password);

    await User.create({
        email,
        name,
        password,
        isVerified: false,
        emailVerificationOTP: crypto.randomInt(10000, 100000)
    })

    return res.status(200).send({
        status: "success",
        message: "user successfully registered, verify email"
    })
}

async function login(req, res) {
    const {
        email,
        password
    } = req.body

    const user = await User.findOne({
        email
    })

    if (!user) {
        return res.status(400).send({
            status: 'error',
            message: 'email not found'
        })
    }

    const matched = bcrypt.compareSync(password, user.password);

    if (matched) {
        //create a token;
        const {
            name,
            email,
            isVerified
        } = user;

        const token = jwt.sign({ name: user.name, email: user.email }, SECRET_KEY);

        res.status(200).send({
            status: "success",
            message: "login success",
            token,
            user: {
                name: user.name,
                email: user.email,
                isVerified: user.isVerified
            }
        })
    } else {
        res.status(400).send({
            status: "error",
            message: "invalid password"
        })
    }
}

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

    const blogs = await Blog.find({ email });

    res.status(200).json(blogs);
}

module.exports = {
    register,
    login,
}