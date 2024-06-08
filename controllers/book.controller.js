const bookModel = require("../model/book.model")


const getAllBooks = async(req, res) => {
  try {
    const books = await bookModel.find()

    res.json({success: true, books})

  } catch (error) {
    res.json({success: false, error})
  }
}


const getSingleBook = async(req, res) => {
  try {
    const book = await bookModel.findById(req.params.id)

    if(!book) {
     return res.json({success: false, error: 'no book found'})
    }
    
    res.json({success: true, book})

  } catch (error) {
    res.json({success: false, error})
  }
}


const addBook = async(req, res) => {
  try {
    const {author, title, description} = req.body

    if(!author || !title || !description){
      return res.json({success: false, error: 'Please fill all fields'})
    }

    const book = await bookModel.create({
      author,
      title,
      description
    })

    res.json({success: true, id: book.id})

  } catch (error) {
    res.json({success: false, error})
  }
}


const updateBook = async(req, res) => {
  try {
    const { id } = req.params
    const {author, title, description} = req.body
    const updateBook = await bookModel.updateOne({ id }, {
      author,
      title,
      description
    })

    res.json({success: true, updateBook})

  } catch (error) {
    res.json({success: false, error})
  }
}


const deleteBook = async(req, res) => {
  try {
    const { id } = req.params

    const deletedBook = await bookModel.deleteOne(id)
    if(!deletedBook) {
      return res.json({success: false, error: 'no book found'})
    }

    res.json({success: true, deletedBook})

  } catch (error) {
    res.json({success: false, error})
  }
}



module.exports = {
  getAllBooks,
  getSingleBook,
  addBook,
  updateBook,
  deleteBook
}