const express = require('express')
require('dotenv').config()
const { default: mongoose } = require('mongoose')
const app = express()

app.use(express.json({limit:'100mb'}))
app.use(express.urlencoded({extended: false}))

app.use('/api/books', require('./routes/book.routes'))

mongoose.connect(process.env.MONGODB_URI).then((res)=> {
  console.log('db connected');
}).catch((err)=> {
  console.log('connection error ',err);
})


app.listen(3000, ()=> console.log('running on port 3000'))