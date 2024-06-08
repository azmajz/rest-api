const mongoose = require('mongoose')
const {Schema} = mongoose

const BookSchema = new Schema({
  author: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model("Book", BookSchema)