require('dotenv').config();
const express = require('express');
const originList = require('./middlewares/cors')
const helmet = require('helmet');
const rfs = require('rotating-file-stream');
const morgan = require('morgan')
const path = require('path');
const cors = require('cors');
const userRouter = require('./routes/user.router')
const port = 3000;

const app = express()

const streamLog = rfs.createStream("log.txt", {
    size: '10M',
    interval: '1d',
    compress: 'gzip',
    path: path.join(__dirname, 'logs')
})
app.use(morgan('combined', { stream: streamLog}))


app.use(cors(originList(port)));


app.use(helmet());

app.use('/user', userRouter);

app.get('/', (req,res)=> {
    res.send('Hello World')
})

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`)
})