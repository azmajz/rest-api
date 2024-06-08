const express = require('express')
require('dotenv').config()
const { default: mongoose } = require('mongoose')
const bookController = require('./controllers/book.controller')
const app = express()

app.use(express.json({limit:'100mb'}))
app.use(express.urlencoded({extended: false}))

app.get('/api/books', bookController.getAllBooks)
app.post('/api/books', bookController.addBook)
app.get('/api/books/:id', bookController.getSingleBook)
app.put('/api/books/:id', bookController.updateBook)
app.delete('/api/books/:id', bookController.deleteBook)

mongoose.connect(process.env.MONGODB_URI).then((res)=> {
  console.log('db connected');
}).catch((err)=> {
  console.log('connection error ',err);
})


app.listen(3000, ()=> console.log('running on port 3000'))