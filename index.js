const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const connectDatabase = require("./database/index")
const { register, login } = require('./controllers/user');
const { getblog, addblog, deleteblog, updateblog } = require('./controllers/blog')

function logger(req, res, next) {
    console.log(new Date(), req.method, req.url);
    next();
}

app.use(cors());
app.use(express.json());
app.use(logger);

app.post('/register', register);
app.post('/login', login);
app.post('/getblog', getblog);
app.post('/addblog', addblog);
app.delete('/deleteblog', deleteblog);
app.patch('/updateblog', updateblog);

connectDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Database Connected At PORT: ${PORT}`);
    })
}).catch((err) => {
    console.log("Error is", err);
})